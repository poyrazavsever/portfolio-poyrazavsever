// Admin-specific types matching Supabase schema

export type ProjectType =
  | "portfolio"
  | "fullstack_case"
  | "design_case"
  | "product_saas"
  | "product_mobile"
  | "product_figma";

export interface AdminProject {
  id: string;
  slug: string;
  type: ProjectType;

  // Core (i18n)
  title_tr: string;
  title_en: string;
  description_tr?: string;
  description_en?: string;
  category_tr?: string;
  category_en?: string;

  // Detail (i18n)
  problem_tr?: string;
  problem_en?: string;
  solution_tr?: string;
  solution_en?: string;
  role_tr?: string;
  role_en?: string;
  design_process_tr?: string;
  design_process_en?: string;
  technical_details_tr?: string;
  technical_details_en?: string;
  lessons_learned_tr?: string;
  lessons_learned_en?: string;

  // Structured
  features?: string[];
  tags: string[];
  gallery_images?: string[];
  mermaid?: string;
  cover_image?: string;
  year?: string;

  // Links
  demo_url?: string;
  repo_url?: string;
  case_study_url?: string;

  // Product specific
  is_premium?: boolean;
  price?: number;

  // Figma specific
  figma_url?: string;
  screens_count?: number;
  components_count?: number;

  // Meta
  sort_order: number;
  is_published: boolean;
  featured: boolean;
  created_at: string;
}

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  portfolio: "Portfolio",
  fullstack_case: "Fullstack Case",
  design_case: "Design Case",
  product_saas: "SaaS",
  product_mobile: "Mobile",
  product_figma: "Figma",
};

// ── Blog ──

export type BlogCategory = "tech" | "design" | "engineering";

export interface AdminBlogPost {
  id: string;
  slug: string;

  title_tr: string;
  title_en: string;
  excerpt_tr?: string;
  excerpt_en?: string;
  content_tr?: string;
  content_en?: string;

  category?: BlogCategory;
  cover_image?: string;
  read_time_min?: number;
  tags: string[];

  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminBlogComment {
  id: string;
  post_id: string;
  post_title: string;
  user_name: string;
  user_avatar?: string;
  content: string;
  is_approved: boolean;
  created_at: string;
}

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  tech: "Teknoloji",
  design: "Tasarım",
  engineering: "Mühendislik",
};

// ── Media ──

export type EpisodeSeries = "masa_basi" | "yazilima_dair";

export interface AdminEpisode {
  id: string;
  series: EpisodeSeries;
  episode_number: number;
  season: number;

  title_tr: string;
  title_en: string;
  description_tr?: string;
  description_en?: string;
  content_tr?: string;
  content_en?: string;

  guest_name?: string;
  guest_role?: string;
  guest_image?: string;

  date: string;
  time?: string;
  duration?: string;
  topics: string[];

  youtube_url?: string;
  spotify_url?: string;

  is_upcoming: boolean;
  is_published: boolean;
  created_at: string;
}

export type SocialPlatform = "youtube" | "instagram";

export interface AdminSocialVideo {
  id: string;
  platform: SocialPlatform;

  title?: string;
  caption?: string;
  external_id?: string;
  thumbnail_url?: string;
  video_url?: string;

  likes_count?: string;
  comments_count?: string;
  views_count?: string;
  duration?: string;
  published_at?: string;

  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export const SERIES_LABELS: Record<EpisodeSeries, string> = {
  masa_basi: "Masa Başı",
  yazilima_dair: "Yazılıma Dair",
};

export const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
};

export const SOCIAL_LIMITS: Record<SocialPlatform, number> = {
  instagram: 4,
  youtube: 3,
};

// ── Career ──

export type CareerItemType = "work" | "volunteer" | "education";

export interface AdminCareerItem {
  id: string;
  type: CareerItemType;

  // Core (i18n)
  role_tr: string;
  role_en: string;
  company_tr: string;
  company_en: string;
  location_tr?: string;
  location_en?: string;
  date_tr: string; // e.g. "Haziran 2021 - Günümüz"
  date_en: string; // e.g. "June 2021 - Present"

  // Detailed
  description_tr?: string[];
  description_en?: string[];
  skills?: string[];

  // Display
  employment_type_tr?: string; // e.g. "Tam Zamanlı"
  employment_type_en?: string; // e.g. "Full-time"

  // Meta
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export const CAREER_ITEM_TYPE_LABELS: Record<CareerItemType, string> = {
  work: "İş Tecrübesi",
  volunteer: "Gönüllü",
  education: "Eğitim",
};

// ── Certifications ──

export interface AdminCertification {
  id: string;

  // Core (i18n)
  title_tr: string;
  title_en: string;
  organization_tr: string;
  organization_en: string;
  issue_date_tr: string; // e.g. "Haziran 2023"
  issue_date_en: string; // e.g. "June 2023"

  // Structured
  credential_id?: string;
  link?: string;
  image?: string;
  tags: string[];

  // Meta
  sort_order: number;
  is_published: boolean;
  created_at: string;
}
