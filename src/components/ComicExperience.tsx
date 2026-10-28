import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Clock, Sparkles, X, Scroll } from 'lucide-react';
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
  const [isParchmentOpen, setIsParchmentOpen] = useState(false);

  useEffect(() => {
    // Sound is always enabled in loop
    sound.enabled = true;
    sound.playBgm();
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

  const openParchment = () => {
    sound.playGrandMagicChime();
    setIsParchmentOpen(true);
  };

  const defaultLetter = `Para mi querida hermana ${sisterName}:

¡Felices 40 años! ⚡

Llegaste a las cuatro décadas más fuerte, más sabia y con la mejor onda del mundo. Dicen que cumplir 40 asusta, pero la verdad es que te convertiste en la mejor versión de vos misma. 

Gracias por todas las risas, por bancarme siempre, por ser mi compañera incondicional y por ponerle magia a nuestras vidas.

No importa cuántos años pasen: para mí siempre vas a ser mi hermana querida y la campeona indiscutida de Gryffindor.

¡Que este nuevo año te traiga todo lo que soñás y más!

Con todo mi cariño y amor,
Tu hermano.`;

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
    <div className="fixed inset-0 h-dvh w-screen overflow-hidden select-none bg-[#06040A] z-50 flex flex-col justify-between p-2 sm:p-4">
      {/* ========================================================
          TOP NARRATION BANNER (Ultra compact on mobile)
          ======================================================== */}
      <header className="w-full max-w-xl mx-auto shrink-0 z-20 pt-1 pb-1">
        <div className="comic-narration-box py-1 px-3 rounded-xl text-center shadow-md">
          <span className="text-[9px] sm:text-[11px] tracking-widest font-mono font-black text-red-700 block">
            ⚡ GIULLIANA Y LA ORDEN DE LAS 4 DÉCADAS • {current.chapter} ({sceneIndex + 1}/10) ⚡
          </span>
          <h2 className="text-[11px] sm:text-sm font-black text-black font-comic truncate mt-0.5">
            {current.banner}
          </h2>
        </div>
      </header>

      {/* ========================================================
          CENTER COMIC SCENE (Responsive: Vertical on mobile,
          Widescreen on desktop - NO CROPPING, NO OVERLAP)
          ======================================================== */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-4 my-auto min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`scene-panel-${sceneIndex}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-4 min-h-0"
          >
            {/* The 16:9 Artwork Frame (Always 100% visible, preserves full aspect ratio) */}
            <div className="relative w-full md:w-auto md:flex-1 h-auto max-h-[50dvh] md:max-h-[75dvh] aspect-video rounded-2xl overflow-hidden border-3 border-black shadow-[4px_4px_0px_#000] bg-black shrink-0 mx-auto">
              <img
                src={current.image}
                alt={current.banner}
                className="w-full h-full object-contain md:object-cover object-center"
              />

              {/* SFX Badge in top corner of art */}
              {current.sfx && !current.isFinal && (
                <div className="absolute top-2 right-2 comic-sfx px-2 sm:px-3 py-1 rounded-lg text-[9px] sm:text-xs font-comic shadow-md pointer-events-none">
                  {current.sfx}
                </div>
              )}
            </div>

            {/* Narrative / Dialogue / Parchment Section */}
            {!current.isFinal ? (
              <div className="w-full md:w-[320px] lg:w-[360px] shrink-0 my-auto">
                <div className="comic-balloon p-3 sm:p-4 shadow-lg border-3 border-black bg-white">
                  <span className="text-[11px] sm:text-xs font-black text-red-700 uppercase font-comic flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {current.speaker}
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-comic leading-snug">
                    {current.dialogue}
                  </p>
                  {current.hedwigNote && (
                    <p className="text-[10px] text-slate-500 font-bold font-comic italic mt-1.5 border-t border-slate-100 pt-1">
                      {current.hedwigNote}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* Final Scene Parchment Trigger */
              <div className="w-full md:w-[320px] lg:w-[360px] shrink-0 flex items-center justify-center my-auto">
                <motion.button
                  onClick={openParchment}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D3A625] via-[#FFE600] to-[#E5BE57] text-black font-black text-xs sm:text-sm font-serif-magic border-3 border-black shadow-[5px_5px_0px_#000] flex items-center justify-center gap-2.5 cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <span className="text-xl">📜</span>
                  <span className="font-comic font-black text-xs sm:text-sm">Abrir Pergamino de tu Hermano</span>
                  <Sparkles className="w-4 h-4 text-amber-900" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ========================================================
          UNROLLED PARCHMENT MODAL
          ======================================================== */}
      <AnimatePresence>
        {isParchmentOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 25 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg parchment-card rounded-3xl p-5 sm:p-8 text-[#2B1810] shadow-[10px_10px_0px_#000] border-4 border-black max-h-[88dvh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsParchmentOpen(false);
                }}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-[#2B1810] flex items-center justify-center cursor-pointer transition-all"
                title="Cerrar pergamino"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Hogwarts Seal Header */}
              <div className="text-center pb-3 border-b-2 border-[#8C6A3C]/40 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#740001] text-[#FFD700] text-lg font-serif-magic border-2 border-[#D3A625] shadow-md mb-1.5">
                  ⚡
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#740001] font-mono">
                  Colegio Hogwarts de Magia y Hechicería
                </div>
                <h3 className="font-magic text-lg sm:text-xl font-black text-[#2B1810] mt-0.5">
                  Decreto Fraternal de los 40 Años
                </h3>
              </div>

              {/* The Letter Body */}
              <div className="font-parchment text-xs sm:text-sm leading-relaxed space-y-3 whitespace-pre-line text-[#3C2415] italic font-medium px-1">
                {letterText}
              </div>

              {/* Bottom Signature & Close */}
              <div className="mt-6 pt-3 border-t-2 border-[#8C6A3C]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <Scroll className="w-4 h-4 text-[#740001]" />
                  <span className="text-[11px] font-serif-magic font-bold text-[#740001]">
                    Sellado bajo juramento de Gryffindor
                  </span>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setIsParchmentOpen(false);
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#2B1810] hover:bg-[#442817] text-[#FFE8A3] font-serif-magic font-bold text-xs transition-all cursor-pointer shadow-md"
                >
                  Enrollar pergamino y ver foto ↺
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================
          BOTTOM CONTROLLER BAR (Compact, responsive on all devices)
          ======================================================== */}
      <footer className="w-full max-w-4xl mx-auto shrink-0 z-30 flex items-center justify-between px-1 pb-1 pt-1.5">
        {/* Left: Volver al reloj + Botón Anterior */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onBackToCountdown}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-black/85 hover:bg-black text-[#FFDE00] font-black text-[11px] sm:text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reloj</span>
          </button>

          <button
            onClick={handlePrev}
            disabled={sceneIndex === 0}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-black font-black text-[11px] sm:text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 transition-all ${
              sceneIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer active:translate-x-[1px] active:translate-y-[1px]'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5 text-black" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
        </div>

        {/* Center: 10 progress dots */}
        <div className="flex items-center gap-1 bg-black/70 px-2.5 py-1 rounded-full border border-black backdrop-blur-md">
          {scenes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setSceneIndex(idx);
              }}
              className={`h-2 rounded-full transition-all border border-black cursor-pointer ${
                sceneIndex === idx
                  ? 'w-4 sm:w-6 bg-[#FFDE00]'
                  : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white'
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
            className="px-3 sm:px-4 py-1.5 rounded-xl bg-[#FFDE00] hover:bg-[#FFE838] text-black font-black text-[11px] sm:text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
          >
            <span>Releer ↺</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-3 sm:px-4 py-1.5 rounded-xl bg-[#FFDE00] hover:bg-[#FFE838] text-black font-black text-[11px] sm:text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
          >
            <span>{sceneIndex === 8 ? '¡Final! ⚡' : 'Siguiente'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-black" />
          </button>
        )}
      </footer>
    </div>
  );
};
