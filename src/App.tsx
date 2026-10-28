import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import type { AppConfig } from './types';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navbar } from './components/Navbar';
import { CountdownClock } from './components/CountdownClock';
import { BentoGrid } from './components/BentoGrid';
import { SurpriseModal } from './components/SurpriseModal';
import { SettingsModal } from './components/SettingsModal';

const DEFAULT_CONFIG: AppConfig = {
  sisterName: "Giualliana",
  // Default target date: 7 days in future if not set
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
        // Force update to Giualliana if old test name was Mariana
        if (parsed.sisterName === 'Mariana' || !parsed.sisterName) {
          parsed.sisterName = 'Giualliana';
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

  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Dynamic Interactive Stardust Particles */}
      <ParticleCanvas />

      {/* Atmospheric Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] bg-rose-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-32 left-1/4 w-[36rem] h-[36rem] bg-amber-500/10 rounded-full blur-[160px]" />
      </div>

      {/* Navigation */}
      <Navbar
        sisterName={config.sisterName}
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Hero Section & Countdown */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-8 pb-12 text-center max-w-5xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-bold tracking-widest uppercase text-amber-300 mb-6 border border-amber-400/30"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Cuenta Regresiva Oficial • Cambio de Década</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.05] mb-5 text-white"
        >
          Rumbo a los <span className="text-gold-gradient">40 Años</span>
        </motion.h1>

        {/* Dynamic Sister Name & Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-6"
        >
          Para <span className="text-white font-extrabold underline decoration-amber-400 decoration-2 underline-offset-4">{config.sisterName}</span>. {config.headlineCustom}
        </motion.p>

        {/* Luxury Monumental Countdown Clock */}
        <CountdownClock
          targetDate={config.targetDate}
          onZeroReached={() => setIsSurpriseOpen(true)}
        />
      </main>

      {/* Bento Grid & Humorous Survival Guide */}
      <BentoGrid sisterName={config.sisterName} />

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 border-t border-white/5 text-center flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-1.5 justify-center">
          <span>Diseñado con amor fraternal para</span>
          <span className="text-slate-300 font-bold">{config.sisterName}</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </div>
        <div>
          Al llegar a 0 se desbloquea automáticamente la sorpresa familiar
        </div>
      </footer>

      {/* Surprise Modal (The Climax - Only triggers automatically at 0) */}
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
