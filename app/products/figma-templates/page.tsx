"use client";

import { ProductHero } from "@/components/futures/products/ProductHero";
import { FigmaTemplateCard } from "@/components/futures/products/FigmaTemplateCard";
import { projects } from "@/data/portfolio-data";
import { Project } from "@/types/project";
import { Button } from "poyraz-ui/atoms";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FigmaTemplatesPage() {
  // Aggregate and filter projects relevant to Figma Templates
  const templateProjects: Project[] = projects.filter((project) => {
    const isTemplate =
      project.category === "Figma Template" ||
      project.tags.includes("Figma") ||
      project.tags.includes("UI Kit") ||
      project.title.toLowerCase().includes("kit");
    return isTemplate;
  });

  return (
    <div className="min-h-screen pb-24">
      <ProductHero
        title="Figma"
        headerHighlight="Templates"
        description="High-fidelity UI kits, design systems, and dashboard templates. Both free and premium resources to kickstart your next project."
        badge="Design Resources"
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {templateProjects.length > 0 ? (
            templateProjects.map((project, index) => (
              <FigmaTemplateCard
                key={project.id || project.title + index}
                project={project}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-500 border-2 border-dashed border-slate-200">
              <p>No templates found at the moment.</p>
            </div>
          )}
        </div>

        {/* Free Resources Section CTA */}
        <div className="border-t-2 border-slate-100 pt-16">
          <div className="bg-slate-50 border border-dashed border-slate-300 p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-sans">
              Looking for Free Resources?
            </h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
              Check out the community file on Figma Community. Open source and
              free to use for personal projects.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="https://www.figma.com/@poyrazavsever" target="_blank">
                View Community Profile
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
