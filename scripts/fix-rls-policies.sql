-- Fix RLS Policies for Public Access
-- Run this in your Supabase SQL Editor if data isn't showing on the website

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access on experiences" ON experiences;
DROP POLICY IF EXISTS "Allow public read access on research" ON research;
DROP POLICY IF EXISTS "Allow public read access on supervision" ON supervision;
DROP POLICY IF EXISTS "Allow public insert on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public read access on instagram_posts" ON instagram_posts;

-- Recreate policies with explicit public access
CREATE POLICY "Allow public read access on experiences" ON experiences
  FOR SELECT 
  TO public
  USING (true);

CREATE POLICY "Allow public read access on research" ON research
  FOR SELECT 
  TO public
  USING (true);

CREATE POLICY "Allow public read access on supervision" ON supervision
  FOR SELECT 
  TO public
  USING (true);

CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions
  FOR INSERT 
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public read access on instagram_posts" ON instagram_posts
  FOR SELECT 
  TO public
  USING (true);

-- Verify policies are created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('research', 'experiences', 'supervision', 'contact_submissions', 'instagram_posts')
ORDER BY tablename, policyname;
