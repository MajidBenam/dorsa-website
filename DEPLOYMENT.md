# Deployment Guide

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com) if you don't have one
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have one
3. **Domain Name**: Your custom domain should be ready

## Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized
3. Go to the SQL Editor in your Supabase dashboard
4. Copy and paste the contents of `supabase-setup.sql` into the SQL Editor
5. Click "Run" to execute the SQL script
6. Verify that all tables are created:
   - `experiences`
   - `research`
   - `supervision`
   - `contact_submissions`
7. Go to Project Settings > API
8. Copy the following values:
   - Project URL
   - `anon` `public` key
   - `service_role` key (keep this secret!)

## Step 2: Prepare Your CV PDF

1. Place your CV PDF file in the `public/cv/` directory
2. Name it exactly: `Dorsa Updated CV Feb 2026.pdf`
   - Or update the filename in `app/cv/page.tsx` to match your file name

## Step 3: Set Up Environment Variables Locally

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. Test locally:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 to verify everything works

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Push your code to GitHub (create a repository if needed)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Next.js (should be auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
7. Click "Deploy"
8. Wait for deployment to complete

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts and add environment variables when asked

## Step 5: Configure Custom Domain

1. In Vercel dashboard, go to your project
2. Navigate to Settings > Domains
3. Add your custom domain
4. Follow the DNS configuration instructions:
   - Add an A record pointing to Vercel's IP (provided in dashboard)
   - Or add a CNAME record pointing to your Vercel deployment URL
5. Wait for DNS propagation (can take up to 48 hours, usually much faster)
6. SSL certificate will be automatically provisioned by Vercel

## Step 6: Add Initial Content

After deployment, you'll need to add content to your Supabase database:

### Add Experiences

Go to Supabase Dashboard > Table Editor > `experiences` and insert rows, or use SQL:

```sql
INSERT INTO experiences (title, slug, description, content, hospital_name, date, category)
VALUES (
  'Example Case Title',
  'example-case-title',
  'Brief description of the case...',
  'Full detailed content about the case...',
  'Hospital Name',
  '2024-01-15',
  'Cardiology'
);
```

### Add Research

```sql
INSERT INTO research (title, authors, publication_date, journal_name, description, link)
VALUES (
  'Research Paper Title',
  'Dorsa, J. et al.',
  '2024-03-01',
  'Medical Journal Name',
  'Description of the research...',
  'https://example.com/publication-link'
);
```

### Add Supervision Records

```sql
INSERT INTO supervision (title, description, institution, year, type)
VALUES (
  'PhD Thesis Supervision',
  'Supervised PhD student in medical research focusing on...',
  'University Name',
  2024,
  'PhD'
);
```

## Troubleshooting

### Build Errors

- Check that all environment variables are set correctly in Vercel
- Verify Node.js version compatibility (should be 18.17.0+)
- Check build logs in Vercel dashboard for specific errors

### Database Connection Issues

- Verify Supabase project is active
- Check that RLS policies are set correctly
- Ensure environment variables match your Supabase project

### PDF Not Loading

- Verify the PDF file exists in `public/cv/` directory
- Check that the filename matches exactly (case-sensitive)
- Ensure the file is committed to your repository

### Contact Form Not Working

- Check Supabase RLS policies allow INSERT on `contact_submissions`
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Check Vercel function logs for errors

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Navigation works
- [ ] CV PDF loads and can be downloaded
- [ ] Contact form submits successfully
- [ ] Custom domain is configured and working
- [ ] SSL certificate is active (HTTPS)
- [ ] Content is added to database
- [ ] Images load correctly (if using)
- [ ] Mobile responsive design works

## Maintenance

- Regularly update content via Supabase dashboard
- Monitor contact form submissions in Supabase
- Keep dependencies updated: `npm update`
- Backup Supabase database regularly
- Monitor Vercel analytics for performance
