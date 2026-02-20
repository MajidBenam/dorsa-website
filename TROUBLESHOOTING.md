# Troubleshooting Guide

## Issue: Data exists in Supabase but doesn't show on website

If you see "Fetched 0 research publications from database" but data exists in Supabase, follow these steps:

### Step 1: Verify RLS Policies

Run this SQL in Supabase SQL Editor:

```sql
-- Check if policies exist
SELECT 
  tablename,
  policyname,
  cmd,
  roles
FROM pg_policies 
WHERE tablename IN ('research', 'experiences', 'supervision')
ORDER BY tablename;
```

If policies are missing or incorrect, run `scripts/fix-rls-policies.sql`

### Step 2: Test Direct Query

Run this in Supabase SQL Editor to verify data is accessible:

```sql
SELECT COUNT(*) FROM research;
SELECT COUNT(*) FROM experiences;
SELECT COUNT(*) FROM supervision;
```

If these return 0, the data wasn't inserted. Run `scripts/cv-data-insert.sql` again.

### Step 3: Check Environment Variables

Verify your `.env.local` file has:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Important**: After changing `.env.local`, you MUST restart your dev server:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Step 4: Check Browser Console

Open browser DevTools (F12) and check the Console tab for:
- Supabase connection errors
- RLS policy errors
- Network errors

Look for messages like:
- "permission denied"
- "new row violates row-level security policy"
- "JWT expired"

### Step 5: Verify RLS Policies Allow Public Access

The policies should be:
```sql
CREATE POLICY "Allow public read access on research" ON research
  FOR SELECT 
  TO public
  USING (true);
```

If you see `TO authenticated` instead of `TO public`, that's the issue!

### Step 6: Test with Service Role Key (Temporary)

As a test, temporarily use the service role key in your client (NOT recommended for production):

```typescript
// In lib/supabase.ts - TEMPORARY TEST ONLY
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '', // Use service role temporarily
);
```

If this works, the issue is definitely RLS policies. Fix them and switch back to anon key.

### Common Issues

1. **RLS enabled but no policies**: Tables are locked, need policies
2. **Policies use `authenticated` instead of `public`**: Change to `TO public`
3. **Environment variables not loaded**: Restart dev server
4. **Wrong anon key**: Double-check you're using the `anon` `public` key, not `service_role`

### Quick Fix Script

Run `scripts/fix-rls-policies.sql` in Supabase SQL Editor - this will recreate all policies correctly.
