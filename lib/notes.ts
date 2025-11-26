import fs from "node:fs/promises";
import path from "node:path";

const NOTES_DIR = path.join(process.cwd(), "content/notes");
const METADATA_FILE = path.join(NOTES_DIR, "metadata.json");

type NoteMetadata = {
  title?: string;
  description?: string;
  tags?: string[];
  date?: string;
};

export type NoteFile = {
  slug: string;
  title: string;
  fileName: string;
  description?: string;
  tags: string[];
  date?: string;
};

const formatTitle = (slug: string) =>
  slug
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const loadMetadata = async (): Promise<Record<string, NoteMetadata>> => {
  try {
    const raw = await fs.readFile(METADATA_FILE, "utf-8");
    return JSON.parse(raw) as Record<string, NoteMetadata>;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return {};
    }
    throw error;
  }
};

export async function getAllNoteFiles(): Promise<NoteFile[]> {
  try {
    const entries = await fs.readdir(NOTES_DIR);
    const pdfFiles = entries.filter((file) => file.toLowerCase().endsWith(".pdf"));
    const metadata = await loadMetadata();

    return pdfFiles
      .map((file) => {
        const slug = file.replace(/\.pdf$/i, "");
        const meta = metadata[slug.toLowerCase()];
        return {
          slug,
          title: meta?.title ?? formatTitle(slug),
          fileName: file,
          description: meta?.description,
          tags: Array.isArray(meta?.tags) ? meta.tags ?? [] : [],
          date: typeof meta?.date === "string" ? meta.date : undefined,
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}
