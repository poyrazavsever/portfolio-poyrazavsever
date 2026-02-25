import { cookies } from "next/headers";
import { AboutHero } from "@/components/futures/about/AboutHero";
import { Timeline } from "@/components/futures/career/Timeline";
import { Typography } from "poyraz-ui/atoms";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getPublishedExperienceRecords } from "@/lib/supabase/queries/career";
import { AdminCareerItem } from "@/types/admin";

export default async function ExperiencePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const { experience: expDict } = dictionary.career;

  const records = await getPublishedExperienceRecords();
  const workRecords = records.filter((r) => r.type === "work");
  const volunteerRecords = records.filter((r) => r.type === "volunteer");

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
        title={expDict.hero.title}
        highlight={expDict.hero.highlight}
        description={expDict.hero.description}
        badge={expDict.hero.badge}
        imageSrc="/about/experience.png" // TODO: Update with career specific image
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        {/* Professional Experience */}
        <div className="mb-20">
          <Typography
            variant="h2"
            className="text-3xl font-bold mb-12 flex items-center gap-3"
          >
            <span className="w-2 h-8 bg-red-600 rounded-sm inline-block" />
            {expDict.workTitle}{" "}
            <span className="text-slate-500 font-normal">
              {expDict.workTitleHighlight}
            </span>
          </Typography>
          <Timeline items={workRecords.map(mapToTimelineItem)} />
        </div>

        {/* Volunteer Experience */}
        <div>
          <Typography
            variant="h2"
            className="text-3xl font-bold mb-12 flex items-center gap-3"
          >
            <span className="w-2 h-8 bg-red-600 rounded-sm inline-block" />
            {expDict.volunteerTitle}{" "}
            <span className="text-slate-500 font-normal">
              {expDict.volunteerTitleHighlight}
            </span>
          </Typography>
          <Timeline items={volunteerRecords.map(mapToTimelineItem)} />
        </div>
      </div>
    </div>
  );
}
