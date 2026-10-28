import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Share2, Play, Award, RotateCcw } from 'lucide-react';
import { sound } from '../lib/audio';
import { fireGrandCelebration } from '../lib/confetti';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  sisterName: string;
  youtubeVideoId: string;
  directVideoUrl: string;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  isOpen,
  onClose,
  sisterName,
  youtubeVideoId,
  directVideoUrl,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playFanfare();
      fireGrandCelebration();
    }
  }, [isOpen]);

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Felices 40 años ${sisterName}! 🎉 Oficialmente inaugurado el cuarto piso. Mirá el homenaje que te armamos acá: `
    );
    const url = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
  };

  const handleMoreConfetti = () => {
    sound.playClick();
    fireGrandCelebration();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl my-8 glass-panel rounded-3xl p-6 sm:p-10 border border-amber-400/40 shadow-[0_0_100px_rgba(245,158,11,0.25)] text-center overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top celebratory pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-black tracking-widest uppercase mb-4 animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-400" />
            ¡OBJETIVO CUMPLIDO: 40 AÑOS DE PURA MAGIA!
          </div>

          {/* Main Title */}
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-2">
            ¡FELICES 40, <span className="text-gold-gradient">{sisterName.toUpperCase()}</span>!
          </h2>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium mb-8 leading-relaxed">
            Te quejaste todo el año de que llegaba esta fecha, ¡pero mirá lo diosa que estás! De parte de toda la familia, este es tu momento.
          </p>

          {/* VIDEO PLAYER THEATER */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-panel border border-amber-400/30 shadow-2xl mb-8 flex items-center justify-center bg-slate-950/90 group">
            {youtubeVideoId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                title="Video Sorpresa de Cumpleaños"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : directVideoUrl ? (
              <video controls autoPlay className="w-full h-full object-cover">
                <source src={directVideoUrl} type="video/mp4" />
                Tu navegador no soporta el video.
              </video>
            ) : (
              /* High-fidelity Placeholder ready for when video is added */
              <div className="p-6 text-center max-w-md flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-500 p-[2px] shadow-2xl shadow-rose-500/30 mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-full h-full bg-[#0A0C16] rounded-[22px] flex items-center justify-center text-amber-300">
                    <Play className="w-8 h-8 fill-amber-300 text-amber-300 ml-1" />
                  </div>
                </div>
                <h3 className="text-white font-extrabold text-lg sm:text-xl mb-1">
                  Sala de Video Sorpresa Lista
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                  Acá se reproducirá automáticamente el video de saludos de amigos y familia cuando lo configures en el botón de ajustes (⚙️).
                </p>
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-amber-300">
                  Soporta YouTube y MP4 directo
                </div>
              </div>
            )}
          </div>

          {/* DIPLOMA / CERTIFICADO OFICIAL */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-white/[0.02] to-rose-500/10 border border-amber-400/30 text-left mb-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-amber-500/20">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-amber-400">
                  Acta Oficial de Traspaso de Década
                </span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                  Validez Vitalicia
                </span>
              </div>
              <h4 className="text-white font-bold text-base mt-1">
                Certificado de Ingreso al Club Exclusivo de los 40
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                Certificamos que <strong>{sisterName}</strong> mantiene intacta su juventud, belleza y encanto, con la ventaja de que ahora cualquier dolor de espalda es una anécdota respetable.
              </p>
            </div>
            <button
              onClick={handleMoreConfetti}
              className="glass-panel px-4 py-2.5 rounded-xl text-xs font-black text-amber-300 hover:bg-amber-500/20 border-amber-400/40 transition-all flex items-center gap-2 shrink-0 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>¡Más Confeti!</span>
            </button>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleShareWhatsApp}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartir Saludo por WhatsApp</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl glass-panel hover:bg-white/10 text-slate-200 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Volver a la Cuenta Regresiva</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
