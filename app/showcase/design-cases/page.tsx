import { DesignHero } from "@/components/futures/design-cases/DesignHero";
import { designPageData, designProjects } from "@/data/design-data";
import { ProjectGrid } from "@/components/shared/ProjectGrid";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function DesignCasesPage() {
  const dictionary = await getDictionary(i18n.defaultLocale);

  return (
    <div className="min-h-screen pb-24">
      <DesignHero
        title={designPageData.title}
        headerHighlight={designPageData.headerHighlight}
        description={designPageData.description}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ProjectGrid projects={designProjects} dictionary={dictionary} />
      </div>
    </div>
  );
}
