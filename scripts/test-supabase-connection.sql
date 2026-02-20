-- Test Supabase Connection and Data Access
-- Run this in your Supabase SQL Editor to verify everything is set up correctly

-- 1. Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('research', 'experiences', 'supervision', 'contact_submissions')
ORDER BY table_name;

-- 2. Count records in each table
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
FROM supervision
UNION ALL
SELECT 
  'contact_submissions' as table_name, 
  COUNT(*) as record_count 
FROM contact_submissions;

-- 3. Check RLS is enabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('research', 'experiences', 'supervision', 'contact_submissions');

-- 4. List all policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('research', 'experiences', 'supervision', 'contact_submissions')
ORDER BY tablename, policyname;

-- 5. Test a simple query (should work if RLS is configured correctly)
SELECT title, authors, publication_date 
FROM research 
LIMIT 5;
