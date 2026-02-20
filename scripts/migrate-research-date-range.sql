-- Add publication_date_to to research for date ranges
ALTER TABLE research ADD COLUMN IF NOT EXISTS publication_date_to DATE;
