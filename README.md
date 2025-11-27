# Portfolio

<div align="right">
  <a href="#en-readme"><button type="button">Switch to English</button></a>
</div>

<div id="tr-readme">

## Genel Bakış

Portfolio, Next.js 16 App Router, React 19 ve TypeScript ile inşa edilmiş çok kanallı bir çalışma alanıdır. `content/` klasöründeki MDX ve PDF dosyaları otomatik olarak kenar çubuğuna, bloga, proje detaylarına ve not rafına bağlanır. `app/layout.tsx` tek bir veri katmanı oluşturarak ActivityBar, komut paleti, kenar çubuğu ve sayfa içeriklerini senkron tutar.

### Öne Çıkan Özellikler
- **Workspace odaklı UI**: `app/components/layout` altındaki ActivityBar, animasyonlu sosyal menü, komut paleti ve filtrelenebilir kenar çubuğu her cihazda çalışır.
- **Komut paleti & arama**: `SearchModal` + Fuse.js ile sayfa, proje, blog, PDF not ve sosyal bağlantılarda ⌘/Ctrl + K kısayolu; ayrıca tema döngüsü ve e-posta kopyalama gibi hızlı aksiyonlar.
- **Zengin içerik akışı**: `lib/mdx`, `lib/blog`, `lib/projects` ve `lib/notes` tüm MDX/PDF kaynaklarını derleyip `rehype-highlight` ile kod bloklarını renklendirir.
- **PDF rafı**: `PdfViewer` bileşeni pdfjs-dist ile ilk sayfa ön izlemesi çizer, modal okuyucu açar ve `/api/notes/[slug]` üzerinden PDF’i servis eder.
- **Tema sistemi**: `ThemeProvider` 30+ tema için CSS değişkenlerini yönetir, kullanıcı tercihini localStorage’da saklar ve `ThemeSwitcher` üzerinden değiştirir.
- **RSS + otomasyon**: `app/rss.xml/route.ts` blog yazıları ile PDF notlarını tek feed’de birleştirir, güncelleme tarihi olarak içerik metadata’sını ve dosya sistemini kullanır.
- **Statik üretim + esneklik**: Blog, projeler ve sayfalar `generateStaticParams` ile build sırasında ön üretilir, eksik slug’larda `notFound()` ile güvenle hata verir.

## Hızlı Başlangıç

> Önerilen ortam: Node.js ≥ 18.18, pnpm 9.

```bash
pnpm install          # bağımlılıkları yükle
pnpm dev              # http://localhost:3000
pnpm build            # production çıktısı (.next)
pnpm start            # build edilmiş projeyi başlat
pnpm lint             # eslint.config.mjs kurallarını çalıştır
```

Varsayılan avatarlar, özgeçmiş (`public/resume.pdf`) ve robots.txt gibi statik içerikler `public/` altında servis edilir; geliştirme ile production davranışı aynıdır.

## Dizin Rehberi

```text
app/
  components/          → ActivityBar, Sidebar, tema sheet’i, PDF viewer
  blog/, projects/, notes/ → Rota dosyaları + dinamik slug sayfaları
  api/notes/[slug]/    → PDF streaming API
  rss.xml/route.ts     → RSS feed üretimi
  custom-md.css        → MDX stilleri
content/
  pages/, blog/, projects/, notes/ → Tüm içerik kaynakları (MDX + PDF)
data/
  navigation.ts, tech.ts → ActivityBar ve tech-stack veri kümeleri
lib/
  mdx.ts, blog.ts, projects.ts, notes.ts → Dosya sistemi yardımcıları
public/
  avatars/, images/, resume.pdf → Medya ve statik dosyalar
```

- `app/layout.tsx` tüm içerik metadata’sını yükler, ActivityBar/Sidebar/arama için tek kaynak oluşturur.
- `app/[slug]/page.tsx` MDX sayfalarını `compileMDX` ile render eder; frontmatter’daki `links` alanını call-to-action butonlarına map eder.
- `globals.css` + `custom-md.css`, temalara göre güncellenen CSS değişkenleri ile tipografi ve Prose stillerini tanımlar.

## İçerik Üretim Akışı

### Sayfalar (`content/pages/*.mdx`)
Kişisel sayfalar (overview, about, projects vb.) burada tutulur. Frontmatter örneği:

```md
---
slug: "overview"
title: "Welcome to My Workspace"
order: 1           # Sidebar sırası
tags: [intro, portfolio]
description: "Genel açıklama"
links:
  - label: "Contact"
    href: "/contact"
    target: "_self"
---
```

`order` değeri küçük olan ilk sayfa `/` rotasında otomatik yönlendirme hedefidir.

### Blog (`content/blog/*.mdx`)
Her yazı için `slug`, `title`, `description`, `date` ve `tags` alanları kullanılır. Dosya ismi slug olarak okunur ve `getAllBlogPostsMetadata` tarih + başlık sırasına göre sıralar. Kod blokları `rehype-highlight` sayesinde otomatik renklendirilir.

### Projeler (`content/projects/*.mdx`)
Projeler bloglarla aynı MDX pipeline’ını kullanır fakat frontmatter’daki `links` dizisi proje detay sayfasında butonlara dönüştürülür. `/app/projects/[slug]/page.tsx` case study içeriğini ve bağlantılarını render eder, `/content/pages/projects.mdx` ise hızlı özetler sunar.

### Notlar (`content/notes/*.pdf` + `metadata.json`)
PDF’i klasöre bırakmak yeterlidir; isteğe bağlı metadata girerek kartları zenginleştirebilirsin:

```json
{
  "atomicdesign": {
    "title": "Atomic Design Notları",
    "description": "Bileşen hiyerarşisi özeti",
    "tags": ["design systems", "ui"],
    "date": "2025-02-10"
  }
}
```

`PdfViewer` bileşeni metadata’yı kart üzerinde gösterir, `fileUrl` olarak `/api/notes/{slug}` çağırır ve modalda `iframe` ile sunar.

## Aktivite Çubuğu, Kenar Çubuğu ve Arama
- **ActivityBar** (`app/components/layout/activitybar.tsx`), `ACTIVITY_LINKS` ve `SOCIAL_LINKS` verisini kullanır; search butonu modalı açar, sosyal butonu animasyonlu dropdown üretir.
- **Komut paleti** (`search-modal.tsx`), `Fuse.js` ile hızlı arama ve `quickActions` (tema döngüsü, e-posta kopyalama) sağlar. `SECTION_ORDER` sayesinde sonuçlar action → project → page → blog → note → social sırasına göre gruplandırılır.
- **Sidebar** (`sidebar.tsx`), `content/pages` metadata’sını kullanarak Explorer görünümünü oluşturur; mobilde motion tabanlı sheet, masaüstünde filtrelenebilir liste sunar.

Bu üçlü `app/layout.tsx` içerisindeki `searchIndex` objesi ile senkronize çalışır ve yeni içerik eklenir eklenmez güncellenir.

## Tema Sistemi

`ThemeProvider` (client component) tüm temaları `APP_THEMES` dizisinde tanımlar; id, label, açıklama ve ön izleme renkleri içerir. Kullanıcının seçimi `portfolio.theme` anahtarıyla localStorage’da saklanır. `ThemeSwitcher`, select bileşeni ve renk ön izleme küpleri ile temalar arasında geçiş yapar. Yeni bir tema eklemek için `APP_THEMES` dizisine obje ekleyip CSS değişkenlerini `globals.css` içinde tanımlamak yeterlidir.

## Not Görüntüleyici & PDF API

`PdfViewer` pdfjs-dist’i dinamik import eder, ilk sayfayı canvas’a render eder, yükleme/başarısızlık durumlarını overlay olarak gösterir ve `AnimatePresence` ile modalı yönetir. `/app/api/notes/[slug]/route.ts` PDF’i dosya sisteminden okur, slug doğrulaması yapar ve cache header’ları ile döner. Böylece notlar hem web modalı hem de doğrudan download linki olarak paylaşılabilir.

## RSS & Otomasyon

`app/rss.xml/route.ts` blog yazıları ve PDF notlarından `FeedItem` dizisi oluşturur, içerik açıklamalarını sanitize eder ve CDATA ile sarar. Not dosyalarının güncelleme tarihi `fs.stat` ile okunarak feed’e işlenir. Varsayılan domain `https://poyrazavsever.com`; farklı bir domain için `SITE_URL` sabitlerini güncellemek yeterlidir.

## Dağıtım İpuçları
- Production build: `pnpm build && pnpm start`.
- Next.js 16 otomatik olarak `app` yönlendirmelerini optimize eder; `content/` klasörü git’e dahil olduğu sürece ekstra env değişkenine gerek yoktur.
- PDF API’si dosya sistemine eriştiği için Vercel gibi sunucusuz ortamda `content/notes` dosyalarını `public/` yerine `content/` ile deploy paketine dahil etmelisin (git repo buna hazır).

## Teknoloji Yığını
- Next.js 16 (App Router, MDX, Edge-ready API Routes)
- React 19 + Server Components
- TypeScript 5.9
- Tailwind CSS 4 (configless) + özel CSS değişkenleri
- Framer Motion 12 (animasyonlar, modallar)
- Fuse.js (fuzzy arama)
- pdfjs-dist (PDF render)
- next-mdx-remote + rehype-highlight (MDX pipeline)
- Gray-matter (frontmatter ayrıştırma)

## Kalite & Kontroller
- `pnpm lint` tüm app + content bileşenlerini `eslint.config.mjs` kurallarına göre denetler (`next/core-web-vitals` + TypeScript plugin).
- Bir içerik slug’ı bulunamadığında `notFound()` çağrısı otomatik 404 üretir; geliştirme sırasında terminalde hata görebilirsin, slug/ dosya adı uyuştuğundan emin ol.
- PDF ön izlemesi büyük dosyalarda zaman alabilir; canvas çözünürlüğünü `PdfViewer` içindeki `PREVIEW_RESOLUTION` sabitiyle ayarlayabilirsin.

</div>

---

<div id="en-readme">

<div align="right">
  <a href="#tr-readme"><button type="button">Türkçe'ye dön</button></a>
</div>

## Overview

Portfolio is a multi-channel workspace built with Next.js 16 App Router, React 19, and TypeScript. MDX and PDF files that live under `content/` automatically hydrate the sidebar, blog, project case studies, and note shelf. `app/layout.tsx` creates a single content index so that the ActivityBar, command palette, sidebar, and page body stay in sync.

### Highlights
- **Workspace-grade UI**: The ActivityBar, animated social dropdown, command palette, and filterable sidebar inside `app/components/layout` work across breakpoints.
- **Command palette & search**: `SearchModal` + Fuse.js let you discover pages, projects, blog posts, PDF notes, and social links with the ⌘/Ctrl + K shortcut plus quick actions (theme cycle, copy email).
- **Rich content flow**: `lib/mdx`, `lib/blog`, `lib/projects`, and `lib/notes` compile every MDX/PDF source while `rehype-highlight` styles code blocks.
- **PDF shelf**: `PdfViewer` renders a first-page preview via pdfjs-dist, opens a modal reader, and streams the binary from `/api/notes/[slug]`.
- **Theme system**: `ThemeProvider` manages 30+ color palettes as CSS variables, persists the preference in localStorage, and exposes `ThemeSwitcher`.
- **RSS + automation**: `app/rss.xml/route.ts` merges blog entries and PDF notes into one feed, reusing both metadata and filesystem timestamps.
- **Static generation + safety**: Blog, project, and page routes call `generateStaticParams` during build and fall back to `notFound()` whenever a slug is missing.

## Getting Started

> Recommended toolchain: Node.js ≥ 18.18, pnpm 9.

```bash
pnpm install          # install deps
pnpm dev              # http://localhost:3000
pnpm build            # production bundle (.next)
pnpm start            # serve the built app
pnpm lint             # run ESLint
```

Static assets such as the avatar set, `public/resume.pdf`, and robots.txt are served from `public/` both locally and in production.

## Directory Guide

```text
app/
  components/          → ActivityBar, sidebar, theme sheet, PDF viewer
  blog/, projects/, notes/ → Route handlers + dynamic slug pages
  api/notes/[slug]/    → PDF streaming API
  rss.xml/route.ts     → RSS feed builder
  custom-md.css        → MDX styles
content/
  pages/, blog/, projects/, notes/ → All MDX/PDF sources
data/
  navigation.ts, tech.ts → ActivityBar + tech-stack datasets
lib/
  mdx.ts, blog.ts, projects.ts, notes.ts → Filesystem helpers
public/
  avatars/, images/, resume.pdf → Static media
```

- `app/layout.tsx` preloads every metadata entry and shares it with the ActivityBar/Sidebar/search index.
- `app/[slug]/page.tsx` renders page MDX via `compileMDX`, mapping frontmatter `links` to CTA chips.
- `globals.css` + `custom-md.css` define the theme-aware typography and prose rules that adapt to each palette.

## Content Workflow

### Pages (`content/pages/*.mdx`)
Reusable workspace pages (overview, about, bookmarks, projects, etc.). Sample frontmatter:

```md
---
slug: "overview"
title: "Welcome to My Workspace"
order: 1           # sidebar ordering
tags: [intro, portfolio]
description: "General intro"
links:
  - label: "Contact"
    href: "/contact"
    target: "_self"
---
```

The smallest `order` becomes the redirect target for `/`.

### Blog (`content/blog/*.mdx`)
Each article defines `slug`, `title`, `description`, `date`, and `tags`. File names become slugs, and `getAllBlogPostsMetadata` sorts by date, then title. Code blocks are highlighted through `rehype-highlight`.

### Projects (`content/projects/*.mdx`)
Project case studies share the same MDX pipeline but expose their `links` array as buttons on `/projects/[slug]`. The overview card grid inside `/content/pages/projects.mdx` can link back to these case studies.

### Notes (`content/notes/*.pdf` + `metadata.json`)
Drop any PDF into the folder and optionally enrich it via metadata:

```json
{
  "atomicdesign": {
    "title": "Atomic Design Notes",
    "description": "Hierarchy recap",
    "tags": ["design systems", "ui"],
    "date": "2025-02-10"
  }
}
```

`PdfViewer` displays the metadata on the card, hits `/api/notes/{slug}` as `fileUrl`, and opens an `iframe`-based modal reader on tap.

## Activity Bar, Sidebar & Search
- **ActivityBar** (`activitybar.tsx`) consumes `ACTIVITY_LINKS`/`SOCIAL_LINKS`, animates the search button, and displays an expandable social panel.
- **Command palette** (`search-modal.tsx`) leverages Fuse.js for fuzzy grouping (actions → projects → pages → blog → notes → social) and exposes quick actions like theme cycling or copying the email address.
- **Sidebar** (`sidebar.tsx`) mirrors the `content/pages` metadata as the Explorer list with filtering, plus a motion-powered drawer on mobile.

All three read from the `searchIndex` object built in `app/layout.tsx`, so any new MDX/PDF file becomes searchable instantly.

## Theming

`ThemeProvider` defines every palette under `APP_THEMES`, keeps the currently selected `id` in React state, propagates it to the `<html data-theme>` attribute, and persists it via `localStorage`. To add a palette, push a new entry to `APP_THEMES` and extend the CSS variables inside `globals.css`.

## PDF Viewer & API

`PdfViewer` dynamically imports pdfjs-dist, renders page 1 to a canvas, shows loading/error overlays, and opens a Framer Motion modal. `/app/api/notes/[slug]/route.ts` validates the slug, streams the PDF, and adds caching headers, so notes can be embedded or downloaded directly.

## RSS & Automation

`app/rss.xml/route.ts` builds a feed that combines blog posts with PDF notes, sanitizes content, wraps it in CDATA, and derives note timestamps via `fs.stat`. Update the `SITE_URL` constants to repoint the feed to a new domain.

## Deployment Tips
- Run `pnpm build && pnpm start` (or deploy on a compatible hosting provider such as Vercel).
- Ensure `content/` is part of the deployment artifact so that MDX and PDF assets are available at runtime.
- The PDF API needs filesystem access; keep the notes within the repository (the current setup is Vercel-friendly).

## Tech Stack
- Next.js 16 (App Router, MDX, API Routes)
- React 19 + Server Components
- TypeScript 5.9
- Tailwind CSS 4 + custom CSS variable themes
- Framer Motion 12
- Fuse.js (command palette)
- pdfjs-dist
- next-mdx-remote + rehype-highlight
- Gray-matter

## Quality & Checks
- `pnpm lint` enforces `eslint.config.mjs` (Next core web vitals + TypeScript rules).
- Missing slugs trigger `notFound()` and surface 404s during development; double-check your file names and frontmatter.
- Large PDFs may render slowly—tune the `PREVIEW_RESOLUTION` constant inside `PdfViewer` to balance quality/performance.

</div>
