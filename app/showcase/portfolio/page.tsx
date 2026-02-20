/* eslint-disable @typescript-eslint/no-explicit-any */
﻿import { cookies } from "next/headers";
import { PortfolioHero } from "@/components/futures/portfolio/PortfolioHero";
import { projects } from "@/data/portfolio-data";
import { ProjectGrid } from "@/components/shared/ProjectGrid";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

export default async function PortfolioPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const { showcasePortfolio: portfolio } = dictionary;

  // Localize projects
  const localizedProjects = projects.map((project) => {
    // Find localized content by id (or title as fallback)
    const localized = portfolio.projects.find(
      (p: any) => p.id === project.id || p.title === project.title,
    );

    return localized
      ? {
          ...project,
          title: localized.title,
          description: localized.description,
          category: localized.category,
          problem: localized.problem || project.problem,
          solution: localized.solution || project.solution,
          role: localized.role || project.role,
          features: localized.features || project.features,
          designProcess: localized.designProcess || project.designProcess,
          technicalDetails:
            localized.technicalDetails || project.technicalDetails,
          lessonsLearned: localized.lessonsLearned || project.lessonsLearned,
        }
      : project;
  });

  return (
    <div className="min-h-screen pb-24">
      <PortfolioHero
        title={portfolio.hero.title}
        highlight={portfolio.hero.highlight}
        description={portfolio.hero.description}
        badge={portfolio.hero.badge}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ProjectGrid projects={localizedProjects} dictionary={dictionary} />
      </div>
    </div>
  );
}

