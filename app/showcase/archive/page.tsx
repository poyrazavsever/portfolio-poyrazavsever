"use client";

import { ArchiveHero } from "@/components/futures/archive/ArchiveHero";
import { ShowcaseGrid } from "@/components/shared/ShowcaseGrid";
import { projects as portfolioProjects } from "@/data/portfolio-data";
import { fullstackCases } from "@/data/fullstack-data";
import { designProjects } from "@/data/design-data";
import { ShowcaseProject } from "@/types/showcase";

export default function ArchivePage() {
  // Combine all projects
  const allProjects: ShowcaseProject[] = [
    ...portfolioProjects,
    ...fullstackCases,
    ...designProjects,
  ];

  // Optional: Sort by year descending if year is convertible to number, or just keep order
  // Assuming year is string "2024", "2023", etc.
  allProjects.sort((a, b) => {
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    return yearB - yearA;
  });

  return (
    <div className="min-h-screen pb-24">
      <ArchiveHero />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ShowcaseGrid projects={allProjects} />
      </div>
    </div>
  );
}
