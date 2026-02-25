import { cookies } from "next/headers";
import { AboutHero } from "@/components/futures/about/AboutHero";
import { Timeline } from "@/components/futures/career/Timeline";
import { Typography } from "poyraz-ui/atoms";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getPublishedCareerRecords } from "@/lib/supabase/queries/career";
import { AdminCareerItem } from "@/types/admin";

export default async function EducationPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const { education: edDict } = dictionary.career;

  const records = await getPublishedCareerRecords("education");

  const mapToTimelineItem = (item: AdminCareerItem) => ({
    id: item.id,
    role: locale === "en" ? item.role_en : item.role_tr,
    company: locale === "en" ? item.company_en : item.company_tr,
    date: locale === "en" ? item.date_en : item.date_tr,
    location:
      (locale === "en" ? item.location_en : item.location_tr) || undefined,
    type:
      (locale === "en" ? item.employment_type_en : item.employment_type_tr) ||
      undefined,
    description:
      (locale === "en" ? item.description_en : item.description_tr) || [],
    skills: item.skills || [],
  });

  return (
    <div className="min-h-screen pb-24">
      <AboutHero
        dictionary={dictionary}
        title={edDict.hero.title}
        highlight={edDict.hero.highlight}
        description={edDict.hero.description}
        badge={edDict.hero.badge}
        imageSrc="/about/education.png"
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <Typography
          variant="h2"
          className="text-3xl font-bold mb-12 flex items-center gap-3"
        >
          <span className="w-2 h-8 bg-red-600 rounded-sm inline-block" />
          {edDict.title}{" "}
          <span className="text-slate-500 font-normal">
            {edDict.titleHighlight}
          </span>
        </Typography>
        <Timeline items={records.map(mapToTimelineItem)} />
      </div>
    </div>
  );
}
