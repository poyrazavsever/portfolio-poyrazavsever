# Product Requirements Document (PRD): Portfolio Obsidian

## 1. Executive Summary

**Project Name**: Portfolio Obsidian
**Description**: A high-performance, multi-channel developer workspace and portfolio built with the latest web technologies. It seamlessly integrates a personal blog, project showcase, and PDF note-taking system into a VS Code-inspired interface.
**Goal**: To provide a unique, interactive, and highly performant platform for showcasing skills, projects, and technical knowledge.

## 2. Technical Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19 (Server Components)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4 (Configless) + CSS Variables (Theming)
- **Motion**: Framer Motion 12
- **Search**: Fuse.js (Fuzzy search)
- **Content**:
  - MDX (via `next-mdx-remote`) for Pages, Blog, Projects.
  - PDF (via `pdfjs-dist`) for Notes.
- **Data Fetching**: File System based (`fs/promises`) with static generation (`generateStaticParams`).

## 3. Core Features Analysis

### Existing Features

| Feature                 | Status         | Description                                                                      |
| :---------------------- | :------------- | :------------------------------------------------------------------------------- |
| **Workspace UI**        | ✅ Implemented | Activity Bar, Sidebar, and Command Palette providing a rich app-like experience. |
| **Content Engine**      | ✅ Implemented | Robust pipeline for MDX (Blog, Projects) and PDF (Notes) with metadata parsing.  |
| **Theme System**        | ✅ Implemented | 30+ themes supported via CSS variables and `ThemeProvider` persistence.          |
| **Search & Navigation** | ✅ Implemented | Global `cmd+k` command palette with deep linking and quick actions.              |
| **PDF Streaming**       | ✅ Implemented | Optimized API route for streaming PDFs with caching and validation.              |
| **RSS Feed**            | ✅ Implemented | Automated XML generation combining blog posts and notes.                         |
| **SEO Models**          | ✅ Implemented | Dynamic metadata generation for all content types.                               |

## 4. Gap Analysis (Missing Features & Improvements)

This section highlights areas where the project is lacking or differs from industry best practices.

### 🔴 Critical Gaps (Must Have)

1.  **Testing Infrastructure**:
    - **Status**: ❌ Missing entirely.
    - **Requirement**: No unit tests (Jest/Vitest) or End-to-End tests (Playwright/Cypress) exist.
    - **Impact**: High risk of regression during updates (especially with Next.js 16/React 19 beta updates).

2.  **CI/CD Pipelines**:
    - **Status**: ❌ Missing.
    - **Requirement**: No GitHub Actions or automated deployment workflows found.
    - **Impact**: Manual deployment processes are error-prone; lack of automated linting/testing on PRs.

3.  **Error Boundaries**:
    - **Status**: ⚠️ Partial (404 handled).
    - **Requirement**: Global `error.tsx` and component-level error boundaries are needed to gracefully handle runtime crashes without breaking the entire UI.

### 🟡 Functional Gaps (Should Have)

4.  **Analytics & Observability**:
    - **Status**: ❌ Missing.
    - **Requirement**: No integration with Vercel Analytics, Google Analytics, or PostHog.
    - **Impact**: Unable to track user engagement, popular content, or performance metrics.

5.  **Internationalization (i18n)**:
    - **Status**: ⚠️ Manual/Limited.
    - **Requirement**: README mentions "Switch to English" manually, but a robust `next-intl` or native i18n routing solution allows for scalable multi-language support.

6.  **Accessibility (a11y) Audit**:
    - **Status**: ❓ Unverified.
    - **Requirement**: While semantic HTML is used, complex components (Modals, Custom Dropdowns, PDF Viewer) need rigorous ARIA attribute validation and keyboard navigation testing.

### 🔵 Enhancements (Nice to Have)

7.  **Sitemap & Robots.txt Generation**:
    - **Status**: ⚠️ Static/Manual.
    - **Requirement**: Automated `sitemap.ts` and `robots.ts` using Next.js Metadata API to ensure all dynamic content is indexed correctly without manual updates.

8.  **Comment System**:
    - **Status**: ❌ Missing.
    - **Requirement**: Integration with Giscus or similar to allow feedback on Blog Posts and Notes.

9.  **Newsletter Subscription**:
    - **Status**: ❌ Missing.
    - **Requirement**: A simple capture form for users to subscribe to new content (complementing RSS).

## 5. Roadmap Recommendations

1.  **Phase 1 (Stability)**: Initialize Vitest and Playwright. Add basic smoke tests for the Home Page and Blog.
2.  **Phase 2 (Automation)**: Create `.github/workflows/ci.yml` to run lint and build on push.
3.  **Phase 3 (Observability)**: Add Analytics and Sentry for error tracking.
4.  **Phase 4 (Engagement)**: Implement a Comment system or Feedback form.
