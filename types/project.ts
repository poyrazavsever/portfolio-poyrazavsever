export interface Project {
  id?: string;
  title: string;
  description: string; // Used for short summary
  coverImage: string;
  tags: string[];
  year: string;
  category: string; // e.g., "SaaS", "Mobile App", "Branding"

  // Detailed Content
  client?: string; // Optional client name
  role?: string; // e.g. "Lead Developer", "UI Designer"

  problem?: string;
  solution?: string;
  features?: string[]; // Key features list

  designProcess?: string; // Markdown or text
  technicalDetails?: string; // Markdown or text
  lessonsLearned?: string; // Markdown or text

  galleryImages?: string[]; // Array of image URLs for the sheet gallery
  mermaid?: string; // Optional Mermaid diagram string

  links?: {
    demo?: string;
    repo?: string;
    caseStudy?: string;
  };
}
