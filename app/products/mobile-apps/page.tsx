"use client";

import { ProductHero } from "@/components/futures/products/ProductHero";
import { ProjectGrid } from "@/components/shared/ProjectGrid";
import { designProjects } from "@/data/design-data";
import { fullstackCases } from "@/data/fullstack-data";
import { Project } from "@/types/project";

export default function MobileAppsPage() {
  // Aggregate and filter projects relevant to Mobile Apps
  const mobileProjects: Project[] = [
    ...designProjects,
    ...fullstackCases,
  ].filter((project) => {
    const isMobile =
      project.category === "Mobile App" ||
      project.tags.includes("Mobile App") ||
      project.tags.includes("React Native") ||
      project.tags.includes("iOS") ||
      project.tags.includes("Android") ||
      project.title.toLowerCase().includes("app");
    return isMobile;
  });

  return (
    <div className="min-h-screen pb-24">
      <ProductHero
        title="Mobile"
        headerHighlight="Applications"
        description="High-performance iOS and Android applications built with React Native and native technologies."
        badge="App Development"
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        {mobileProjects.length > 0 ? (
          <ProjectGrid projects={mobileProjects} />
        ) : (
          <div className="text-center py-20 text-slate-500">
            <p>No mobile application projects found at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
