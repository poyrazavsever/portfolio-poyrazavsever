# Proje Review Checklist

Bu dosya, projedeki tüm sayfaları ve ilişkili bileşenleri kontrol etmek için oluşturulmuştur.

## 🏗️ Layout Components

Tüm sayfalarda ortak kullanılan yapısal bileşenler.

- [x] `components/layout/SiteNavbar.tsx`
- [x] `components/layout/SiteFooter.tsx`

## 🧩 Shared Components

Birden fazla sayfada kullanılan ortak bileşenler.

- [x] `components/shared/BlogCard.tsx`
- [x] `components/shared/HorizontalScroll.tsx`
- [x] `components/shared/MermaidDiagram.tsx`
- [x] `components/shared/ProjectCard.tsx`
- [x] `components/shared/ProjectGrid.tsx`
- [x] `components/shared/ProjectSheet.tsx`

## 🚀 Futures Components

Review of feature-specific components.

- [ ] `open-source` components (RepoCard, PackageCard)
- [ ] `services` components (WorkflowStep)
- [ ] `components/features/career/Timeline.tsx` (and others)

---

## 📄 Pages & Related Components

### 🏠 Home

**Page:** `app/page.tsx`
**Components:** (`components/futures/home`)

- [x] `BlogSection.tsx`
- [x] `CoursesSection.tsx`
- [x] `HeroSection.tsx`
- [x] `HowItWorksSection.tsx`
- [x] `YoutubeSection.tsx`

### 👤 About

**Page:** `app/about/page.tsx`
**Components:** (`components/futures/about`)

- [x] `AboutEngineeringDesign.tsx`
- [x] `AboutHero.tsx`
- [x] `AboutInterests.tsx`
- [x] `AboutJourney.tsx`
- [x] `AboutValues.tsx`
- [x] `app/about/page.tsx`

### 🎓 Academy

**Pages:**

- [x] `app/academy/certifications/page.tsx`
- [x] `app/academy/reading-list/page.tsx`
- [x] `app/academy/page.tsx` (Eğer varsa - Mevcut taramada bulunamadı, alt klasörler var)

**Components:** (`components/futures/academy`)

- [x] `AcademyHero.tsx`
- [x] `CertificationsList.tsx`
- [x] `ReadingList.tsx`

### 💼 Career

**Pages:**

- [x] `app/career/education/page.tsx`
- [x] `app/career/experience/page.tsx`

**Components:** (`components/futures/career`)

- [x] `Timeline.tsx`

### 📞 Contact

**Page:** `app/contact/page.tsx`
**Components:** (`components/futures/contact`)

- [x] `ContactForm.tsx`
- [x] `ContactHero.tsx`

### 🌐 Ecosystem

**Page:** `app/ecosystem/architecture/page.tsx`
**Components:** (`components/futures/ecosystem`)

- [x] `ArchitectureDiagram.tsx`
- [x] `ArchitectureHero.tsx`
- [x] `app/ecosystem/architecture/ArchitecturePageClient.tsx`

### 🎙️ Media

**Pages:**

- [x] `app/media/blog/page.tsx`
- [ ] `app/media/blog/[slug]/page.tsx`
- [ ] `app/media/masa-basi/page.tsx`
- [ ] `app/media/masa-basi/archive/page.tsx`
- [ ] `app/media/social-hub/page.tsx`
- [ ] `app/media/yazilima-dair/page.tsx`

**Components:** (`components/futures/media`)

- [ ] `CommentSection.tsx`
- [ ] `EpisodeListItem.tsx`
- [ ] `InstagramCard.tsx`
- [ ] `LikeButton.tsx`
- [ ] `MediaHero.tsx`
- [ ] `MediaListItem.tsx`
- [ ] `MediaSheet.tsx`
- [ ] `PodcastListItem.tsx`
- [ ] `PodcastSheet.tsx`
- [ ] `UpcomingStreamCard.tsx`
- [ ] `YoutubeCard.tsx`

### 📦 Products

**Pages:**

- [x] `app/products/figma-templates/page.tsx`
- [x] `app/products/mobile-apps/page.tsx`
- [x] `app/products/saas/page.tsx`

**Components:** (`components/futures/products`)

- [x] `FigmaTemplateCard.tsx`
- [x] `ProductHero.tsx`

### 🛠️ Services

**Pages:**

- [x] `app/services/page.tsx`
- [x] `app/services/pricing/page.tsx`
- [x] `app/services/workflow/page.tsx`

**Components:** (`components/futures/services`)

- [x] `PricingHero.tsx`
- [x] `PricingModelCard.tsx`
- [x] `ServiceCard.tsx`
- [x] `ServicesHero.tsx`
- [x] `WorkflowHero.tsx`
- [x] `WorkflowStep.tsx`

### 🎨 Showcase

**Pages:**

- [x] `app/showcase/archive/page.tsx`
- [x] `app/showcase/design-cases/page.tsx`
- [x] `app/showcase/fullstack-cases/page.tsx`
- [x] `app/showcase/open-source/page.tsx`
- [x] `app/showcase/portfolio/page.tsx`

**Components:** (`components/futures/...`)

- [x] `archive/ArchiveHero.tsx`
- [x] `design-cases/DesignHero.tsx`
- [x] `fullstack-cases/FullstackHero.tsx`
- [x] `open-source/AllReposList.tsx`
- [x] `open-source/OpenSourceHero.tsx`
- [x] `open-source/PackageCard.tsx`
- [x] `open-source/RepoCard.tsx`
- [x] `portfolio/PortfolioHero.tsx`
