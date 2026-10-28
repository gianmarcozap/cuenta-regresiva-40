import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TimeLeft } from '../types';

interface CountdownClockProps {
  targetDate: string;
  onZeroReached: () => void;
}

export const CountdownClock: React.FC<CountdownClockProps> = ({
  targetDate,
  onZeroReached,
}) => {
  const calculateTime = (): TimeLeft => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMilliseconds: 0,
        isExpired: true,
      };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      totalMilliseconds: diff,
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTime();
      setTimeLeft(updated);
      if (updated.isExpired) {
        onZeroReached();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'DÍAS', value: timeLeft.days, rune: 'ᛞ', borderAccent: 'border-amber-500/30' },
    { label: 'HORAS', value: timeLeft.hours, rune: 'ᚺ', borderAccent: 'border-amber-500/30' },
    { label: 'MINUTOS', value: timeLeft.minutes, rune: 'ᛗ', borderAccent: 'border-amber-500/30' },
    { label: 'SEGUNDOS', value: timeLeft.seconds, rune: '⚡', borderAccent: 'border-amber-400/60', isSeconds: true },
  ];

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 my-auto">
      {/* 4 Cards Grid framed without vertical scroll */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
        {units.map((unit) => (
          <div
            key={unit.label}
            className={`group relative rounded-3xl p-4 sm:p-6 md:p-8 hogwarts-frame text-center overflow-hidden transition-all duration-500 hover:scale-[1.02] ${unit.borderAccent}`}
          >
            {/* Corner Decorative Filigree Elements (Harry Potter style) */}
            <div className="absolute top-2 left-2 text-[10px] text-amber-500/40 font-mono pointer-events-none select-none">
              ✦
            </div>
            <div className="absolute top-2 right-2 text-[10px] text-amber-500/40 font-mono pointer-events-none select-none">
              ✦
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] text-amber-500/40 font-mono pointer-events-none select-none">
              ✦
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] text-amber-500/40 font-mono pointer-events-none select-none">
              ✦
            </div>

            {/* Ambient magic aura */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#D3A625]/15 rounded-full blur-2xl group-hover:bg-[#D3A625]/25 transition-all pointer-events-none" />

            {/* Giant Digit Display */}
            <div className="relative z-10 flex items-center justify-center min-h-[70px] sm:min-h-[100px] md:min-h-[120px]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ opacity: 0, y: 15, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.94 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="font-mono text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black tracking-tight text-[#FFF4D0] drop-shadow-[0_4px_20px_rgba(211,166,37,0.4)]"
                >
                  {pad(unit.value)}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Rune & Label */}
            <div className="relative z-10 mt-2 sm:mt-3 flex items-center justify-center gap-1.5 sm:gap-2">
              <span className="text-amber-400/80 text-xs font-serif-magic">
                {unit.rune}
              </span>
              <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-[0.25em] text-[#D3A625] uppercase font-serif-magic">
                {unit.label}
              </span>
              <span className="text-amber-400/80 text-xs font-serif-magic">
                {unit.rune}
              </span>
            </div>

            {/* Subtle bottom gold enchanted line */}
            <div className="absolute bottom-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#D3A625]/60 to-transparent group-hover:via-[#FFD700] transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};
