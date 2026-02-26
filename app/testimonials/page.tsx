import { cookies } from "next/headers";
import { TestimonialsSection } from "@/components/futures/about/TestimonialsSection";
import { TestimonialsHero } from "@/components/futures/about/TestimonialsHero";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

export default async function TestimonialsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="min-h-screen pb-24">
      <TestimonialsHero dictionary={dictionary} />
      <TestimonialsSection locale={locale} />
    </div>
  );
}
