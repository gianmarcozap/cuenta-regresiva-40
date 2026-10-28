import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, Clock, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../lib/audio';
import { fireGrandCelebration } from '../lib/confetti';

interface ComicExperienceProps {
  sisterName: string;
  onBackToCountdown: () => void;
}

export const ComicExperience: React.FC<ComicExperienceProps> = ({
  sisterName,
  onBackToCountdown,
}) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(!sound.enabled);

  useEffect(() => {
    if (!sound.enabled) {
      sound.toggle();
      setIsMuted(false);
    }
    sound.playGrandMagicChime();
    sound.playHedwigOpening();
    fireGrandCelebration();
  }, []);

  const handleNext = () => {
    sound.playClick();
    if (sceneIndex === 8) {
      fireGrandCelebration();
      sound.playGrandMagicChime();
    }
    setSceneIndex((prev) => Math.min(prev + 1, 9));
  };

  const handlePrev = () => {
    sound.playClick();
    setSceneIndex((prev) => Math.max(prev - 1, 0));
  };

  const toggleSound = () => {
    const enabled = sound.toggle();
    setIsMuted(!enabled);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Felices 40 años ${sisterName}! ⚡ Mirá la historieta completa de 10 viñetas que te armamos en Hogwarts: `
    );
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
  };

  // The 10 High-Resolution 16:9 Comic Scenes
  const scenes = [
    {
      chapter: "VIÑETA I",
      banner: "LA CARTA DE HOGWARTS",
      image: "/images/scene_1_letter.jpg",
      speaker: "Giulliana",
      dialogue: "«¡Una lechuza con el sello 40! ¿Me convocan para una misión o para avisarme del colágeno?»",
      hedwigNote: "Hedwig: *¡Hoot!* (Cumplís 40 y la magia se multiplica)",
      sfx: "¡TAP TAP EN LA VENTANA! 📜",
    },
    {
      chapter: "VIÑETA II",
      banner: "PLATAFORMA 9 ¾",
      image: "/images/scene_2_platform_new.jpg",
      speaker: "Giulliana",
      dialogue: "«¡Chau mundo muggle! Dejo los 30 atrás y me subo al Expreso a toda máquina y con la mejor facha.»",
      sfx: "¡CHOO CHOO! 🚂",
    },
    {
      chapter: "VIÑETA III",
      banner: "CAMINO NOCTURNO AL CASTILLO",
      image: "/images/arrival.jpg",
      speaker: "Giulliana",
      dialogue: "«Dicen que en el mundo muggle los 40 dan miedo... ¡pero acá es puro estatus, elegancia y sabiduría!»",
      hedwigNote: "Hedwig: «Tranquila, estás más diosa que nunca.»",
      sfx: "¡LUMOS 40! ⚡",
    },
    {
      chapter: "VIÑETA IV",
      banner: "OLLIVANDERS: LA VARITA ELIGE A LA MAGA",
      image: "/images/scene_4_ollivanders_new.jpg",
      speaker: "Giulliana",
      dialogue: "«Madera de roble, 40 pulgadas de pura experiencia y un núcleo de paciencia indestructible.»",
      sfx: "¡CHISPAS DORADAS! ✨",
    },
    {
      chapter: "VIÑETA V",
      banner: "EL SOMBRERO SELECCIONADOR",
      image: "/images/scene_5_sorting_hat_new.jpg",
      speaker: "El Sombrero Seleccionador",
      dialogue: "«¡GRYFFINDOR! Difícil decisión... mucha chispa, cero paciencia para el drama y 40 pirulos impecables.»",
      sfx: "¡APLAUSO EN EL GRAN COMEDOR! 👏",
    },
    {
      chapter: "VIÑETA VI",
      banner: "EL CONSEJO DEL GNOMO",
      image: "/images/gnome.jpg",
      speaker: "El Gnomo del Claustro",
      dialogue: "«¿40 pirulos humanos? ¡Pfff, todavía sos una bebé! A mí recién me salieron las primeras canas a los 180 años.»",
      sfx: "¡CRISIS ANULADA! 💥",
    },
    {
      chapter: "VIÑETA VII",
      banner: "EXPECTO PATRONUM",
      image: "/images/scene_7_patronus_new.jpg",
      speaker: "Giulliana",
      dialogue: "«¡Expecto Patronum! Que se desvanezcan los dolores de espalda, las malas vibras y las arrugas.»",
      sfx: "¡MAGIA PURA! 🦌",
    },
    {
      chapter: "VIÑETA VIII",
      banner: "NOCHE DE HECHIZOS",
      image: "/images/scene_8_night_letter_new.jpg",
      speaker: "Giulliana",
      dialogue: "«El veredicto de los libros sagrados es unánime: la década de los 40 se declara oficialmente la mejor de todas.»",
      sfx: "¡HECHIZO DE ETERNA JUVENTUD! 🌙",
    },
    {
      chapter: "VIÑETA IX",
      banner: "EL BRINDIS EN LAS TRES ESCOBAS",
      image: "/images/scene_9_toast_new.jpg",
      speaker: "Giulliana",
      dialogue: "«¡Cerveza de manteca bien fría y torta con las velitas de los 40! ¡Salud por todo lo bueno que se viene!»",
      sfx: "¡CLINK DE JARRAS! 🍻",
    },
    {
      chapter: "VIÑETA X (GRAN FINAL)",
      banner: "CORONACIÓN: LA ORDEN DE LAS 4 DÉCADAS",
      image: "/images/scene_10_coronation.jpg",
      speaker: "Toda la Casa Gryffindor",
      dialogue: "«¡VIVA GIULLIANA! Cuatro décadas de pura magia, risas y la mejor hermana del universo.»",
      sfx: "¡FUEGOS ARTIFICIALES 40! 🎆",
      isFinal: true,
    }
  ];

  const current = scenes[sceneIndex];

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden select-none bg-black z-50 flex flex-col justify-between">
      {/* FULL BLEED 16:9 CARTOON ILLUSTRATION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`scene-${sceneIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${current.image}')` }}
        >
          {/* TOP NARRATION BADGE (Compact, no face overlap) */}
          <div className="absolute top-3 sm:top-5 inset-x-4 max-w-lg mx-auto z-20 pointer-events-none">
            <div className="comic-narration-box px-4 py-2 rounded-xl text-center shadow-2xl">
              <span className="text-[10px] sm:text-[11px] tracking-widest font-mono font-black text-red-700 block">
                ⚡ GIULLIANA Y LA ORDEN DE LAS 4 DÉCADAS • {current.chapter} ({sceneIndex + 1}/10) ⚡
              </span>
              <h2 className="text-xs sm:text-sm font-black text-black font-comic mt-0.5">
                {current.banner}
              </h2>
            </div>
          </div>

          {/* SFX BADGE (Discreetly in the corner) */}
          {current.sfx && (
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: -4 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute top-20 right-4 sm:right-10 comic-sfx px-3.5 py-1.5 rounded-xl text-xs sm:text-sm z-20 font-comic shadow-2xl pointer-events-none"
            >
              {current.sfx}
            </motion.div>
          )}

          {/* LOWER COMIC DIALOGUE BOX (Positioned cleanly below the art - ZERO FACE OVERLAP) */}
          <div className="absolute bottom-20 sm:bottom-24 inset-x-3 sm:inset-x-8 max-w-3xl mx-auto z-20">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.25 }}
              className="comic-balloon p-4 sm:p-5 shadow-2xl relative border-3 border-black bg-white"
            >
              {/* Speaker Tag */}
              <div className="flex items-center justify-between mb-1.5 border-b border-slate-200 pb-1">
                <span className="text-xs sm:text-sm font-black text-red-700 uppercase font-comic flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {current.speaker}
                </span>
                {current.hedwigNote && (
                  <span className="text-[11px] sm:text-xs text-slate-600 font-bold font-comic italic hidden sm:inline">
                    {current.hedwigNote}
                  </span>
                )}
              </div>

              {/* Main Dialogue text */}
              <p className="text-xs sm:text-base font-extrabold text-slate-900 font-comic leading-snug">
                {current.dialogue}
              </p>

              {/* Final Scene WhatsApp Trigger inside box */}
              {current.isFinal && (
                <div className="mt-3 pt-2 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={handleShareWhatsApp}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-black font-black text-xs sm:text-sm transition-all border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2 cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>Mandar felicitación por WhatsApp 🦉</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* FIXED BOTTOM NAVIGATION CONTROLLER */}
      <footer className="fixed bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-8 z-30 flex items-center justify-between max-w-4xl mx-auto pointer-events-auto">
        {/* Left: Volver al reloj + Toggle de audio Hedwig */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToCountdown}
            className="px-3 sm:px-4 py-2 rounded-xl bg-black/85 hover:bg-black text-[#FFDE00] font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reloj</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-black/85 hover:bg-black text-[#FFDE00] border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
            title={isMuted ? "Activar música de Hedwig" : "Silenciar"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />}
          </button>

          <button
            onClick={handlePrev}
            disabled={sceneIndex === 0}
            className={`px-3 py-2 rounded-xl bg-white/95 hover:bg-white text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1 transition-all ${
              sceneIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer active:translate-x-[2px] active:translate-y-[2px]'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-black" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
        </div>

        {/* Center: 10 progress dots */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-black/70 px-3 py-1.5 rounded-full border border-black backdrop-blur-md">
          {scenes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setSceneIndex(idx);
              }}
              className={`h-2 sm:h-2.5 rounded-full transition-all border border-black cursor-pointer ${
                sceneIndex === idx
                  ? 'w-5 sm:w-7 bg-[#FFDE00]'
                  : 'w-2 bg-white/50 hover:bg-white'
              }`}
              title={`Viñeta ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right: Next / Finish Button */}
        <button
          onClick={handleNext}
          disabled={sceneIndex === 9}
          className={`px-4 sm:px-5 py-2 rounded-xl bg-[#FFDE00] hover:bg-[#FFE838] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 transition-all ${
            sceneIndex === 9
              ? 'opacity-30 cursor-not-allowed'
              : 'cursor-pointer active:translate-x-[2px] active:translate-y-[2px]'
          }`}
        >
          <span>{sceneIndex === 8 ? '¡Coronación! ⚡' : 'Siguiente'}</span>
          <ChevronRight className="w-4 h-4 text-black" />
        </button>
      </footer>
    </div>
  );
};
