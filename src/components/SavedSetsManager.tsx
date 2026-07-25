import React, { useState } from 'react';
import { SavedHashtagSet } from '../types';
import { Bookmark, Copy, Check, Trash2, Download, Search, X, Layers, Instagram, Video, Linkedin, Twitter, Youtube } from 'lucide-react';

interface SavedSetsManagerProps {
  savedSets: SavedHashtagSet[];
  onDeleteSet: (id: string) => void;
  onClose: () => void;
}

export const SavedSetsManager: React.FC<SavedSetsManagerProps> = ({
  savedSets,
  onDeleteSet,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSetId, setCopiedSetId] = useState<string | null>(null);

  const filteredSets = savedSets.filter(
    (set) =>
      set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopySet = (set: SavedHashtagSet) => {
    navigator.clipboard.writeText(set.tags.join(' '));
    setCopiedSetId(set.id);
    setTimeout(() => setCopiedSetId(null), 2000);
  };

  const handleExportTxt = (set: SavedHashtagSet) => {
    const textContent = `KOLEKSI HASHTAG: ${set.title.toUpperCase()}
Platform: ${set.platform.toUpperCase()}
Dibuat: ${set.createdAt}
Total Tagar: ${set.tags.length}

TAGAR:
${set.tags.join(' ')}

CATATAN:
${set.notes || '-'}`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hashtag-${set.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-slate-100 my-8 space-y-5 animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 border border-indigo-100">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                Koleksi Hashtag Tersimpan
              </h3>
              <p className="text-xs text-slate-500">
                {savedSets.length} koleksi tersimpan di memori perangkat Anda.
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

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari koleksi berdasarkan judul atau tagar..."
            className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:border-indigo-500"
          />
        </div>

        {/* List of Saved Sets */}
        {filteredSets.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Bookmark className="w-8 h-8 mx-auto stroke-1 text-slate-300" />
            <p className="text-sm">Belum ada koleksi hashtag tersimpan.</p>
            <p className="text-xs text-slate-400">
              Generate hashtag baru lalu klik "Simpan Ke Koleksi".
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {filteredSets.map((set) => (
              <div
                key={set.id}
                className="p-4 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-2xl space-y-3 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {set.title}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">
                        {set.platform}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Disimpan pada {set.createdAt} • {set.tags.length} Tagar
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopySet(set)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs"
                    >
                      {copiedSetId === set.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleExportTxt(set)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 rounded-lg transition-colors"
                      title="Unduh file TXT"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDeleteSet(set.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Hapus Koleksi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Tags Tags */}
                <div className="p-2.5 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 font-mono line-clamp-3 leading-relaxed">
                  {set.tags.join(' ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
