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
    { label: 'DÍAS', value: timeLeft.days, color: 'from-amber-400 to-amber-600', glow: 'rgba(245, 158, 11, 0.25)' },
    { label: 'HORAS', value: timeLeft.hours, color: 'from-rose-400 to-rose-600', glow: 'rgba(244, 63, 94, 0.25)' },
    { label: 'MINUTOS', value: timeLeft.minutes, color: 'from-purple-400 to-purple-600', glow: 'rgba(192, 132, 252, 0.25)' },
    { label: 'SEGUNDOS', value: timeLeft.seconds, color: 'from-amber-300 to-rose-400', glow: 'rgba(251, 191, 36, 0.35)', isSeconds: true },
  ];

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="group relative rounded-3xl p-5 sm:p-7 glass-panel text-center overflow-hidden transition-all duration-500 hover:border-amber-400/40 hover:-translate-y-1.5"
            style={{
              boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 35px ${unit.glow}`,
            }}
          >
            {/* Ambient inner radial flare */}
            <div
              className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition-opacity"
              style={{ background: unit.glow }}
            />

            {/* Digit Container */}
            <div className="relative z-10 flex items-center justify-center min-h-[72px] sm:min-h-[100px]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="font-mono text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
                >
                  {pad(unit.value)}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Unit Label */}
            <div className="relative z-10 mt-3 flex items-center justify-center gap-1.5">
              {unit.isSeconds && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              )}
              <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-slate-300 uppercase">
                {unit.label}
              </span>
            </div>

            {/* Subtle bottom metallic accent line */}
            <div className="absolute bottom-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-amber-400/50 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};
