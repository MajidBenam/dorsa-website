# Quick Start Guide

Get your website up and running in 5 steps!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Add Your CV PDF

Place your CV PDF file in the `public/cv/` directory:
```bash
cp "path/to/your/cv.pdf" public/cv/"Dorsa Updated CV Feb 2026.pdf"
```

Or update the filename in `app/cv/page.tsx` to match your file.

## Step 3: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for project initialization
4. Go to SQL Editor
5. Copy and paste the entire contents of `supabase-setup.sql`
6. Click "Run"
7. Go to Project Settings > API
8. Copy your Project URL and API keys

## Step 4: Configure Environment Variables

Create `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Next Steps

1. **Add Content**: Use Supabase dashboard to add experiences, research, and supervision records
2. **Customize**: Update content in the `app/` directory pages
3. **Deploy**: Follow instructions in `DEPLOYMENT.md` to deploy to Vercel

## Troubleshooting

**Port already in use?**
```bash
npm run dev -- -p 3001
```

**Build errors?**
- Make sure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be 18.17.0+)

**Database connection errors?**
- Verify Supabase project is active
- Check environment variables are correct
- Ensure SQL script was run successfully

**PDF not loading?**
- Verify file exists in `public/cv/` directory
- Check filename matches exactly (case-sensitive)
- Try accessing directly: `http://localhost:3000/cv/Dorsa Updated CV Feb 2026.pdf`

## Need Help?

- Check `README.md` for detailed documentation
- See `DEPLOYMENT.md` for deployment instructions
- Review `PROJECT_SUMMARY.md` for project overview
