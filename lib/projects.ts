import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export type ProjectMeta = {
  slug: string;
  title: string;
  description?: string;
  tags: string[];
  links: Array<{
    label: string;
    href: string;
    target?: "_blank" | "_self";
  }>;
};

export type LoadedProject = {
  meta: ProjectMeta;
  content: string;
};

const normalizeMeta = (slug: string, data: Record<string, unknown>): ProjectMeta => ({
  slug: (data.slug as string) ?? slug,
  title: (data.title as string) ?? slug,
  description: typeof data.description === "string" ? data.description : undefined,
  tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
  links: Array.isArray(data.links)
    ? (data.links as ProjectMeta["links"])
    : [],
});

export async function getAllProjectMetadata(): Promise<ProjectMeta[]> {
  try {
    const entries = await fs.readdir(PROJECTS_DIR);
    const mdxFiles = entries.filter((file) => file.endsWith(".mdx"));

    const projects = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(PROJECTS_DIR, file);
        const source = await fs.readFile(filePath, "utf-8");
        const { data } = matter(source);
        return normalizeMeta(slug, data);
      }),
    );

    return projects.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function getProjectBySlug(slug: string): Promise<LoadedProject | null> {
  try {
    const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
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
