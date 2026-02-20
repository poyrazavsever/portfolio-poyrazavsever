import { cookies } from "next/headers";
import { FullstackHero } from "@/components/futures/fullstack-cases/FullstackHero";
import { fullstackCases } from "@/data/fullstack-data";
import { ProjectGrid } from "@/components/shared/ProjectGrid";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function FullstackCasesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as any;
  const dictionary = await getDictionary(locale);
  const { showcaseFullstack: fullstack } = dictionary;

  // Localize projects
  const localizedProjects = fullstackCases.map((project) => {
    const localized = fullstack.projects.find(
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
        }
      : project;
  });

  return (
    <div className="min-h-screen pb-24">
      <FullstackHero
        title={fullstack.hero.title}
        headerHighlight={fullstack.hero.highlight}
        description={fullstack.hero.description}
        badge={fullstack.hero.badge}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ProjectGrid projects={localizedProjects} dictionary={dictionary} />
      </div>
    </div>
  );
}
