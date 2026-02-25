-- Certifications Table
create table if not exists public.certifications (
  id uuid default gen_random_uuid() primary key,
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
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.certifications enable row level security;

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

-- Updated At Trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_certifications_updated_at on public.certifications;
create trigger set_certifications_updated_at
  before update on public.certifications
  for each row
  execute function public.handle_updated_at();

-- Insert the storage bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('certifications-images', 'certifications-images', true)
on conflict (id) do nothing;

-- Set up storage policies for the new bucket
create policy "Public Access for certifications-images"
  on storage.objects for select
  using ( bucket_id = 'certifications-images' );

create policy "Auth Insert for certifications-images"
  on storage.objects for insert
  with check ( bucket_id = 'certifications-images' and auth.role() = 'authenticated' );

create policy "Auth Update for certifications-images"
  on storage.objects for update
  using ( bucket_id = 'certifications-images' and auth.role() = 'authenticated' );

create policy "Auth Delete for certifications-images"
  on storage.objects for delete
  using ( bucket_id = 'certifications-images' and auth.role() = 'authenticated' );
