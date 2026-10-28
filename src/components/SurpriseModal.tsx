import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Play, RotateCcw } from 'lucide-react';
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
      sound.playGrandMagicChime();
      sound.playHedwigOpening();
      fireGrandCelebration();
    }
  }, [isOpen]);

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Felices 40 años ${sisterName}! ⚡ El Sombrero Seleccionador confirma tu ingreso triunfal al cuarto piso. Mirá el homenaje de Hogwarts acá: `
    );
    const url = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
  };

  const handleMoreMagic = () => {
    sound.playClick();
    fireGrandCelebration();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-2xl select-none">
        {/* Magic Aura Flares */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D3A625]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#740001]/25 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl my-4 hogwarts-frame rounded-3xl p-5 sm:p-8 border-2 border-[#D3A625]/60 shadow-[0_0_90px_rgba(211,166,37,0.3)] text-center overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-[#D3A625]/40 flex items-center justify-center text-[#D3A625] hover:text-white transition-all cursor-pointer z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Hogwarts Crest / Wax Seal */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#740001]/40 border border-[#D3A625]/50 text-[#FFD700] text-xs font-serif-magic tracking-widest uppercase mb-3">
            <span>⚡</span>
            <span>MINISTERIO DE LA MAGIA • DECRETO ESPECIAL</span>
            <span>⚡</span>
          </div>

          {/* Main Title */}
          <h2 className="font-magic text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-2 gold-foil-text">
            ¡FELICES 40, {sisterName.toUpperCase()}!
          </h2>

          <p className="text-[#EADBB6] text-xs sm:text-sm font-parchment italic max-w-xl mx-auto mb-5 leading-relaxed">
            "El Sombrero Seleccionador ha deliberado: ni un Giratiempo puede retrasar este día, pero la verdadera magia apenas comienza."
          </p>

          {/* VIDEO PLAYER THEATER */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden hogwarts-frame border-2 border-[#D3A625]/40 shadow-2xl mb-5 flex items-center justify-center bg-black/90 group">
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
              /* Harry Potter Styled Video Placeholder */
              <div className="p-4 text-center max-w-sm flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D3A625] to-[#740001] p-[2px] shadow-xl mb-3 group-hover:scale-110 transition-transform">
                  <div className="w-full h-full bg-[#0E0B16] rounded-[14px] flex items-center justify-center text-[#FFD700]">
                    <Play className="w-6 h-6 fill-[#FFD700] ml-0.5" />
                  </div>
                </div>
                <h3 className="text-[#FFF0C2] font-serif-magic font-bold text-base mb-1">
                  Pensadero Familiar de Recuerdos
                </h3>
                <p className="text-[#C5B38F] text-xs leading-relaxed mb-2 font-parchment">
                  Acá aparecerá el video sorpresa cuando cargues el enlace en ajustes.
                </p>
                <div className="px-2.5 py-1 rounded-lg bg-black/50 border border-[#D3A625]/30 text-[10px] font-mono text-[#D3A625]">
                  Soporta YouTube o MP4
                </div>
              </div>
            )}
          </div>

          {/* CARTA DE HOGWARTS / DIPLOMA */}
          <div className="p-4 rounded-xl parchment-card text-left mb-5 flex items-center gap-4">
            <div className="text-3xl sm:text-4xl">📜</div>
            <div className="flex-1">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#740001]">
                Colegio Hogwarts de Magia y Hechicería
              </div>
              <h4 className="text-[#2B1810] font-serif-magic font-black text-xs sm:text-sm mt-0.5">
                Certificado de Orden de Merlín (Primera Clase)
              </h4>
              <p className="text-[#4A3225] text-[11px] sm:text-xs mt-0.5 font-parchment leading-tight">
                Se certifica que <strong>{sisterName}</strong> ingresa oficialmente al Club de las 4 Décadas con honores de Gryffindor, manteniendo intacta su juventud y encanto.
              </p>
            </div>
            <button
              onClick={handleMoreMagic}
              className="px-3 py-2 rounded-lg bg-[#740001] hover:bg-[#8B0000] text-[#FFD700] text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">¡Más Magia!</span>
            </button>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleShareWhatsApp}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Mandar lechuza por WhatsApp 🦉</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-[#D3A625]/30 text-[#D3A625] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Volver al Reloj Mágico</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
