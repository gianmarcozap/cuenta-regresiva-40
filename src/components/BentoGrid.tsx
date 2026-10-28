import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, BatteryCharging, HeartHandshake, SmilePlus, ChevronRight, ShieldAlert, Award } from 'lucide-react';
import { sound } from '../lib/audio';
import { fireQuickSparkle } from '../lib/confetti';

interface BentoGridProps {
  sisterName: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ sisterName }) => {
  const [activeTab20vs40, setActiveTab20vs40] = useState<'20' | '40'>('40');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const perks = [
    {
      age20: "Salir de fiesta un jueves y rendir un examen al otro día sin pestañear.",
      age40: "Dormir 8 horas de corrido sin despertarse con dolor lumbar es el verdadero orgasmo espiritual.",
      icon: BatteryCharging,
      title: "Energía & Recuperación"
    },
    {
      age20: "Preocuparte por la opinión de gente que ni siquiera te cae bien.",
      age40: "Tolerancia CERO al drama: decís 'no' sin dar explicaciones y te vas a regar las plantas en paz.",
      icon: ShieldAlert,
      title: "Paz Mental & Filtro"
    },
    {
      age20: "Tomar fernet o cerveza tibia en vaso de plástico cortado.",
      age40: "Cata de vinos, café de especialidad y quejarte si la copa no es de cristal fino.",
      icon: Wine,
      title: "Estándares Gastronómicos"
    }
  ];

  const handleCheer = (e: React.MouseEvent) => {
    sound.playClick();
    const rect = e.currentTarget.getBoundingClientRect();
    fireQuickSparkle((rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight);
    setToastMessage(`¡Brindis enviado para ${sisterName}! 🥂`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12 relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-amber-300 uppercase tracking-widest mb-3">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          Manual de Sobrevivencia Oficial
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
          Bienvenida al <span className="text-gold-gradient">Cuarto Piso</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          La ciencia confirma que los 40 no son una crisis, son la actualización de software más esperada.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1 (Span 2 cols): Interactive Comparison 20 vs 40 */}
        <div className="md:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Análisis Comparativo</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Evolución de la Especie</h3>
            </div>

            {/* Toggle Switch */}
            <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10 self-stretch sm:self-auto">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab20vs40('20');
                }}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab20vs40 === '20'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                A los 20s 🐥
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab20vs40('40');
                }}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab20vs40 === '40'
                    ? 'bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                A los 40s (Nivel Diosa) 👑
              </button>
            </div>
          </div>

          {/* Cards comparison list */}
          <div className="space-y-4 my-2">
            {perks.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-400/20 transition-all flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-amber-400/10 text-amber-300 shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{p.title}</div>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeTab20vs40}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className={`text-sm sm:text-base font-medium ${
                          activeTab20vs40 === '40' ? 'text-amber-100' : 'text-slate-300'
                        }`}
                      >
                        {activeTab20vs40 === '40' ? p.age40 : p.age20}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
            <span>Conclusión científica: Salís ganando por goleada.</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              Validado por la familia <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 2: High Resolution Festive Photo & Cheer Button */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B12] via-transparent to-transparent z-10" />

          {/* Curated Unsplash Celebration Image */}
          <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5">
            <img
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
              alt="Celebración dorada 40 años"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/80 backdrop-blur-md px-2 py-0.5 rounded-full text-slate-950">
                Momento Histórico
              </span>
              <p className="text-xs font-semibold mt-1">4 décadas iluminando a la familia</p>
            </div>
          </div>

          {/* Interactive Cheers Widget */}
          <div className="relative z-20 flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <span>¿Lista para brindar?</span>
                <Wine className="w-4 h-4 text-rose-400 animate-bounce" />
              </h4>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Hacé click para mandarle un choque de copas virtual con confeti en tiempo real.
              </p>
            </div>

            <div className="mt-5">
              <button
                onClick={handleCheer}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-extrabold text-sm transition-all shadow-xl shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <SmilePlus className="w-4 h-4" />
                <span>¡Brindar por sus 40! 🥂</span>
              </button>

              {toastMessage && (
                <div className="mt-2 text-center text-xs font-bold text-amber-300 animate-fade-in">
                  {toastMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 3: Fraternal Roast & Affection Quote */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 md:col-span-3 flex flex-col sm:flex-row items-center justify-between gap-6 border-amber-500/20 bg-gradient-to-r from-amber-500/[0.04] via-rose-500/[0.03] to-purple-500/[0.04]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 p-[2px] shrink-0 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#0E101B] rounded-[14px] flex items-center justify-center text-2xl">
                🎂
              </div>
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold tracking-widest text-amber-400">Pacto de Hermanos</div>
              <p className="text-slate-200 text-sm sm:text-base font-semibold mt-0.5 max-w-2xl">
                "Te molestamos con los 40 solo porque te amamos. Llegás a esta edad más sabia, más canchera y con la mejor familia del mundo bancándote."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-400">Firmado: Tu hermano que te quiere</span>
            <HeartHandshake className="w-4 h-4 text-rose-400" />
          </div>
        </div>

      </div>
    </section>
  );
};
