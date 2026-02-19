import { ProjectCard } from "@/components/shared/ProjectCard";
import { Typography } from "poyraz-ui/atoms";
import { PatternGrid } from "poyraz-ui/atoms";

const projects = [
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

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen py-12 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PatternGrid
          className="w-full h-full opacity-[0.04]"
          color="currentColor"
          size={40}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <Typography variant="h1" className="mb-4">
            Showcase
          </Typography>
          <Typography variant="lead" className="text-slate-600">
            A selection of my featured works, open source contributions, and
            personal projects. Built with passion and precision.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
              demoUrl={project.demoUrl}
              repoUrl={project.repoUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
