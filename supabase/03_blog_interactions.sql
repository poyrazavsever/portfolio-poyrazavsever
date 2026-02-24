-- ── BLOG LIKES TABLE ──
create table public.blog_likes (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references public.blog_posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(post_id, user_id)
);

alter table public.blog_likes enable row level security;

-- Herkes beğeni sayısını görebilir
create policy "Anyone can view blog likes"
  on public.blog_likes for select
  using (true);

-- Giriş yapmış kullanıcılar beğenebilir
create policy "Authenticated users can insert likes"
  on public.blog_likes for insert
  with check (auth.uid() = user_id);

-- Kendi beğenisini kaldırabilir
create policy "Users can delete own likes"
  on public.blog_likes for delete
  using (auth.uid() = user_id);

-- ── BLOG COMMENTS: user_id sütunu ekle ──
alter table public.blog_comments add column if not exists user_id uuid references auth.users(id);

-- Yorum politikalarını güncelle: sadece giriş yapmış kullanıcılar yorum yapabilir
drop policy if exists "Anyone can insert blog comments" on public.blog_comments;
create policy "Authenticated users can insert comments"
  on public.blog_comments for insert
  with check (auth.uid() = user_id);

-- Kullanıcı kendi onaylanmamış yorumlarını görebilir
create policy "Users can view own comments"
  on public.blog_comments for select
  using (auth.uid() = user_id);
