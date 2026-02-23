-- SQL Script to Update RLS Policies for the `projects` table

-- 1. Ensure RLS is enabled on the projects table (it likely already is, but good to be safe)
alter table public.projects enable row level security;

-- 2. Drop existing policies to prevent conflicts
drop policy if exists "Enable read access for all users" on public.projects;
drop policy if exists "Enable insert for authenticated users only" on public.projects;
drop policy if exists "Enable update for authenticated users only" on public.projects;
drop policy if exists "Enable delete for authenticated users only" on public.projects;
drop policy if exists "Admin All Access" on public.projects;
drop policy if exists "Public Read Access" on public.projects;

-- 3. Create new, clean policies

-- Anyone can read (select) the projects
create policy "Public Read Access" on public.projects
  for select using (true);

-- Only authenticated users (admins) can insert, update, or delete projects
create policy "Authenticated Insert Access" on public.projects
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated Update Access" on public.projects
  for update using (auth.role() = 'authenticated');

create policy "Authenticated Delete Access" on public.projects
  for delete using (auth.role() = 'authenticated');
