// Classify Instagram posts as 'personal' or 'professional' based on captions.
// Run: node scripts/classify-instagram-professional-personal.js

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const ROOT = path.join(__dirname, '..');

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

function classifyCaption(caption) {
  if (!caption || !caption.trim()) return null;
  const text = caption.toLowerCase();

  const professionalKeywords = [
    'pathology','pathologist','biopsy','slide','microscope','tumor','tumour', 'case',
    'case report','case-report','case series','histology','histopathology', 'smear',
    'lab','laboratory','conference','congress','meeting','lecture','seminar',
    'grand round','grand rounds','lung','fellow','clinic','analysis', 'cystic', 
    'lesion', 'a case','abstract','acute','research','cell', 'gallbladder', 'pancreas',
    'diagnosis','specimen','section','shapes','ihc', 'y/o', 'endometrium',
    'polypoid', 'cholestrolosis',
  ];

  const personalKeywords = [
    'family','friends','vacation','pas encore','trip','travel','neige','mountain',
    'birthday','party','wedding','infiniment','my son','comme','my kids',
    'my child','automne','my husband','cloudy','en rose','mother','father','sister',
    'brother','cousin','nephew','lovely corner','home','spring','coffee','dinner',
    'lunch','autumn','picnic'
  ];

  const hasProfessional = professionalKeywords.some((k) => text.includes(k));
  const hasPersonal = personalKeywords.some((k) => text.includes(k));

  if (hasProfessional && !hasPersonal) return 'professional';
  if (hasPersonal && !hasProfessional) return 'personal';
  // If both or neither, stay neutral
  return null;
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

  const { data, error } = await supabase
    .from('instagram_posts')
    .select('id, caption, tags');

  if (error) {
    console.error('Error fetching instagram_posts:', error.message);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('No instagram_posts found.');
    return;
  }

  console.log(`Classifying ${data.length} post(s) as personal/professional...`);

  for (const row of data) {
    const label = classifyCaption(row.caption);
    if (!label) continue; // leave ambiguous posts unchanged

    const existing = Array.isArray(row.tags) ? row.tags : [];
    if (existing.includes(label)) continue; // already tagged

    const updatedTags = [...existing, label];

    const { error: updateError } = await supabase
      .from('instagram_posts')
      .update({ tags: updatedTags })
      .eq('id', row.id);

    if (updateError) {
      console.warn(`Failed to update ${row.id}:`, updateError.message);
    } else {
      console.log(`Post ${row.id}: added tag '${label}'`);
    }
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

