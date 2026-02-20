import { FullstackHero } from "@/components/futures/fullstack-cases/FullstackHero";
import { fullstackPageData, fullstackCases } from "@/data/fullstack-data";
import { ProjectGrid } from "@/components/shared/ProjectGrid";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function FullstackCasesPage() {
  const dictionary = await getDictionary(i18n.defaultLocale);

  return (
    <div className="min-h-screen pb-24">
      <FullstackHero
        title={fullstackPageData.title}
        headerHighlight={fullstackPageData.headerHighlight}
        description={fullstackPageData.description}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ProjectGrid projects={fullstackCases} dictionary={dictionary} />
      </div>
    </div>
  );
}
