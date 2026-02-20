export interface Experience {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  hospital_name: string;
  date_from: string;
  date_to: string | null;
  category: string;
  featured_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Research {
  id: string;
  title: string;
  authors: string;
  publication_date: string;
  publication_date_to?: string | null;
  journal_name: string | null;
  description: string;
  link: string | null;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Supervision {
  id: string;
  title: string;
  description: string;
  student_name: string | null;
  institution: string;
  year: number;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  read: boolean;
}
