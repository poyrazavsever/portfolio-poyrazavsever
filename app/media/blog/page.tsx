import { cookies } from "next/headers";
import { BlogList } from "@/components/futures/media/BlogList";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getPublishedBlogPosts } from "@/lib/supabase/queries/blog";

export default async function BlogListingPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);

  // Fetch real posts from Supabase
  const posts = await getPublishedBlogPosts();

  return <BlogList dictionary={dictionary} initialPosts={posts} />;
}
