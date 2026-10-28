import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Send, Play, RotateCcw } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
      sound.playGrandMagicChime();
      sound.playHedwigOpening();
      fireGrandCelebration();
    }
  }, [isOpen]);

  const handleNextPage = () => {
    sound.playClick();
    setCurrentPage((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevPage = () => {
    sound.playClick();
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Felices 40 años ${sisterName}! ⚡ Leé la historieta mágica que te armamos en Hogwarts: `
    );
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
  };

  const pages = [
    {
      chapter: "Capítulo I",
      title: "El Expreso de los 40",
      subtitle: "Plataforma 9 ¾ — Rumbo a lo desconocido",
      image: "/images/arrival.jpg",
      quote: "El tren no frena para nadie, y menos cuando cumplís 40. Dicen que en el mundo muggle da miedo cambiar de década, pero en Hogwarts significa subir al nivel de maga legendaria.",
      dialogue: "«¿Dolor de espalda? Nah, es el peso de tanta facha y sabiduría acumulada.»",
      btnText: "Subir al tren e ir al patio ➔",
    },
    {
      chapter: "Capítulo II",
      title: "El Consejo del Gnomo",
      subtitle: "Los claustros de Hogwarts",
      image: "/images/gnome.jpg",
      quote: "De camino al Gran Comedor, un gnomo de jardín sabio y cascarrabias salió a darle la bienvenida a las cuatro décadas.",
      dialogue: "«¿40 años humanos? ¡Pfff, todavía sos una aprendiz! A mí recién me salieron las primeras canas a los 180. ¡Disfrutá la juventud, nena!»",
      btnText: "Entrar al Gran Comedor ➔",
    },
    {
      chapter: "Capítulo III",
      title: "La Gran Coronación",
      subtitle: "El veredicto del Sombrero Seleccionador",
      image: "/images/comic_strip.jpg",
      quote: "El Sombrero Seleccionador tardó exactamente dos segundos: '¡Gryffindor de pura cepa y reina absoluta de los 40!' Su Patronus brilla más fuerte que nunca y en Las Tres Escobas ya descorcharon la cerveza de manteca.",
      dialogue: "«¡Salud por las cuatro décadas más mágicas de tu vida!»",
      btnText: "Ver Decreto Final y Sorpresa ⚡",
    },
    {
      chapter: "Capítulo IV",
      title: "El Pensadero Familiar",
      subtitle: "Homenaje de toda la familia",
      isVideoPage: true,
    }
  ];

  if (!isOpen) return null;

  const current = pages[currentPage];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl select-none overflow-hidden">
        {/* Magic Aura Flares */}
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#D3A625]/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#740001]/20 rounded-full blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[95vh] hogwarts-frame rounded-[2rem] p-4 sm:p-6 md:p-8 border-2 border-[#D3A625]/70 shadow-[0_0_90px_rgba(211,166,37,0.35)] flex flex-col justify-between overflow-y-auto z-10"
        >
          {/* Top Bar inside Comic Reader */}
          <div className="flex items-center justify-between pb-3 border-b border-[#D3A625]/30 mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg">⚡</span>
              <div>
                <span className="text-[10px] sm:text-xs font-serif-magic font-bold tracking-widest uppercase text-[#FFD700] block">
                  CÓMIC OFICIAL: LA ORDEN DE LAS 4 DÉCADAS
                </span>
                <span className="text-xs text-[#EADBB6] font-parchment italic">
                  Protagonizado por {sisterName}
                </span>
              </div>
            </div>

            {/* Pagination dots & close */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {pages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playClick();
                      setCurrentPage(idx);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentPage === idx
                        ? 'w-6 bg-[#FFD700]'
                        : 'w-2 bg-[#D3A625]/30 hover:bg-[#D3A625]/60'
                    }`}
                    title={`Página ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-[#D3A625]/40 flex items-center justify-center text-[#D3A625] hover:text-white transition-all cursor-pointer"
                title="Cerrar historieta"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PAGE CONTENT */}
          <div className="flex-1 my-auto">
            <AnimatePresence mode="wait">
              {!current.isVideoPage ? (
                /* COMIC SCENE (Pages 0, 1, 2) */
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center"
                >
                  {/* Comic Illustration Panel */}
                  <div className="md:col-span-7 relative rounded-2xl overflow-hidden border-2 border-[#D3A625]/60 shadow-2xl bg-black/60 group aspect-[4/3] sm:aspect-[16/10] md:aspect-auto md:h-[46vh]">
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Chapter Watermark Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-[#D3A625]/50 text-[10px] sm:text-xs font-serif-magic font-bold text-[#FFD700]">
                      {current.chapter}
                    </div>
                  </div>

                  {/* Comic Story Narrative & Speech Bubble */}
                  <div className="md:col-span-5 flex flex-col justify-between space-y-4 text-left">
                    <div>
                      <span className="text-[11px] font-serif-magic font-bold text-[#D3A625] uppercase tracking-wider block">
                        {current.subtitle}
                      </span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-magic font-black text-white gold-foil-text mt-1 leading-tight">
                        {current.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#EADBB6] font-parchment leading-relaxed mt-2">
                        {current.quote}
                      </p>
                    </div>

                    {/* Speech Bubble parchment style */}
                    <div className="p-3.5 sm:p-4 rounded-2xl parchment-card relative shadow-lg">
                      <div className="text-[10px] uppercase font-bold text-[#740001] tracking-wider mb-0.5">
                        ⚡ Diálogo Encantado
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[#2B1810] font-parchment italic leading-snug">
                        {current.dialogue}
                      </p>
                    </div>

                    {/* Navigation Button */}
                    <button
                      onClick={handleNextPage}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D3A625] to-[#740001] hover:from-[#E5BE57] hover:to-[#8B0000] text-slate-950 hover:text-white font-serif-magic font-black text-xs sm:text-sm transition-all shadow-xl shadow-amber-900/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>{current.btnText}</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* FINAL REVEAL (Page 3 - Video & Official Decree) */
                <motion.div
                  key="final-reveal"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 text-center max-w-2xl mx-auto"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#740001]/50 border border-[#D3A625]/50 text-[#FFD700] text-xs font-serif-magic uppercase tracking-wider">
                    <span>⚡</span>
                    <span>DECRETO FINAL: ¡BIENVENIDA A LA ORDEN DE LAS 4 DÉCADAS!</span>
                    <span>⚡</span>
                  </div>

                  <h3 className="font-magic text-2xl sm:text-4xl font-black gold-foil-text">
                    ¡FELICES 40, {sisterName.toUpperCase()}!
                  </h3>

                  {/* Video Theater */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden hogwarts-frame border-2 border-[#D3A625]/50 shadow-2xl flex items-center justify-center bg-black/90">
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
                      <div className="p-4 text-center max-w-sm flex flex-col items-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D3A625] to-[#740001] p-[2px] shadow-lg mb-2">
                          <div className="w-full h-full bg-[#0E0B16] rounded-[14px] flex items-center justify-center text-[#FFD700]">
                            <Play className="w-5 h-5 fill-[#FFD700] ml-0.5" />
                          </div>
                        </div>
                        <h4 className="text-[#FFF0C2] font-serif-magic font-bold text-sm">
                          El Pensadero Familiar
                        </h4>
                        <p className="text-[#C5B38F] text-xs font-parchment mt-0.5">
                          Acá se proyectará el video sorpresa cuando lo cargues en ajustes.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Diploma Card */}
                  <div className="p-3 sm:p-4 rounded-xl parchment-card text-left flex items-center gap-3">
                    <div className="text-3xl">📜</div>
                    <div className="flex-1">
                      <div className="text-[10px] uppercase font-bold text-[#740001] tracking-widest">
                        Orden de Merlín • Primera Clase
                      </div>
                      <p className="text-xs text-[#2B1810] font-parchment leading-tight mt-0.5">
                        Certificamos que <strong>{sisterName}</strong> ingresó oficialmente al club más exclusivo. Su humor, magia y juventud quedan declarados patrimonio familiar indiscutible.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Final Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                    <button
                      onClick={handleShareWhatsApp}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Mandar lechuza por WhatsApp 🦉</span>
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setCurrentPage(0);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-[#D3A625]/40 text-[#D3A625] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Releer historieta</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Pagination Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-[#D3A625]/20 mt-3 text-xs text-[#C5B38F] font-serif-magic shrink-0">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`flex items-center gap-1 transition-all ${
                currentPage === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'text-[#D3A625] hover:text-white cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="text-[11px] font-mono text-[#D3A625]">
              {currentPage + 1} / {pages.length}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === pages.length - 1}
              className={`flex items-center gap-1 transition-all ${
                currentPage === pages.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'text-[#D3A625] hover:text-white cursor-pointer'
              }`}
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
