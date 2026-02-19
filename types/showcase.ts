export interface ShowcaseProject {
  id?: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  year: string;
  category: string;
  galleryImages: string[];
  mermaid?: string;
  client?: string;
  links?: {
    demo?: string;
    repo?: string;
  };
}
