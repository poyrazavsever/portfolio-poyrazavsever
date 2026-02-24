-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- ── BLOG POSTS TABLE ──
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  
  -- Localization
  title_tr text not null,
  title_en text,
  excerpt_tr text,
  excerpt_en text,
  content_tr text,
  content_en text,
  
  -- Metadata
  category text, -- tech, design, engineering
  cover_image text,
  read_time_min integer default 0,
  tags text[] default '{}',
  
  -- Status
  is_published boolean default false,
  published_at timestamp with time zone,
  
  -- Auditing
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Enable Row Level Security
alter table public.blog_posts enable row level security;

-- Policy: Everyone can read published posts
create policy "Anyone can view published blog posts"
  on public.blog_posts for select
  using (is_published = true);

-- Policy: Admins can do everything (Assuming authenticated users are admins for now, same as projects)
create policy "Authenticated users can manage blog posts"
  on public.blog_posts for all
  using (auth.role() = 'authenticated');


-- ── BLOG COMMENTS TABLE ──
create table public.blog_comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references public.blog_posts(id) on delete cascade not null,
  
  -- For denormalization / easier queries in admin panel
  post_title text not null,
  
  -- User info (If not authenticated)
  user_name text not null,
  user_avatar text,
  
  -- Comment actual content
  content text not null,
  
  -- Status
  is_approved boolean default false,
  
  -- Auditing
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Enable Row Level Security
alter table public.blog_comments enable row level security;

-- Policy: Everyone can read approved comments
create policy "Anyone can view approved blog comments"
  on public.blog_comments for select
  using (is_approved = true);

-- Policy: Anyone can insert a new comment (Assuming open commenting for now, pending admin approval)
create policy "Anyone can insert blog comments"
  on public.blog_comments for insert
  with check (true);

-- Policy: Admins can do everything (approve, edit, delete)
create policy "Authenticated users can manage blog comments"
  on public.blog_comments for all
  using (auth.role() = 'authenticated');
