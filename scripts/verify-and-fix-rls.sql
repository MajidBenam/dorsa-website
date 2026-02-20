-- Comprehensive RLS Policy Fix and Verification
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Verify tables exist and have data
SELECT 
  'research' as table_name, 
  COUNT(*) as record_count 
FROM research
UNION ALL
SELECT 
  'experiences' as table_name, 
  COUNT(*) as record_count 
FROM experiences
UNION ALL
SELECT 
  'supervision' as table_name, 
  COUNT(*) as record_count 
FROM supervision;

-- Step 2: Check current RLS status
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('research', 'experiences', 'supervision', 'contact_submissions');

-- Step 3: List existing policies
SELECT 
  tablename,
  policyname,
  cmd,
  roles,
  qual
FROM pg_policies 
WHERE tablename IN ('research', 'experiences', 'supervision', 'contact_submissions')
ORDER BY tablename, policyname;

-- Step 4: Drop ALL existing policies (clean slate)
DROP POLICY IF EXISTS "Allow public read access on experiences" ON experiences;
DROP POLICY IF EXISTS "Allow public read access on research" ON research;
DROP POLICY IF EXISTS "Allow public read access on supervision" ON supervision;
DROP POLICY IF EXISTS "Allow public insert on contact_submissions" ON contact_submissions;

-- Step 5: Create new policies with EXPLICIT public access
-- Note: Using 'public' role ensures anonymous/unauthenticated users can read

CREATE POLICY "Allow public read access on experiences" 
ON experiences
FOR SELECT 
TO public
USING (true);

CREATE POLICY "Allow public read access on research" 
ON research
FOR SELECT 
TO public
USING (true);

CREATE POLICY "Allow public read access on supervision" 
ON supervision
FOR SELECT 
TO public
USING (true);

CREATE POLICY "Allow public insert on contact_submissions" 
ON contact_submissions
FOR INSERT 
TO public
WITH CHECK (true);

-- Step 6: Verify new policies
SELECT 
  tablename,
  policyname,
  cmd,
  roles,
  qual
FROM pg_policies 
WHERE tablename IN ('research', 'experiences', 'supervision', 'contact_submissions')
ORDER BY tablename, policyname;

-- Step 7: Test queries (should work now)
SELECT 'Testing research query...' as test;
SELECT COUNT(*) as research_count FROM research;

SELECT 'Testing experiences query...' as test;
SELECT COUNT(*) as experiences_count FROM experiences;

SELECT 'Testing supervision query...' as test;
SELECT COUNT(*) as supervision_count FROM supervision;

-- If you see counts > 0, the policies are working!
