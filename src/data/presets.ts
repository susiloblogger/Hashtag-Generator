import { Platform } from '../types';

export interface PresetTopic {
  id: string;
  name: string;
  iconName: string;
  description: string;
  prompt: string;
  niche: string;
  platform: Platform;
  sampleHashtags: string[];
}

export const PRESET_TOPICS: PresetTopic[] = [
  {
    id: 'kuliner-makanan',
    name: 'Kuliner & Foodie',
    iconName: 'Utensils',
    description: 'Resep masakan, kuliner lokal, resto review, cafe hopping, & jajanan pasar.',
    prompt: 'Rekomendasi cafe dan kuliner hits lokal, resep makanan enak, kuliner viral TikTok',
    niche: 'Kuliner & Makanan',
    platform: 'instagram',
    sampleHashtags: ['#KulinerIndonesia', '#ResepPraktis', '#FoodPornIndo', '#JajananViral', '#CafeHopping']
  },
  {
    id: 'fashion-ootd',
    name: 'Fashion & OOTD',
    iconName: 'Shirt',
    description: 'Inspirasi outfit harian, hijab style, streetwear, vintage, & fashion tips.',
    prompt: 'Inspirasi OOTD harian simpel dan kasual, style fashion kekinian, outfit kondangan',
    niche: 'Fashion & Beauty',
    platform: 'instagram',
    sampleHashtags: ['#OOTDIndonesia', '#HijabStyle', '#FashionKekinian', '#CasualLook', '#StyleInspiration']
  },
  {
    id: 'wisata-travel',
    name: 'Wisata & Travel',
    iconName: 'Compass',
    description: 'Spot liburan, hidden gem Bali/Jogja, backpacking, rekomendasi hotel & pantai.',
    prompt: 'Rekomendasi destinasi liburan hidden gem Indonesia, tempat wisata viral Bali Jogja',
    niche: 'Wisata & Travel',
    platform: 'tiktok',
    sampleHashtags: ['#WisataIndonesia', '#HiddenGemID', '#ExploreBali', '#TravelShorts', '#VacationVibes']
  },
  {
    id: 'fitness-workout',
    name: 'Gym & Fitness',
    iconName: 'Dumbbell',
    description: 'Workout routine, program diet sehat, kalori deficit, & transformasi fisik.',
    prompt: 'Tips workout pemula di rumah dan gym, resep makanan tinggi protein diet sehat',
    niche: 'Fitness & Kesehatan',
    platform: 'instagram',
    sampleHashtags: ['#FitIndo', '#WorkoutMotivation', '#DietSehat', '#GymLife', '#HidupSehat']
  },
  {
    id: 'bisnis-digital',
    name: 'Bisnis & Marketing',
    iconName: 'TrendingUp',
    description: 'Tips UMKM, ide jualan online, strategi branding, affiliate marketing & finansial.',
    prompt: 'Strategi pemasaran digital untuk bisnis online UMKM, cara jualan laris di medsos',
    niche: 'Bisnis & Finansial',
    platform: 'linkedin',
    sampleHashtags: ['#TipsBisnis', '#DigitalMarketingID', '#IdeJualan', '#UMKMNaikKelas', '#EnterpreneurID']
  },
  {
    id: 'tech-gadget',
    name: 'Teknologi & Gadget',
    iconName: 'Smartphone',
    description: 'Review smartphone, AI tools, tips produktivitas,setup desk & info game.',
    prompt: 'Review jujur smartphone terbaru, rekomendasi aplikasi AI produktivitas kerja',
    niche: 'Teknologi & Gadget',
    platform: 'youtube',
    sampleHashtags: ['#TechReview', '#GadgetIndonesia', '#AITools', '#SetupInspiration', '#RekomendasiHP']
  },
  {
    id: 'edukasi-karir',
    name: 'Edukasi & Karir',
    iconName: 'GraduationCap',
    description: 'Tips interview, pembuat CV, beasiswa, tips kuliah, & skill profesional.',
    prompt: 'Tips melamar kerja, pertanyaan interview paling sering ditanyakan, tips CV lulus ATS',
    niche: 'Edukasi & Karir',
    platform: 'linkedin',
    sampleHashtags: ['#TipsKarir', '#InfoBeasiswa', '#TipsInterview', '#PengembanganDiri', '#KerjaRemote']
  },
  {
    id: 'estetik-art',
    name: 'Kreatif & Seni',
    iconName: 'Palette',
    description: 'Fotografi hp, videografi cinematic, desain grafis, ilustrasi, & konten vlogging.',
    prompt: 'Tips mengambil foto estetik pakai kamera HP, tutorial edit video cinematic color grading',
    niche: 'Kreatif & Art',
    platform: 'tiktok',
    sampleHashtags: ['#FotografiHP', '#CinematicVideo', '#AestheticVlog', '#DesainGrafis', '#ContentCreator']
  }
];

export const POPULAR_NICHES = [
  'Kuliner & Makanan',
  'Fashion & Beauty',
  'Wisata & Travel',
  'Fitness & Kesehatan',
  'Bisnis & Finansial',
  'Teknologi & Gadget',
  'Edukasi & Karir',
  'Kreatif & Art',
  'E-Commerce & Online Shop',
  'Personal Branding',
  'Edukasi Parent & Family',
  'Otomotif & Motor',
  'Gaming & Esports',
  'Properti & Rumah',
  'Hiburan & Comedy',
  'Musik & Lifestyle'
];
