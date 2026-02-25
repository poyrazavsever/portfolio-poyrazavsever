-- ── MASA BASI EPISODES TABLE ──
create table public.masa_basi_episodes (
  id uuid primary key default uuid_generate_v4(),
  episode_number integer not null,
  season integer default 1,
  
  -- Localization
  title_tr text not null,
  title_en text,
  description_tr text,
  description_en text,
  content_tr text,
  content_en text,
  
  -- Guest Info
  guest_name text,
  guest_role text,
  guest_image text,
  
  -- Details
  date date not null,
  time text,
  duration text,
  topics text[] default '{}',
  
  -- Links
  youtube_url text,
  spotify_url text,
  
  -- Status
  is_upcoming boolean default false,
  is_published boolean default true,
  
  -- Auditing
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  unique (episode_number, season)
);

-- RLS
alter table public.masa_basi_episodes enable row level security;

create policy "Anyone can view published masa_basi_episodes"
  on public.masa_basi_episodes for select
  using (is_published = true);

create policy "Authenticated users can manage masa_basi_episodes"
  on public.masa_basi_episodes for all
  using (auth.role() = 'authenticated');


-- ── YAZILIMA DAIR EPISODES TABLE ──
create table public.yazilima_dair_episodes (
  id uuid primary key default uuid_generate_v4(),
  episode_number integer not null,
  season integer default 1,
  
  -- Localization
  title_tr text not null,
  title_en text,
  description_tr text,
  description_en text,
  content_tr text,
  content_en text,
  
  -- Guest Info (Optional for this series)
  guest_name text,
  guest_role text,
  guest_image text,
  
  -- Details
  date date not null,
  time text,
  duration text,
  topics text[] default '{}',
  
  -- Links
  youtube_url text,
  spotify_url text,
  
  -- Status
  is_upcoming boolean default false,
  is_published boolean default true,
  
  -- Auditing
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  unique (episode_number, season)
);

-- RLS
alter table public.yazilima_dair_episodes enable row level security;

create policy "Anyone can view published yazilima_dair_episodes"
  on public.yazilima_dair_episodes for select
  using (is_published = true);

create policy "Authenticated users can manage yazilima_dair_episodes"
  on public.yazilima_dair_episodes for all
  using (auth.role() = 'authenticated');
