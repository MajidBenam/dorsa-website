# Database Setup Reminder

## Why You're Seeing "No Data Available"

The website is currently showing "No research publications available" because the Supabase database hasn't been populated yet. The SQL INSERT statements have been prepared but need to be executed.

## Quick Setup Steps

### 1. Verify Supabase Configuration

Check that your `.env.local` file has:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Run Database Setup SQL

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the contents of `supabase-setup.sql` first (creates tables)
4. Then run the contents of `scripts/cv-data-insert.sql` (inserts data)

### 3. Verify Data Was Inserted

After running the SQL, you can verify in Supabase:
- Go to **Table Editor**
- Check the `research` table - you should see 14 publications
- Check the `experiences` table - you should see 5 experiences
- Check the `supervision` table - you should see 3 supervision records

### 4. Restart Development Server

After adding data, restart your Next.js dev server:
```bash
npm run dev
```

## Troubleshooting

**If data still doesn't show:**

1. **Check browser console** - Look for Supabase connection errors
2. **Verify RLS policies** - Make sure Row Level Security allows SELECT operations
3. **Check environment variables** - Ensure they're loaded (restart dev server after adding)
4. **Verify table names** - Tables should be exactly: `research`, `experiences`, `supervision`, `contact_submissions`

## Quick Test Query

You can test the connection by running this in Supabase SQL Editor:
```sql
SELECT COUNT(*) FROM research;
```

This should return 14 if the data was inserted correctly.
