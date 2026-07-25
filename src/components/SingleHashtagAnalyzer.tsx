import React, { useState } from 'react';
import { SingleHashtagAnalysis } from '../types';
import { Zap, Search, Copy, Check, Sparkles, TrendingUp, Users, Lightbulb, X, Layers } from 'lucide-react';

interface SingleHashtagAnalyzerProps {
  initialTag?: string;
  onClose: () => void;
}

export const SingleHashtagAnalyzer: React.FC<SingleHashtagAnalyzerProps> = ({
  initialTag = '',
  onClose,
}) => {
  const [tagInput, setTagInput] = useState(initialTag);
  const [analysis, setAnalysis] = useState<SingleHashtagAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!tagInput.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-single-hashtag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: tagInput.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Gagal menganalisis hashtag.');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menganalisis hashtag.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-slate-100 my-8 space-y-5 animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-50 rounded-xl text-amber-600 border border-amber-100">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                Analisis Mendalam Tagar Spesifik
              </h3>
              <p className="text-xs text-slate-500">
                Uji potensi jangkauan, kompetisi, dan hashtag terkait untuk tagar tertentu.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleAnalyze} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Ketik hashtag, contoh: #kulinerjakarta atau resepmasakan"
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            <span>Analisis</span>
          </button>
        </form>

        {error && (
          <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
            {error}
          </div>
        )}

        {/* Results Body */}
        {analysis && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            {/* Metric Header */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Tagar Analisis
                </span>
                <span className="text-base font-mono font-bold text-indigo-600">
                  {analysis.tag}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Estimasi Volume
                </span>
                <span className="text-base font-extrabold text-slate-900">
                  {analysis.estimatedVolume}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Skor Utilitas
                </span>
                <span className="text-base font-extrabold text-emerald-600">
                  {analysis.suitabilityScore} / 100
                </span>
              </div>
            </div>

            {/* Target Audience & Best Platforms */}
            <div className="space-y-3">
              <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>Karakteristik Audiens Target:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {analysis.targetAudience}
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/60 border border-amber-100 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Pro Tip Strategi:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {analysis.proTips}
                </p>
              </div>
            </div>

            {/* Related Hashtags */}
            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2">
                Hashtag Terkait & Komplementer:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.relatedHashtags.map((relTag) => (
                  <button
                    key={relTag}
                    onClick={() => handleCopyTag(relTag)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-indigo-100 text-slate-800 hover:text-indigo-900 border border-slate-200 rounded-lg text-xs font-medium transition-all"
                  >
                    <span>{relTag}</span>
                    {copiedTag === relTag ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Ideas */}
            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2">
                Ide Konten Yang Cocok:
              </span>
              <ul className="space-y-1.5">
                {analysis.contentIdeas.map((idea, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
