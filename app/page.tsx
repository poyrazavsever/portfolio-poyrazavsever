import { cookies } from "next/headers";
import { HeroSection } from "@/components/futures/home/HeroSection";
import { YoutubeSection } from "@/components/futures/home/YoutubeSection";
import { HowItWorksSection } from "@/components/futures/home/HowItWorksSection";
import { BlogSection } from "@/components/futures/home/BlogSection";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getPublishedBlogPosts } from "@/lib/supabase/queries/blog";

export default async function Home() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);

  const allPosts = await getPublishedBlogPosts();
  const latestPosts = allPosts.slice(0, 5);

  return (
    <div>
      <HeroSection dictionary={dictionary} />
      <HowItWorksSection dictionary={dictionary} />
      <BlogSection
        dictionary={dictionary}
        posts={latestPosts}
        locale={locale}
      />
      <YoutubeSection dictionary={dictionary} />
    </div>
  );
}
