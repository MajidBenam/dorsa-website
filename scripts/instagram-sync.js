/**
 * Instagram Gallery Sync Script
 *
 * Fetches media from Instagram Graph API (Professional account required),
 * downloads images to public/images/instagram/, and upserts metadata into Supabase.
 *
 * Required env (e.g. in .env.local or export before running):
 *   INSTAGRAM_ACCESS_TOKEN  - Long-lived Instagram User access token
 *   INSTAGRAM_USER_ID       - Instagram Professional Account ID
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY - For upsert (bypasses RLS)
 *
 * Run: node scripts/instagram-sync.js
 * Or:  node -r dotenv/config scripts/instagram-sync.js (if using dotenv)
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const API_VERSION = 'v21.0';
const BASE_URL = `https://graph.instagram.com/${API_VERSION}`;
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'instagram');

function loadEnv() {
  const root = path.join(__dirname, '..');
  for (const file of ['.env.local', '.env']) {
    const filePath = path.join(root, file);
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
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
          val = val.slice(1, -1);
        val = val.trim().replace(/\r?\n$/, ''); // no trailing newlines
        if (!process.env[key]) process.env[key] = val;
      }
    } catch (_) {}
  }
}

function generateTags(caption) {
  if (!caption || !caption.trim) return null;
  const text = caption.toLowerCase();
  const stopwords = new Set([
    'the','and','for','with','this','that','from','into','about',
    'https','http','www','com','in','on','of','to','a','an','at','by',
    'is','are','was','were','it','my','our','your','their','rt','amp'
  ]);
  const words = text
    .replace(/[#.,!?;:()\[\]"“”'‘’]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && w.length > 2 && !stopwords.has(w) && !w.startsWith('@') && !w.startsWith('http'));
  const unique = [];
  for (const w of words) {
    if (!unique.includes(w)) unique.push(w);
  }
  if (unique.length === 0) return null;
  return unique.slice(0, 3);
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Instagram API error ${res.status}: ${text}`);
  }
  return res.json();
}

function getExtension(mediaType, url) {
  if (mediaType === 'VIDEO') return '.mp4';
  try {
    const u = new URL(url);
    const pathname = u.pathname || '';
    const ext = pathname.match(/\.(jpe?g|png|gif|webp)/i);
    if (ext) return ext[0].toLowerCase();
  } catch (_) {}
  return '.jpg';
}

async function downloadToFile(mediaUrl, filePath) {
  const res = await fetch(mediaUrl);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${mediaUrl}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.promises.writeFile(filePath, buf);
}

async function fetchAllMedia(accessToken, userId) {
  const fields = 'id,media_type,media_url,caption,timestamp,permalink';
  let url = `${BASE_URL}/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=100`;
  const all = [];

  while (url) {
    const data = await fetchJson(url);
    const list = data.data || [];
    all.push(...list);
    url = (data.paging && data.paging.next) || null;
  }

  return all;
}

async function fetchChildren(mediaId, accessToken) {
  const url = `${BASE_URL}/${mediaId}?fields=children{id,media_url,media_type}&access_token=${accessToken}`;
  const data = await fetchJson(url);
  return (data.children && data.children.data) || [];
}

function flattenMedia(rawList, accessToken) {
  const items = [];
  for (const m of rawList) {
    if (m.media_type === 'IMAGE' || m.media_type === 'VIDEO') {
      items.push({
        id: m.id,
        media_url: m.media_url,
        media_type: m.media_type,
        caption: m.caption || null,
        timestamp: m.timestamp,
        permalink: m.permalink || null,
      });
    } else if (m.media_type === 'CAROUSEL_ALBUM') {
      items.push({ _parent: m, _fetchChildren: true });
    }
  }
  return items;
}

async function resolveCarouselItems(items, accessToken) {
  const resolved = [];
  for (const item of items) {
    if (item._fetchChildren) {
      const parent = item._parent;
      const children = await fetchChildren(parent.id, accessToken);
      for (const c of children) {
        if (c.media_type === 'IMAGE' || c.media_type === 'VIDEO') {
          resolved.push({
            id: c.id,
            media_url: c.media_url,
            media_type: c.media_type,
            caption: parent.caption || null,
            timestamp: parent.timestamp,
            permalink: parent.permalink || null,
          });
        }
      }
    } else {
      resolved.push(item);
    }
  }
  return resolved;
}

async function main() {
  loadEnv();

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!accessToken || !userId) {
    console.error('Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_USER_ID');
    console.error('Add them to .env.local or .env in the project root, or export them in your shell.');
    process.exit(1);
  }
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key (SUPABASE_SERVICE_ROLE_KEY recommended)');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('Fetching media list from Instagram...');
  const rawList = await fetchAllMedia(accessToken, userId);
  let items = flattenMedia(rawList, accessToken);

  console.log('Resolving carousel albums...');
  items = await resolveCarouselItems(items, accessToken);

  console.log(`Found ${items.length} image(s)/video(s).`);

  await fs.promises.mkdir(OUT_DIR, { recursive: true });

  for (const item of items) {
    const ext = getExtension(item.media_type, item.media_url);
    const filename = `${item.id}${ext}`;
    const localPath = `/images/instagram/${filename}`;
    const filePath = path.join(OUT_DIR, filename);

    try {
      await downloadToFile(item.media_url, filePath);
    } catch (err) {
      console.warn(`Download failed for ${item.id}:`, err.message);
      continue;
    }

    const row = {
      id: item.id,
      media_url: item.media_url,
      local_path: localPath,
      caption: item.caption,
      timestamp: item.timestamp,
      permalink: item.permalink,
      media_type: item.media_type,
      tags: generateTags(item.caption),
    };

    const { error } = await supabase.from('instagram_posts').upsert(row, {
      onConflict: 'id',
      ignoreDuplicates: false,
    });
    if (error) console.warn(`Upsert failed for ${item.id}:`, error.message);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
