-- Portfolio Obsidian - Full Supabase Setup (one-shot)
-- Includes: tables, triggers, RLS policies, storage buckets and storage policies.
-- Safe to run multiple times (idempotent pattern with IF EXISTS / IF NOT EXISTS where possible).

-- =====================================================
-- 0) Extensions
-- =====================================================
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- =====================================================
-- 1) Helper Functions and Profile Bootstrap
-- =====================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin')),
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    'admin'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_trigger where tgname = 'on_auth_user_created'
  ) then
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
  end if;
end $$;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- =====================================================
-- 2) Core Content Tables
-- =====================================================

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  type text not null check (
    type in (
      'portfolio',
      'fullstack_case',
      'design_case',
      'product_saas',
      'product_mobile',
      'product_figma'
    )
  ),

  title_tr text not null,
  title_en text not null,
  description_tr text,
  description_en text,
  category_tr text,
  category_en text,
  problem_tr text,
  problem_en text,
  solution_tr text,
  solution_en text,
  role_tr text,
  role_en text,
  design_process_tr text,
  design_process_en text,
  technical_details_tr text,
  technical_details_en text,
  lessons_learned_tr text,
  lessons_learned_en text,

  features jsonb default '[]'::jsonb,
  tags text[] default '{}'::text[],
  gallery_images text[] default '{}'::text[],
  mermaid text,
  cover_image text,
  year text,

  demo_url text,
  repo_url text,
  case_study_url text,

  is_premium boolean default false,
  price numeric(10,2),
  figma_url text,
  screens_count integer,
  components_count integer,

  sort_order integer not null default 0,
  is_published boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.handle_updated_at();

-- Blog
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_tr text not null,
  title_en text not null,
  excerpt_tr text,
  excerpt_en text,
  content_tr text,
  content_en text,
  category text check (category in ('tech', 'design', 'engineering')),
  cover_image text,
  read_time_min integer default 0,
  tags text[] default '{}'::text[],
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.handle_updated_at();

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  post_title text not null,
  user_id uuid references auth.users(id) on delete set null,
  user_name text not null,
  user_avatar text,
  content text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.blog_likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc'::text, now()),
  unique (post_id, user_id)
);

-- Media
create table if not exists public.masa_basi_episodes (
  id uuid primary key default gen_random_uuid(),
  episode_number integer not null,
  season integer not null default 1,
  title_tr text not null,
  title_en text,
  description_tr text,
  description_en text,
  content_tr text,
  content_en text,
  guest_name text,
  guest_role text,
  guest_image text,
  date date not null,
  time text,
  duration text,
  topics text[] default '{}'::text[],
  youtube_url text,
  spotify_url text,
  is_upcoming boolean default false,
  is_published boolean default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (episode_number, season)
);

drop trigger if exists set_masa_basi_updated_at on public.masa_basi_episodes;
create trigger set_masa_basi_updated_at
before update on public.masa_basi_episodes
for each row execute function public.handle_updated_at();

create table if not exists public.yazilima_dair_episodes (
  id uuid primary key default gen_random_uuid(),
  episode_number integer not null,
  season integer not null default 1,
  title_tr text not null,
  title_en text,
  description_tr text,
  description_en text,
  content_tr text,
  content_en text,
  guest_name text,
  guest_role text,
  guest_image text,
  date date not null,
  time text,
  duration text,
  topics text[] default '{}'::text[],
  youtube_url text,
  spotify_url text,
  is_upcoming boolean default false,
  is_published boolean default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (episode_number, season)
);

drop trigger if exists set_yazilima_dair_updated_at on public.yazilima_dair_episodes;
create trigger set_yazilima_dair_updated_at
before update on public.yazilima_dair_episodes
for each row execute function public.handle_updated_at();

create table if not exists public.social_videos (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('youtube', 'instagram')),
  title text,
  caption text,
  external_id text,
  thumbnail_url text,
  video_url text,
  likes_count text,
  comments_count text,
  views_count text,
  duration text,
  published_at text,
  sort_order integer default 0,
  is_published boolean default true,
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- Career
do $$
begin
  if not exists (select 1 from pg_type where typname = 'career_item_type') then
    create type career_item_type as enum ('work', 'volunteer', 'education');
  end if;
end $$;

create table if not exists public.career_records (
  id uuid primary key default gen_random_uuid(),
  type career_item_type not null,
  role_tr text not null,
  role_en text not null,
  company_tr text not null,
  company_en text not null,
  location_tr text,
  location_en text,
  date_tr text not null,
  date_en text not null,
  description_tr text[],
  description_en text[],
  skills text[],
  employment_type_tr text,
  employment_type_en text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- Certifications
create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  title_tr text not null,
  title_en text not null,
  organization_tr text not null,
  organization_en text not null,
  issue_date_tr text not null,
  issue_date_en text not null,
  credential_id text,
  link text,
  image text,
  tags text[] default '{}'::text[],
  sort_order integer default 0,
  is_published boolean default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

drop trigger if exists set_certifications_updated_at on public.certifications;
create trigger set_certifications_updated_at
before update on public.certifications
for each row execute function public.handle_updated_at();

-- Reading List
create table if not exists public.reading_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('book', 'video')),
  status text not null check (status in ('read', 'reading', 'queue', 'watched', 'watching')),
  title_tr text not null,
  title_en text not null,
  author_tr text not null,
  author_en text not null,
  image text,
  link text,
  category_tr text,
  category_en text,
  platform text,
  sort_order integer default 0,
  is_published boolean default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

drop trigger if exists set_reading_items_updated_at on public.reading_items;
create trigger set_reading_items_updated_at
before update on public.reading_items
for each row execute function public.handle_updated_at();

-- Contact
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text not null check (topic in ('project', 'consulting', 'speaking', 'other')),
  date text,
  time text,
  message text not null,
  status text not null default 'unread' check (status in ('unread', 'read', 'replied')),
  created_at timestamptz not null default now()
);

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  title text not null,
  content_tr text not null,
  content_en text not null,
  avatar_url text,
  company_logo_url text,
  order_index integer default 0,
  is_published boolean default false,
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- =====================================================
-- 3) Useful Indexes
-- =====================================================
create index if not exists idx_projects_type on public.projects(type);
create index if not exists idx_projects_published on public.projects(is_published);
create index if not exists idx_blog_posts_published on public.blog_posts(is_published, published_at desc);
create index if not exists idx_blog_comments_post_id on public.blog_comments(post_id);
create index if not exists idx_blog_comments_approved on public.blog_comments(is_approved);
create index if not exists idx_blog_likes_post_id on public.blog_likes(post_id);
create index if not exists idx_social_videos_platform on public.social_videos(platform);
create index if not exists idx_contact_messages_status on public.contact_messages(status);

-- =====================================================
-- 4) RLS Enable
-- =====================================================
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_comments enable row level security;
alter table public.blog_likes enable row level security;
alter table public.masa_basi_episodes enable row level security;
alter table public.yazilima_dair_episodes enable row level security;
alter table public.social_videos enable row level security;
alter table public.career_records enable row level security;
alter table public.certifications enable row level security;
alter table public.reading_items enable row level security;
alter table public.contact_messages enable row level security;
alter table public.testimonials enable row level security;

-- =====================================================
-- 5) Table Policies (drop then create)
-- =====================================================

-- Profiles
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;
drop policy if exists "Admins can update everyone." on public.profiles;

create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using (true);

create policy "Users can update own profile."
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can update everyone."
  on public.profiles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Projects
drop policy if exists "Public Read Access" on public.projects;
drop policy if exists "Authenticated Insert Access" on public.projects;
drop policy if exists "Authenticated Update Access" on public.projects;
drop policy if exists "Authenticated Delete Access" on public.projects;
drop policy if exists "Public read published projects" on public.projects;
drop policy if exists "Admin full access projects" on public.projects;

create policy "Public Read Access"
  on public.projects for select
  using (true);

create policy "Authenticated Insert Access"
  on public.projects for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated Update Access"
  on public.projects for update
  using (auth.role() = 'authenticated');

create policy "Authenticated Delete Access"
  on public.projects for delete
  using (auth.role() = 'authenticated');

-- Blog posts
drop policy if exists "Anyone can view published blog posts" on public.blog_posts;
drop policy if exists "Authenticated users can manage blog posts" on public.blog_posts;

create policy "Anyone can view published blog posts"
  on public.blog_posts for select
  using (is_published = true);

create policy "Authenticated users can manage blog posts"
  on public.blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Blog comments
drop policy if exists "Anyone can view approved blog comments" on public.blog_comments;
drop policy if exists "Authenticated users can manage blog comments" on public.blog_comments;
drop policy if exists "Authenticated users can insert comments" on public.blog_comments;
drop policy if exists "Users can view own comments" on public.blog_comments;
drop policy if exists "Anyone can insert blog comments" on public.blog_comments;

create policy "Anyone can view approved blog comments"
  on public.blog_comments for select
  using (is_approved = true);

create policy "Users can view own comments"
  on public.blog_comments for select
  using (auth.uid() = user_id);

create policy "Authenticated users can insert comments"
  on public.blog_comments for insert
  with check (auth.uid() = user_id);

create policy "Authenticated users can manage blog comments"
  on public.blog_comments for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Blog likes
drop policy if exists "Anyone can view blog likes" on public.blog_likes;
drop policy if exists "Authenticated users can insert likes" on public.blog_likes;
drop policy if exists "Users can delete own likes" on public.blog_likes;

create policy "Anyone can view blog likes"
  on public.blog_likes for select
  using (true);

create policy "Authenticated users can insert likes"
  on public.blog_likes for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own likes"
  on public.blog_likes for delete
  using (auth.uid() = user_id);

-- Episodes
drop policy if exists "Anyone can view published masa_basi_episodes" on public.masa_basi_episodes;
drop policy if exists "Authenticated users can manage masa_basi_episodes" on public.masa_basi_episodes;
drop policy if exists "Anyone can view published yazilima_dair_episodes" on public.yazilima_dair_episodes;
drop policy if exists "Authenticated users can manage yazilima_dair_episodes" on public.yazilima_dair_episodes;

create policy "Anyone can view published masa_basi_episodes"
  on public.masa_basi_episodes for select
  using (is_published = true);

create policy "Authenticated users can manage masa_basi_episodes"
  on public.masa_basi_episodes for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Anyone can view published yazilima_dair_episodes"
  on public.yazilima_dair_episodes for select
  using (is_published = true);

create policy "Authenticated users can manage yazilima_dair_episodes"
  on public.yazilima_dair_episodes for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Social videos
drop policy if exists "Public read published social_videos" on public.social_videos;
drop policy if exists "Admin full access social_videos" on public.social_videos;
drop policy if exists "Anyone can view published social_videos" on public.social_videos;
drop policy if exists "Authenticated users can manage social_videos" on public.social_videos;

create policy "Anyone can view published social_videos"
  on public.social_videos for select
  using (is_published = true);

create policy "Authenticated users can manage social_videos"
  on public.social_videos for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Career
drop policy if exists "Anyone can view published career_records" on public.career_records;
drop policy if exists "Authenticated users can manage career_records" on public.career_records;

create policy "Anyone can view published career_records"
  on public.career_records for select
  using (is_published = true);

create policy "Authenticated users can manage career_records"
  on public.career_records for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Certifications
drop policy if exists "Certifications are viewable by everyone if published" on public.certifications;
drop policy if exists "Admins can view all certifications" on public.certifications;
drop policy if exists "Admins can insert certifications" on public.certifications;
drop policy if exists "Admins can update certifications" on public.certifications;
drop policy if exists "Admins can delete certifications" on public.certifications;

create policy "Certifications are viewable by everyone if published"
  on public.certifications for select
  using (is_published = true);

create policy "Admins can view all certifications"
  on public.certifications for select
  using (auth.role() = 'authenticated');

create policy "Admins can insert certifications"
  on public.certifications for insert
  with check (auth.role() = 'authenticated');

create policy "Admins can update certifications"
  on public.certifications for update
  using (auth.role() = 'authenticated');

create policy "Admins can delete certifications"
  on public.certifications for delete
  using (auth.role() = 'authenticated');

-- Reading items
drop policy if exists "Reading items are viewable by everyone if published" on public.reading_items;
drop policy if exists "Admins can view all reading items" on public.reading_items;
drop policy if exists "Admins can insert reading items" on public.reading_items;
drop policy if exists "Admins can update reading items" on public.reading_items;
drop policy if exists "Admins can delete reading items" on public.reading_items;

create policy "Reading items are viewable by everyone if published"
  on public.reading_items for select
  using (is_published = true);

create policy "Admins can view all reading items"
  on public.reading_items for select
  using (auth.role() = 'authenticated');

create policy "Admins can insert reading items"
  on public.reading_items for insert
  with check (auth.role() = 'authenticated');

create policy "Admins can update reading items"
  on public.reading_items for update
  using (auth.role() = 'authenticated');

create policy "Admins can delete reading items"
  on public.reading_items for delete
  using (auth.role() = 'authenticated');

-- Contact messages
drop policy if exists "Allow public insert to contact messages" on public.contact_messages;
drop policy if exists "Allow admin full access to contact messages" on public.contact_messages;

create policy "Allow public insert to contact messages"
  on public.contact_messages for insert
  with check (true);

create policy "Allow admin full access to contact messages"
  on public.contact_messages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Testimonials
drop policy if exists "Public can view published testimonials" on public.testimonials;
drop policy if exists "Authenticated users have full access to testimonials" on public.testimonials;

create policy "Public can view published testimonials"
  on public.testimonials for select
  using (is_published = true);

create policy "Authenticated users have full access to testimonials"
  on public.testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- =====================================================
-- 6) Storage Buckets
-- =====================================================
create schema if not exists storage;

insert into storage.buckets (id, name, public)
values
  ('project-images', 'project-images', true),
  ('blog-images', 'blog-images', true),
  ('media-images', 'media-images', true),
  ('certification-images', 'certification-images', true),
  ('certifications-images', 'certifications-images', true),
  ('reading-list-images', 'reading-list-images', true)
on conflict (id) do nothing;

-- =====================================================
-- 7) Storage Policies
-- =====================================================

-- Clean legacy policy names first
drop policy if exists "Public Access to project-images" on storage.objects;
drop policy if exists "Admin Insert project-images" on storage.objects;
drop policy if exists "Admin Update project-images" on storage.objects;
drop policy if exists "Admin Delete project-images" on storage.objects;
drop policy if exists "Authenticated Insert project-images" on storage.objects;
drop policy if exists "Authenticated Update project-images" on storage.objects;
drop policy if exists "Authenticated Delete project-images" on storage.objects;

drop policy if exists "Public Access to blog-images" on storage.objects;
drop policy if exists "Admin Insert blog-images" on storage.objects;
drop policy if exists "Admin Update blog-images" on storage.objects;
drop policy if exists "Admin Delete blog-images" on storage.objects;
drop policy if exists "Authenticated Insert blog-images" on storage.objects;
drop policy if exists "Authenticated Update blog-images" on storage.objects;
drop policy if exists "Authenticated Delete blog-images" on storage.objects;

drop policy if exists "Public Access to media-images" on storage.objects;
drop policy if exists "Admin Insert media-images" on storage.objects;
drop policy if exists "Admin Update media-images" on storage.objects;
drop policy if exists "Admin Delete media-images" on storage.objects;
drop policy if exists "Authenticated Insert media-images" on storage.objects;
drop policy if exists "Authenticated Update media-images" on storage.objects;
drop policy if exists "Authenticated Delete media-images" on storage.objects;

drop policy if exists "Public Access for certifications-images" on storage.objects;
drop policy if exists "Public Access to certifications-images" on storage.objects;
drop policy if exists "Auth Insert for certifications-images" on storage.objects;
drop policy if exists "Auth Update for certifications-images" on storage.objects;
drop policy if exists "Auth Delete for certifications-images" on storage.objects;
drop policy if exists "Admin Insert certifications-images" on storage.objects;
drop policy if exists "Admin Update certifications-images" on storage.objects;
drop policy if exists "Admin Delete certifications-images" on storage.objects;
drop policy if exists "Authenticated Insert certifications-images" on storage.objects;
drop policy if exists "Authenticated Update certifications-images" on storage.objects;
drop policy if exists "Authenticated Delete certifications-images" on storage.objects;

drop policy if exists "Public Access for reading-list-images" on storage.objects;
drop policy if exists "Public Access for reading-list-images duplicate" on storage.objects;
drop policy if exists "Public Access to reading-list-images" on storage.objects;
drop policy if exists "Auth Insert for reading-list-images" on storage.objects;
drop policy if exists "Auth Insert for reading-list-images duplicate" on storage.objects;
drop policy if exists "Auth Update for reading-list-images" on storage.objects;
drop policy if exists "Auth Update for reading-list-images duplicate" on storage.objects;
drop policy if exists "Auth Delete for reading-list-images" on storage.objects;
drop policy if exists "Auth Delete for reading-list-images duplicate" on storage.objects;
drop policy if exists "Admin Insert reading-list-images" on storage.objects;
drop policy if exists "Admin Update reading-list-images" on storage.objects;
drop policy if exists "Admin Delete reading-list-images" on storage.objects;
drop policy if exists "Authenticated Insert reading-list-images" on storage.objects;
drop policy if exists "Authenticated Update reading-list-images" on storage.objects;
drop policy if exists "Authenticated Delete reading-list-images" on storage.objects;

drop policy if exists "Public Access for certification-images" on storage.objects;
drop policy if exists "Auth Insert for certification-images" on storage.objects;
drop policy if exists "Auth Update for certification-images" on storage.objects;
drop policy if exists "Auth Delete for certification-images" on storage.objects;
drop policy if exists "public_read_project_images" on storage.objects;
drop policy if exists "auth_insert_project_images" on storage.objects;
drop policy if exists "auth_update_project_images" on storage.objects;
drop policy if exists "auth_delete_project_images" on storage.objects;
drop policy if exists "public_read_blog_images" on storage.objects;
drop policy if exists "auth_insert_blog_images" on storage.objects;
drop policy if exists "auth_update_blog_images" on storage.objects;
drop policy if exists "auth_delete_blog_images" on storage.objects;
drop policy if exists "public_read_media_images" on storage.objects;
drop policy if exists "auth_insert_media_images" on storage.objects;
drop policy if exists "auth_update_media_images" on storage.objects;
drop policy if exists "auth_delete_media_images" on storage.objects;
drop policy if exists "public_read_certification_images" on storage.objects;
drop policy if exists "auth_insert_certification_images" on storage.objects;
drop policy if exists "auth_update_certification_images" on storage.objects;
drop policy if exists "auth_delete_certification_images" on storage.objects;
drop policy if exists "public_read_certifications_images_legacy" on storage.objects;
drop policy if exists "auth_insert_certifications_images_legacy" on storage.objects;
drop policy if exists "auth_update_certifications_images_legacy" on storage.objects;
drop policy if exists "auth_delete_certifications_images_legacy" on storage.objects;
drop policy if exists "public_read_reading_list_images" on storage.objects;
drop policy if exists "auth_insert_reading_list_images" on storage.objects;
drop policy if exists "auth_update_reading_list_images" on storage.objects;
drop policy if exists "auth_delete_reading_list_images" on storage.objects;

-- Unified storage policies by bucket (public read + authenticated write)
create policy "public_read_project_images"
  on storage.objects for select
  using (bucket_id = 'project-images');
create policy "auth_insert_project_images"
  on storage.objects for insert
  with check (bucket_id = 'project-images' and auth.role() = 'authenticated');
create policy "auth_update_project_images"
  on storage.objects for update
  using (bucket_id = 'project-images' and auth.role() = 'authenticated');
create policy "auth_delete_project_images"
  on storage.objects for delete
  using (bucket_id = 'project-images' and auth.role() = 'authenticated');

create policy "public_read_blog_images"
  on storage.objects for select
  using (bucket_id = 'blog-images');
create policy "auth_insert_blog_images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');
create policy "auth_update_blog_images"
  on storage.objects for update
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');
create policy "auth_delete_blog_images"
  on storage.objects for delete
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "public_read_media_images"
  on storage.objects for select
  using (bucket_id = 'media-images');
create policy "auth_insert_media_images"
  on storage.objects for insert
  with check (bucket_id = 'media-images' and auth.role() = 'authenticated');
create policy "auth_update_media_images"
  on storage.objects for update
  using (bucket_id = 'media-images' and auth.role() = 'authenticated');
create policy "auth_delete_media_images"
  on storage.objects for delete
  using (bucket_id = 'media-images' and auth.role() = 'authenticated');

create policy "public_read_certification_images"
  on storage.objects for select
  using (bucket_id = 'certification-images');
create policy "auth_insert_certification_images"
  on storage.objects for insert
  with check (bucket_id = 'certification-images' and auth.role() = 'authenticated');
create policy "auth_update_certification_images"
  on storage.objects for update
  using (bucket_id = 'certification-images' and auth.role() = 'authenticated');
create policy "auth_delete_certification_images"
  on storage.objects for delete
  using (bucket_id = 'certification-images' and auth.role() = 'authenticated');

create policy "public_read_certifications_images_legacy"
  on storage.objects for select
  using (bucket_id = 'certifications-images');
create policy "auth_insert_certifications_images_legacy"
  on storage.objects for insert
  with check (bucket_id = 'certifications-images' and auth.role() = 'authenticated');
create policy "auth_update_certifications_images_legacy"
  on storage.objects for update
  using (bucket_id = 'certifications-images' and auth.role() = 'authenticated');
create policy "auth_delete_certifications_images_legacy"
  on storage.objects for delete
  using (bucket_id = 'certifications-images' and auth.role() = 'authenticated');

create policy "public_read_reading_list_images"
  on storage.objects for select
  using (bucket_id = 'reading-list-images');
create policy "auth_insert_reading_list_images"
  on storage.objects for insert
  with check (bucket_id = 'reading-list-images' and auth.role() = 'authenticated');
create policy "auth_update_reading_list_images"
  on storage.objects for update
  using (bucket_id = 'reading-list-images' and auth.role() = 'authenticated');
create policy "auth_delete_reading_list_images"
  on storage.objects for delete
  using (bucket_id = 'reading-list-images' and auth.role() = 'authenticated');
