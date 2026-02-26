CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    topic TEXT NOT NULL,
    date TEXT,
    time TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread',
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can send a message)
CREATE POLICY "Allow public insert to contact messages" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

-- Allow admins full access
CREATE POLICY "Allow admin full access to contact messages" ON public.contact_messages
    FOR ALL USING (auth.role() = 'authenticated');
