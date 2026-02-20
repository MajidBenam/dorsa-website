-- Supabase Database Setup Script
-- Run this in your Supabase SQL Editor

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  hospital_name TEXT NOT NULL,
  date_from DATE NOT NULL,
  date_to DATE,
  category TEXT NOT NULL,
  featured_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create research table
CREATE TABLE IF NOT EXISTS research (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  publication_date DATE NOT NULL,
  publication_date_to DATE,
  journal_name TEXT,
  description TEXT NOT NULL,
  link TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create supervision table
CREATE TABLE IF NOT EXISTS supervision (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  student_name TEXT,
  institution TEXT NOT NULL,
  year INTEGER NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_experiences_slug ON experiences(slug);
CREATE INDEX IF NOT EXISTS idx_experiences_date_from ON experiences(date_from DESC);
CREATE INDEX IF NOT EXISTS idx_research_date ON research(publication_date DESC);
CREATE INDEX IF NOT EXISTS idx_supervision_year ON supervision(year DESC);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE research ENABLE ROW LEVEL SECURITY;
ALTER TABLE supervision ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running script)
DROP POLICY IF EXISTS "Allow public read access on experiences" ON experiences;
DROP POLICY IF EXISTS "Allow public read access on research" ON research;
DROP POLICY IF EXISTS "Allow public read access on supervision" ON supervision;
DROP POLICY IF EXISTS "Allow public insert on contact_submissions" ON contact_submissions;

-- Create policies for public read access
CREATE POLICY "Allow public read access on experiences" ON experiences
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on research" ON research
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on supervision" ON supervision
  FOR SELECT USING (true);

-- Allow public to insert contact submissions
CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_experiences_updated_at ON experiences;
DROP TRIGGER IF EXISTS update_research_updated_at ON research;
DROP TRIGGER IF EXISTS update_supervision_updated_at ON supervision;

-- Create triggers for updated_at
CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_updated_at
  BEFORE UPDATE ON research
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_supervision_updated_at
  BEFORE UPDATE ON supervision
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
