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
    <div className="w-full max-w-5xl mx-auto px-1 sm:px-4 my-auto">
      {/* Responsive Grid: 2 cols on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
        {units.map((unit) => (
          <div
            key={unit.label}
            className={`group relative rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 hogwarts-frame text-center overflow-hidden transition-all duration-300 ${unit.borderAccent}`}
          >
            {/* Ambient magic aura */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#D3A625]/15 rounded-full blur-xl pointer-events-none" />

            {/* Giant Digit Display */}
            <div className="relative z-10 flex items-center justify-center min-h-[50px] sm:min-h-[85px] md:min-h-[120px]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="font-mono text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#FFF4D0] drop-shadow-[0_4px_18px_rgba(211,166,37,0.35)]"
                >
                  {pad(unit.value)}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Rune & Label */}
            <div className="relative z-10 mt-1 sm:mt-2.5 flex items-center justify-center gap-1 sm:gap-2">
              <span className="text-amber-400/80 text-[10px] sm:text-xs font-serif-magic">
                {unit.rune}
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-[0.2em] text-[#D3A625] uppercase font-serif-magic">
                {unit.label}
              </span>
              <span className="text-amber-400/80 text-[10px] sm:text-xs font-serif-magic">
                {unit.rune}
              </span>
            </div>

            {/* Subtle bottom gold line */}
            <div className="absolute bottom-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-[#D3A625]/60 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
};
