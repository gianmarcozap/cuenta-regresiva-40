import React from 'react';
import { Volume2, VolumeX, Settings2 } from 'lucide-react';
import { sound } from '../lib/audio';

interface NavbarProps {
  sisterName: string;
  isAudioOn: boolean;
  setIsAudioOn: (val: boolean) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  sisterName,
  isAudioOn,
  setIsAudioOn,
  onOpenSettings,
}) => {
  const handleToggleAudio = () => {
    const newState = sound.toggle();
    setIsAudioOn(newState);
  };

  return (
    <header className="relative z-20 w-full max-w-6xl mx-auto px-4 pt-6 pb-2">
      <nav className="glass-panel rounded-2xl px-4 py-3 flex items-center justify-between border border-white/10 shadow-2xl">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[1.5px] shadow-lg shadow-rose-500/20">
            <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center font-display font-black text-amber-300 text-sm tracking-wider">
              40
            </div>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                Edición Oficial
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-1.5 mt-0.5">
              <span>{sisterName}</span>
              <span className="text-slate-500 font-normal hidden sm:inline">• Rumbo al 4to Piso</span>
            </h2>
          </div>
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle */}
          <button
            onClick={handleToggleAudio}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
              isAudioOn
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
            }`}
            title="Activar/desactivar audio"
          >
            {isAudioOn ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline">Audio ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline">Audio</span>
              </>
            )}
          </button>

          {/* Settings modal trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
            title="Configurar fecha y video"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </header>
  );
};
