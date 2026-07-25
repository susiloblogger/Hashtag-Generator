import React from 'react';
import { PRESET_TOPICS, PresetTopic } from '../data/presets';
import { Utensils, Shirt, Compass, Dumbbell, TrendingUp, Smartphone, GraduationCap, Palette, Sparkles } from 'lucide-react';

interface PresetSelectorProps {
  onSelectPreset: (preset: PresetTopic) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ onSelectPreset }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-4 h-4 text-amber-500" />;
      case 'Shirt': return <Shirt className="w-4 h-4 text-pink-500" />;
      case 'Compass': return <Compass className="w-4 h-4 text-emerald-500" />;
      case 'Dumbbell': return <Dumbbell className="w-4 h-4 text-blue-500" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-violet-500" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4 text-indigo-500" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4 text-cyan-500" />;
      case 'Palette': return <Palette className="w-4 h-4 text-rose-500" />;
      default: return <Sparkles className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Inspirasi Cepat & Niche Populer
          </h3>
        </div>
        <span className="text-[11px] text-slate-400">Klik untuk isi otomatis</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PRESET_TOPICS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelectPreset(preset)}
            className="flex flex-col items-start p-3 bg-white hover:bg-indigo-50/50 border border-slate-200/90 hover:border-indigo-300 rounded-xl text-left transition-all group shadow-2xs hover:shadow-xs"
          >
            <div className="flex items-center gap-2 mb-1.5 w-full">
              <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-white transition-colors">
                {getIcon(preset.iconName)}
              </div>
              <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-900 truncate">
                {preset.name}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
              {preset.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
