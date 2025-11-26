import { NextResponse } from "next/server";
import { getAllBlogPostsMetadata, getBlogPostBySlug } from "@/lib/blog";
import type { LoadedBlogPost } from "@/lib/blog";

const SITE_URL = "https://poyrazavsever.com";
const SITE_TITLE = "Poyraz Avsever Blog";
const SITE_DESCRIPTION = "Personal blog of Poyraz Avsever - Developer and Designer";
const FEED_URL = `${SITE_URL}/rss.xml`;

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

const generateRssXml = (posts: LoadedBlogPost[]) => {
  const currentDate = new Date().toUTCString();

  const sortedPosts = [...posts].sort((a, b) => {
    const aDate = a.meta.date ? new Date(a.meta.date).getTime() : 0;
    const bDate = b.meta.date ? new Date(b.meta.date).getTime() : 0;
    return bDate - aDate;
  });

  const items = sortedPosts
    .map((post) => {
      const postUrl = `${SITE_URL}/blog/${post.meta.slug}`;
      const pubDate = normalizeDate(post.meta.date).toUTCString();
      const contentHtml = formatContent(post.content);

      return `
        <item>
          <title>${wrapCdata(post.meta.title)}</title>
          <description>${wrapCdata(post.meta.description ?? "")}</description>
          <content:encoded>${wrapCdata(
            `<div>${post.meta.description ? `<p>${escapeHtml(post.meta.description)}</p>` : ""}${contentHtml}<p><a href="${postUrl}">Read more on the website</a></p></div>`
          )}</content:encoded>
          <link>${escapeXml(postUrl)}</link>
          <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
          <pubDate>${pubDate}</pubDate>
          ${post.meta.tags.map((tag) => `<category>${wrapCdata(tag)}</category>`).join("")}
        </item>
      `;
    })
    .join("");

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
    ${items}
  </channel>
</rss>`;
};

export async function GET() {
  try {
    const metas = await getAllBlogPostsMetadata();
    const posts = (
      await Promise.all(metas.map((meta) => getBlogPostBySlug(meta.slug)))
    ).filter((post): post is LoadedBlogPost => Boolean(post));

    const rssXml = generateRssXml(posts);

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
