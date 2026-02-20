/* eslint-disable @typescript-eslint/no-explicit-any */
﻿import { cookies } from "next/headers";
import { DesignHero } from "@/components/futures/design-cases/DesignHero";
import { designProjects } from "@/data/design-data";
import { ProjectGrid } from "@/components/shared/ProjectGrid";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

export default async function DesignCasesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const { showcaseDesign: design } = dictionary;

  // Localize projects
  const localizedProjects = designProjects.map((project) => {
    const localized = design.projects.find(
      (p: any) => p.id === project.id || p.title === project.title,
    );
    return localized
      ? {
          ...project,
          title: localized.title,
          description: localized.description,
          category: localized.category,
          client: localized.client || project.client,
        }
      : project;
  });

  return (
    <div className="min-h-screen pb-24">
      <DesignHero
        title={design.hero.title}
        headerHighlight={design.hero.highlight}
        description={design.hero.description}
        badge={design.hero.badge}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ProjectGrid projects={localizedProjects} dictionary={dictionary} />
      </div>
    </div>
  );
}

