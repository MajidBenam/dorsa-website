# CV Data Extraction Guide

Since automatic PDF parsing has limitations, here's a guide to manually extract CV information:

## Step 1: Review the CV PDF

Open `public/cv/Dorsa Updated CV Feb 2026.pdf` and review its contents.

## Step 2: Extract Key Information

### Education
- Degrees obtained
- Institutions
- Years of graduation

### Professional Experience
- Job titles
- Hospitals/Organizations
- Dates/Periods
- Key responsibilities or achievements

### Research Publications
- Publication titles
- Authors (especially if Dr. Dorsa is first author)
- Journal names
- Publication dates/years
- Links or DOIs if available

### Supervision Experience
- Types of supervision (PhD, Master's, Clinical, etc.)
- Number of students supervised
- Institutions
- Years

### Certifications & Skills
- Professional certifications
- Specialized skills
- Languages

## Step 3: Create SQL INSERT Statements

Use the following templates to create SQL INSERT statements:

### For Research Publications:

```sql
INSERT INTO research (title, authors, publication_date, journal_name, description, link)
VALUES (
  'Publication Title Here',
  'Dorsa, J. et al.',
  '2024-01-01',  -- Use actual publication date
  'Journal Name',
  'Brief description of the research',
  'https://link-to-publication.com'  -- Optional
);
```

### For Experiences:

```sql
INSERT INTO experiences (title, slug, description, content, hospital_name, date, category)
VALUES (
  'Case Title or Experience Title',
  'slug-version-of-title',  -- e.g., 'complex-cardiac-surgery'
  'Brief description (1-2 sentences)',
  'Full detailed content about the experience, case, or achievement. Can be multiple paragraphs.',
  'Hospital or Organization Name',
  '2024-01-15',  -- Date of the experience
  'Cardiology'  -- Category (e.g., Cardiology, Surgery, Research, etc.)
);
```

### For Supervision:

```sql
INSERT INTO supervision (title, description, institution, year, type)
VALUES (
  'PhD Thesis Supervision - [Student Name or Topic]',
  'Supervised PhD student in [field]. [Brief description of the work].',
  'University Name',
  2024,  -- Year
  'PhD'  -- Type: PhD, Master's, Clinical, etc.
);
```

## Step 4: Run SQL in Supabase

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Paste and run your INSERT statements
4. Verify data appears in the tables

## Step 5: Update Home Page Statistics

After adding data, update the statistics in `app/page.tsx` and `components/Hero.tsx` to reflect actual numbers:
- Years of Experience
- Number of Publications
- Number of Students Supervised
- Number of Cases/Experiences

## Tips

- Start with a few entries to test
- Use consistent formatting for dates (YYYY-MM-DD)
- Create meaningful slugs for experiences (lowercase, hyphens)
- Add featured images later if desired (upload to Supabase Storage or use external URLs)
- Review and refine content after initial import
