import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Volume2, VolumeX, BookOpen } from 'lucide-react';
import type { AppConfig } from './types';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CountdownClock } from './components/CountdownClock';
import { ComicExperience } from './components/ComicExperience';
import { SettingsModal } from './components/SettingsModal';
import { sound } from './lib/audio';

const DEFAULT_CONFIG: AppConfig = {
  sisterName: "Giulliana",
  targetDate: "2026-10-30T00:00:00",
  youtubeVideoId: "",
  directVideoUrl: "",
  headlineCustom: "Ni un Giratiempo puede detener este cumpleaños. ¡La verdadera magia de las cuatro décadas apenas comienza!",
};

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => {
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
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('birthday_40_config', JSON.stringify(config));
    // Auto-open comic if query param ?sorpresa=true is present
    const params = new URLSearchParams(window.location.search);
    if (params.get('sorpresa') === 'true') {
      setMode('comic');
    }
  }, [config]);

  const handleToggleAudio = () => {
    const newState = sound.toggle();
    setIsAudioOn(newState);
  };

  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none bg-[#06040A] text-[#F3E5AB]">
      <AnimatePresence mode="wait">
        {mode === 'countdown' ? (
          /* ========================================================
             FULL SCREEN COUNTDOWN STAGE (Over Cartoon Scene)
             ======================================================== */
          <motion.div
            key="countdown-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-screen w-screen overflow-hidden flex flex-col justify-between items-center"
          >
            {/* Illustrated Background Artwork */}
            <div 
              className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
              style={{ backgroundImage: `url('/images/arrival.jpg')` }}
            />
            <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-t from-[#06040A] via-[#06040A]/80 to-[#06040A]/95" />

            {/* Floating Hogwarts Candles & Sparks */}
            <ParticleCanvas />

            {/* Corner Controls */}
            <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
              {/* Comic Button to test/view the story */}
              <button
                onClick={() => {
                  sound.playClick();
                  setMode('comic');
                }}
                className="comic-narration-box px-3.5 py-2 rounded-xl text-black font-black text-xs font-comic flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[3px_3px_0px_#000]"
                title="Leer la historieta completa de Giulliana"
              >
                <BookOpen className="w-3.5 h-3.5 text-red-600" />
                <span>Leer Historieta ⚡</span>
              </button>

              {/* Sound Toggle */}
              <button
                onClick={handleToggleAudio}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border-2 border-black text-[#FFDE00] transition-all cursor-pointer shadow-[3px_3px_0px_#000]"
                title={isAudioOn ? "Silenciar" : "Activar melodía mágica"}
              >
                {isAudioOn ? <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Settings Toggle */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsSettingsOpen(true);
                }}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border-2 border-black text-white transition-all cursor-pointer shadow-[3px_3px_0px_#000]"
                title="Ajustar fecha y video"
              >
                <Settings2 className="w-4 h-4" />
              </button>
            </div>

            {/* TOP HEADER: PLATFORM 9 ¾ & TITLE */}
            <header className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-6 sm:pt-8 text-center shrink-0">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#740001]/60 border-2 border-[#D3A625] text-xs sm:text-sm font-serif-magic tracking-widest uppercase text-[#FFD700] mb-3 shadow-2xl"
              >
                <span className="text-amber-400">⚡</span>
                <span>PLATAFORMA 9 ¾ • EXPRESO A LOS 40</span>
                <span className="text-amber-400">⚡</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-magic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] mb-2 gold-foil-text"
              >
                Rumbo a los 40 Años
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#EADBB6] text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-parchment italic leading-snug"
              >
                Para <span className="text-[#FFD700] font-black underline decoration-[#D3A625] decoration-2 underline-offset-4">{config.sisterName}</span>. {config.headlineCustom}
              </motion.p>
            </header>

            {/* CENTER: MASSIVE ENCHANTED COUNTDOWN */}
            <section className="relative z-10 w-full flex-1 flex items-center justify-center px-4 py-2 my-auto">
              <CountdownClock
                targetDate={config.targetDate}
                onZeroReached={() => setMode('comic')}
              />
            </section>

            {/* BOTTOM FOOTER */}
            <footer className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-4 sm:pb-6 text-center shrink-0">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#D3A625]/90 font-serif-magic tracking-wider uppercase">
                <span>⚡</span>
                <span>"Juro solemnemente que tengo 40 años bien vividos"</span>
                <span>⚡</span>
              </div>
              <p className="text-[11px] text-[#A89874] mt-1 font-parchment">
                Al llegar a 0 se desbloquea la historieta de caricatura a pantalla completa
              </p>
            </footer>
          </motion.div>
        ) : (
          /* ========================================================
             FULL SCREEN CARTOON COMIC EXPERIENCE (No modal frame)
             ======================================================== */
          <ComicExperience
            key="comic-experience"
            sisterName={config.sisterName}
            onBackToCountdown={() => setMode('countdown')}
          />
        )}
      </AnimatePresence>

      {/* Settings Modal (Solo para configurar fecha y video) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
