export type ThemeMode = 'obsidian' | 'solaris' | 'emerald' | 'monolith' | 'neura';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  bg: string;
  surface: string;
  surfaceHover: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  border: string;
  glow: string;
  cardBg: string;
  badgeBg: string;
  badgeText: string;
  lightColor: string;
  ambientColor: string;
  objectColor: string;
  wireframeColor: string;
}

export type TopicCategory =
  | 'technology'
  | 'science'
  | 'environment'
  | 'history'
  | 'business'
  | 'education'
  | 'culture'
  | 'social'
  | 'innovation'
  | 'future';

export interface StatisticItem {
  label: string;
  value: string;
  change?: string;
  description: string;
}

export interface FeatureCardItem {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  metric?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export interface GalleryItem {
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface TopicData {
  id: TopicCategory;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  ctaText: string;
  secondaryCtaText: string;
  objectType: 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'octahedron' | 'sphere';
  statistics: StatisticItem[];
  features: FeatureCardItem[];
  timeline: TimelineItem[];
  gallery: GalleryItem[];
}
