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
  const [layoutMode, setLayoutMode] = useState<'desktop' | 'mobile-portrait' | 'mobile-landscape'>('desktop');

  // Detect exact viewport profile dynamically
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (h < 540 && w > h) {
        setLayoutMode('mobile-landscape');
      } else if (w < 768) {
        setLayoutMode('mobile-portrait');
      } else {
        setLayoutMode('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Audio always starts in loop
    sound.enabled = true;
    sound.playBgm();
    sound.playGrandMagicChime();
    fireGrandCelebration();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
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
    <div className="fixed inset-0 h-dvh w-screen overflow-hidden select-none bg-[#050408] z-50 flex flex-col justify-between">
      {/* ========================================================
          LAYOUT 1: MOBILE LANDSCAPE (Horizontal en celular:
          h < 540px, w > h -> Split Side-by-Side para no amontonar)
          ======================================================== */}
      {layoutMode === 'mobile-landscape' && (
        <div className="h-full w-full flex items-center justify-between p-2 gap-3 relative">
          {/* Left: 16:9 Artwork fitted cleanly */}
          <div className="relative h-[92dvh] aspect-video rounded-xl overflow-hidden border-2 border-black shadow-[3px_3px_0px_#000] bg-black shrink-0">
            <img
              src={current.image}
              alt={current.banner}
              className="w-full h-full object-cover"
            />
            {current.sfx && !current.isFinal && (
              <div className="absolute top-2 right-2 comic-sfx px-2 py-0.5 rounded-md text-[9px] font-comic shadow-md">
                {current.sfx}
              </div>
            )}
          </div>

          {/* Right: Narration, Dialogue and Controls */}
          <div className="flex-1 h-[92dvh] flex flex-col justify-between py-1">
            {/* Top Chapter Pill */}
            <div className="comic-narration-box py-1 px-2.5 rounded-lg text-center shadow-sm">
              <span className="text-[9px] tracking-widest font-mono font-black text-red-700 block">
                ⚡ {current.chapter} ({sceneIndex + 1}/10) ⚡
              </span>
              <h2 className="text-[11px] font-black text-black font-comic truncate">
                {current.banner}
              </h2>
            </div>

            {/* Middle Dialogue / Parchment */}
            {!current.isFinal ? (
              <div className="comic-balloon p-2.5 my-auto shadow-md border-2 border-black bg-white">
                <span className="text-[10px] font-black text-red-700 uppercase font-comic flex items-center gap-1 mb-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  {current.speaker}
                </span>
                <p className="text-[11px] font-extrabold text-slate-900 font-comic leading-tight">
                  {current.dialogue}
                </p>
                {current.hedwigNote && (
                  <p className="text-[9px] text-slate-500 font-bold font-comic italic mt-1 pt-0.5 border-t border-slate-100">
                    {current.hedwigNote}
                  </p>
                )}
              </div>
            ) : (
              <button
                onClick={openParchment}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D3A625] via-[#FFE600] to-[#E5BE57] text-black font-black text-[11px] font-serif-magic border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>📜</span>
                <span>Abrir Pergamino de tu Hermano</span>
              </button>
            )}

            {/* Bottom Controls */}
            <div className="flex items-center justify-between gap-1 pt-1">
              <div className="flex items-center gap-1">
                <button
                  onClick={onBackToCountdown}
                  className="px-2 py-1 rounded-lg bg-black/85 text-[#FFDE00] font-black text-[10px] border border-black shadow-sm"
                >
                  <Clock className="w-3 h-3" />
                </button>
                <button
                  onClick={handlePrev}
                  disabled={sceneIndex === 0}
                  className={`px-2 py-1 rounded-lg bg-white text-black font-black text-[10px] border border-black ${
                    sceneIndex === 0 ? 'opacity-30' : 'cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
              </div>

              <span className="text-[9px] font-mono font-bold text-[#D3A625]">
                {sceneIndex + 1}/10
              </span>

              <button
                onClick={sceneIndex === 9 ? () => setSceneIndex(0) : handleNext}
                className="px-3 py-1 rounded-lg bg-[#FFDE00] text-black font-black text-[10px] border border-black shadow-sm cursor-pointer"
              >
                <span>{sceneIndex === 9 ? 'Releer ↺' : 'Siguiente ➔'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          LAYOUT 2: MOBILE PORTRAIT (Vertical en celular:
          w < 768px -> Art arriba en 16:9 completo, Diálogo abajo)
          ======================================================== */}
      {layoutMode === 'mobile-portrait' && (
        <div className="h-full w-full flex flex-col justify-between p-2.5 sm:p-4 max-w-md mx-auto">
          {/* Top Banner */}
          <header className="shrink-0 mb-1">
            <div className="comic-narration-box py-1 px-3 rounded-xl text-center shadow-md">
              <span className="text-[9px] tracking-widest font-mono font-black text-red-700 block">
                ⚡ GIULLIANA Y LA ORDEN DE LAS 4 DÉCADAS • {current.chapter} ({sceneIndex + 1}/10) ⚡
              </span>
              <h2 className="text-[11px] font-black text-black font-comic truncate mt-0.5">
                {current.banner}
              </h2>
            </div>
          </header>

          {/* 16:9 Artwork (Uncropped, fits full aspect ratio cleanly) */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-3 border-black shadow-[4px_4px_0px_#000] bg-black shrink-0">
            <img
              src={current.image}
              alt={current.banner}
              className="w-full h-full object-cover"
            />
            {current.sfx && !current.isFinal && (
              <div className="absolute top-2 right-2 comic-sfx px-2.5 py-1 rounded-lg text-[9px] font-comic shadow-md">
                {current.sfx}
              </div>
            )}
          </div>

          {/* Dialogue Space Below Art (Leaves faces 100% visible) */}
          <div className="flex-1 my-2 flex items-center justify-center">
            {!current.isFinal ? (
              <div className="comic-balloon p-3.5 w-full shadow-lg border-3 border-black bg-white">
                <span className="text-xs font-black text-red-700 uppercase font-comic flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  {current.speaker}
                </span>
                <p className="text-xs font-extrabold text-slate-900 font-comic leading-snug">
                  {current.dialogue}
                </p>
                {current.hedwigNote && (
                  <p className="text-[10px] text-slate-500 font-bold font-comic italic mt-1.5 pt-1 border-t border-slate-100">
                    {current.hedwigNote}
                  </p>
                )}
              </div>
            ) : (
              <button
                onClick={openParchment}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D3A625] via-[#FFE600] to-[#E5BE57] text-black font-black text-xs font-serif-magic border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
              >
                <span className="text-xl">📜</span>
                <span>Abrir Pergamino de tu Hermano ⚡</span>
              </button>
            )}
          </div>

          {/* Bottom Controller */}
          <footer className="shrink-0 flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              <button
                onClick={onBackToCountdown}
                className="px-2.5 py-1.5 rounded-xl bg-black/85 text-[#FFDE00] font-black text-[11px] border-2 border-black shadow-[2px_2px_0px_#000]"
              >
                <Clock className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handlePrev}
                disabled={sceneIndex === 0}
                className={`px-2.5 py-1.5 rounded-xl bg-white text-black font-black text-[11px] border-2 border-black shadow-[2px_2px_0px_#000] ${
                  sceneIndex === 0 ? 'opacity-30' : 'cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5 text-black" />
              </button>
            </div>

            {/* 10 Dots */}
            <div className="flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full border border-black">
              {scenes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setSceneIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all border border-black ${
                    sceneIndex === idx ? 'w-4 bg-[#FFDE00]' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={sceneIndex === 9 ? () => setSceneIndex(0) : handleNext}
              className="px-3 py-1.5 rounded-xl bg-[#FFDE00] text-black font-black text-[11px] border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <span>{sceneIndex === 9 ? 'Releer ↺' : 'Siguiente ➔'}</span>
            </button>
          </footer>
        </div>
      )}

      {/* ========================================================
          LAYOUT 3: DESKTOP & TABLETS (w >= 768px, h >= 540px:
          Cinematic Theater con iluminación ambiental y diálogo inferior)
          ======================================================== */}
      {layoutMode === 'desktop' && (
        <div className="h-full w-full flex flex-col justify-between p-4 md:p-6 relative">
          {/* Ambient Blurred Artwork Background (Glow Theater) */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl pointer-events-none scale-105"
            style={{ backgroundImage: `url('${current.image}')` }}
          />

          {/* Top Narration Badge */}
          <header className="relative z-20 w-full max-w-xl mx-auto shrink-0 text-center">
            <div className="comic-narration-box py-1.5 px-4 rounded-xl shadow-2xl">
              <span className="text-[11px] tracking-widest font-mono font-black text-red-700 block">
                ⚡ GIULLIANA Y LA ORDEN DE LAS 4 DÉCADAS • {current.chapter} ({sceneIndex + 1}/10) ⚡
              </span>
              <h2 className="text-base font-black text-black font-comic mt-0.5">
                {current.banner}
              </h2>
            </div>
          </header>

          {/* Central Artwork Display Frame */}
          <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-auto min-h-0">
            <div className="relative max-h-[64vh] aspect-video rounded-3xl overflow-hidden border-4 border-black shadow-[10px_10px_0px_#D3A625] bg-black group">
              <img
                src={current.image}
                alt={current.banner}
                className="w-full h-full object-cover"
              />

              {/* SFX Badge */}
              {current.sfx && !current.isFinal && (
                <div className="absolute top-4 right-4 comic-sfx px-4 py-1.5 rounded-xl text-xs sm:text-sm font-comic shadow-2xl pointer-events-none">
                  {current.sfx}
                </div>
              )}

              {/* Final Scene Parchment Button over photo bottom */}
              {current.isFinal && (
                <div className="absolute bottom-6 inset-x-0 flex justify-center z-20">
                  <motion.button
                    onClick={openParchment}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D3A625] via-[#FFE600] to-[#E5BE57] text-black font-black text-sm font-serif-magic border-3 border-black shadow-[6px_6px_0px_#000] flex items-center gap-3 cursor-pointer hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    <span className="text-xl">📜</span>
                    <span className="font-comic font-black text-sm">Abrir Pergamino de tu Hermano</span>
                    <Sparkles className="w-4 h-4 text-amber-900" />
                  </motion.button>
                </div>
              )}
            </div>

            {/* Desktop Dialogue Ribbon (Positioned cleanly below the artwork) */}
            {!current.isFinal && (
              <div className="w-full max-w-3xl mx-auto mt-3">
                <div className="comic-balloon p-4 shadow-xl border-3 border-black bg-white flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-red-700 uppercase font-comic flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        {current.speaker}
                      </span>
                      {current.hedwigNote && (
                        <span className="text-xs text-slate-500 font-bold font-comic italic">
                          • {current.hedwigNote}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-extrabold text-slate-900 font-comic leading-tight">
                      {current.dialogue}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Desktop Footer Controller */}
          <footer className="relative z-20 w-full max-w-4xl mx-auto shrink-0 flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={onBackToCountdown}
                className="px-3.5 py-2 rounded-xl bg-black/85 hover:bg-black text-[#FFDE00] font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Volver al Reloj</span>
              </button>

              <button
                onClick={handlePrev}
                disabled={sceneIndex === 0}
                className={`px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1 transition-all ${
                  sceneIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer active:translate-x-[2px] active:translate-y-[2px]'
                }`}
              >
                <ChevronLeft className="w-4 h-4 text-black" />
                <span>Anterior</span>
              </button>
            </div>

            {/* 10 Progress Dots */}
            <div className="flex items-center gap-1.5 bg-black/75 px-3 py-1.5 rounded-full border-2 border-black backdrop-blur-md">
              {scenes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setSceneIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all border border-black cursor-pointer ${
                    sceneIndex === idx ? 'w-7 bg-[#FFDE00]' : 'w-2 bg-white/50 hover:bg-white'
                  }`}
                  title={`Viñeta ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={sceneIndex === 9 ? () => setSceneIndex(0) : handleNext}
              className="px-5 py-2 rounded-xl bg-[#FFDE00] hover:bg-[#FFE838] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
            >
              <span>{sceneIndex === 9 ? 'Releer historieta ↺' : sceneIndex === 8 ? '¡Coronación! ⚡' : 'Siguiente'}</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </footer>
        </div>
      )}

      {/* ========================================================
          SHARED UNROLLED PARCHMENT MODAL (Universal)
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
    </div>
  );
};
