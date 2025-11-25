import { redirect } from "next/navigation";
import { getAllPageMetadata } from "@/lib/mdx";

export default async function Home() {
  const pages = await getAllPageMetadata();

  if (pages.length > 0) {
    redirect(`/${pages[0].slug}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-(--color-muted)">Obsidian Workspace</p>
        <h1 className="mt-4 text-4xl font-semibold text-(--color-text)">Yeni içerik eklemek için ilk .mdx dosyanı oluştur.</h1>
      </div>
    </main>
  );
}
