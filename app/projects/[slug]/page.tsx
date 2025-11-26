import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import rehypeHighlight from "rehype-highlight";
import { getAllProjectMetadata, getProjectBySlug } from "@/lib/projects";

type PageParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const projects = await getAllProjectMetadata();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return {};
  }

  return {
    title: `${project.meta.title} – Project Detail`,
    description: project.meta.description,
    keywords: project.meta.tags,
  };
}

export default async function ProjectDetailPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { content } = await compileMDX({
    source: project.content,
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
          href="/projects"
          className="flex items-center gap-2 rounded-full border border-(--color-border) px-3 py-1 transition hover:border-(--color-accent) hover:text-(--color-accent)"
        >
          <Icon icon="solar:arrow-left-line-duotone" className="text-lg" />
          Back to projects
        </Link>
      </div>

      <header className="mt-6 space-y-3">
        <h1 className="text-4xl font-semibold text-(--color-text)">{project.meta.title}</h1>
        {project.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-(--color-muted)">
            {project.meta.tags.map((tag) => (
              <span key={tag} className="rounded-lg border border-(--color-border) px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {project.meta.description && (
          <p className="text-(--color-muted)">{project.meta.description}</p>
        )}
        {project.meta.links.length > 0 && (
          <div className="flex flex-wrap gap-2 text-sm">
            {project.meta.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.target ?? "_blank"}
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-(--color-border) px-3 py-1 transition hover:border-(--color-accent) hover:text-(--color-accent)"
              >
                {link.label}
                <Icon icon="solar:arrow-right-up-linear" className="text-base" />
              </a>
            ))}
          </div>
        )}
      </header>

      <article className="mdx-content mt-10 max-w-none">{content}</article>
    </main>
  );
}
