-- Create custom type for career items if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'career_item_type') THEN
    CREATE TYPE career_item_type AS ENUM ('work', 'volunteer', 'education');
  END IF;
END $$;

-- Create the career_records table
CREATE TABLE IF NOT EXISTS public.career_records (
  id uuid default gen_random_uuid() primary key,
  type career_item_type not null,
  
  -- Core fields (i18n)
  role_tr text not null,
  role_en text not null,
  company_tr text not null,
  company_en text not null,
  location_tr text,
  location_en text,
  date_tr text not null,
  date_en text not null,
  
  -- Detailed fields
  description_tr text[],
  description_en text[],
  skills text[],
  
  -- Display fields
  employment_type_tr text,
  employment_type_en text,
  
  -- Meta fields
  sort_order int not null default 0,
  is_published boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
ALTER TABLE public.career_records ENABLE ROW LEVEL SECURITY;

-- ── RLS Policies ── --

-- Read access: Anyone can read published career records
CREATE POLICY "Anyone can view published career_records"
  ON public.career_records FOR SELECT
  USING (is_published = true);

-- Write/Manage access: Authenticated users can manage all career records
CREATE POLICY "Authenticated users can manage career_records"
  ON public.career_records FOR ALL
  USING (auth.role() = 'authenticated');
