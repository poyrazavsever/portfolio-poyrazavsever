-- Create testimonials table
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    title TEXT NOT NULL,
    content_tr TEXT NOT NULL,
    content_en TEXT NOT NULL,
    avatar_url TEXT,
    company_logo_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policies for public access (only published testimonials)
CREATE POLICY "Public can view published testimonials" ON testimonials
    FOR SELECT
    USING (is_published = true);

-- Policies for authenticated users (admin access)
CREATE POLICY "Authenticated users have full access to testimonials" ON testimonials
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
