"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { ProjectSheet } from "@/components/shared/ProjectSheet";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setSheetOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id || project.title + index}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      <ProjectSheet
        project={selectedProject}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  );
}
