import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Clock, Volume2, VolumeX, Sparkles, X, Scroll } from 'lucide-react';
import { sound } from '../lib/audio';
import { fireGrandCelebration } from '../lib/confetti';

interface ComicExperienceProps {
  sisterName: string;
  birthdayLetter?: string;
  onBackToCountdown: () => void;
}

export const ComicExperience: React.FC<ComicExperienceProps> = ({
  sisterName,
  birthdayLetter,
  onBackToCountdown,
}) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(!sound.enabled);
  const [isParchmentOpen, setIsParchmentOpen] = useState(false);

  useEffect(() => {
    // Enable background audio with Prologue.mp3 at 1.25x speed
    sound.enabled = true;
    sound.playBgm();
    setIsMuted(false);
    sound.playGrandMagicChime();
    fireGrandCelebration();

    return () => {
      sound.pauseBgm();
    };
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

  const openParchment = () => {
    sound.playGrandMagicChime();
    setIsParchmentOpen(true);
  };

  const defaultLetter = `Para mi querida hermana ${sisterName}:

¡Felices 40 años! ⚡

Llegaste a las cuatro décadas más fuerte, más sabia y con la mejor onda del mundo. Dicen que cumplir 40 asusta, pero la verdad es que te convertiste en la mejor versión de ti misma. 

Gracias por todas las risas, por apoyarme siempre, por ser mi compañera incondicional y por ponerle magia a nuestras vidas.

No importa cuántos años pasen: para mí siempre vas a ser mi hermana y la campeona indiscutida de Gryffindor.

¡Que sigas cumpliendo muchos mas años de alegría y magia!

Te amo hermanita, y estoy orgulloso de ti cada dia.

Con todo mi cariño y amor,
Tu Gemelo con barba.`;

  const letterText = birthdayLetter || defaultLetter;

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
      dialogue: "",
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
          transition={{ duration: 0.35, ease: 'easeOut' }}
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

          {/* SFX BADGE (Only on scenes 1 to 9) */}
          {current.sfx && !current.isFinal && (
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: -4 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute top-20 right-4 sm:right-10 comic-sfx px-3.5 py-1.5 rounded-xl text-xs sm:text-sm z-20 font-comic shadow-2xl pointer-events-none"
            >
              {current.sfx}
            </motion.div>
          )}

          {/* LOWER COMIC DIALOGUE BOX (Only on scenes 1 to 9) */}
          {!current.isFinal && (
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
              </motion.div>
            </div>
          )}

          {/* FINAL SCENE: FLOATING MAGICAL PARCHMENT BUTTON (SCENE 10) */}
          {current.isFinal && (
            <div className="absolute bottom-20 sm:bottom-24 inset-x-4 max-w-md mx-auto z-20 flex justify-center">
              <motion.button
                onClick={openParchment}
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: [1, 1.05, 1], y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="group px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D3A625] via-[#FFE600] to-[#E5BE57] text-black font-black text-xs sm:text-sm font-serif-magic border-3 border-black shadow-[6px_6px_0px_#000] flex items-center gap-3 cursor-pointer hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px]"
              >
                <div className="w-8 h-8 rounded-xl bg-black/10 flex items-center justify-center text-xl">
                  📜
                </div>
                <div className="text-left leading-tight">
                  <span className="text-[10px] font-mono uppercase tracking-wider block text-red-800">Carta Secreta</span>
                  <span className="font-comic font-black text-sm">Abrir Pergamino de tu Hermano</span>
                </div>
                <Sparkles className="w-4 h-4 text-amber-800 animate-spin" style={{ animationDuration: '4s' }} />
              </motion.button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* UNROLLED FLOATING PARCHMENT MODAL (Full Reading Mode) */}
      <AnimatePresence>
        {isParchmentOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl parchment-card rounded-3xl p-6 sm:p-9 text-[#2B1810] shadow-[12px_12px_0px_#000] border-4 border-black max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsParchmentOpen(false);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-[#2B1810] flex items-center justify-center cursor-pointer transition-all"
                title="Cerrar pergamino"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hogwarts Wax Seal Header */}
              <div className="text-center pb-4 border-b-2 border-[#8C6A3C]/40 mb-5">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#740001] text-[#FFD700] text-xl font-serif-magic border-2 border-[#D3A625] shadow-lg mb-2">
                  ⚡
                </div>
                <div className="text-[11px] font-black uppercase tracking-widest text-[#740001] font-mono">
                  Colegio Hogwarts de Magia y Hechicería
                </div>
                <h3 className="font-magic text-xl sm:text-2xl font-black text-[#2B1810] mt-1">
                  Decreto Fraternal de los 40 Años
                </h3>
              </div>

              {/* The Letter Body */}
              <div className="font-parchment text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line text-[#3C2415] italic font-medium px-2">
                {letterText}
              </div>

              {/* Bottom Wax Seal Signature & Close */}
              <div className="mt-8 pt-4 border-t-2 border-[#8C6A3C]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Scroll className="w-5 h-5 text-[#740001]" />
                  <span className="text-xs font-serif-magic font-bold text-[#740001]">
                    Sellado bajo juramento de Gryffindor
                  </span>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setIsParchmentOpen(false);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2B1810] hover:bg-[#442817] text-[#FFE8A3] font-serif-magic font-bold text-xs transition-all cursor-pointer shadow-md"
                >
                  Enrollar pergamino y volver a la foto ↺
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FIXED BOTTOM NAVIGATION CONTROLLER */}
      <footer className="fixed bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-8 z-30 flex items-center justify-between max-w-4xl mx-auto pointer-events-auto">
        {/* Left: Volver al reloj + Toggle de audio Prologue */}
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
            title={isMuted ? "Activar música Prologue (1.25x)" : "Silenciar música"}
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

        {/* Right: Next / Releer Button */}
        {sceneIndex === 9 ? (
          <button
            onClick={() => {
              sound.playClick();
              setSceneIndex(0);
            }}
            className="px-4 sm:px-5 py-2 rounded-xl bg-[#FFDE00] hover:bg-[#FFE838] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
          >
            <span>Releer historieta ↺</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 sm:px-5 py-2 rounded-xl bg-[#FFDE00] hover:bg-[#FFE838] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
          >
            <span>{sceneIndex === 8 ? '¡Coronación! ⚡' : 'Siguiente'}</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        )}
      </footer>
    </div>
  );
};
