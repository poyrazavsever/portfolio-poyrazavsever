import fs from "node:fs/promises";
import path from "node:path";

const NOTES_DIR = path.join(process.cwd(), "content/notes");

export type NoteFile = {
  slug: string;
  title: string;
  fileName: string;
};

const formatTitle = (slug: string) =>
  slug
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

export async function getAllNoteFiles(): Promise<NoteFile[]> {
  try {
    const entries = await fs.readdir(NOTES_DIR);
    const pdfFiles = entries.filter((file) => file.toLowerCase().endsWith(".pdf"));

    return pdfFiles
      .map((file) => {
        const slug = file.replace(/\.pdf$/i, "");
        return {
          slug,
          title: formatTitle(slug),
          fileName: file,
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
