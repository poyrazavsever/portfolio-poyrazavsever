-- Reading Items Table
create table if not exists public.reading_items (
  id uuid default gen_random_uuid() primary key,
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
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.reading_items enable row level security;

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

-- Updated At Trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_reading_items_updated_at on public.reading_items;
create trigger set_reading_items_updated_at
  before update on public.reading_items
  for each row
  execute function public.handle_updated_at();

-- Insert the storage bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('reading-list-images', 'reading-list-images', true)
on conflict (id) do nothing;

-- Set up storage policies for the new bucket
create policy "Public Access for reading-list-images"
  on storage.objects for select
  using ( bucket_id = 'reading-list-images' );

create policy "Auth Insert for reading-list-images"
  on storage.objects for insert
  with check ( bucket_id = 'reading-list-images' and auth.role() = 'authenticated' );

create policy "Auth Update for reading-list-images"
  on storage.objects for update
  using ( bucket_id = 'reading-list-images' and auth.role() = 'authenticated' );

create policy "Auth Delete for reading-list-images"
  on storage.objects for delete
  using ( bucket_id = 'reading-list-images' and auth.role() = 'authenticated' );

---

-- reading-list-images kovanız için erişim ve güvenlik (RLS) politikaları
create policy "Public Access for reading-list-images duplicate"
  on storage.objects for select
  using ( bucket_id = 'reading-list-images' );

create policy "Auth Insert for reading-list-images duplicate"
  on storage.objects for insert
  with check ( bucket_id = 'reading-list-images' and auth.role() = 'authenticated' );

create policy "Auth Update for reading-list-images duplicate"
  on storage.objects for update
  using ( bucket_id = 'reading-list-images' and auth.role() = 'authenticated' );

create policy "Auth Delete for reading-list-images duplicate"
  on storage.objects for delete
  using ( bucket_id = 'reading-list-images' and auth.role() = 'authenticated' );
