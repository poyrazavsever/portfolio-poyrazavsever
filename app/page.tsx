import { HeroSection } from "@/components/futures/home/HeroSection";
import { YoutubeSection } from "@/components/futures/home/YoutubeSection";
import { CoursesSection } from "@/components/futures/home/CoursesSection";
import { HowItWorksSection } from "@/components/futures/home/HowItWorksSection";
import { BlogSection } from "@/components/futures/home/BlogSection";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function Home() {
  const dictionary = await getDictionary(i18n.defaultLocale);

  return (
    <div>
      <HeroSection dictionary={dictionary} />
      <HowItWorksSection dictionary={dictionary} />
      <CoursesSection dictionary={dictionary} />
      <YoutubeSection dictionary={dictionary} />
      <BlogSection dictionary={dictionary} />
    </div>
  );
}
