import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, Clock, Volume2, VolumeX } from 'lucide-react';
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
      // Grand celebration on arriving at scene 10 (index 9)
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
      `¡Felices 40 años ${sisterName}! ⚡ Leé la historieta completa de 10 viñetas que te armamos en Hogwarts: `
    );
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
  };

  // The 10 Official Comic Scenes
  const scenes = [
    {
      chapter: "VIÑETA I",
      banner: "LA CARTA DE HOGWARTS",
      image: "/images/scene_1_letter.jpg",
      dialogues: [
        {
          speaker: "Giulliana",
          text: "«¡Una lechuza con el sello 40! ¿Me convocan para una misión o para avisarme del colágeno?»",
          position: "top-[28%] left-[45%] max-w-[280px] sm:max-w-[340px]",
        },
        {
          speaker: "Hedwig",
          text: "*¡Hoot!* 🦉 «Convocatoria oficial: ¡Cumplís 40 y la magia se multiplica!»",
          position: "top-[42%] left-[10%] max-w-[220px]",
        }
      ],
      sfx: "¡TAP TAP EN LA VENTANA! 📜",
    },
    {
      chapter: "VIÑETA II",
      banner: "PLATAFORMA 9 ¾",
      image: "/images/scene_platform.jpg",
      dialogues: [
        {
          speaker: "Giulliana",
          text: "«¡Chau mundo muggle! Dejo los 30 atrás y me subo al Expreso con toda la facha.»",
          position: "top-[25%] right-[10%] max-w-[290px] sm:max-w-[340px]",
        }
      ],
      sfx: "¡CHOO CHOO! 🚂",
    },
    {
      chapter: "VIÑETA III",
      banner: "CAMINO NOCTURNO AL CASTILLO",
      image: "/images/arrival.jpg",
      dialogues: [
        {
          speaker: "Giulliana",
          text: "«Dicen que en el mundo muggle los 40 dan miedo... ¡pero acá es puro estatus y sabiduría!»",
          position: "top-[22%] left-[34%] max-w-[290px] sm:max-w-[350px]",
        },
        {
          speaker: "Hedwig",
          text: "«Tranquila, estás más diosa que nunca.»",
          position: "bottom-[32%] left-[12%] max-w-[200px]",
        }
      ],
      sfx: "¡LUMOS 40! ⚡",
    },
    {
      chapter: "VIÑETA IV",
      banner: "OLLIVANDERS: LA VARITA ELIGE A LA MAGA",
      image: "/images/scene_ollivanders.jpg",
      dialogues: [
        {
          speaker: "Giulliana",
          text: "«Madera de roble, 40 pulgadas de pura experiencia y núcleo de paciencia indestructible.»",
          position: "top-[25%] left-[25%] max-w-[290px] sm:max-w-[340px]",
        }
      ],
      sfx: "¡CHISPAS DORADAS! ✨",
    },
    {
      chapter: "VIÑETA V",
      banner: "EL SOMBRERO SELECCIONADOR",
      image: "/images/scene_sorting_hat.jpg",
      dialogues: [
        {
          speaker: "Sombrero",
          text: "«¡GRYFFINDOR! Difícil... mucha chispa, cero paciencia para el drama y 40 pirulos impecables.»",
          position: "top-[22%] left-[15%] max-w-[300px]",
        }
      ],
      sfx: "¡APLAUSO EN EL GRAN COMEDOR! 👏",
    },
    {
      chapter: "VIÑETA VI",
      banner: "EL CONSEJO DEL GNOMO",
      image: "/images/gnome.jpg",
      dialogues: [
        {
          speaker: "El Gnomo",
          text: "«¿40 pirulos humanos? ¡Pfff, todavía sos una bebé! A mí recién me salieron canas a los 180 años.»",
          position: "top-[28%] left-[12%] max-w-[280px]",
        },
        {
          speaker: "Giulliana",
          text: "«¡Viste! El colágeno muggle es puro cuento. ¡La magia no envejece!»",
          position: "top-[20%] right-[15%] max-w-[260px]",
        }
      ],
      sfx: "¡CRISIS ANULADA! 💥",
    },
    {
      chapter: "VIÑETA VII",
      banner: "EXPECTO PATRONUM",
      image: "/images/scene_patronus.jpg",
      dialogues: [
        {
          speaker: "Giulliana",
          text: "«¡Expecto Patronum! Que se desvanezcan los dolores de espalda y las malas vibras.»",
          position: "top-[24%] right-[20%] max-w-[290px]",
        }
      ],
      sfx: "¡MAGIA PURA! 🦌",
    },
    {
      chapter: "VIÑETA VIII",
      banner: "NOCHE DE HECHIZOS",
      image: "/images/scene_night_letter.jpg",
      dialogues: [
        {
          speaker: "Giulliana",
          text: "«El veredicto es unánime: la década de los 40 se declara oficialmente la mejor de todas.»",
          position: "top-[22%] left-[30%] max-w-[300px]",
        }
      ],
      sfx: "¡HECHIZO DE ETERNA JUVENTUD! 🌙",
    },
    {
      chapter: "VIÑETA IX",
      banner: "EL BRINDIS EN LAS TRES ESCOBAS",
      image: "/images/scene_toast_40.jpg",
      dialogues: [
        {
          speaker: "Giulliana",
          text: "«¡Cerveza de manteca bien fría y torta con las velitas de los 40! ¡Salud por lo que se viene!»",
          position: "top-[22%] left-[20%] max-w-[320px]",
        }
      ],
      sfx: "¡CLINK DE JARRAS! 🍻",
    },
    {
      chapter: "VIÑETA X (GRAN FINAL)",
      banner: "CORONACIÓN: LA ORDEN DE LAS 4 DÉCADAS",
      image: "/images/scene_10_coronation.jpg",
      dialogues: [
        {
          speaker: "Toda la Casa Gryffindor",
          text: "«¡VIVA GIULLIANA! Cuatro décadas de pura magia, risas y la mejor hermana del universo.»",
          position: "bottom-[24%] left-[25%] max-w-[340px] sm:max-w-[420px]",
        }
      ],
      sfx: "¡FUEGOS ARTIFICIALES 40! 🎆",
      isFinal: true,
    }
  ];

  const current = scenes[sceneIndex];

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden select-none bg-black z-50 flex flex-col justify-between">
      {/* FULL BLEED CARICATURE BACKGROUND */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`scene-${sceneIndex}`}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full bg-contain md:bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url('${current.image}')` }}
        >
          {/* Subtle vignette so text bubbles pop */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/40 pointer-events-none" />

          {/* TOP COMIC BANNER */}
          <div className="absolute top-3 sm:top-5 inset-x-4 max-w-xl mx-auto z-20 pointer-events-none">
            <div className="comic-narration-box p-2.5 sm:p-3 rounded-xl text-center shadow-2xl">
              <span className="text-[10px] sm:text-[11px] tracking-widest font-mono font-black text-red-700 block">
                ⚡ GIULLIANA Y LA ORDEN DE LAS 4 DÉCADAS • {current.chapter} ({sceneIndex + 1}/10) ⚡
              </span>
              <h2 className="text-xs sm:text-base font-black text-black font-comic mt-0.5">
                {current.banner}
              </h2>
            </div>
          </div>

          {/* COMIC DIALOGUE BALLOONS */}
          {current.dialogues.map((d, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.25, duration: 0.3, type: 'spring' }}
              className={`absolute ${d.position} z-20`}
            >
              <div className="comic-balloon comic-balloon-tail-bottom p-3 sm:p-4">
                <span className="text-[10px] font-bold text-red-700 block uppercase font-mono mb-0.5">
                  {d.speaker}:
                </span>
                <p className="text-xs sm:text-sm font-black text-slate-900 font-comic leading-tight">
                  {d.text}
                </p>
              </div>
            </motion.div>
          ))}

          {/* SFX BADGE */}
          {current.sfx && (
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: -5 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute bottom-[20%] right-[8%] sm:right-[15%] comic-sfx px-3.5 py-1.5 rounded-xl text-xs sm:text-sm z-20 font-comic shadow-2xl"
            >
              {current.sfx}
            </motion.div>
          )}

          {/* FINAL SCENE DIPLOMA & WHATSAPP BUTTON (VIÑETA 10) */}
          {current.isFinal && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-20 inset-x-4 max-w-lg mx-auto z-20 flex flex-col items-center gap-2"
            >
              <button
                onClick={handleShareWhatsApp}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-black font-black text-xs sm:text-sm transition-all border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Mandar felicitación por WhatsApp 🦉</span>
              </button>
            </motion.div>
          )}
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
