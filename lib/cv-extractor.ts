// CV Content Extractor
// This file contains helper functions to extract structured information from CV text
// The CV PDF should be parsed first and the text content passed to these functions

export interface ExtractedCVData {
  name?: string;
  email?: string;
  phone?: string;
  education?: Array<{
    degree: string;
    institution: string;
    year?: string;
  }>;
  experience?: Array<{
    title: string;
    organization: string;
    period?: string;
    description?: string;
  }>;
  publications?: Array<{
    title: string;
    authors: string;
    journal?: string;
    year?: string;
  }>;
  supervision?: Array<{
    type: string;
    count?: number;
    description?: string;
  }>;
  skills?: string[];
  certifications?: string[];
}

export function extractEmail(text: string): string | null {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const matches = text.match(emailRegex);
  return matches ? matches[0] : null;
}

export function extractPhone(text: string): string | null {
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const matches = text.match(phoneRegex);
  return matches ? matches[0] : null;
}

export function extractPublications(text: string): ExtractedCVData['publications'] {
  const publications: ExtractedCVData['publications'] = [];
  
  // Common patterns for publications
  const patterns = [
    /([A-Z][^.!?]+(?:et al\.)?)\s*\((\d{4})\)\s*([^.!?]+)\.?\s*([A-Z][^.!?]+)?/g,
  ];
  
  // This is a simplified extractor - you may need to customize based on CV format
  const lines = text.split('\n');
  let currentPublication: any = null;
  
  for (const line of lines) {
    // Look for publication indicators
    if (line.match(/\d{4}/) && (line.includes('Journal') || line.includes('Published') || line.includes('et al'))) {
      // Try to extract publication info
      const yearMatch = line.match(/(\d{4})/);
      if (yearMatch) {
        publications.push({
          title: line.substring(0, 100), // Simplified
          authors: 'Extracted from CV',
          year: yearMatch[1],
        });
      }
    }
  }
  
  return publications.length > 0 ? publications : undefined;
}

export function parseCVText(cvText: string): ExtractedCVData {
  const data: ExtractedCVData = {};
  
  // Extract basic contact info
  data.email = extractEmail(cvText);
  data.phone = extractPhone(cvText);
  
  // Extract publications
  data.publications = extractPublications(cvText);
  
  // Note: More sophisticated parsing would be needed for full extraction
  // This is a starting point that can be enhanced based on the actual CV format
  
  return data;
}

// Helper function to generate SQL INSERT statements from extracted data
export function generateSQLInserts(data: ExtractedCVData): string[] {
  const inserts: string[] = [];
  
  if (data.publications) {
    data.publications.forEach((pub, index) => {
      const title = pub.title.replace(/'/g, "''");
      const authors = pub.authors.replace(/'/g, "''");
      const journal = pub.journal ? pub.journal.replace(/'/g, "''") : 'NULL';
      const year = pub.year || '2024';
      
      inserts.push(`
INSERT INTO research (title, authors, publication_date, journal_name, description, created_at)
VALUES (
  '${title}',
  '${authors}',
  '${year}-01-01',
  ${journal === 'NULL' ? 'NULL' : `'${journal}'`},
  'Publication extracted from CV',
  NOW()
);`);
    });
  }
  
  return inserts;
}
