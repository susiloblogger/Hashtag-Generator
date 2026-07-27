import React, { useState, useRef, useEffect } from 'react';
import { GeneratorOptions, Platform, StrategyType } from '../types';
import { POPULAR_NICHES, PresetTopic } from '../data/presets';
import { PresetSelector } from './PresetSelector';
import { 
  Sparkles, 
  Image as ImageIcon, 
  X, 
  Upload, 
  Sliders, 
  Globe, 
  Tag, 
  Instagram, 
  Video, 
  Linkedin, 
  Twitter, 
  Youtube,
  Layers,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface HashtagInputFormProps {
  onGenerate: (options: GeneratorOptions) => void;
  isLoading: boolean;
}

export const HashtagInputForm: React.FC<HashtagInputFormProps> = ({
  onGenerate,
  isLoading,
}) => {
  const [promptText, setPromptText] = useState('');
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [niche, setNiche] = useState('Kuliner & Makanan');
  const [strategy, setStrategy] = useState<StrategyType>('balanced');
  const [language, setLanguage] = useState<'id' | 'en' | 'bilingual'>('id');
  const [customBranding, setCustomBranding] = useState('');
  const [count, setCount] = useState(25);
  const [image, setImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPresets, setShowPresets] = useState(true);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran gambar terlalu besar. Maksimal 10MB.');
      return;
    }

    setSelectedPresetId(null);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage({
          data: reader.result,
          mimeType: file.type || 'image/jpeg',
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectPreset = (preset: PresetTopic) => {
    setPromptText(preset.prompt);
    setNiche(preset.niche);
    setPlatform(preset.platform);
    setSelectedPresetId(preset.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() && !image) {
      alert('Mohon tulis topik/deskripsi atau unggah foto terlebih dahulu.');
      return;
    }

    onGenerate({
      promptText,
      platform,
      niche,
      strategy,
      language,
      customBranding: customBranding.trim() ? customBranding : undefined,
      image,
      count,
    });
  };

  const platformsList: { id: Platform; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'instagram', label: 'Instagram', icon: <Instagram className="w-4 h-4" />, color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' },
    { id: 'tiktok', label: 'TikTok', icon: <Video className="w-4 h-4" />, color: 'bg-black text-white' },
    { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, color: 'bg-blue-600 text-white' },
    { id: 'twitter', label: 'Twitter / X', icon: <Twitter className="w-4 h-4" />, color: 'bg-slate-900 text-white' },
    { id: 'youtube', label: 'YouTube Shorts', icon: <Youtube className="w-4 h-4" />, color: 'bg-red-600 text-white' },
    { id: 'all', label: 'Semua Platform', icon: <Layers className="w-4 h-4" />, color: 'bg-indigo-600 text-white' },
  ];

  const webmcpSchema = {
    tools: [
      {
        name: "generate_hashtags",
        description: "Generate optimized hashtags based on topic, niche, platform, and strategy.",
        schema: {
          type: "object",
          properties: {
            promptText: { type: "string", description: "The main topic or keywords for the hashtags" },
            platform: { type: "string", enum: ["instagram", "tiktok", "linkedin", "twitter", "youtube", "all"], description: "Target social media platform" },
            niche: { type: "string", description: "Industry or content niche (e.g. Kuliner & Makanan, Fashion & Beauty)" },
            strategy: { type: "string", enum: ["balanced", "high_reach", "niche_focus", "low_competition"], description: "Hashtag balancing strategy" },
            language: { type: "string", enum: ["id", "en", "bilingual"], description: "Hashtag language" },
            count: { type: "integer", minimum: 10, maximum: 30, description: "Number of hashtags to generate" },
            customBranding: { type: "string", description: "Optional custom branding tag to include" }
          },
          required: ["promptText"]
        }
      }
    ]
  };

  useEffect(() => {
    // Imperative WebMCP tool registration
    const nav = window.navigator as any;
    if (nav.modelContext?.registerTool) {
      try {
        nav.modelContext.registerTool(webmcpSchema.tools[0]);
      } catch (e) {
        console.warn("Failed to register WebMCP tool", e);
      }
    }
  }, []);

  const strategiesList: { id: StrategyType; title: string; desc: string }[] = [
    {
      id: 'balanced',
      title: 'Campuran Seimbang',
      desc: 'Kombinasi optimal tagar populer, niche, dan mikro untuk jangkauan algoritma terbaik.',
    },
    {
      id: 'high_reach',
      title: 'High Reach / Viral',
      desc: 'Dominasi tagar besar (>100K) untuk impresi maksimal cepat.',
    },
    {
      id: 'niche_focus',
      title: 'Fokus Komunitas',
      desc: 'Tagar spesifik target audiens (10K - 100K) tingkat interaksi tinggi.',
    },
    {
      id: 'low_competition',
      title: 'Kompetisi Rendah',
      desc: 'Tagar mikro (<10K) mudah masuk daftar pencarian teratas.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-6">
      <script
        type="application/webmcp+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webmcpSchema) }}
      />
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Buat Hashtag Baru
          </h2>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
            Generator Tagar Relevan & Potential Viral
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{showPresets ? 'Sembunyikan Preset' : 'Tampilkan Preset Niche'}</span>
        </button>
      </div>

      {/* Preset Topics Section */}
      {showPresets && (
        <PresetSelector 
          onSelectPreset={handleSelectPreset} 
          activePresetId={selectedPresetId}
        />
      )}

      <form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        {...{ toolname: "generate_hashtags", tooldescription: "Generate optimized hashtags for social media content", toolautosubmit: "true" }}
      >
        {/* Platform Selector Tabs */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2.5">
            1. Platform Focus
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {platformsList.map((p) => {
              const isSelected = platform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPlatform(p.id);
                    setSelectedPresetId(null);
                  }}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all border cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-2xs font-bold'
                      : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {p.icon}
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Text & Image Upload Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Input Text */}
          <div className="lg:col-span-2 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
              2. Kata Kunci & Topik Konten
            </label>
            <div className="relative">
              <textarea
                value={promptText}
                onChange={(e) => {
                  setPromptText(e.target.value);
                  setSelectedPresetId(null);
                }}
                placeholder="e.g. coffee shop marketing, resep masakan simpel, fotografi HP, OOTD pantai Bali..."
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 min-h-[110px] resize-none shadow-inner placeholder:text-slate-600 transition-all outline-hidden"
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
              3. Unggah Foto Konten (Opsional)
            </label>
            <div className="h-[110px] sm:h-[118px] border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/70 hover:bg-indigo-50/30 rounded-xl flex flex-col items-center justify-center relative transition-all group overflow-hidden">
              {image ? (
                <div className="w-full h-full relative group">
                  <img
                    src={image.data}
                    alt="Preview Upload"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors shadow-md cursor-pointer"
                      title="Hapus Gambar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-full flex flex-col items-center justify-center p-3 text-center cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-indigo-600 group-hover:scale-105 transition-transform mb-1 shadow-2xs">
                    <Upload className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    Deteksi Gambar Otomatis
                  </span>
                  <span className="text-[10px] text-slate-600 mt-0.5">
                    Objek & suasana foto
                  </span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Strategy Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2.5">
            4. Strategi Penyeimbangan Tagar
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {strategiesList.map((s) => {
              const isSelected = strategy === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStrategy(s.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-medium shadow-2xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${isSelected ? 'text-indigo-700' : 'text-slate-800'}`}>
                      {s.title}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-700 leading-snug">
                    {s.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Options Row: Niche, Language, Custom Branding */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Niche */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              Niche Konten
            </label>
            <select
              aria-label="Niche Konten"
              value={niche}
              onChange={(e) => {
                setNiche(e.target.value);
                setSelectedPresetId(null);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-indigo-500"
            >
              {POPULAR_NICHES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Language Target */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              Bahasa Tagar
            </label>
            <select
              aria-label="Bahasa Tagar"
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-indigo-500"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="bilingual">Bilingual (Indo & Inggris)</option>
              <option value="en">Bahasa Inggris Global</option>
            </select>
          </div>

          {/* Custom Branding Tag */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-600" />
              Brand/Campaign Tag (Opsional)
            </label>
            <input
              type="text"
              value={customBranding}
              onChange={(e) => setCustomBranding(e.target.value)}
              placeholder="e.g. KopiEnakID"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-600 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Jumlah Tagar Target ({count} Hashtag)</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>

          {showAdvanced && (
            <div className="mt-3 p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                <span>Target Jumlah Hashtag Dihasilkan</span>
                <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  {count} Tagar
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="5"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>10 Tagar (Ringkas / TikTok)</span>
                <span>20 Tagar (Standar)</span>
                <span>30 Tagar (Maksimal Instagram)</span>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Memproses Strategi & Mengenerate Tagar AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Generate Hashtag Sekarang</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
