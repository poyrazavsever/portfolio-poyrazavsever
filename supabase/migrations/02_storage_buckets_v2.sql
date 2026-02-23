-- SQL Script to Create Storage Buckets and Policies (V2)

-- Ensure the storage schema exists
create schema if not exists storage;

-- 1. Create Buckets
insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('media-images', 'media-images', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('certifications-images', 'certifications-images', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('reading-list-images', 'reading-list-images', true) on conflict (id) do nothing;

-- 2. Drop existing policies to prevent conflicts, then re-create
drop policy if exists "Public Access to project-images" on storage.objects;
drop policy if exists "Admin Insert project-images" on storage.objects;
drop policy if exists "Admin Update project-images" on storage.objects;
drop policy if exists "Admin Delete project-images" on storage.objects;
drop policy if exists "Authenticated Insert project-images" on storage.objects;
drop policy if exists "Authenticated Update project-images" on storage.objects;
drop policy if exists "Authenticated Delete project-images" on storage.objects;

-- project-images policies
create policy "Public Access to project-images" on storage.objects
  for select using (bucket_id = 'project-images');

-- Broadened policy for testing: Any authenticated user can upload
create policy "Authenticated Insert project-images" on storage.objects
  for insert with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

create policy "Authenticated Update project-images" on storage.objects
  for update using (bucket_id = 'project-images' and auth.role() = 'authenticated');

create policy "Authenticated Delete project-images" on storage.objects
  for delete using (bucket_id = 'project-images' and auth.role() = 'authenticated');


-- Do the same broadened policy for blog-images
drop policy if exists "Public Access to blog-images" on storage.objects;
drop policy if exists "Admin Insert blog-images" on storage.objects;
drop policy if exists "Admin Update blog-images" on storage.objects;
drop policy if exists "Admin Delete blog-images" on storage.objects;
drop policy if exists "Authenticated Insert blog-images" on storage.objects;
drop policy if exists "Authenticated Update blog-images" on storage.objects;
drop policy if exists "Authenticated Delete blog-images" on storage.objects;

create policy "Public Access to blog-images" on storage.objects
  for select using (bucket_id = 'blog-images');

create policy "Authenticated Insert blog-images" on storage.objects
  for insert with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "Authenticated Update blog-images" on storage.objects
  for update using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "Authenticated Delete blog-images" on storage.objects
  for delete using (bucket_id = 'blog-images' and auth.role() = 'authenticated');


-- Do the same for media-images
drop policy if exists "Public Access to media-images" on storage.objects;
drop policy if exists "Admin Insert media-images" on storage.objects;
drop policy if exists "Admin Update media-images" on storage.objects;
drop policy if exists "Admin Delete media-images" on storage.objects;
drop policy if exists "Authenticated Insert media-images" on storage.objects;
drop policy if exists "Authenticated Update media-images" on storage.objects;
drop policy if exists "Authenticated Delete media-images" on storage.objects;

create policy "Public Access to media-images" on storage.objects
  for select using (bucket_id = 'media-images');

create policy "Authenticated Insert media-images" on storage.objects
  for insert with check (bucket_id = 'media-images' and auth.role() = 'authenticated');

create policy "Authenticated Update media-images" on storage.objects
  for update using (bucket_id = 'media-images' and auth.role() = 'authenticated');

create policy "Authenticated Delete media-images" on storage.objects
  for delete using (bucket_id = 'media-images' and auth.role() = 'authenticated');


-- Do the same for certifications-images
drop policy if exists "Public Access to certifications-images" on storage.objects;
drop policy if exists "Admin Insert certifications-images" on storage.objects;
drop policy if exists "Admin Update certifications-images" on storage.objects;
drop policy if exists "Admin Delete certifications-images" on storage.objects;
drop policy if exists "Authenticated Insert certifications-images" on storage.objects;
drop policy if exists "Authenticated Update certifications-images" on storage.objects;
drop policy if exists "Authenticated Delete certifications-images" on storage.objects;

create policy "Public Access to certifications-images" on storage.objects
  for select using (bucket_id = 'certifications-images');

create policy "Authenticated Insert certifications-images" on storage.objects
  for insert with check (bucket_id = 'certifications-images' and auth.role() = 'authenticated');

create policy "Authenticated Update certifications-images" on storage.objects
  for update using (bucket_id = 'certifications-images' and auth.role() = 'authenticated');

create policy "Authenticated Delete certifications-images" on storage.objects
  for delete using (bucket_id = 'certifications-images' and auth.role() = 'authenticated');


-- Do the same for reading-list-images
drop policy if exists "Public Access to reading-list-images" on storage.objects;
drop policy if exists "Admin Insert reading-list-images" on storage.objects;
drop policy if exists "Admin Update reading-list-images" on storage.objects;
drop policy if exists "Admin Delete reading-list-images" on storage.objects;
drop policy if exists "Authenticated Insert reading-list-images" on storage.objects;
drop policy if exists "Authenticated Update reading-list-images" on storage.objects;
drop policy if exists "Authenticated Delete reading-list-images" on storage.objects;

create policy "Public Access to reading-list-images" on storage.objects
  for select using (bucket_id = 'reading-list-images');

create policy "Authenticated Insert reading-list-images" on storage.objects
  for insert with check (bucket_id = 'reading-list-images' and auth.role() = 'authenticated');

create policy "Authenticated Update reading-list-images" on storage.objects
  for update using (bucket_id = 'reading-list-images' and auth.role() = 'authenticated');

create policy "Authenticated Delete reading-list-images" on storage.objects
  for delete using (bucket_id = 'reading-list-images' and auth.role() = 'authenticated');
