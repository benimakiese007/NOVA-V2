-- Create tables for NOVA V2

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    role TEXT DEFAULT 'customer',
    date_joined TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    avatar TEXT
);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT,
    category TEXT,
    price NUMERIC,
    old_price NUMERIC,
    image TEXT,
    rating NUMERIC,
    reviews INTEGER DEFAULT 0,
    is_new BOOLEAN DEFAULT FALSE,
    is_promo BOOLEAN DEFAULT FALSE,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'En attente',
    total NUMERIC,
    customer_name TEXT,
    customer_email TEXT,
    items JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROMOS TABLE
CREATE TABLE IF NOT EXISTS public.promos (
    code TEXT PRIMARY KEY,
    type TEXT,
    value NUMERIC,
    max_uses INTEGER,
    expiry_date TIMESTAMP WITH TIME ZONE,
    current_uses INTEGER DEFAULT 0,
    used_by JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS public.activities (
    id TEXT PRIMARY KEY,
    text TEXT,
    type TEXT,
    time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies can be added here if needed
-- For now, enabling public access (development mode)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- create policies to allow all operations for anon (public) users for dev
CREATE POLICY "Enable all for anon" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for anon" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for anon" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for anon" ON public.promos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for anon" ON public.activities FOR ALL USING (true) WITH CHECK (true);
