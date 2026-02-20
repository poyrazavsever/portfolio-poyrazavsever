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

- [ ] `app/academy/certifications/page.tsx`
- [ ] `app/academy/reading-list/page.tsx`
- [ ] `app/academy/page.tsx` (Eğer varsa - Mevcut taramada bulunamadı, alt klasörler var)

**Components:** (`components/futures/academy`)

- [ ] `AcademyHero.tsx`
- [ ] `CertificationsList.tsx`
- [ ] `ReadingList.tsx`

### 💼 Career

**Pages:**

- [ ] `app/career/education/page.tsx`
- [ ] `app/career/experience/page.tsx`

**Components:** (`components/futures/career`)

- [ ] `Timeline.tsx`

### 📞 Contact

**Page:** `app/contact/page.tsx`
**Components:** (`components/futures/contact`)

- [ ] `ContactForm.tsx`
- [ ] `ContactHero.tsx`

### 🌐 Ecosystem

**Page:** `app/ecosystem/architecture/page.tsx`
**Components:** (`components/futures/ecosystem`)

- [ ] `ArchitectureDiagram.tsx`
- [ ] `ArchitectureHero.tsx`

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

- [ ] `app/products/figma-templates/page.tsx`
- [x] `app/products/mobile-apps/page.tsx`
- [x] `app/products/saas/page.tsx`

**Components:** (`components/futures/products`)

- [ ] `FigmaTemplateCard.tsx`
- [ ] `ProductHero.tsx`

### 🛠️ Services

**Pages:**

- [ ] `app/services/page.tsx`
- [ ] `app/services/pricing/page.tsx`
- [ ] `app/services/workflow/page.tsx`

**Components:** (`components/futures/services`)

- [ ] `PricingHero.tsx`
- [ ] `PricingModelCard.tsx`
- [ ] `ServiceCard.tsx`
- [ ] `ServicesHero.tsx`
- [ ] `WorkflowHero.tsx`
- [ ] `WorkflowStep.tsx`

### 🎨 Showcase

**Pages:**

- [x] `app/showcase/archive/page.tsx`
- [x] `app/showcase/design-cases/page.tsx`
- [x] `app/showcase/fullstack-cases/page.tsx`
- [ ] `app/showcase/open-source/page.tsx`
- [x] `app/showcase/portfolio/page.tsx`

**Components:** (`components/futures/...`)

- [ ] `archive/ArchiveHero.tsx`
- [ ] `design-cases/DesignHero.tsx`
- [ ] `fullstack-cases/FullstackHero.tsx`
- [ ] `open-source/AllReposList.tsx`
- [ ] `open-source/OpenSourceHero.tsx`
- [ ] `open-source/PackageCard.tsx`
- [ ] `open-source/RepoCard.tsx`
- [ ] `portfolio/PortfolioHero.tsx`
