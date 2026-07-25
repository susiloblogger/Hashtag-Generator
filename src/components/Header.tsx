import React from 'react';
import { Hash, Sparkles, Bookmark, Zap, RefreshCw } from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenAnalyzer: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenSaved,
  onOpenAnalyzer,
  onReset,
}) => {
  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shrink-0">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-2 overflow-x-hidden">
        {/* Brand Logo */}
        <div 
          onClick={onReset} 
          className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200 group-hover:bg-indigo-700 transition-all">
            <span className="text-white font-black text-base sm:text-lg">#</span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                Tagar<span className="text-indigo-600">AI</span>
              </span>
              <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-indigo-500" /> Pro
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Generator & Analisis Tagar Cerdas
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={onOpenAnalyzer}
            className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:px-3.5 sm:py-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-full transition-colors cursor-pointer"
            title="Analisis Hashtag Spesifik"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
            <span className="hidden sm:inline sm:ml-1.5">Cek Hashtag</span>
          </button>

          <button
            onClick={onOpenSaved}
            className="relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-full transition-all cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-indigo-600 fill-indigo-100 shrink-0" />
            <span>Koleksi</span>
            {savedCount > 0 && (
              <span className="ml-0.5 bg-indigo-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded-full shrink-0">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onReset}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer shrink-0"
            title="Mulai Baru"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
