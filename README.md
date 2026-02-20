# Dr. Dorsa - Personal Professional Website

A modern, professional personal website built with Next.js, Tailwind CSS, and Supabase.

## Features

- **Home Page**: Hero section with highlights and featured content
- **About Page**: Professional biography and expertise areas
- **Experience Page**: Hospital cases and professional experiences
- **Research Page**: Publications and research projects
- **Supervision Page**: Academic supervision and mentorship experience
- **CV Page**: Embedded PDF viewer with download option
- **Contact Page**: Contact form with Supabase integration

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **PDF Viewer**: react-pdf
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dorsa
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run the following SQL in your Supabase SQL Editor to create the required tables:

```sql
-- Create experiences table
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  hospital_name TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  featured_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create research table
CREATE TABLE research (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  publication_date DATE NOT NULL,
  journal_name TEXT,
  description TEXT NOT NULL,
  link TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create supervision table
CREATE TABLE supervision (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  student_name TEXT,
  institution TEXT NOT NULL,
  year INTEGER NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_experiences_slug ON experiences(slug);
CREATE INDEX idx_experiences_date ON experiences(date DESC);
CREATE INDEX idx_research_date ON research(publication_date DESC);
CREATE INDEX idx_supervision_year ON supervision(year DESC);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE research ENABLE ROW LEVEL SECURITY;
ALTER TABLE supervision ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on experiences" ON experiences
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on research" ON research
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on supervision" ON supervision
  FOR SELECT USING (true);

-- Allow authenticated users to insert contact submissions
CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_updated_at
  BEFORE UPDATE ON research
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_supervision_updated_at
  BEFORE UPDATE ON supervision
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

3. Get your Supabase credentials:
   - Go to Project Settings > API
   - Copy the Project URL and anon/public key
   - Copy the service_role key (keep this secret!)

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
dorsa/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── experience/        # Experience pages
│   ├── research/          # Research page
│   ├── supervision/       # Supervision page
│   ├── cv/                # CV page
│   ├── contact/           # Contact page
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility functions
├── types/                 # TypeScript types
└── public/                # Static assets
    └── cv/                # CV PDF file
```

## Adding Content

### Adding Experiences

Insert data into the `experiences` table via Supabase dashboard or SQL:

```sql
INSERT INTO experiences (title, slug, description, content, hospital_name, date, category)
VALUES (
  'Complex Cardiac Surgery Case',
  'complex-cardiac-surgery-case',
  'Successfully managed a complex cardiac surgery case...',
  'Full detailed content here...',
  'General Hospital',
  '2024-01-15',
  'Cardiology'
);
```

### Adding Research

```sql
INSERT INTO research (title, authors, publication_date, journal_name, description, link)
VALUES (
  'Advances in Medical Treatment',
  'Dorsa, J. et al.',
  '2024-03-01',
  'Medical Journal',
  'Description of the research...',
  'https://example.com/publication'
);
```

### Adding Supervision Records

```sql
INSERT INTO supervision (title, description, institution, year, type)
VALUES (
  'PhD Thesis Supervision',
  'Supervised PhD student in medical research...',
  'University Name',
  2024,
  'PhD'
);
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

### Custom Domain

1. In Vercel dashboard, go to your project settings
2. Navigate to Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables

Create a `.env.local` file (not committed to git) with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## License

Private project - All rights reserved.
