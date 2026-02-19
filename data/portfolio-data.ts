import { ShowcaseProject } from "@/types/showcase";

export const projects: ShowcaseProject[] = [
  {
    title: "Poyraz UI Kit",
    description:
      "A brutalist, open-source React component library built with Tailwind CSS and Radix UI. Features square corners, dashed borders, and bold typography.",
    coverImage: "https://placehold.co/600x400/dc2626/white?text=Poyraz+UI",
    tags: ["React", "TypeScript", "Tailwind CSS", "Radix UI"],
    year: "2024",
    category: "Design System",
    galleryImages: [
      "https://placehold.co/1200x800/dc2626/white?text=Button+Collection",
      "https://placehold.co/1200x800/dc2626/white?text=Form+Elements",
      "https://placehold.co/1200x800/dc2626/white?text=Typography+Scale",
    ],
    links: {
      demo: "https://ui.poyrazavsever.com",
      repo: "https://github.com/poyrazavsever/poyraz-ui",
    },
  },
  {
    title: "Client Portal",
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
];
