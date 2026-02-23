-- SQL Script to Create Storage Buckets and Policies

-- Ensure the storage schema exists (usually it does by default in Supabase)
create schema if not exists storage;

-- 1. Create Buckets
-- "project-images" for portfolio projects
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- "blog-images" for blog posts and covers
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- "media-images" for episodes, videos, and podcast covers
insert into storage.buckets (id, name, public)
values ('media-images', 'media-images', true)
on conflict (id) do nothing;

-- "certifications-images" for certificate credentials
insert into storage.buckets (id, name, public)
values ('certifications-images', 'certifications-images', true)
on conflict (id) do nothing;

-- "reading-list-images" for book covers
insert into storage.buckets (id, name, public)
values ('reading-list-images', 'reading-list-images', true)
on conflict (id) do nothing;


-- 2. Storage Policies
-- Define rules: ANYONE can SELECT (view) public images. ONLY 'admin' can INSERT/UPDATE/DELETE.

-- project-images policies
create policy "Public Access to project-images" on storage.objects
  for select using (bucket_id = 'project-images');

create policy "Admin Insert project-images" on storage.objects
  for insert with check (bucket_id = 'project-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

create policy "Admin Update project-images" on storage.objects
  for update using (bucket_id = 'project-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

create policy "Admin Delete project-images" on storage.objects
  for delete using (bucket_id = 'project-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));


-- blog-images policies
create policy "Public Access to blog-images" on storage.objects
  for select using (bucket_id = 'blog-images');

create policy "Admin Insert blog-images" on storage.objects
  for insert with check (bucket_id = 'blog-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

create policy "Admin Update blog-images" on storage.objects
  for update using (bucket_id = 'blog-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

create policy "Admin Delete blog-images" on storage.objects
  for delete using (bucket_id = 'blog-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));


-- media-images policies
create policy "Public Access to media-images" on storage.objects
  for select using (bucket_id = 'media-images');

create policy "Admin Insert media-images" on storage.objects
  for insert with check (bucket_id = 'media-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

create policy "Admin Update media-images" on storage.objects
  for update using (bucket_id = 'media-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

create policy "Admin Delete media-images" on storage.objects
  for delete using (bucket_id = 'media-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));


-- certifications-images policies
create policy "Public Access to certifications-images" on storage.objects
  for select using (bucket_id = 'certifications-images');

create policy "Admin Insert certifications-images" on storage.objects
  for insert with check (bucket_id = 'certifications-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

create policy "Admin Update certifications-images" on storage.objects
  for update using (bucket_id = 'certifications-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

create policy "Admin Delete certifications-images" on storage.objects
  for delete using (bucket_id = 'certifications-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));


-- reading-list-images policies
create policy "Public Access to reading-list-images" on storage.objects
  for select using (bucket_id = 'reading-list-images');

create policy "Admin Insert reading-list-images" on storage.objects
  for insert with check (bucket_id = 'reading-list-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

create policy "Admin Update reading-list-images" on storage.objects
  for update using (bucket_id = 'reading-list-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

create policy "Admin Delete reading-list-images" on storage.objects
  for delete using (bucket_id = 'reading-list-images' and auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
