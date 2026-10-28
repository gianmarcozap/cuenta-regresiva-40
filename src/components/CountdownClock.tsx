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
    { label: 'DÍAS', value: timeLeft.days, glow: 'rgba(245, 158, 11, 0.3)', textColor: 'text-amber-100' },
    { label: 'HORAS', value: timeLeft.hours, glow: 'rgba(244, 63, 94, 0.3)', textColor: 'text-rose-100' },
    { label: 'MINUTOS', value: timeLeft.minutes, glow: 'rgba(192, 132, 252, 0.3)', textColor: 'text-purple-100' },
    { label: 'SEGUNDOS', value: timeLeft.seconds, glow: 'rgba(251, 191, 36, 0.45)', textColor: 'text-amber-300', isSeconds: true },
  ];

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="w-full max-w-6xl mx-auto my-6 sm:my-10 px-2 sm:px-4">
      {/* MONUMENTAL COUNTDOWN GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="group relative rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 glass-panel text-center overflow-hidden transition-all duration-500 hover:border-amber-400/50 hover:scale-[1.02] border border-white/10"
            style={{
              boxShadow: `0 25px 60px rgba(0,0,0,0.6), 0 0 45px ${unit.glow}`,
            }}
          >
            {/* Ambient inner flare */}
            <div
              className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-50 group-hover:opacity-85 transition-opacity pointer-events-none"
              style={{ background: unit.glow }}
            />

            {/* Giant Digit Display */}
            <div className="relative z-10 flex items-center justify-center min-h-[90px] sm:min-h-[130px] md:min-h-[160px]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ opacity: 0, y: 20, scale: 0.93 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.93 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`font-mono text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] font-black tracking-tighter ${unit.textColor} drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]`}
                >
                  {pad(unit.value)}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Sub-label */}
            <div className="relative z-10 mt-3 sm:mt-5 flex items-center justify-center gap-2">
              {unit.isSeconds && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              )}
              <span className="text-xs sm:text-sm md:text-base font-black tracking-[0.25em] text-slate-300 uppercase">
                {unit.label}
              </span>
            </div>

            {/* Bottom Metallic Gradient Accent */}
            <div className="absolute bottom-0 inset-x-8 h-[3px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400/80 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};
