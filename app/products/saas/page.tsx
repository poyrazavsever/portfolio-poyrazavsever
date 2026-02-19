"use client";

import { ProductHero } from "@/components/futures/products/ProductHero";
import { ProjectGrid } from "@/components/shared/ProjectGrid";
import { designProjects } from "@/data/design-data";
import { fullstackCases } from "@/data/fullstack-data";
import { Project } from "@/types/project";

export default function SaaSProjectsPage() {
  // Aggregate and filter projects relevant to SaaS
  const saasProjects: Project[] = [...designProjects, ...fullstackCases].filter(
    (project) => {
      const isSaaS =
        project.category === "SaaS" ||
        project.category === "Dashboard" ||
        project.tags.includes("SaaS") ||
        project.tags.includes("Dashboard") ||
        project.tags.includes("Platform") ||
        project.tags.includes("Microservices") ||
        project.tags.includes("Design System"); // Design systems are often part of SaaS
      return isSaaS;
    },
  );

  return (
    <div className="min-h-screen pb-24">
      <ProductHero
        title="SaaS"
        headerHighlight="Projects"
        description="Scalable Software-as-a-Service solutions, administration panels, and complex web platforms."
        badge="SaaS & Platforms"
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        {saasProjects.length > 0 ? (
          <ProjectGrid projects={saasProjects} />
        ) : (
          <div className="text-center py-20 text-slate-500">
            <p>No SaaS projects found at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
