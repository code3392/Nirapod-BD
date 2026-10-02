-- ==============================================================================
-- NIRAPOD BD (নিরাপদ বিডি) — DATABASE SCHEMA & ROW-LEVEL SECURITY
-- Community-Powered Safety & Civic Problem Reporting Platform for Bangladesh
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar TEXT,
    role VARCHAR(50) DEFAULT 'Community Guardian',
    reputation_score INT DEFAULT 0,
    verification_level VARCHAR(50) DEFAULT 'Novice Observer',
    reports_submitted INT DEFAULT 0,
    reports_verified INT DEFAULT 0,
    helpful_confirmations INT DEFAULT 0,
    show_approximate_location BOOLEAN DEFAULT true,
    hide_identity_publicly BOOLEAN DEFAULT false,
    allow_notifications BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id VARCHAR(50) PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL,
    icon VARCHAR(20) NOT NULL,
    color VARCHAR(20) NOT NULL,
    description_en TEXT,
    description_bn TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ORGANIZATIONS TABLE
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'City Corporation', 'Fire Service', 'Police Dept', 'WASA', 'DPDC / DESCO', etc.
    location VARCHAR(255) NOT NULL,
    verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id VARCHAR(20) UNIQUE NOT NULL, -- e.g. NRP-10482
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    category_id VARCHAR(50) REFERENCES public.categories(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    district VARCHAR(100) DEFAULT 'Dhaka',
    area VARCHAR(100) NOT NULL,
    severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'emergency')),
    status VARCHAR(30) DEFAULT 'SUBMITTED' CHECK (status IN (
        'SUBMITTED', 'AI_ANALYZED', 'UNDER_REVIEW', 'VERIFIED',
        'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'COMMUNITY_CONFIRMED',
        'REJECTED', 'DUPLICATE', 'FALSE_REPORT'
    )),
    image_url TEXT NOT NULL,
    time_noticed VARCHAR(50) DEFAULT 'today',
    ai_category VARCHAR(50),
    ai_confidence INT,
    ai_risks JSONB DEFAULT '[]'::jsonb,
    ai_suggested_severity VARCHAR(20),
    confirmations_count INT DEFAULT 0,
    not_sure_count INT DEFAULT 0,
    incorrect_count INT DEFAULT 0,
    assigned_organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    is_exact_location_hidden BOOLEAN DEFAULT false,
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 5. REPORT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.report_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    image_type VARCHAR(50) DEFAULT 'evidence' CHECK (image_type IN ('evidence', 'before', 'after', 'inspection')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. VERIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(30) DEFAULT 'citizen_vote' CHECK (type IN ('citizen_vote', 'field_inspection', 'agency_audit')),
    result VARCHAR(30) NOT NULL CHECK (result IN ('confirm', 'not_sure', 'incorrect')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(report_id, user_id)
);

-- 7. COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    is_official BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. RESOLUTIONS TABLE
CREATE TABLE IF NOT EXISTS public.resolutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE UNIQUE NOT NULL,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL NOT NULL,
    description TEXT NOT NULL,
    before_image TEXT NOT NULL,
    after_image TEXT NOT NULL,
    verified_by_community BOOLEAN DEFAULT false,
    verified_by_community_count INT DEFAULT 0,
    resolved_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- INDEXES FOR HIGH-PERFORMANCE MAP QUERIES
CREATE INDEX IF NOT EXISTS idx_reports_location ON public.reports(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_reports_category ON public.reports(category_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_severity ON public.reports(severity);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at DESC);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resolutions ENABLE ROW LEVEL SECURITY;

-- Reports are readable by all citizens
CREATE POLICY "Public reports are viewable by everyone" 
ON public.reports FOR SELECT USING (true);

-- Authenticated users can insert reports
CREATE POLICY "Users can create reports" 
ON public.reports FOR INSERT WITH CHECK (true);

-- Users can only edit their own reports unless admin
CREATE POLICY "Users can update their own reports" 
ON public.reports FOR UPDATE USING (auth.uid() = user_id OR auth.uid() IN (SELECT auth_id FROM public.users WHERE role = 'Admin'));
