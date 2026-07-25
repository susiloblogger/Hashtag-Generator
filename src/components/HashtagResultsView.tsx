import React, { useState } from 'react';
import { GenerationResult, HashtagItem, Platform, HashtagCategory, SavedHashtagSet } from '../types';
import { 
  Check, 
  Copy, 
  Instagram, 
  Search, 
  Filter, 
  BookmarkPlus, 
  Sparkles, 
  Share2, 
  TrendingUp, 
  MessageSquareText, 
  Clock, 
  Lightbulb, 
  Zap,
  Tag
} from 'lucide-react';

interface HashtagResultsViewProps {
  result: GenerationResult;
  platform: Platform;
  onAnalyzeTag: (tag: string) => void;
  onSaveSet: (set: SavedHashtagSet) => void;
}

export const HashtagResultsView: React.FC<HashtagResultsViewProps> = ({
  result,
  platform,
  onAnalyzeTag,
  onSaveSet,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(
    result.hashtags.map((h) => h.tag)
  );
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [saveTitle, setSaveTitle] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Toggle selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const selectAll = () => {
    setSelectedTags(result.hashtags.map((h) => h.tag));
  };

  const deselectAll = () => {
    setSelectedTags([]);
  };

  // Filtered Hashtags
  const filteredHashtags = result.hashtags.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.explanation && item.explanation.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Copy helpers
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(label);
    setTimeout(() => setCopyStatus(null), 2500);
  };

  const copyAll = () => {
    const text = selectedTags.join(' ');
    handleCopy(text, 'Semua Tagar Disalin!');
  };

  const copyTop10 = () => {
    const top10 = result.hashtags.slice(0, 10).map((h) => h.tag).join(' ');
    handleCopy(top10, 'Top 10 Tagar Disalin!');
  };

  const copyInstagramFormat = () => {
    const text = `.\n.\n.\n.\n.\n${selectedTags.join(' ')}`;
    handleCopy(text, 'Format Instagram Disalin!');
  };

  const copyWithCaption = () => {
    if (!result.captionSuggestion) return;
    const text = `${result.captionSuggestion}\n\n${selectedTags.join(' ')}`;
    handleCopy(text, 'Caption & Tagar Disalin!');
  };

  const handleSaveSetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saveTitle.trim()) return;

    const newSet: SavedHashtagSet = {
      id: `set-${Date.now()}`,
      title: saveTitle.trim(),
      platform,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      tags: selectedTags,
      notes: result.summary,
    };

    onSaveSet(newSet);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowSaveModal(false);
      setSaveTitle('');
    }, 1500);
  };

  // Stats Breakdown
  const highCount = result.hashtags.filter((h) => h.competition === 'high').length;
  const medCount = result.hashtags.filter((h) => h.competition === 'medium').length;
  const lowCount = result.hashtags.filter((h) => h.competition === 'low').length;

  const getCategoryBadgeClass = (category: HashtagCategory) => {
    switch (category) {
      case 'popular':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'niche':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'community':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'trending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'location_specific':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getCompetitionClass = (competition: string) => {
    switch (competition) {
      case 'high':
        return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Metrics */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Hasil Rekomendasi
            </h2>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">
                Hashtag Siap Pakai
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                {result.hashtags.length} Tagar
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSaveModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-xl transition-all cursor-pointer"
            >
              <BookmarkPlus className="w-4 h-4 text-indigo-600" />
              <span>Simpan Set</span>
            </button>
          </div>
        </div>

        {/* Strategy Summary & Metrics Grid */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <Sparkles className="w-4 h-4 inline text-indigo-600 mr-1.5" />
          {result.summary}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total Tagar
            </span>
            <span className="text-lg font-bold text-slate-800">
              {result.hashtags.length} <span className="text-xs font-normal text-slate-500">Items</span>
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Jangkauan Tinggi (&gt;100K)
            </span>
            <span className="text-lg font-bold text-indigo-600">
              {highCount} <span className="text-xs font-normal text-slate-500">Populer</span>
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Fokus Niche (10K-100K)
            </span>
            <span className="text-lg font-bold text-amber-500">
              {medCount} <span className="text-xs font-normal text-slate-500">Komunitas</span>
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Kompetisi Rendah (&lt;10K)
            </span>
            <span className="text-lg font-bold text-emerald-600">
              {lowCount} <span className="text-xs font-normal text-slate-500">Mikro</span>
            </span>
          </div>
        </div>
      </div>

      {/* Copy Actions Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Copy className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-slate-200">
              Salin Tagar Terpilih ({selectedTags.length} dari {result.hashtags.length} dipilih)
            </span>
          </div>

          {copyStatus && (
            <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1.5 self-start sm:self-auto">
              <Check className="w-3.5 h-3.5" />
              <span>{copyStatus}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={copyAll}
            disabled={selectedTags.length === 0}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy All</span>
          </button>

          <button
            onClick={copyTop10}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Top 10 Only</span>
          </button>

          <button
            onClick={copyInstagramFormat}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>Format Instagram</span>
          </button>

          {result.captionSuggestion && (
            <button
              onClick={copyWithCaption}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquareText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Caption + Tagar</span>
            </button>
          )}

          <div className="ml-auto flex items-center gap-2 text-xs">
            <button
              onClick={selectAll}
              className="text-slate-400 hover:text-white underline text-[11px] cursor-pointer"
            >
              Pilih Semua
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={deselectAll}
              className="text-slate-400 hover:text-white underline text-[11px] cursor-pointer"
            >
              Hapus Pilihan
            </button>
          </div>
        </div>
      </div>

      {/* Main Hashtag Grid & Filter Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        {/* Category Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Daftar Tagar Dihasilkan
          </h2>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'Semua Kategori' },
              { id: 'popular', label: 'Populer' },
              { id: 'niche', label: 'Niche' },
              { id: 'community', label: 'Komunitas' },
              { id: 'trending', label: 'Trending' },
              { id: 'location_specific', label: 'Lokal' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tagar..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Interactive Grid of Hashtags (Sleek Theme Card Item) */}
        {filteredHashtags.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            Tidak ada hashtag yang sesuai dengan pencarian atau kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredHashtags.map((item) => {
              const isSelected = selectedTags.includes(item.tag);
              return (
                <div
                  key={item.tag}
                  className={`group bg-slate-50 p-3 rounded-lg border flex flex-col justify-between hover:bg-indigo-50 hover:border-indigo-100 cursor-pointer transition-all select-none ${
                    isSelected
                      ? 'border-indigo-300 bg-indigo-50/70'
                      : 'border-slate-100'
                  }`}
                  onClick={() => toggleTag(item.tag)}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-mono font-semibold text-indigo-600 group-hover:text-indigo-700">
                      {item.tag}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-400">
                      {item.estimatedPosts}
                    </span>
                  </div>

                  {item.explanation && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight mb-2">
                      {item.explanation}
                    </p>
                  )}

                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-2 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getCategoryBadgeClass(item.category)}`}>
                        {item.category}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getCompetitionClass(item.competition)}`}>
                        {item.competition}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.tag, `Tagar ${item.tag} Disalin`);
                        }}
                        className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                        title="Salin tagar ini"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAnalyzeTag(item.tag);
                        }}
                        className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                        title="Analisis tagar ini"
                      >
                        <Zap className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Caption Suggestion & Platform Optimization Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Caption Suggestion Box */}
        {result.captionSuggestion && (
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquareText className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Rekomendasi Caption Postingan AI
                  </h3>
                </div>
                <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                  Siap Pakai
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line">
                {result.captionSuggestion}
              </div>
            </div>

            <button
              onClick={copyWithCaption}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4 text-indigo-400" />
              <span>Salin Caption Lengkap + Tagar</span>
            </button>
          </div>
        )}

        {/* Platform Optimization Tips Card */}
        {result.platformTips && (
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Tips Optimasi Algoritma {platform.toUpperCase()}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-indigo-50/80 border border-indigo-100 rounded-xl flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-indigo-950 block">Jumlah & Waktu Posting Ideal:</span>
                  <p className="text-slate-700 text-xs mt-0.5">
                    Gunakan <strong>{result.platformTips.recommendedCount}</strong>. Waktu posting terbaik: <strong>{result.platformTips.bestPostingTime}</strong>.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 border border-amber-100 rounded-xl">
                <span className="font-bold text-amber-950 block">Strategi Algoritma:</span>
                <p className="text-slate-700 text-xs mt-0.5">
                  {result.platformTips.strategyNote}
                </p>
              </div>

              {result.platformTips.bestPractices && result.platformTips.bestPractices.length > 0 && (
                <div>
                  <span className="font-bold text-slate-800 text-xs block mb-1.5">
                    Checklist Praktis:
                  </span>
                  <ul className="space-y-1">
                    {result.platformTips.bestPractices.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Save Set Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookmarkPlus className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Simpan Koleksi Hashtag
                </h3>
              </div>
              <button
                onClick={() => setShowSaveModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Koleksi
                </label>
                <input
                  type="text"
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  placeholder="Misal: Tagar Kuliner Kopi Gula Aren"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                Akan menyimpan <strong>{selectedTags.length} tagar terpilih</strong> untuk platform <strong>{platform.toUpperCase()}</strong>.
              </div>

              {savedSuccess && (
                <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl text-center">
                  ✓ Berhasil Disimpan ke Koleksi!
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  Simpan Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
