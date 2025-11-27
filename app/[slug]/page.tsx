import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getAllPageMetadata, getPageBySlug } from "@/lib/mdx";
import { Icon } from "@iconify/react";
import rehypeHighlight from "rehype-highlight";

type PageParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const pages = await getAllPageMetadata();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) {
    return {};
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
    keywords: page.meta.tags,
  };
}

export default async function ContentPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) {
    notFound();
  }

  const { content } = await compileMDX({
    source: page.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [rehypeHighlight],
      },
    },
  });

  return (
    <main className="max-w-6xl px-6 py-16 sm:pl-96">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-(--color-text)">
          {page.meta.title}
        </h1>
        {page.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-(--color-muted)">
            {page.meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-(--color-border) px-3 py-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {page.meta.links.length > 0 && (
          <div className="flex flex-wrap gap-2 text-sm">
            {page.meta.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.target || "_self"}
                className="rounded-lg border border-(--color-border) px-3 py-1 bg-(--color-surface) text-(--color-text) transition hover:border-(--color-accent) hover:text-(--color-accent)"
              >
                {link.label}
                <Icon
                  icon="solar:arrow-right-up-line-duotone"
                  className="ml-1 inline h-3 w-3 text-[--color-accent-soft]"
                />
              </a>
            ))}
          </div>
        )}
      </header>

      <article className="mdx-content mt-10 max-w-none">
        {content}
      </article>
    </main>
  );
}
