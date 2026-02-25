import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

const SITE_URL = "https://poyrazavsever.com";
const SITE_TITLE = "Poyraz Avsever";
const SITE_DESCRIPTION =
  "Full-stack developer, designer & content creator. Blog, projeler, medya ve daha fazlası.";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

export async function GET() {
  const supabase = createClient();

  // ── Fetch all published content in parallel ──
  const [blogRes, masaBasiRes, yazilimaDairRes, projectsRes] =
    await Promise.all([
      supabase
        .from("blog_posts")
        .select("id, title_tr, slug, excerpt_tr, cover_image, created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(50),

      supabase
        .from("masa_basi_episodes")
        .select(
          "id, title_tr, episode_number, description_tr, guest_image, created_at",
        )
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(30),

      supabase
        .from("yazilima_dair_episodes")
        .select(
          "id, title_tr, episode_number, description_tr, guest_image, created_at",
        )
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(30),

      supabase
        .from("projects")
        .select("id, title_tr, slug, description_tr, cover_image, created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(30),
    ]);

  // ── Log any errors for debugging ──
  if (blogRes.error)
    console.error("[RSS] blog_posts error:", blogRes.error.message);
  if (masaBasiRes.error)
    console.error("[RSS] masa_basi_episodes error:", masaBasiRes.error.message);
  if (yazilimaDairRes.error)
    console.error(
      "[RSS] yazilima_dair_episodes error:",
      yazilimaDairRes.error.message,
    );
  if (projectsRes.error)
    console.error("[RSS] projects error:", projectsRes.error.message);

  console.log(
    `[RSS] blog: ${blogRes.data?.length ?? 0}, masa_basi: ${masaBasiRes.data?.length ?? 0}, yazilima_dair: ${yazilimaDairRes.data?.length ?? 0}, projects: ${projectsRes.data?.length ?? 0}`,
  );

  // ── Build RSS items ──
  const items: string[] = [];

  // Blog posts
  if (blogRes.data) {
    for (const post of blogRes.data) {
      items.push(`
    <item>
      <title>${escapeXml(post.title_tr)}</title>
      <link>${SITE_URL}/media/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/media/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt_tr || "")}</description>
      <category>Blog</category>
      <pubDate>${toRfc822(post.created_at)}</pubDate>${post.cover_image ? `\n      <enclosure url="${escapeXml(post.cover_image)}" type="image/jpeg" />` : ""}
    </item>`);
    }
  }

  // Masa Başı episodes
  if (masaBasiRes.data) {
    for (const ep of masaBasiRes.data) {
      items.push(`
    <item>
      <title>${escapeXml(`Masa Başı #${ep.episode_number} — ${ep.title_tr}`)}</title>
      <link>${SITE_URL}/media/masa-basi</link>
      <guid isPermaLink="false">masa-basi-${ep.id}</guid>
      <description>${escapeXml(ep.description_tr || "")}</description>
      <category>Masa Başı</category>
      <pubDate>${toRfc822(ep.created_at)}</pubDate>${ep.guest_image ? `\n      <enclosure url="${escapeXml(ep.guest_image)}" type="image/jpeg" />` : ""}
    </item>`);
    }
  }

  // Yazılıma Dair episodes
  if (yazilimaDairRes.data) {
    for (const ep of yazilimaDairRes.data) {
      items.push(`
    <item>
      <title>${escapeXml(`Yazılıma Dair #${ep.episode_number} — ${ep.title_tr}`)}</title>
      <link>${SITE_URL}/media/yazilima-dair</link>
      <guid isPermaLink="false">yazilima-dair-${ep.id}</guid>
      <description>${escapeXml(ep.description_tr || "")}</description>
      <category>Yazılıma Dair</category>
      <pubDate>${toRfc822(ep.created_at)}</pubDate>${ep.guest_image ? `\n      <enclosure url="${escapeXml(ep.guest_image)}" type="image/jpeg" />` : ""}
    </item>`);
    }
  }

  // Projects
  if (projectsRes.data) {
    for (const p of projectsRes.data) {
      items.push(`
    <item>
      <title>${escapeXml(p.title_tr)}</title>
      <link>${SITE_URL}/showcase/portfolio</link>
      <guid isPermaLink="false">project-${p.id}</guid>
      <description>${escapeXml(p.description_tr || "")}</description>
      <category>Projeler</category>
      <pubDate>${toRfc822(p.created_at)}</pubDate>${p.cover_image ? `\n      <enclosure url="${escapeXml(p.cover_image)}" type="image/jpeg" />` : ""}
    </item>`);
    }
  }

  // ── Sort all items by date (newest first) ──
  // Items are already sorted per-category, but we interleave them by pubDate
  // For simplicity we keep them grouped by category since each group is already sorted.

  const lastBuildDate =
    blogRes.data?.[0]?.created_at ||
    masaBasiRes.data?.[0]?.created_at ||
    new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>tr</language>
    <lastBuildDate>${toRfc822(lastBuildDate)}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/logo/logo.jpeg</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
    </image>${items.join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
