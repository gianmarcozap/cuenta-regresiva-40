import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppConfig } from './types';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CountdownClock } from './components/CountdownClock';
import { ComicExperience } from './components/ComicExperience';
import { sound } from './lib/audio';

const DEFAULT_CONFIG: AppConfig = {
  sisterName: "Giulliana",
  targetDate: "2026-10-30T00:00:00",
  youtubeVideoId: "",
  directVideoUrl: "",
  headlineCustom: "Ni un Giratiempo puede detener este cumpleaños. ¡La verdadera magia de las cuatro décadas apenas comienza!",
  birthdayLetter: "Para mi hermana Giulliana:\n\n¡Felices 40 años! ⚡\n\nLlegaste a las cuatro décadas más fuerte, más sabia y con la mejor onda del mundo. Dicen que cumplir 40 asusta, pero la verdad es que te convertiste en la mejor versión de vos misma.\n\nGracias por todas las risas, por bancarme siempre, por ser mi compañera incondicional y por ponerle magia a toda la familia.\n\nNo importa cuántos años pasen: para mí siempre vas a ser mi hermana querida y la campeona de Gryffindor.\n\n¡Que este nuevo año te traiga todo lo que soñás y más!\n\nCon todo mi cariño,\nTu hermano.",
};

export default function App() {
  const [config] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('birthday_40_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.sisterName !== 'Giulliana') {
          parsed.sisterName = 'Giulliana';
        }
        parsed.targetDate = "2026-10-30T00:00:00";
        return parsed;
      } catch {
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  const [mode, setMode] = useState<'countdown' | 'comic'>('countdown');

  useEffect(() => {
    localStorage.setItem('birthday_40_config', JSON.stringify(config));
    
    // Auto-open comic if query param ?sorpresa=true is present
    const params = new URLSearchParams(window.location.search);
    if (params.get('sorpresa') === 'true') {
      setMode('comic');
    }

    // Always start sound on first interaction
    const handleFirstGesture = () => {
      sound.enabled = true;
      sound.playBgm();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('touchstart', handleFirstGesture);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, [config]);

  return (
    <div className="relative h-dvh w-screen overflow-hidden select-none bg-[#06040A] text-[#F3E5AB]">
      <AnimatePresence mode="wait">
        {mode === 'countdown' ? (
          /* ========================================================
             FULL SCREEN MOBILE-FIRST COUNTDOWN STAGE
             ======================================================== */
          <motion.div
            key="countdown-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-dvh w-screen overflow-hidden flex flex-col justify-between items-center px-4 py-4 sm:py-6"
          >
            {/* Illustrated Background Artwork */}
            <div 
              className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
              style={{ backgroundImage: `url('/images/arrival.jpg')` }}
            />
            <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-t from-[#06040A] via-[#06040A]/80 to-[#06040A]/95" />

            {/* Floating Hogwarts Candles & Sparks */}
            <ParticleCanvas />

            {/* TOP HEADER: PLATFORM 9 ¾ & TITLE */}
            <header className="relative z-10 w-full max-w-4xl mx-auto text-center shrink-0 pt-2 sm:pt-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#740001]/60 border-2 border-[#D3A625] text-[10px] sm:text-xs font-serif-magic tracking-widest uppercase text-[#FFD700] mb-2 shadow-2xl"
              >
                <span className="text-amber-400">⚡</span>
                <span>PLATAFORMA 9 ¾ • EXPRESO A LOS 40</span>
                <span className="text-amber-400">⚡</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-magic text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-1 sm:mb-2 gold-foil-text"
              >
                Rumbo a los 40 Años
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[#EADBB6] text-xs sm:text-base md:text-lg max-w-xl mx-auto font-parchment italic leading-snug px-2"
              >
                Para <span className="text-[#FFD700] font-black underline decoration-[#D3A625] decoration-2 underline-offset-4">{config.sisterName}</span>. {config.headlineCustom}
              </motion.p>
            </header>

            {/* CENTER: MASSIVE ENCHANTED COUNTDOWN */}
            <section className="relative z-10 w-full flex-1 flex items-center justify-center py-2 my-auto">
              <CountdownClock
                targetDate={config.targetDate}
                onZeroReached={() => setMode('comic')}
              />
            </section>

            {/* BOTTOM FOOTER */}
            <footer className="relative z-10 w-full max-w-4xl mx-auto text-center shrink-0 pb-1 sm:pb-2">
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-[#D3A625]/90 font-serif-magic tracking-wider uppercase">
                <span>⚡</span>
                <span>"Juro solemnemente que tengo 40 años bien vividos"</span>
                <span>⚡</span>
              </div>
              <p className="text-[10px] text-[#A89874] mt-0.5 font-parchment">
                Al llegar a 0 se desbloquea la historieta de caricatura automáticamente
              </p>
            </footer>
          </motion.div>
        ) : (
          /* ========================================================
             FULL SCREEN CARTOON COMIC EXPERIENCE
             ======================================================== */
          <ComicExperience
            key="comic-experience"
            sisterName={config.sisterName}
            birthdayLetter={config.birthdayLetter}
            onBackToCountdown={() => setMode('countdown')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
