// Upload existing local instagram images to Supabase Storage
// Run: node scripts/upload-instagram-to-supabase-storage.js

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const BUCKET = 'gallery'; // your Supabase bucket name
const ROOT = path.join(__dirname, '..');
const LOCAL_DIR = path.join(ROOT, 'public', 'images', 'instagram');

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const filePath = path.join(ROOT, file);
    try {
      if (!fs.existsSync(filePath)) continue;
      const content = fs.readFileSync(filePath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eq = trimmed.indexOf('=');
        if (eq <= 0) continue;
        const key = trimmed.slice(0, eq).trim();
        let val = trimmed.slice(eq + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    } catch (_) {}
  }
}

async function main() {
  loadEnv();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key (SUPABASE_SERVICE_ROLE_KEY recommended)');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  if (!fs.existsSync(LOCAL_DIR)) {
    console.error('Local directory not found:', LOCAL_DIR);
    process.exit(1);
  }

  const files = await fs.promises.readdir(LOCAL_DIR);
  if (files.length === 0) {
    console.log('No files in', LOCAL_DIR);
    return;
  }

  console.log(`Uploading ${files.length} file(s) to Supabase Storage...`);

  for (const file of files) {
    const filePath = path.join(LOCAL_DIR, file);
    const stat = await fs.promises.stat(filePath);
    if (!stat.isFile()) continue;

    const id = file.replace(/\.[^.]+$/, ''); // filename without extension = instagram_posts.id
    const storagePath = `instagram/${file}`;
    const buf = await fs.promises.readFile(filePath);

    const { error: uploadError } = await supabase
      .storage
      .from(BUCKET)
      .upload(storagePath, buf, { upsert: true });

    if (uploadError) {
      console.warn(`Upload failed for ${file}:`, uploadError.message);
      continue;
    }

    const { data: publicData } = supabase
      .storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    const storagePublicUrl = publicData?.publicUrl || null;

    const { error: updateError } = await supabase
      .from('instagram_posts')
      .update({
        storage_path: storagePath,
        storage_public_url: storagePublicUrl,
      })
      .eq('id', id);

    if (updateError) {
      console.warn(`DB update failed for ${id}:`, updateError.message);
    } else {
      console.log(`Uploaded and linked: ${file} → ${storagePath}`);
    }
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});