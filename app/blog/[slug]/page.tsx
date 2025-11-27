import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import rehypeHighlight from "rehype-highlight";
import { getAllBlogPostsMetadata, getBlogPostBySlug } from "@/lib/blog";

type PageParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getAllBlogPostsMetadata();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return {};
  }

  return {
    title: `Poyraz Avsever - ${post.meta.title}`,
    description: post.meta.description,
    keywords: post.meta.tags,
    icons: {
      icon: "../favicon.ico",
    },
  };
}

export default async function BlogPostPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [rehypeHighlight],
      },
    },
  });

  return (
    <main className="max-w-6xl px-6 py-16 lg:pl-96">
      <div className="flex items-center gap-3 text-sm text-(--color-muted)">
        <Link
          href="/blog"
          className="flex items-center gap-2 rounded-full border border-(--color-border) px-3 py-1 transition hover:border-(--color-accent) hover:text-(--color-accent)"
        >
          <Icon icon="solar:arrow-left-line-duotone" className="text-lg" />
          Back to posts
        </Link>
        {post.meta.date && (
          <span className="rounded-full border border-(--color-border) px-3 py-1 text-(--color-text)">
            {post.meta.date}
          </span>
        )}
      </div>

      <header className="mt-6 space-y-3">
        <h1 className="text-4xl font-semibold text-(--color-text)">{post.meta.title}</h1>
        {post.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-(--color-muted)">
            {post.meta.tags.map((tag) => (
              <span key={tag} className="rounded-lg border border-(--color-border) px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {post.meta.description && (
          <p className="text-(--color-muted)">{post.meta.description}</p>
        )}
      </header>

      <article className="mdx-content mt-10 max-w-none">
        {content}
      </article>
    </main>
  );
}
