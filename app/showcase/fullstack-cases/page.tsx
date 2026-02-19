import { FullstackHero } from "@/components/futures/fullstack-cases/FullstackHero";
import { fullstackPageData, fullstackCases } from "@/data/fullstack-data";
import { ProjectCard } from "@/components/shared/ProjectCard";

export default function FullstackCasesPage() {
  return (
    <div className="min-h-screen pb-24">
      <FullstackHero
        title={fullstackPageData.title}
        headerHighlight={fullstackPageData.headerHighlight}
        description={fullstackPageData.description}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fullstackCases.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
              repoUrl={project.repoUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
