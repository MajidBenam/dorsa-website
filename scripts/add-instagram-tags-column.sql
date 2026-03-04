-- Add tags column to existing instagram_posts table
-- Run this in Supabase SQL Editor if sync fails with "Could not find the 'tags' column"
ALTER TABLE instagram_posts
  ADD COLUMN IF NOT EXISTS tags TEXT[];
