import Link from "next/link";
import type { Metadata } from "next";
import { getAllBlogPostsMetadata } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Poyraz Avsever - My Blog Posts",
  description:
    "A curated list of my latest writing, notes, and engineering learnings.",
  icons: {
    icon: "../favicon.ico",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllBlogPostsMetadata();

  return (
    <main className="max-w-6xl px-6 py-16 lg:pl-96">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-(--color-text)">My Blog Posts</h1>
      </header>

      <article className="mdx-content mt-10">
        {posts.length === 0 ? (
          <p className="text-(--color-muted)">No posts yet.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="text-(--color-text) hover:underline">
                  {post.title}
                </Link>
                {post.date && <span className="text-(--color-muted)"> — {post.date}</span>}
              </li>
            ))}
          </ul>
        )}
      </article>
    </main>
  );
}
