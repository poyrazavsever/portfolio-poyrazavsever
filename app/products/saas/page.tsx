import { cookies } from "next/headers";
import { ProductHero } from "@/components/futures/products/ProductHero";
import { ProjectGrid } from "@/components/shared/ProjectGrid";
import { Alert, AlertTitle, AlertDescription } from "poyraz-ui/molecules";
import { AlertCircle } from "lucide-react";
import { Project } from "@/types/project";
import { AdminProject } from "@/types/admin";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { createClient } from "@/lib/supabase/server";

export default async function SaaSProjectsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const { productsSaas: saas } = dictionary;

  // Fetch from Supabase
  const supabase = await createClient();
  const { data: adminProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .eq("type", "product_saas")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  // Map Supabase data to frontend Project interface
  const dbProjects: Project[] = ((adminProjects as AdminProject[]) || []).map(
    (p) => ({
      id: p.id,
      title: locale === "tr" ? p.title_tr : p.title_en || p.title_tr,
      description:
        (locale === "tr" ? p.description_tr : p.description_en) ||
        p.description_tr ||
        "",
      coverImage:
        p.cover_image ||
        "https://placehold.co/600x400/dc2626/white?text=No+Image",
      tags: p.tags || [],
      year: p.year || "",
      category:
        (locale === "tr" ? p.category_tr : p.category_en) ||
        p.category_tr ||
        "",
      problem: locale === "tr" ? p.problem_tr : p.problem_en,
      solution: locale === "tr" ? p.solution_tr : p.solution_en,
      role: locale === "tr" ? p.role_tr : p.role_en,
      features: p.features || [],
      designProcess:
        locale === "tr" ? p.design_process_tr : p.design_process_en,
      technicalDetails:
        locale === "tr" ? p.technical_details_tr : p.technical_details_en,
      lessonsLearned:
        locale === "tr" ? p.lessons_learned_tr : p.lessons_learned_en,
      galleryImages: p.gallery_images || [],
      mermaid: p.mermaid || undefined,
      links: {
        demo: p.demo_url || undefined,
        repo: p.repo_url || undefined,
        caseStudy: p.case_study_url || undefined,
      },
    }),
  );

  return (
    <div className="min-h-screen pb-24">
      <ProductHero
        title={saas.hero.title}
        headerHighlight={saas.hero.highlight}
        description={saas.hero.description}
        badge={saas.hero.badge}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        {dbProjects.length > 0 ? (
          <ProjectGrid projects={dbProjects} dictionary={dictionary} />
        ) : (
          <div className="flex justify-center py-20">
            <Alert variant="warning" className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{dictionary.shared?.warning || "Uyarı"}</AlertTitle>
              <AlertDescription>{saas.empty}</AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
