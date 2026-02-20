# Fix RLS Policy Issue - Step by Step

## Problem
You're seeing "Fetched 0 research publications" even though data exists in Supabase. This is an RLS (Row Level Security) policy issue.

## Solution

### Option 1: Quick Fix (Recommended)

1. Go to your **Supabase Dashboard** → **SQL Editor**
2. Copy and paste the **ENTIRE** contents of `scripts/verify-and-fix-rls.sql`
3. Click **Run**
4. Check the output - you should see:
   - Record counts for each table
   - Policies listed
   - Test queries returning counts > 0
5. **Restart your Next.js dev server**:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```
6. Refresh your website

### Option 2: Manual Fix

If Option 1 doesn't work, run these SQL commands one by one:

```sql
-- 1. Drop existing policies
DROP POLICY IF EXISTS "Allow public read access on research" ON research;
DROP POLICY IF EXISTS "Allow public read access on experiences" ON experiences;
DROP POLICY IF EXISTS "Allow public read access on supervision" ON supervision;

-- 2. Create new policies with explicit public access
CREATE POLICY "Allow public read access on research" 
ON research
FOR SELECT 
TO public
USING (true);

CREATE POLICY "Allow public read access on experiences" 
ON experiences
FOR SELECT 
TO public
USING (true);

CREATE POLICY "Allow public read access on supervision" 
ON supervision
FOR SELECT 
TO public
USING (true);
```

### Verify It Worked

After running the fix:
1. Check browser console - you should see: `✅ Successfully fetched X research publications`
2. Visit `/research` page - publications should appear
3. Visit `/experience` page - experiences should appear
4. Visit `/supervision` page - supervision records should appear

### Still Not Working?

1. **Check Supabase Dashboard** → **Authentication** → **Policies**
   - Make sure policies show `public` role, not `authenticated`
   
2. **Verify data exists**:
   ```sql
   SELECT COUNT(*) FROM research;
   ```
   Should return > 0

3. **Check environment variables**:
   - Make sure `.env.local` has correct values
   - Restart dev server after changing `.env.local`

4. **Check browser console** for specific error messages

### Common Mistakes

- ❌ Using `TO authenticated` instead of `TO public`
- ❌ Forgetting to restart dev server after changing `.env.local`
- ❌ Using service_role key instead of anon key (for client-side)
- ❌ Policies not created (RLS enabled but no policies)
