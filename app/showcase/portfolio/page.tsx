import { PortfolioHero } from "@/components/futures/portfolio/PortfolioHero";
import { projects } from "@/data/portfolio-data";
import { ProjectGrid } from "@/components/shared/ProjectGrid";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function PortfolioPage() {
  const dictionary = await getDictionary(i18n.defaultLocale);

  return (
    <div className="min-h-screen pb-24">
      <PortfolioHero />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ProjectGrid projects={projects} dictionary={dictionary} />
      </div>
    </div>
  );
}
