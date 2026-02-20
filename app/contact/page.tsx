import { cookies } from "next/headers";
import { ContactHero } from "@/components/futures/contact/ContactHero";
import { ContactForm } from "@/components/futures/contact/ContactForm";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

export default async function ContactPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-white">
      <ContactHero dictionary={dictionary} />

      <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <ContactForm dictionary={dictionary} />
      </section>
    </main>
  );
}

