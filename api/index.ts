import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();

app.use(express.json({ limit: '15mb' }));

// Helper to initialize Gemini client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing. Please set your Gemini API Key in Settings > Secrets.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Route: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// API Route: Generate Hashtags
app.post('/api/generate-hashtags', async (req, res) => {
  try {
    const {
      promptText,
      platform = 'instagram',
      niche = 'General',
      strategy = 'balanced',
      language = 'id',
      customBranding,
      image,
      count = 25,
    } = req.body;

    if (!promptText && !image) {
      return res.status(400).json({ error: 'Mohon masukkan topik, deskripsi, atau unggah gambar.' });
    }

    const ai = getGeminiClient();

    let systemInstruction = `Kamu adalah seorang Pakar Strategi Social Media Marketing dan Algo-Growth Strategist tingkat tinggi berpengalaman dalam optimasi tagar/hashtag di platform Instagram, TikTok, LinkedIn, Twitter/X, dan YouTube.
Tugas utama kamu adalah menghasilkan kumpulan hashtag yang sangat relevan, berkinerja tinggi, berpotensi viral, dan terukur berdasarkan input user.

Pedoman Strategi Hashtag:
1. 'balanced': Campuran seimbang antara popular (reach tinggi, 100k-1M+), niche (medium, 10k-100k), dan community/micro (<10k posts) untuk memaksimalkan distribusi algoritma tanpa kalah saing di tag berjejal.
2. 'high_reach': Fokus pada tagar populer & trending dengan volume postingan tinggi (>100k) untuk jangkauan cepat.
3. 'niche_focus': Fokus pada tagar spesifik niche & komunitas (10k-100k) dengan tingkat interaksi audiens tinggi.
4. 'low_competition': Fokus pada tagar micro & spesifik (<10k) dengan persaingan rendah untuk dominasi halaman pencarian.

Aturan Penting:
- Bahasa output: Gunakan bahasa Indonesia untuk penjelasan, tips, dan caption. Tagar dapat memadukan istilah Indonesia dan Inggris yang populer sesuai relevansi target.
- Semua tagar WAJIB diawali simbol '#' tanpa spasi atau karakter khusus ilegal.
- Setiap tagar harus diberikan perkiraan kategori ('popular', 'niche', 'community', 'trending', 'location_specific'), estimasi volume postingan (e.g., '500K+', '45K+', '8K+'), persaingan ('high', 'medium', 'low'), serta skor relevansi (0-100).
- Jika ada branding custom, sertakan variasi tagar branding tersebut.
- Buatkan juga 1 usulan caption konten kreatif & engaging yang relevan lengkap dengan penempatan tagar alami.
- Berikan tips optimasi platform spesifik yang praktis.`;

    const parts: any[] = [];

    let userPrompt = `Platform Target: ${platform.toUpperCase()}
Niche/Kategori: ${niche}
Strategi: ${strategy}
Bahasa Target: ${language === 'id' ? 'Bahasa Indonesia' : language === 'en' ? 'Bahasa Inggris' : 'Bilingual (Indonesia & Inggris)'}
Jumlah Hashtag Yang Diminta: ${count}
${customBranding ? `Custom Brand/Campaign Tag: #${customBranding.replace(/#/g, '')}` : ''}
${promptText ? `Detail Topik/Konten/Caption: "${promptText}"` : ''}`;

    if (image && image.data) {
      let base64Data = image.data;
      if (base64Data.includes(',')) {
        base64Data = base64Data.split(',')[1];
      }
      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: image.mimeType || 'image/jpeg',
        },
      });
      userPrompt += `\n[Gambar juga dilampirkan: Analisis elemen visual pada gambar ini (objek, suasana, warna, gaya, lokasi, makanan/fashion/item) dan hasilkan hashtag yang sangat pas sesuai isi gambar!]`;
    }

    parts.push({ text: userPrompt });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: { parts },
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hashtags: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  tag: { type: Type.STRING, description: 'Hashtag tag starting with #' },
                  category: { type: Type.STRING, description: 'One of: popular, niche, community, trending, location_specific' },
                  estimatedPosts: { type: Type.STRING, description: 'Estimated post volume e.g. 500K+, 25K+' },
                  relevanceScore: { type: Type.NUMBER, description: 'Relevance score from 0 to 100' },
                  competition: { type: Type.STRING, description: 'One of: high, medium, low' },
                  explanation: { type: Type.STRING, description: 'Brief reason why this hashtag is useful' },
                },
                required: ['tag', 'category', 'estimatedPosts', 'relevanceScore', 'competition'],
              },
            },
            captionSuggestion: { type: Type.STRING, description: 'Creative post caption suggestion with emojis' },
            summary: { type: Type.STRING, description: 'Brief strategy breakdown' },
            platformTips: {
              type: Type.OBJECT,
              properties: {
                recommendedCount: { type: Type.STRING, description: 'Recommended hashtag quantity e.g. 3-5 hashtags' },
                bestPostingTime: { type: Type.STRING, description: 'Ideal posting time range for this niche' },
                strategyNote: { type: Type.STRING, description: 'Key algorithm advice' },
                bestPractices: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Actionable best practice list'
                },
              },
              required: ['recommendedCount', 'bestPostingTime', 'strategyNote', 'bestPractices'],
            },
            suggestedNiches: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2-4 related sub-niches'
            }
          },
          required: ['hashtags', 'summary', 'platformTips'],
        },
      },
    });

    const rawText = response.text || '{}';
    const parsed = JSON.parse(rawText);

    res.json(parsed);
  } catch (error: any) {
    console.error('Error generating hashtags:', error);
    res.status(500).json({
      error: error.message || 'Gagal menghasilkan hashtag. Silakan coba lagi.',
    });
  }
});

// API Route: Single Hashtag Deep Analysis
app.post('/api/analyze-single-hashtag', async (req, res) => {
  try {
    const { tag } = req.body;
    if (!tag) {
      return res.status(400).json({ error: 'Mohon berikan hashtag yang ingin dianalisis.' });
    }

    const cleanTag = tag.startsWith('#') ? tag : `#${tag}`;
    const ai = getGeminiClient();

    const prompt = `Lakukan analisis mendalam terhadap hashtag "${cleanTag}". Berikan data estimasi volume postingan, tingkat persaingan, skor utilitas, platform terbaik untuk tagar ini, 8-10 hashtag terkait yang saling mendukung, deskripsi profil audiens target, 3 ide konten segar, dan pro tip penggunaannya.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Kamu adalah analis data media sosial expert. Berikan analisis akurat, praktis, dan dalam bahasa Indonesia yang mudah dipahami.',
        temperature: 0.6,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tag: { type: Type.STRING },
            estimatedVolume: { type: Type.STRING, description: 'Volume postingan misal 1.5M posts' },
            competitionLevel: { type: Type.STRING, description: 'high, medium, or low' },
            suitabilityScore: { type: Type.NUMBER, description: 'Nilai 0-100' },
            bestForPlatforms: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'e.g. ["instagram", "tiktok"]'
            },
            relatedHashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Hashtag relevan lainnya'
            },
            targetAudience: { type: Type.STRING, description: 'Karakteristik audiens' },
            contentIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Ide konten'
            },
            proTips: { type: Type.STRING, description: 'Saran profesional' }
          },
          required: ['tag', 'estimatedVolume', 'competitionLevel', 'suitabilityScore', 'bestForPlatforms', 'relatedHashtags', 'targetAudience', 'contentIdeas', 'proTips'],
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error analyzing hashtag:', error);
    res.status(500).json({ error: error.message || 'Gagal menganalisis hashtag.' });
  }
});

export default app;
