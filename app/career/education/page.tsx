import { AboutHero } from "@/components/futures/about/AboutHero";
import { Timeline } from "@/components/futures/career/Timeline";
import { Typography } from "poyraz-ui/atoms";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function EducationPage() {
  const dictionary = await getDictionary(i18n.defaultLocale);
  const { education: edDict } = dictionary.career;

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
        <Timeline items={edDict.items} />
      </div>
    </div>
  );
}
