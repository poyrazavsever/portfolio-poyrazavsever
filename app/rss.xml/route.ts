import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAllBlogPostsMetadata, getBlogPostBySlug } from "@/lib/blog";
import type { LoadedBlogPost } from "@/lib/blog";
import { getAllNoteFiles } from "@/lib/notes";

const SITE_URL = "https://poyrazavsever.com";
const SITE_TITLE = "Poyraz Avsever Blog";
const SITE_DESCRIPTION = "Personal blog of Poyraz Avsever - Developer and Designer";
const FEED_URL = `${SITE_URL}/rss.xml`;
const NOTES_DIR = path.join(process.cwd(), "content/notes");

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const wrapCdata = (value: string) => `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

const normalizeDate = (value?: string) => {
  if (!value) {
    return new Date();
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const formatContent = (content: string) => {
  if (!content.trim()) {
    return "";
  }

  const sanitized = content
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => {
      const escaped = escapeHtml(block);
      return `<p>${escaped.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");

  return sanitized;
};

type FeedItem = {
  title: string;
  description: string;
  link: string;
  guid: string;
  pubDate: string;
  categories?: string[];
  contentHtml?: string;
};

const buildItemXml = (item: FeedItem) => {
  const categories = item.categories?.length
    ? item.categories.map((tag) => `<category>${wrapCdata(tag)}</category>`).join("")
    : "";
  const encodedContent = item.contentHtml
    ? `<content:encoded>${wrapCdata(item.contentHtml)}</content:encoded>`
    : "";

  return `
    <item>
      <title>${wrapCdata(item.title)}</title>
      <description>${wrapCdata(item.description)}</description>
      ${encodedContent}
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
      <pubDate>${item.pubDate}</pubDate>
      ${categories}
    </item>
  `;
};

const generateRssXml = (items: FeedItem[]) => {
  const currentDate = new Date().toUTCString();

  const sortedItems = [...items].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );

  const itemsXml = sortedItems.map((item) => buildItemXml(item)).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${wrapCdata(SITE_TITLE)}</title>
    <description>${wrapCdata(SITE_DESCRIPTION)}</description>
    <link>${SITE_URL}</link>
    <language>en-us</language>
    <managingEditor>poyrazavsever@gmail.com (Poyraz Avsever)</managingEditor>
    <webMaster>poyrazavsever@gmail.com (Poyraz Avsever)</webMaster>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/avatars/activitybar.jpeg</url>
      <title>${wrapCdata(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`;
};

export async function GET() {
  try {
    const metas = await getAllBlogPostsMetadata();
    const posts = (
      await Promise.all(metas.map((meta) => getBlogPostBySlug(meta.slug)))
    ).filter((post): post is LoadedBlogPost => Boolean(post));

    const notes = await getAllNoteFiles();

    const notesWithDates = await Promise.all(
      notes.map(async (note) => {
        try {
          const filePath = path.join(NOTES_DIR, note.fileName);
          const stats = await fs.stat(filePath);
          return { note, updatedAt: stats.mtime };
        } catch {
          return { note, updatedAt: new Date() };
        }
      }),
    );

    const blogItems: FeedItem[] = posts.map((post) => {
      const postUrl = `${SITE_URL}/blog/${post.meta.slug}`;
      const pubDate = normalizeDate(post.meta.date).toUTCString();
      const contentHtml = formatContent(post.content);

      return {
        title: post.meta.title,
        description: post.meta.description ?? "",
        link: postUrl,
        guid: postUrl,
        pubDate,
        categories: post.meta.tags,
        contentHtml: `<div>${post.meta.description ? `<p>${escapeHtml(post.meta.description)}</p>` : ""}${contentHtml}<p><a href="${postUrl}">Read more on the website</a></p></div>`,
      };
    });

    const noteItems: FeedItem[] = notesWithDates.map(({ note, updatedAt }) => {
      const noteUrl = `${SITE_URL}/api/notes/${encodeURIComponent(note.slug)}`;
      const noteContent = `<div><p>This PDF note lives in my <a href="${SITE_URL}/notes">Notes</a> shelf.</p><p><a href="${noteUrl}">Download the PDF</a></p></div>`;

      return {
        title: `${note.title} (Note)`,
        description: `New PDF note available: ${note.title}`,
        link: noteUrl,
        guid: noteUrl,
        pubDate: updatedAt.toUTCString(),
        categories: ["notes"],
        contentHtml: noteContent,
      };
    });

    const rssXml = generateRssXml([...blogItems, ...noteItems]);

    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("RSS generation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
