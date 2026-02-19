/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ServicesHero } from "@/components/futures/services/ServicesHero";
import {
  ServiceCard,
  Service,
} from "@/components/futures/services/ServiceCard";
import { SearchInput, Typography } from "poyraz-ui/atoms";

// Expanded Service List
const services: Service[] = [
  // WEB DEVELOPMENT
  {
    id: "static-landing-page",
    title: "Static Landing Page",
    category: "Web Development",
    description:
      "High-performance, SEO-optimized landing pages built with Next.js or Astro. Perfect for marketing campaigns and portfolios.",
    tags: ["Next.js", "Astro", "Tailwind CSS", "SEO Optimized", "Fast"],
    features: [
      "100/100 Lighthouse Score",
      "Responsive Design",
      "Basic SEO Setup",
    ],
    startingPrice: "$500",
  },
  {
    id: "dynamic-landing-page",
    title: "Dynamic Landing Page (CMS)",
    category: "Web Development",
    description:
      "Editable landing pages with integrated Headless CMS (Sanity/Strapi). Manage your content without touching code.",
    tags: ["Next.js", "Sanity CMS", "Strapi", "Dynamic Content"],
    features: ["CMS Integration", "Blog System", "Custom Components"],
    startingPrice: "$800",
  },
  {
    id: "saas-mvp",
    title: "SaaS MVP Development",
    category: "Web Development",
    description:
      "Launch your startup idea fast. Full-stack MVP with authentication, database, and payment integration.",
    tags: ["Next.js", "Supabase", "Stripe", "Auth", "PostgreSQL"],
    features: [
      "User Authentication",
      "Subscription Payments",
      "Database Design",
    ],
    startingPrice: "$2500",
  },
  {
    id: "corporate-portal",
    title: "Corporate Web Portal",
    category: "Web Development",
    description:
      "Scalable enterprise portals with complex role-based access control and internal tool integrations.",
    tags: ["Next.js", "NestJS", "RBAC", "Enterprise"],
    features: ["Role-Based Access", "SSO Integration", "Audit Logs"],
    startingPrice: "$4000",
  },
  {
    id: "ecommerce-store",
    title: "Headless E-Commerce",
    category: "Web Development",
    description:
      "Custom storefronts powered by Shopify or Medusa. Blazing fast browsing experience with complete design freedom.",
    tags: ["Shopify Headless", "Medusa", "Next.js", "E-Commerce"],
    features: [
      "Custom Cart/Checkout",
      "Product Filtering",
      "CMS for Marketing",
    ],
    startingPrice: "$3000",
  },

  // SYSTEMS
  {
    id: "crm-system",
    title: "Custom CRM & ERP Solution",
    category: "Systems",
    description:
      "Tailor-made software to manage your business operations, customers, and internal workflows efficiently.",
    tags: ["React", "NestJS", "Dashboard", "Data Visualization"],
    features: [
      "Customer Management",
      "Workflow Automation",
      "Analytics Dashboards",
    ],
    startingPrice: "$5000",
  },
  {
    id: "api-development",
    title: "Backend API Development",
    category: "Systems",
    description:
      "Robust REST or GraphQL APIs built with NestJS or Go. Scalable microservices architecture.",
    tags: ["NestJS", "Go", "GraphQL", "Microservices", "Docker"],
    features: ["Swagger Documentation", "Rate Limiting", "Unit Testing"],
    startingPrice: "$1500",
  },

  // MOBILE
  {
    id: "mobile-app",
    title: "Cross-Platform Mobile App",
    category: "Mobile",
    description:
      "Native-like mobile applications for iOS and Android using React Native and Expo.",
    tags: ["React Native", "Expo", "iOS", "Android"],
    features: ["Push Notifications", "Offline Mode", "App Store Submission"],
    startingPrice: "$3500",
  },

  // DESIGN
  {
    id: "design-system",
    title: "UI/UX Design System",
    category: "Design",
    description:
      "Comprehensive design systems and UI kits in Figma to ensure brand consistency across all products.",
    tags: ["Figma", "UI/UX", "Design Tokens", "Component Library"],
    features: ["Figma Variables", "Component Library", "Style Guide"],
    startingPrice: "$1200",
  },
  {
    id: "ui-audit",
    title: "UI/UX Audit & Refactor",
    category: "Design",
    description:
      "Expert analysis of your existing product's usability and visual design, followed by actionable improvements.",
    tags: ["UI Audit", "UX Research", "Redesign", "Accessibility"],
    features: ["Usability Report", "Accessibility Check", "Visual Refresh"],
    startingPrice: "$800",
  },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) => {
    const query = searchQuery.toLowerCase();
    return (
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      service.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen pb-24 bg-white">
      <ServicesHero
        title="My"
        highlight="Services"
        description="Specialized engineering and design solutions tailored for scalable growth. Choose the service that fits your needs."
      />

      <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
        <SearchInput
          placeholder="Search services (e.g., 'SaaS', 'Mobile', 'Design')..."
          className="bg-white text-lg placeholder:text-slate-400 font-light h-14"
          value={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-16">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Typography variant="h3" className="text-slate-400">
              No services found.
            </Typography>
            <p className="text-slate-500 mt-2">
              Try adjusting your search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
