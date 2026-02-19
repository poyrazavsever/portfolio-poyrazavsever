import { FullstackHero } from "@/components/futures/fullstack-cases/FullstackHero";
import { fullstackPageData, fullstackCases } from "@/data/fullstack-data";
import { ShowcaseGrid } from "@/components/shared/ShowcaseGrid";

export default function FullstackCasesPage() {
  return (
    <div className="min-h-screen pb-24">
      <FullstackHero
        title={fullstackPageData.title}
        headerHighlight={fullstackPageData.headerHighlight}
        description={fullstackPageData.description}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ShowcaseGrid projects={fullstackCases} />
      </div>
    </div>
  );
}
