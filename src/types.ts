export type Platform = 'instagram' | 'tiktok' | 'linkedin' | 'twitter' | 'youtube' | 'all';

export type HashtagCategory = 'popular' | 'niche' | 'community' | 'trending' | 'location_specific';

export type CompetitionLevel = 'high' | 'medium' | 'low';

export interface HashtagItem {
  tag: string;
  category: HashtagCategory;
  estimatedPosts: string;
  relevanceScore: number; // 0-100
  competition: CompetitionLevel;
  explanation?: string;
}

export type StrategyType = 'balanced' | 'high_reach' | 'niche_focus' | 'low_competition';

export interface GeneratorOptions {
  promptText: string;
  platform: Platform;
  niche: string;
  strategy: StrategyType;
  language: 'id' | 'en' | 'bilingual';
  customBranding?: string;
  image?: {
    data: string; // Base64 without data URI prefix or with it
    mimeType: string;
  } | null;
  count: number;
}

export interface PlatformTips {
  recommendedCount: string;
  bestPostingTime: string;
  strategyNote: string;
  bestPractices: string[];
}

export interface GenerationResult {
  hashtags: HashtagItem[];
  captionSuggestion?: string;
  platformTips: PlatformTips;
  suggestedNiches?: string[];
  summary: string;
}

export interface SingleHashtagAnalysis {
  tag: string;
  estimatedVolume: string;
  competitionLevel: CompetitionLevel;
  suitabilityScore: number;
  bestForPlatforms: Platform[];
  relatedHashtags: string[];
  targetAudience: string;
  contentIdeas: string[];
  proTips: string;
}

export interface SavedHashtagSet {
  id: string;
  title: string;
  platform: Platform;
  createdAt: string;
  tags: string[];
  notes?: string;
  category?: string;
}
