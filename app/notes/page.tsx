import type { Metadata } from "next";
import PdfViewer from "@/app/components/notes/pdf-viewer";
import { getAllNoteFiles } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Poyraz Avsever - My Notes",
  description: "A focused reading space that collects my raw study notes and references as PDF files.",
  icons: {
    icon: "../favicon.ico",
  },
};

export default async function NotesPage() {
  const notes = await getAllNoteFiles();

  return (
    <main className="max-w-7xl px-6 py-16 lg:pl-96">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-(--color-text)">My Notes</h1>
        <p className="text-(--color-muted)">
          Everything here is a direct export from my study sessions. Drop your PDFs into <code>content/notes</code> to
          update this shelf automatically, then tap any card to open a distraction-free modal reader.
        </p>
      </header>

      <section className="mt-10">
        {notes.length === 0 ? (
          <p className="rounded-2xl border border-(--color-border) bg-(--color-surface)/60 px-4 py-6 text-(--color-muted)">
            No notes yet. Add PDF files under <code>content/notes</code> and they will show up here instantly.
          </p>
        ) : (
          <div className="grid gap-8">
            {notes.map((note) => (
              <PdfViewer
                key={note.slug}
                title={note.title}
                description={note.description}
                tags={note.tags}
                date={note.date}
                fileUrl={`/api/notes/${encodeURIComponent(note.slug)}`}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
