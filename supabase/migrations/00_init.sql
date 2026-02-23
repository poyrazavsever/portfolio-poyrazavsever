-- Supabase Schema & RLS Policies for poyrazavsever.com
-- Created based on portfolio-obsidian requirements

-- 1. Authentication & Profiles
-- Using Supabase auth.users for authentication.
-- We will create a trigger to auto-create profiles.

CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin')),
  full_name   TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Trigger to create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- We default everyone to 'admin' as requested by the user:
  -- "Auth kısmında sadece elle kullanıcı oluşturulabilecek ve onunla giriş yapılacak."
  -- "sadece ben ekleme yapacağım"
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'admin');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END $$;

-- 2. Projects & Products
CREATE TABLE IF NOT EXISTS public.projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  type            TEXT NOT NULL,
  title_tr        TEXT NOT NULL,
  title_en        TEXT NOT NULL,
  description_tr  TEXT,
  description_en  TEXT,
  category_tr     TEXT,
  category_en     TEXT,
  problem_tr      TEXT,
  problem_en      TEXT,
  solution_tr     TEXT,
  solution_en     TEXT,
  role_tr         TEXT,
  role_en         TEXT,
  design_process_tr   TEXT,
  design_process_en   TEXT,
  technical_details_tr TEXT,
  technical_details_en TEXT,
  lessons_learned_tr   TEXT,
  lessons_learned_en   TEXT,
  features        JSONB DEFAULT '[]',
  tags            TEXT[] DEFAULT '{}',
  gallery_images  TEXT[] DEFAULT '{}',
  mermaid         TEXT,
  cover_image     TEXT,
  year            TEXT,
  demo_url        TEXT,
  repo_url        TEXT,
  case_study_url  TEXT,
  is_premium      BOOLEAN DEFAULT false,
  price           DECIMAL(10,2),
  figma_url       TEXT,
  screens_count   INT,
  components_count INT,
  sort_order      INT DEFAULT 0,
  is_published    BOOLEAN DEFAULT true,
  featured        BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- 3. Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  title_tr        TEXT NOT NULL,
  title_en        TEXT NOT NULL,
  excerpt_tr      TEXT,
  excerpt_en      TEXT,
  content_tr      TEXT,
  content_en      TEXT,
  category        TEXT,
  cover_image     TEXT,
  read_time_min   INT,
  tags            TEXT[] DEFAULT '{}',
  is_published    BOOLEAN DEFAULT false,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- 4. Media (Episodes)
CREATE TABLE IF NOT EXISTS public.episodes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  series          TEXT NOT NULL,
  episode_number  INT NOT NULL,
  season          INT DEFAULT 1,
  title_tr        TEXT NOT NULL,
  title_en        TEXT NOT NULL,
  description_tr  TEXT,
  description_en  TEXT,
  content_tr      TEXT,
  content_en      TEXT,
  guest_name      TEXT,
  guest_role      TEXT,
  guest_image     TEXT,
  date            TEXT NOT NULL,
  time            TEXT,
  duration        TEXT,
  topics          TEXT[] DEFAULT '{}',
  youtube_url     TEXT,
  spotify_url     TEXT,
  is_upcoming     BOOLEAN DEFAULT false,
  is_published    BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE (series, episode_number, season)
);

-- 5. Social Hub
CREATE TABLE IF NOT EXISTS public.social_videos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform        TEXT NOT NULL,
  title           TEXT,
  caption         TEXT,
  external_id     TEXT,
  thumbnail_url   TEXT,
  video_url       TEXT,
  likes_count     TEXT,
  comments_count  TEXT,
  views_count     TEXT,
  duration        TEXT,
  published_at    TEXT,
  sort_order      INT DEFAULT 0,
  is_published    BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- 6. Career Items
CREATE TABLE IF NOT EXISTS public.career_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type            TEXT NOT NULL,
  role_tr         TEXT NOT NULL,
  role_en         TEXT NOT NULL,
  company_tr      TEXT NOT NULL,
  company_en      TEXT NOT NULL,
  location_tr     TEXT,
  location_en     TEXT,
  date_tr         TEXT NOT NULL,
  date_en         TEXT NOT NULL,
  employment_type_tr TEXT,
  employment_type_en TEXT,
  description_tr  JSONB DEFAULT '[]',
  description_en  JSONB DEFAULT '[]',
  skills          TEXT[] DEFAULT '{}',
  sort_order      INT DEFAULT 0,
  is_published    BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- 7. Certifications
CREATE TABLE IF NOT EXISTS public.certifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_tr        TEXT NOT NULL,
  title_en        TEXT NOT NULL,
  organization_tr TEXT NOT NULL,
  organization_en TEXT NOT NULL,
  issue_date_tr   TEXT,
  issue_date_en   TEXT,
  credential_id   TEXT,
  link            TEXT,
  image           TEXT,
  tags            TEXT[] DEFAULT '{}',
  sort_order      INT DEFAULT 0,
  is_published    BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- 8. Reading List
CREATE TABLE IF NOT EXISTS public.reading_list (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type            TEXT NOT NULL,
  title_tr        TEXT NOT NULL,
  title_en        TEXT NOT NULL,
  author_tr       TEXT NOT NULL,
  author_en       TEXT NOT NULL,
  category_tr     TEXT,
  category_en     TEXT,
  platform        TEXT,
  image           TEXT,
  link            TEXT,
  status          TEXT DEFAULT 'queue',
  sort_order      INT DEFAULT 0,
  is_published    BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_list ENABLE ROW LEVEL SECURITY;

-- Helper Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- PROFILES: Admins can do everything. Users can read their own profile.
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update everyone." ON public.profiles FOR ALL USING (public.is_admin());

-- For all content tables:
-- 1. Public can read where is_published = true
-- 2. Authenticated Admin can perform ALL actions (SELECT all, INSERT, UPDATE, DELETE)

-- PROJECTS
CREATE POLICY "Public read published projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL USING (public.is_admin());

-- BLOG POSTS
CREATE POLICY "Public read published blog_posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access blog_posts" ON public.blog_posts FOR ALL USING (public.is_admin());

-- EPISODES
CREATE POLICY "Public read published episodes" ON public.episodes FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access episodes" ON public.episodes FOR ALL USING (public.is_admin());

-- SOCIAL VIDEOS
CREATE POLICY "Public read published social_videos" ON public.social_videos FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access social_videos" ON public.social_videos FOR ALL USING (public.is_admin());

-- CAREER ITEMS
CREATE POLICY "Public read published career_items" ON public.career_items FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access career_items" ON public.career_items FOR ALL USING (public.is_admin());

-- CERTIFICATIONS
CREATE POLICY "Public read published certifications" ON public.certifications FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access certifications" ON public.certifications FOR ALL USING (public.is_admin());

-- READING LIST
CREATE POLICY "Public read published reading_list" ON public.reading_list FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access reading_list" ON public.reading_list FOR ALL USING (public.is_admin());

-- ==========================================
-- STORAGE BUCKETS (If needed later)
-- ==========================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true) ON CONFLICT DO NOTHING;
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');
-- CREATE POLICY "Admin Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-images' AND public.is_admin());
-- CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-images' AND public.is_admin());
-- CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-images' AND public.is_admin());
