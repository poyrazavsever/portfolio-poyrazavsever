import { cookies } from "next/headers";
import { ProductHero } from "@/components/futures/products/ProductHero";
import { FigmaTemplateCard } from "@/components/futures/products/FigmaTemplateCard";
import { Project } from "@/types/project";
import { AdminProject } from "@/types/admin";
import { Button } from "poyraz-ui/atoms";
import { Alert, AlertTitle, AlertDescription } from "poyraz-ui/molecules";
import Link from "next/link";
import { ArrowRight, AlertCircle } from "lucide-react";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { createClient } from "@/lib/supabase/server";

export default async function FigmaTemplatesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const { productsFigma: figma } = dictionary;

  // Fetch from Supabase
  const supabase = await createClient();
  const { data: adminProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .eq("type", "product_figma")
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
        title={figma.hero.title}
        headerHighlight={figma.hero.highlight}
        description={figma.hero.description}
        badge={figma.hero.badge}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {dbProjects.length > 0 ? (
            dbProjects.map((project, index) => (
              <FigmaTemplateCard
                key={project.id || project.title + index}
                project={project}
                dictionary={dictionary}
              />
            ))
          ) : (
            <div className="col-span-full flex justify-center py-20">
              <Alert variant="warning" className="max-w-md flex-initial">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{dictionary.shared?.warning || "Uyarı"}</AlertTitle>
                <AlertDescription>{figma.empty}</AlertDescription>
              </Alert>
            </div>
          )}
        </div>

        {/* Free Resources Section CTA */}
        <div className="border-t-2 border-slate-100 pt-16">
          <div className="bg-slate-50 border border-dashed border-slate-300 p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-sans">
              {figma.cta.title}
            </h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
              {figma.cta.description}
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="https://www.figma.com/@poyrazavsever" target="_blank">
                {figma.cta.button}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
