/* eslint-disable @typescript-eslint/no-explicit-any */
﻿import { cookies } from "next/headers";
import { ArchiveHero } from "@/components/futures/archive/ArchiveHero";
import { ProjectGrid } from "@/components/shared/ProjectGrid";
import { projects as portfolioProjects } from "@/data/portfolio-data";
import { fullstackCases } from "@/data/fullstack-data";
import { designProjects } from "@/data/design-data";
import { Project } from "@/types/project";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

export default async function ArchivePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const { showcaseArchive: archive } = dictionary;

  // Localize projects helper (it's repeated, maybe I should share it, but for simplicity let's do it here)
  const localize = (list: Project[], dictKey: string) => {
    const dict = (dictionary as any)[dictKey]?.projects || [];
    return list.map((item) => {
      const localized = dict.find(
        (p: any) => p.id === item.id || p.title === item.title,
      );
      return localized
        ? {
            ...item,
            title: localized.title,
            description: localized.description,
            category: localized.category,
            problem: localized.problem || item.problem,
            solution: localized.solution || item.solution,
            role: localized.role || item.role,
            features: localized.features || item.features,
            designProcess: localized.designProcess || item.designProcess,
            technicalDetails:
              localized.technicalDetails || item.technicalDetails,
            lessonsLearned: localized.lessonsLearned || item.lessonsLearned,
            client: localized.client || item.client,
          }
        : item;
    });
  };

  // Combine all projects with localization
  const allProjects: Project[] = [
    ...localize(portfolioProjects, "showcasePortfolio"),
    ...localize(fullstackCases, "showcaseFullstack"),
    ...localize(designProjects, "showcaseDesign"),
  ];

  // Optional: Sort by year descending
  allProjects.sort((a, b) => {
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    return yearB - yearA;
  });

  return (
    <div className="min-h-screen pb-24">
      <ArchiveHero
        title={archive.hero.title}
        headerHighlight={archive.hero.highlight}
        description={archive.hero.description}
        badge={archive.hero.badge}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ProjectGrid projects={allProjects} dictionary={dictionary} />
      </div>
    </div>
  );
}

