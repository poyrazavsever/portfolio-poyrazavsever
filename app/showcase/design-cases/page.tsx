"use client";

import { DesignHero } from "@/components/futures/design-cases/DesignHero";
import { designPageData, designProjects } from "@/data/design-data";
import { ShowcaseGrid } from "@/components/shared/ShowcaseGrid";

export default function DesignCasesPage() {
  return (
    <div className="min-h-screen pb-24">
      <DesignHero
        title={designPageData.title}
        headerHighlight={designPageData.headerHighlight}
        description={designPageData.description}
      />

      <div className="container mx-auto px-4 sm:px-0 max-w-6xl mt-16 md:mt-24">
        <ShowcaseGrid projects={designProjects} />
      </div>
    </div>
  );
}
