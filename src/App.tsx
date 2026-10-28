import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Settings2, Volume2, VolumeX } from 'lucide-react';
import type { AppConfig } from './types';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CountdownClock } from './components/CountdownClock';
import { BentoGrid } from './components/BentoGrid';
import { SurpriseModal } from './components/SurpriseModal';
import { SettingsModal } from './components/SettingsModal';
import { sound } from './lib/audio';

const DEFAULT_CONFIG: AppConfig = {
  sisterName: "Giulliana",
  // Default target date: 7 days in future if not configured
  targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
  youtubeVideoId: "",
  directVideoUrl: "",
  headlineCustom: "Que no cunda el pánico: los 40 son la década donde por fin sabés quién sos y mandás todo al diablo con elegancia.",
};

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('birthday_40_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Correct spelling to Giulliana
        if (parsed.sisterName !== 'Giulliana') {
          parsed.sisterName = 'Giulliana';
        }
        return parsed;
      } catch {
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('birthday_40_config', JSON.stringify(config));
  }, [config]);

  const handleToggleAudio = () => {
    const newState = sound.toggle();
    setIsAudioOn(newState);
  };

  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Dynamic Interactive Stardust Particles */}
      <ParticleCanvas />

      {/* Atmospheric Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[38rem] h-[38rem] bg-rose-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-32 left-1/4 w-[40rem] h-[40rem] bg-amber-500/10 rounded-full blur-[160px]" />
      </div>

      {/* Subtle Floating Corner Controls (Sin barra superior) */}
      <div className="fixed top-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={handleToggleAudio}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer opacity-40 hover:opacity-100"
          title={isAudioOn ? "Silenciar" : "Activar sonido"}
        >
          {isAudioOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setIsSettingsOpen(true);
          }}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer opacity-40 hover:opacity-100"
          title="Ajustar fecha y datos"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Section & Massive Countdown */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-16 sm:pt-24 pb-12 text-center max-w-6xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel text-xs sm:text-sm font-black tracking-widest uppercase text-amber-300 mb-6 border border-amber-400/30 shadow-lg"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Cuenta Regresiva Oficial • Cambio de Década</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[1.02] mb-4 text-white"
        >
          Rumbo a los <span className="text-gold-gradient">40 Años</span>
        </motion.h1>

        {/* Sister Name & Headline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-lg sm:text-2xl max-w-3xl mx-auto font-normal leading-relaxed mb-6"
        >
          Para <span className="text-white font-black underline decoration-amber-400 decoration-4 underline-offset-8">{config.sisterName}</span>. {config.headlineCustom}
        </motion.p>

        {/* Monumental Countdown Clock */}
        <CountdownClock
          targetDate={config.targetDate}
          onZeroReached={() => setIsSurpriseOpen(true)}
        />
      </main>

      {/* Bento Grid & Humorous Survival Guide */}
      <BentoGrid sisterName={config.sisterName} />

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 border-t border-white/5 text-center flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-1.5 justify-center">
          <span>Diseñado con amor fraternal para</span>
          <span className="text-slate-200 font-bold">{config.sisterName}</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </div>
        <div>
          Al llegar a 0 se desbloquea automáticamente la sorpresa familiar
        </div>
      </footer>

      {/* Surprise Modal (The Climax) */}
      <SurpriseModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        sisterName={config.sisterName}
        youtubeVideoId={config.youtubeVideoId}
        directVideoUrl={config.directVideoUrl}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
