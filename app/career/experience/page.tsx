import { cookies } from "next/headers";
import { AboutHero } from "@/components/futures/about/AboutHero";
import { Timeline } from "@/components/futures/career/Timeline";
import { Typography } from "poyraz-ui/atoms";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

export default async function ExperiencePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const { experience: expDict } = dictionary.career;

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
          <Timeline items={expDict.work} />
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
          <Timeline items={expDict.volunteer} />
        </div>
      </div>
    </div>
  );
}

