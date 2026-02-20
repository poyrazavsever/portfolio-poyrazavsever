import { cookies } from "next/headers";
import { ProductHero } from "@/components/futures/products/ProductHero";
import { ProjectGrid } from "@/components/shared/ProjectGrid";
import { projects } from "@/data/portfolio-data";
import { Project } from "@/types/project";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function MobileAppsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as any;
  const dictionary = await getDictionary(locale);
  const { productsMobile: mobile } = dictionary;

  // Aggregate and filter projects relevant to Mobile Apps
  const mobileProjects: Project[] = projects.filter((project) => {
    const isMobile =
      project.category === "Mobile App" ||
      project.tags.includes("Mobile App") ||
      project.tags.includes("React Native") ||
      project.tags.includes("iOS") ||
      project.tags.includes("Android") ||
      project.title.toLowerCase().includes("app");
    return isMobile;
  });

  return (
    <div className="min-h-screen pb-24">
      <ProductHero
        title={mobile.hero.title}
        headerHighlight={mobile.hero.highlight}
        description={mobile.hero.description}
        badge={mobile.hero.badge}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        {mobileProjects.length > 0 ? (
          <ProjectGrid projects={mobileProjects} dictionary={dictionary} />
        ) : (
          <div className="text-center py-20 text-slate-500">
            <p>{mobile.empty}</p>
          </div>
        )}
      </div>
    </div>
  );
}
