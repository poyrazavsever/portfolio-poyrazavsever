import { cookies } from "next/headers";
import { BlogList } from "@/components/futures/media/BlogList";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function BlogListingPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as any;
  const dictionary = await getDictionary(locale);

  return <BlogList dictionary={dictionary} />;
}
