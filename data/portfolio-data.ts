export interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Poyraz UI Kit",
    description:
      "A brutalist, open-source React component library built with Tailwind CSS and Radix UI. Features square corners, dashed borders, and bold typography.",
    imageUrl: "https://placehold.co/600x400/dc2626/white?text=Poyraz+UI",
    tags: ["React", "TypeScript", "Tailwind CSS", "Radix UI"],
    demoUrl: "https://ui.poyrazavsever.com",
    repoUrl: "https://github.com/poyrazavsever/poyraz-ui",
  },
  {
    title: "Client Portal",
    description:
      "A comprehensive dashboard for freelancers and agencies to manage client projects, invoices, and deliverables. Integrated with Stripe and Supabase.",
    imageUrl: "https://placehold.co/600x400/1e293b/white?text=Client+Portal",
    tags: ["Next.js", "Supabase", "Stripe", "Turborepo"],
    demoUrl: "https://portal.poyrazavsever.com",
    repoUrl: "https://github.com/poyrazavsever/client-portal",
  },
  {
    title: "System Status",
    description:
      "Real-time status monitoring for all services in the ecosystem. Tracks uptime, response times, and incident history.",
    imageUrl: "https://placehold.co/600x400/0f172a/white?text=System+Status",
    tags: ["Vue.js", "Node.js", "Socket.io", "Docker"],
    demoUrl: "https://status.poyrazavsever.com",
  },
  {
    title: "The 52-Week Journey",
    description:
      "Documentation and learning roadmap for a 52-week full-stack development challenge. Includes notes, code snippets, and resources.",
    imageUrl: "https://placehold.co/600x400/f59e0b/white?text=JS+Journey",
    tags: ["Markdown", "Nextra", "Education", "Content"],
    demoUrl: "https://js.poyrazavsever.com",
  },
  {
    title: "Ecommerce Starter",
    description:
      "A high-performance headless e-commerce starter kit with Shopify integration. optimized for SEO and Core Web Vitals.",
    imageUrl: "https://placehold.co/600x400/10b981/white?text=Ecommerce",
    tags: ["Shopify", "Remix", "Hydrogen", "Tailwind"],
    repoUrl: "https://github.com/poyrazavsever/ecommerce-starter",
  },
  {
    title: "SaaS Boilerplate",
    description:
      "A production-ready SaaS boilerplate with authentication, subscription management, and email transactional system.",
    imageUrl: "https://placehold.co/600x400/6366f1/white?text=SaaS+Starter",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Resend"],
    demoUrl: "https://saas.poyrazavsever.com",
    repoUrl: "https://github.com/poyrazavsever/saas-boilerplate",
  },
];
