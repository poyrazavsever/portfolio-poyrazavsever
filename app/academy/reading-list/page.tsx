import { cookies } from "next/headers";
import { AcademyHero } from "@/components/futures/academy/AcademyHero";
import { ReadingList } from "@/components/futures/academy/ReadingList";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

export default async function ReadingListPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="min-h-screen pb-24 bg-white">
      <AcademyHero dictionary={dictionary} />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ReadingList dictionary={dictionary} />
      </div>
    </div>
  );
}

