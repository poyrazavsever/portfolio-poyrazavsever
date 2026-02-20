import { BlogList } from "@/components/futures/media/BlogList";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function BlogListingPage() {
  const dictionary = await getDictionary(i18n.defaultLocale);

  return <BlogList dictionary={dictionary} />;
}
