import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Poyraz UI Kit",
    description:
      "A brutalist, open-source React component library built with Tailwind CSS and Radix UI. Features square corners, dashed borders, and bold typography. Designed to provide a unique, raw aesthetic while maintaining high accessibility and usability standards.",
    coverImage: "https://placehold.co/600x400/dc2626/white?text=Poyraz+UI",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Storybook",
      "NPM",
    ],
    year: "2024",
    category: "Design System",
    galleryImages: [
      "https://placehold.co/1080x1080/dc2626/white?text=Button+Variants",
      "https://placehold.co/1080x1080/dc2626/white?text=Input+Fields",
      "https://placehold.co/1080x1080/dc2626/white?text=Modal+Dialogs",
      "https://placehold.co/1080x1080/dc2626/white?text=Typography+Scale",
      "https://placehold.co/1080x1080/dc2626/white?text=Color+Palette",
      "https://placehold.co/1080x1080/dc2626/white?text=Grid+Layouts",
    ],
    links: {
      demo: "https://ui.poyrazavsever.com",
      repo: "https://github.com/poyrazavsever/poyraz-ui",
    },
    problem: `Modern UI libraries often look too similar, suffering from "Bootstrap" or "Tailwind" fatigue. Developers crave a design system that feels raw, authentic, and stands out without sacrificing the developer experience or accessibility. Finding a balance between a strong visual identity and flexibility is difficult.`,
    solution: `Poyraz UI Kit bridges this gap by offering a brutalist aesthetic—characterized by bold borders, high contrast, and raw layouts—built on top of the robust, headless primitives of Radix UI. This ensures that while the look is unique, the functionality and accessibility are industry-standard.`,
    role: "Lead Designer & Main Maintainer. I was responsible for the entire lifecycle of the project, from the initial design system creation in Figma to the architectural decisions in react and the final documentation site.",
    features: [
      "20+ Accessible Primitive Components",
      "Fully typed with TypeScript",
      "Dark Mode Support (Optional)",
      "Customizable Tailwind Plugin",
      "Comprehensive Documentation",
      "Figma Design Kit Included",
    ],
    designProcess: `
The design process began with an exploration of neo-brutalist and retro-web aesthetics. 

1.  **Moodboarding:** Collected references from poster designs, 90s web interfaces, and architectural brutalism.
2.  **Tokens:** Defined a strict set of design tokens for spacing, typography (Geist Mono & Sans), and a high-contrast color palette centered around \`red-600\`.
3.  **Component Design:** Prototyped key components (Buttons, Cards, Inputs) in Figma, iterating on border widths and shadow offsets to get the "feel" right.
4.  **Implementation:** Translated Figma designs into Tailwind CSS utility classes, encapsulating them into reusable React components using \`cva\` (Class Variance Authority).
    `,
    technicalDetails: `
The library is structured as a monorepo using **Turborepo** to manage the core package, documentation site, and example apps.

*   **Core:** Built with React 18 and Radix UI primitives. Uses \`tsup\` for bundling to ESM and CJS formats.
*   **Styling:** Tailwind CSS is the core engine, with a custom preset exposing the design tokens.
*   **Documentation:** Powered by Nextra (Next.js based) for MDX-driven documentation.
*   **Testing:** Vitest and React Testing Library for unit tests.
    `,
    lessonsLearned: `
*   **Headless UI is powerful:** separating logic (Radix) from styles (Tailwind) allowed for rapid iteration on the visual language without breaking functionality.
*   **Bundling is hard:** Configuring \`tsup\` and \`package.json\` exports to support both ESM and CJS compatible with all Next.js versions was a significant challenge that required deep diving into Node module resolution.
*   **Documentation matters:** Users can't use what they don't understand. Spending 50% of the time on docs paid off in adoption.
    `,
    mermaid: `
graph TD
    A[Consumer App] -->|Installs| B(npm install poyraz-ui)
    B --> C{Poyraz UI Package}
    C -->|Exports| D[Components]
    C -->|Exports| E[Tailwind Preset]
    C -->|Exports| F[Utils aka cn]
    D --> G[Radix UI Primitives]
    D --> H[React Hooks]
    E --> I[Consumer tailwind.config.js]
    `,
  },
  {
    title: "Client Portal",
    // ... rest of the file unchanged (or keeping existing array items)
    description:
      "A comprehensive dashboard for freelancers and agencies to manage client projects, invoices, and deliverables. Integrated with Stripe and Supabase.",
    coverImage: "https://placehold.co/600x400/1e293b/white?text=Client+Portal",
    tags: ["Next.js", "Supabase", "Stripe", "Turborepo"],
    year: "2024",
    category: "SaaS Product",
    galleryImages: [
      "https://placehold.co/1200x800/1e293b/white?text=Dashboard+Overview",
      "https://placehold.co/1200x800/1e293b/white?text=Invoicing+System",
      "https://placehold.co/1200x800/1e293b/white?text=Project+Management",
    ],
    links: {
      demo: "https://portal.poyrazavsever.com",
      repo: "https://github.com/poyrazavsever/client-portal",
    },
  },
  {
    title: "System Status",
    description:
      "Real-time status monitoring for all services in the ecosystem. Tracks uptime, response times, and incident history.",
    coverImage: "https://placehold.co/600x400/0f172a/white?text=System+Status",
    tags: ["Vue.js", "Node.js", "Socket.io", "Docker"],
    year: "2023",
    category: "Microservice",
    galleryImages: [
      "https://placehold.co/1200x800/0f172a/white?text=Status+Dashboard",
      "https://placehold.co/1200x800/0f172a/white?text=Incident+Reporting",
    ],
    links: {
      demo: "https://status.poyrazavsever.com",
    },
  },
  {
    title: "The 52-Week Journey",
    description:
      "Documentation and learning roadmap for a 52-week full-stack development challenge. Includes notes, code snippets, and resources.",
    coverImage: "https://placehold.co/600x400/f59e0b/white?text=JS+Journey",
    tags: ["Markdown", "Nextra", "Education", "Content"],
    year: "2023",
    category: "Education",
    galleryImages: [
      "https://placehold.co/1200x800/f59e0b/white?text=Roadmap+View",
      "https://placehold.co/1200x800/f59e0b/white?text=Article+Layout",
    ],
    links: {
      demo: "https://js.poyrazavsever.com",
    },
  },
  {
    title: "Ecommerce Starter",
    description:
      "A high-performance headless e-commerce starter kit with Shopify integration. optimized for SEO and Core Web Vitals.",
    coverImage: "https://placehold.co/600x400/10b981/white?text=Ecommerce",
    tags: ["Shopify", "Remix", "Hydrogen", "Tailwind"],
    year: "2024",
    category: "Starter Kit",
    galleryImages: [
      "https://placehold.co/1200x800/10b981/white?text=Product+Page",
      "https://placehold.co/1200x800/10b981/white?text=Cart+Drawer",
    ],
    links: {
      repo: "https://github.com/poyrazavsever/ecommerce-starter",
    },
  },
  {
    title: "SaaS Boilerplate",
    description:
      "A production-ready SaaS boilerplate with authentication, subscription management, and email transactional system.",
    coverImage: "https://placehold.co/600x400/6366f1/white?text=SaaS+Starter",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Resend"],
    year: "2024",
    category: "Starter Kit",
    galleryImages: [
      "https://placehold.co/1200x800/6366f1/white?text=Landing+Page",
      "https://placehold.co/1200x800/6366f1/white?text=User+Dashboard",
    ],
    links: {
      demo: "https://saas.poyrazavsever.com",
      repo: "https://github.com/poyrazavsever/saas-boilerplate",
    },
  },
  {
    title: "Zenith Fitness",
    description:
      "A comprehensive fitness tracking mobile application built with React Native and Expo. Features workout logging, progress visualization, and social sharing.",
    coverImage: "https://placehold.co/600x400/10b981/white?text=Zenith+Fitness",
    tags: ["React Native", "Expo", "Reanimated", "Supabase"],
    year: "2024",
    category: "Mobile App",
    galleryImages: [
      "https://placehold.co/1080x1920/10b981/white?text=Workout+Log",
      "https://placehold.co/1080x1920/10b981/white?text=Progress+Chart",
      "https://placehold.co/1080x1920/10b981/white?text=Profile+Screen",
    ],
    links: {
      demo: "https://zenith.poyrazavsever.com",
    },
    problem:
      "Fitness apps are often cluttered with ads or locked behind expensive subscriptions. Users needed a simple, privacy-focused way to track their progress.",
    solution:
      "Zenith Fitness offers a clean, distraction-free interface that focuses solely on your performance. Data is stored locally or synced via Supabase.",
    role: "Mobile Developer & UI Designer",
    features: [
      "Offline-first Architecture",
      "Biometric Authentication",
      "Custom Chart Components",
      "Dark Mode Support",
    ],
  },
  {
    title: "Roam Travel Guide",
    description:
      "An AI-powered travel companion app that suggests itineraries based on your interests and budget. Built with Flutter and OpenAI API.",
    coverImage: "https://placehold.co/600x400/3b82f6/white?text=Roam+Travel",
    tags: ["Flutter", "Dart", "OpenAI", "Google Maps"],
    year: "2023",
    category: "Mobile App",
    galleryImages: [
      "https://placehold.co/1080x1920/3b82f6/white?text=Itinerary",
      "https://placehold.co/1080x1920/3b82f6/white?text=Map+View",
      "https://placehold.co/1080x1920/3b82f6/white?text=AI+Chat",
    ],
    links: {
      demo: "https://roam.poyrazavsever.com",
    },
  },
  {
    title: "Nexus Dashboard Kit",
    description:
      "A premium, high-fidelity SaaS dashboard UI kit for Figma. Includes 50+ screens, 200+ components, and a comprehensive style guide.",
    coverImage:
      "https://placehold.co/600x400/6366f1/white?text=Nexus+Dashboard",
    tags: ["Figma", "UI Kit", "Design System", "Auto Layout"],
    year: "2024",
    category: "Figma Template",
    galleryImages: [
      "https://placehold.co/1920x1080/6366f1/white?text=Dashboard+Home",
      "https://placehold.co/1920x1080/6366f1/white?text=Analytics+View",
      "https://placehold.co/1920x1080/6366f1/white?text=Settings+Panel",
    ],
    links: {
      demo: "https://gumroad.com/poyrazavsever/nexus",
    },
    problem:
      "Designing complex SaaS dashboards from scratch is time-consuming. Developers and localized designers often struggle with consistent spacing and typography.",
    solution:
      "Nexus provides a solid foundation with a strict grid system and accessible color palette, saving hours of design time.",
    role: "UI/UX Designer",
    features: [
      "50+ High-Fidelity Screens",
      "Global Style Guide",
      "Dark & Light Mode",
      "Component Variants",
    ],
  },
  {
    title: "Orbit E-commerce Kit",
    description:
      "A modern, mobile-first e-commerce UI kit optimized for conversion. Perfect for fashion and lifestyle brands.",
    coverImage: "https://placehold.co/600x400/ec4899/white?text=Orbit+Commerce",
    tags: ["Figma", "Mobile Design", "E-commerce", "Prototyping"],
    year: "2023",
    category: "Figma Template",
    galleryImages: [
      "https://placehold.co/1080x1920/ec4899/white?text=Product+Listing",
      "https://placehold.co/1080x1920/ec4899/white?text=Checkout+Flow",
      "https://placehold.co/1080x1920/ec4899/white?text=User+Profile",
    ],
    links: {
      demo: "https://gumroad.com/poyrazavsever/orbit",
    },
  },
];
