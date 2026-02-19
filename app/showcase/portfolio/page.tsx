import { PortfolioHero } from "@/components/futures/portfolio/PortfolioHero";
import { projects } from "@/data/portfolio-data";
import { ShowcaseGrid } from "@/components/shared/ShowcaseGrid";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen pb-24">
      <PortfolioHero />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ShowcaseGrid projects={projects} />
      </div>
    </div>
  );
}
