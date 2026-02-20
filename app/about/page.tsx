import { AboutHero } from "@/components/futures/about/AboutHero";
import { AboutJourney } from "@/components/futures/about/AboutJourney";
import { AboutValues } from "@/components/futures/about/AboutValues";
import { AboutEngineeringDesign } from "@/components/futures/about/AboutEngineeringDesign";
import { AboutInterests } from "@/components/futures/about/AboutInterests";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function AboutPage() {
  const dictionary = await getDictionary(i18n.defaultLocale);

  return (
    <div className="min-h-screen pb-24">
      <AboutHero dictionary={dictionary} />

      {/* Sections */}
      <AboutJourney dictionary={dictionary} />
      <AboutEngineeringDesign dictionary={dictionary} />
      <AboutValues dictionary={dictionary} />
      <AboutInterests dictionary={dictionary} />
    </div>
  );
}
