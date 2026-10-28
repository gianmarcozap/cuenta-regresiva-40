import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, Play, RotateCcw, Clock } from 'lucide-react';
import { sound } from '../lib/audio';
import { fireGrandCelebration } from '../lib/confetti';

interface ComicExperienceProps {
  sisterName: string;
  youtubeVideoId: string;
  directVideoUrl: string;
  onBackToCountdown: () => void;
}

export const ComicExperience: React.FC<ComicExperienceProps> = ({
  sisterName,
  youtubeVideoId,
  directVideoUrl,
  onBackToCountdown,
}) => {
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    sound.playGrandMagicChime();
    sound.playHedwigOpening();
    fireGrandCelebration();
  }, []);

  const handleNext = () => {
    sound.playClick();
    setSceneIndex((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    sound.playClick();
    setSceneIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Felices 40 años ${sisterName}! ⚡ Mirá la historieta de caricatura que te armamos en Hogwarts: `
    );
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden select-none bg-black z-50 flex flex-col justify-between">
      {/* SCENE 0: LA LLEGADA (Full-Bleed Cartoon Scene) */}
      <AnimatePresence mode="wait">
        {sceneIndex === 0 && (
          <motion.div
            key="scene-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('/images/arrival.jpg')` }}
          >
            {/* Top Comic Narration Banner */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 max-w-2xl mx-auto z-20">
              <div className="comic-narration-box p-3 sm:p-4 rounded-xl text-center">
                <span className="text-[10px] sm:text-xs tracking-widest font-mono block text-red-700">
                  ⚡ GIULLIANA Y LA ORDEN DE LAS 4 DÉCADAS • CAPÍTULO I ⚡
                </span>
                <h2 className="text-sm sm:text-lg font-black text-black font-comic mt-0.5">
                  Llegada triunfal a Hogwarts: ¡El Expreso no espera a nadie!
                </h2>
              </div>
            </div>

            {/* Comic Balloon: Giulliana */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3, type: 'spring' }}
              className="absolute top-[28%] sm:top-[22%] left-[10%] sm:left-[35%] max-w-[280px] sm:max-w-[340px] z-20"
            >
              <div className="comic-balloon comic-balloon-tail-bottom p-4">
                <p className="text-xs sm:text-sm font-black text-slate-900 font-comic leading-tight">
                  «¡Por fin llegué a Hogwarts! Dicen que en el mundo muggle los 40 dan miedo... ¡pero acá significa desbloquear magia legendaria!»
                </p>
              </div>
            </motion.div>

            {/* Comic Balloon: Hedwig */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.3, type: 'spring' }}
              className="absolute bottom-[28%] sm:bottom-[32%] left-[5%] sm:left-[15%] max-w-[200px] sm:max-w-[240px] z-20"
            >
              <div className="comic-balloon comic-balloon-tail-bottom p-3">
                <p className="text-[11px] sm:text-xs font-black text-slate-900 font-comic leading-tight">
                  *¡Hoot!* 🦉<br />«Tranquila Giulliana, estás más diosa que nunca.»
                </p>
              </div>
            </motion.div>

            {/* Comic SFX Badge */}
            <div className="absolute top-[48%] right-[8%] sm:right-[20%] comic-sfx px-4 py-2 rounded-xl text-xs sm:text-sm z-20 font-comic shadow-2xl">
              ¡LUMOS 40!
            </div>
          </motion.div>
        )}

        {/* SCENE 1: EL GNOMO (Full-Bleed Cartoon Scene) */}
        {sceneIndex === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('/images/gnome.jpg')` }}
          >
            {/* Top Comic Narration Banner */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 max-w-2xl mx-auto z-20">
              <div className="comic-narration-box p-3 sm:p-4 rounded-xl text-center">
                <span className="text-[10px] sm:text-xs tracking-widest font-mono block text-red-700">
                  ⚡ CAPÍTULO II: EL CONSEJO DEL CLAUSTRO ⚡
                </span>
                <h2 className="text-sm sm:text-lg font-black text-black font-comic mt-0.5">
                  El encuentro con el Gnomo más viejo del castillo
                </h2>
              </div>
            </div>

            {/* Comic Balloon: The Gnome */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3, type: 'spring' }}
              className="absolute top-[28%] sm:top-[30%] left-[6%] sm:left-[15%] max-w-[280px] sm:max-w-[340px] z-20"
            >
              <div className="comic-balloon comic-balloon-tail-bottom p-4">
                <span className="text-[10px] font-bold text-red-600 block uppercase font-mono mb-0.5">El Gnomo:</span>
                <p className="text-xs sm:text-sm font-black text-slate-900 font-comic leading-tight">
                  «¡¿40 pirulos humanos?! ¡Pffff, todavía sos una bebé! A mí recién me salieron las primeras canas a los 180 años.»
                </p>
              </div>
            </motion.div>

            {/* Comic Balloon: Giulliana */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.3, type: 'spring' }}
              className="absolute top-[18%] sm:top-[20%] right-[6%] sm:right-[18%] max-w-[260px] sm:max-w-[320px] z-20"
            >
              <div className="comic-balloon comic-balloon-tail-bottom p-4">
                <span className="text-[10px] font-bold text-blue-600 block uppercase font-mono mb-0.5">Giulliana:</span>
                <p className="text-xs sm:text-sm font-black text-slate-900 font-comic leading-tight">
                  «¡Viste! El colágeno muggle es puro cuento. ¡La magia y la actitud no envejecen jamás!»
                </p>
              </div>
            </motion.div>

            {/* Comic SFX Badge */}
            <div className="absolute bottom-[25%] left-[8%] sm:left-[22%] comic-sfx px-4 py-2 rounded-xl text-xs sm:text-sm z-20 font-comic">
              ¡CRISIS ANULADA! 💥
            </div>
          </motion.div>
        )}

        {/* SCENE 2: LA GRAN HISTORIETA DE 6 VIÑETAS (Full Screen Comic Spread) */}
        {sceneIndex === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full bg-[#08070D] flex flex-col items-center justify-center p-3 sm:p-6"
          >
            {/* Top Narration */}
            <div className="comic-narration-box px-4 py-2 rounded-xl text-center mb-3 max-w-xl z-20">
              <span className="text-[10px] tracking-widest font-mono text-red-700 block">
                ⚡ CAPÍTULO III: LA CORONACIÓN DE LOS 40 ⚡
              </span>
              <p className="text-xs sm:text-sm font-black font-comic">
                El Sombrero Seleccionador deliberó: ¡Gryffindor y Reina Absoluta del Cuarto Piso!
              </p>
            </div>

            {/* The Full Comic Strip Image Edge-to-Edge */}
            <div className="relative w-full max-w-5xl flex-1 max-h-[72vh] rounded-2xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_#D3A625] bg-black">
              <img
                src="/images/comic_strip.jpg"
                alt="Historieta completa de 40 años"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}

        {/* SCENE 3: EL PENSADERO Y VIDEO FAMILIAR (The Grand Finale) */}
        {sceneIndex === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full bg-cover bg-center flex flex-col items-center justify-center p-4 sm:p-6"
            style={{ backgroundImage: `url('/images/arrival.jpg')` }}
          >
            {/* Backdrop dark vignette */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-0" />

            <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center space-y-4 my-auto">
              <div className="comic-narration-box px-5 py-2.5 rounded-2xl text-center shadow-2xl">
                <span className="text-xs tracking-widest font-mono text-red-700 block font-black">
                  📜 DECRETO FINAL DEL MINISTERIO DE LA MAGIA 📜
                </span>
                <h1 className="text-xl sm:text-3xl font-black font-comic text-black mt-0.5">
                  ¡FELICES 40 AÑOS, {sisterName.toUpperCase()}!
                </h1>
              </div>

              {/* Video Player in Magical Gilded Frame */}
              <div className="w-full aspect-video rounded-3xl overflow-hidden border-4 border-black shadow-[10px_10px_0px_#D3A625] bg-black">
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
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#161224] to-[#08070D] text-center">
                    <div className="w-16 h-16 rounded-3xl bg-[#D3A625] border-3 border-black flex items-center justify-center text-black mb-3 shadow-[4px_4px_0px_#000]">
                      <Play className="w-8 h-8 fill-black text-black ml-1" />
                    </div>
                    <h3 className="font-comic font-black text-lg sm:text-xl text-[#FFD700]">
                      El Pensadero Familiar Listo
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-comic max-w-md mt-1">
                      Aquí se reproducirá el video familiar con los saludos y recuerdos de toda la banda cuando lo agregues en ajustes.
                    </p>
                  </div>
                )}
              </div>

              {/* Comic Diploma Card */}
              <div className="parchment-card p-3 sm:p-4 rounded-2xl text-left flex items-center gap-3 w-full">
                <span className="text-3xl sm:text-4xl">📜</span>
                <div className="flex-1">
                  <div className="text-[10px] font-black text-red-700 tracking-wider uppercase font-mono">
                    Orden de Merlín • Primera Clase
                  </div>
                  <p className="text-xs sm:text-sm text-slate-900 font-comic font-bold leading-tight mt-0.5">
                    Certificamos formalmente que <strong>{sisterName}</strong> ingresa a la década más gloriosa con honores de Hogwarts.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-black font-black text-xs sm:text-sm transition-all border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Mandar lechuza por WhatsApp 🦉</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setSceneIndex(0);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-black font-black text-xs sm:text-sm transition-all border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <RotateCcw className="w-4 h-4 text-black" />
                  <span>Releer desde el inicio ↺</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM CONTROLLER BAR (Floating seamlessly over the cartoon) */}
      <footer className="relative z-30 p-4 sm:p-6 flex items-center justify-between w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToCountdown}
            className="px-3 sm:px-4 py-2 rounded-xl bg-black/80 hover:bg-black text-[#D3A625] font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reloj</span>
          </button>

          <button
            onClick={handlePrev}
            disabled={sceneIndex === 0}
            className={`px-3 py-2 rounded-xl bg-white/90 hover:bg-white text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1 transition-all ${
              sceneIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer active:translate-x-[2px] active:translate-y-[2px]'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-black" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
        </div>

        {/* Scene navigation pills */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setSceneIndex(idx);
              }}
              className={`h-3 rounded-full transition-all border-2 border-black ${
                sceneIndex === idx
                  ? 'w-8 bg-[#FFDE00]'
                  : 'w-3 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>

        {/* Next Scene Button */}
        <button
          onClick={handleNext}
          disabled={sceneIndex === 3}
          className={`px-5 py-2 rounded-xl bg-[#FFDE00] hover:bg-[#FFE838] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 transition-all ${
            sceneIndex === 3 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer active:translate-x-[2px] active:translate-y-[2px]'
          }`}
        >
          <span>{sceneIndex === 2 ? 'Ver Final ⚡' : 'Siguiente'}</span>
          <ChevronRight className="w-4 h-4 text-black" />
        </button>
      </footer>
    </div>
  );
};
