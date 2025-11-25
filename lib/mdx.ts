import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/pages");

export type PageLink = {
  label: string;
  href: string;
};

export type PageMeta = {
  slug: string;
  title: string;
  order: number;
  tags: string[];
  description?: string;
  links: PageLink[];
};

export type LoadedPage = {
  meta: PageMeta;
  content: string;
};

const normalizeMeta = (slug: string, data: Record<string, unknown>): PageMeta => ({
  slug: (data.slug as string) ?? slug,
  title: (data.title as string) ?? slug,
  order: typeof data.order === "number" ? data.order : 0,
  tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
  description: typeof data.description === "string" ? data.description : undefined,
  links: Array.isArray(data.links) ? (data.links as PageLink[]) : [],
});

export async function getAllPageMetadata(): Promise<PageMeta[]> {
  const entries = await fs.readdir(CONTENT_DIR);
  const mdxFiles = entries.filter((file) => file.endsWith(".mdx"));

  const pages = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(CONTENT_DIR, file);
      const source = await fs.readFile(filePath, "utf-8");
      const { data } = matter(source);
      return normalizeMeta(slug, data);
    }),
  );

  return pages.sort((a, b) => a.order - b.order);
}

export async function getPageBySlug(slug: string): Promise<LoadedPage | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const source = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(source);
    return {
      meta: normalizeMeta(slug, data),
      content,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}
