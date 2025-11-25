import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogMeta = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  tags: string[];
};

export type LoadedBlogPost = {
  meta: BlogMeta;
  content: string;
};

const normalizeMeta = (slug: string, data: Record<string, unknown>): BlogMeta => ({
  slug: (data.slug as string) ?? slug,
  title: (data.title as string) ?? slug,
  description: typeof data.description === "string" ? data.description : undefined,
  date: typeof data.date === "string" ? data.date : undefined,
  tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
});

export async function getAllBlogPostsMetadata(): Promise<BlogMeta[]> {
  const entries = await fs.readdir(BLOG_DIR);
  const mdxFiles = entries.filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(BLOG_DIR, file);
      const source = await fs.readFile(filePath, "utf-8");
      const { data } = matter(source);
      return normalizeMeta(slug, data);
    }),
  );

  return posts.sort((a, b) => {
    const aDate = a.date ? new Date(a.date).getTime() : 0;
    const bDate = b.date ? new Date(b.date).getTime() : 0;
    if (aDate && bDate && aDate !== bDate) {
      return bDate - aDate;
    }
    return a.title.localeCompare(b.title);
  });
}

export async function getBlogPostBySlug(slug: string): Promise<LoadedBlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
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
