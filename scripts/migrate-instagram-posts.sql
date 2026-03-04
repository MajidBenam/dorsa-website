-- Add instagram_posts table for Gallery / Instagram sync
-- Ensure trigger function exists (idempotent)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS instagram_posts (
  id TEXT PRIMARY KEY,
  media_url TEXT,
  local_path TEXT NOT NULL,
  caption TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  permalink TEXT,
  media_type TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE instagram_posts
  ADD COLUMN IF NOT EXISTS tags TEXT[];

CREATE INDEX IF NOT EXISTS idx_instagram_posts_timestamp ON instagram_posts(timestamp DESC);

ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on instagram_posts" ON instagram_posts;
CREATE POLICY "Allow public read access on instagram_posts" ON instagram_posts
  FOR SELECT USING (true);

DROP TRIGGER IF EXISTS update_instagram_posts_updated_at ON instagram_posts;
CREATE TRIGGER update_instagram_posts_updated_at
  BEFORE UPDATE ON instagram_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
