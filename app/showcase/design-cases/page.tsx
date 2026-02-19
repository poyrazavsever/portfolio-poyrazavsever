"use client";

import { useState } from "react";
import { DesignHero } from "@/components/futures/design-cases/DesignHero";
import { DesignCaseCard } from "@/components/futures/design-cases/DesignCaseCard";
import { DesignCaseSheet } from "@/components/futures/design-cases/DesignCaseSheet";
import {
  designPageData,
  designProjects,
  DesignProject,
} from "@/data/design-data";

export default function DesignCasesPage() {
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(
    null,
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleProjectClick = (project: DesignProject) => {
    setSelectedProject(project);
    setSheetOpen(true);
  };

  return (
    <div className="min-h-screen pb-24">
      <DesignHero
        title={designPageData.title}
        headerHighlight={designPageData.headerHighlight}
        description={designPageData.description}
      />

      <div className="container mx-auto px-4 sm:px-0 max-w-6xl mt-16 md:mt-24">
        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designProjects.map((project) => (
            <DesignCaseCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </div>

      <DesignCaseSheet
        project={selectedProject}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
}
