import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HashtagInputForm } from './components/HashtagInputForm';
import { HashtagResultsView } from './components/HashtagResultsView';
import { SingleHashtagAnalyzer } from './components/SingleHashtagAnalyzer';
import { SavedSetsManager } from './components/SavedSetsManager';
import { GeneratorOptions, GenerationResult, Platform, SavedHashtagSet } from './types';
import { Sparkles, Hash, Zap, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { AdBanner } from './components/AdBanner';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { SEOContent } from './components/SEOContent';

export default function App() {
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [lastPlatform, setLastPlatform] = useState<Platform>('instagram');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'privacy'>('home');

  // Modals state
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [analyzerInitialTag, setAnalyzerInitialTag] = useState('');
  const [showSavedManager, setShowSavedManager] = useState(false);

  // Saved Sets in LocalStorage
  const [savedSets, setSavedSets] = useState<SavedHashtagSet[]>(() => {
    try {
      const item = localStorage.getItem('saved_hashtag_sets');
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('saved_hashtag_sets', JSON.stringify(savedSets));
    } catch (e) {
      console.error('Failed to save sets to LocalStorage:', e);
    }
  }, [savedSets]);

  const handleGenerate = async (options: GeneratorOptions) => {
    setIsLoading(true);
    setError(null);
    setLastPlatform(options.platform);

    try {
      const response = await fetch('/api/generate-hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal menghasilkan hashtag dari server.');
      }

      const data: GenerationResult = await response.json();
      setResult(data);

      // Smooth scroll to results
      setTimeout(() => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan koneksi atau pengolahan data AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAnalyzerForTag = (tag: string) => {
    setAnalyzerInitialTag(tag);
    setShowAnalyzer(true);
  };

  const handleSaveSet = (newSet: SavedHashtagSet) => {
    setSavedSets((prev) => [newSet, ...prev]);
  };

  const handleDeleteSavedSet = (id: string) => {
    setSavedSets((prev) => prev.filter((s) => s.id !== id));
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white">
      {/* Header */}
      <Header
        savedCount={savedSets.length}
        onOpenSaved={() => setShowSavedManager(true)}
        onOpenAnalyzer={() => {
          setAnalyzerInitialTag('');
          setShowAnalyzer(true);
        }}
        onReset={handleReset}
      />

      {/* Main Container */}
      {currentView === 'home' ? (
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        {/* Top Ad Banner (Posisi A) */}
        <AdBanner className="mb-4" />
        {/* Error Notification */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-start gap-3 shadow-xs animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="font-bold text-sm">Gagal Mengenerate Hashtag</h4>
              <p className="text-xs text-rose-700 mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-500 hover:text-rose-700 text-xs font-semibold"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Generator Form */}
        <HashtagInputForm onGenerate={handleGenerate} isLoading={isLoading} />

        {/* Results View */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <HashtagResultsView
              result={result}
              platform={lastPlatform}
              onAnalyzeTag={handleOpenAnalyzerForTag}
              onSaveSet={handleSaveSet}
            />
          </div>
        )}

        {/* Bottom Ad Banner (Posisi C) */}
        <AdBanner className="mt-8 mb-4" />
        
        {/* SEO & FAQ Section */}
        <SEOContent />
      </main>
      ) : (
        <div className="flex-1 w-full">
          <PrivacyPolicy onBack={() => setCurrentView('home')} />
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm mt-auto">
         &copy; {new Date().getFullYear()} AI Hashtag Generator. <button onClick={() => { setCurrentView('privacy'); window.scrollTo(0,0); }} className="hover:text-indigo-600 underline">Kebijakan Privasi</button>
      </footer>

      {/* Single Hashtag Analyzer Modal */}
      {showAnalyzer && (
        <SingleHashtagAnalyzer
          initialTag={analyzerInitialTag}
          onClose={() => setShowAnalyzer(false)}
        />
      )}

      {/* Saved Sets Manager Modal */}
      {showSavedManager && (
        <SavedSetsManager
          savedSets={savedSets}
          onDeleteSet={handleDeleteSavedSet}
          onClose={() => setShowSavedManager(false)}
        />
      )}
    </div>
  );
}
