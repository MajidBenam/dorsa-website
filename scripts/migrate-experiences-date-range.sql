-- Migration: Add date_from and date_to to experiences
-- Run this in Supabase SQL Editor if you have an existing table with a single 'date' column

-- Add new columns
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS date_from DATE;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS date_to DATE;

-- Migrate existing date to date_from (treat as start of range)
UPDATE experiences SET date_from = date WHERE date_from IS NULL AND date IS NOT NULL;

-- Optionally set date_to for past roles (e.g. if you want to mark some as ended)
-- For ongoing roles, leave date_to as NULL
-- Example: UPDATE experiences SET date_to = '2024-12-31' WHERE slug = 'hemovigilance-deputy-farabi';

-- Drop old column (only after verifying migration)
ALTER TABLE experiences DROP COLUMN IF EXISTS date;

-- Make date_from NOT NULL (after migration)
ALTER TABLE experiences ALTER COLUMN date_from SET NOT NULL;

-- Update index
DROP INDEX IF EXISTS idx_experiences_date;
CREATE INDEX IF NOT EXISTS idx_experiences_date_from ON experiences(date_from DESC);
