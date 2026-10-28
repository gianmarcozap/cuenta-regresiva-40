import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Calendar, User, Video, Check } from 'lucide-react';
import type { AppConfig } from '../types';
import { sound } from '../lib/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSave: (newConfig: AppConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [form, setForm] = useState<AppConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    onSave(form);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>⚙️ Ajustes de la Landing</span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Personalizá los datos de tu hermana y el momento cero.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Nombre de tu hermana
              </label>
              <input
                type="text"
                value={form.sisterName}
                onChange={(e) => setForm({ ...form, sisterName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all font-medium"
                placeholder="Ej: Giulliana"
                required
              />
            </div>

            {/* Fecha y hora */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                Fecha y Hora del Cumpleaños
              </label>
              <input
                type="datetime-local"
                value={form.targetDate}
                onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all font-mono"
                required
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Podés poner una fecha cercana para probar que el contador llegue a cero.
              </span>
            </div>

            {/* YouTube ID o URL Video */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1.5">
                <Video className="w-3.5 h-3.5 text-purple-400" />
                ID de Video en YouTube (Opcional)
              </label>
              <input
                type="text"
                value={form.youtubeVideoId}
                onChange={(e) => setForm({ ...form, youtubeVideoId: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all font-mono"
                placeholder="Ej: dQw4w9WgXcQ (los caracteres tras v=)"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Si lo dejas vacío, mostrará la tarjeta de espera familiar.
              </span>
            </div>

            {/* Direct video URL */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1.5">
                <Video className="w-3.5 h-3.5 text-cyan-400" />
                O URL Directa de MP4 (Dropbox / Cloudinary)
              </label>
              <input
                type="url"
                value={form.directVideoUrl}
                onChange={(e) => setForm({ ...form, directVideoUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all font-mono text-xs"
                placeholder="https://.../video.mp4"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>¡Guardado!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
