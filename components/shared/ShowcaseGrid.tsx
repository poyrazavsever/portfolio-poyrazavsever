"use client";

import { useState } from "react";
import { ShowcaseProject } from "@/types/showcase";
import { ShowcaseCard } from "@/components/shared/ShowcaseCard";
import { ShowcaseSheet } from "@/components/shared/ShowcaseSheet";

interface ShowcaseGridProps {
  projects: ShowcaseProject[];
}

export function ShowcaseGrid({ projects }: ShowcaseGridProps) {
  const [selectedProject, setSelectedProject] =
    useState<ShowcaseProject | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleProjectClick = (project: ShowcaseProject) => {
    setSelectedProject(project);
    setSheetOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ShowcaseCard
            key={project.id || project.title + index}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      <ShowcaseSheet
        project={selectedProject}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  );
}
