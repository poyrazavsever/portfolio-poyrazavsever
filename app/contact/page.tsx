import { ContactHero } from "@/components/futures/contact/ContactHero";
import { ContactForm } from "@/components/futures/contact/ContactForm";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function ContactPage() {
  const dictionary = await getDictionary(i18n.defaultLocale);

  return (
    <main className="min-h-screen bg-white">
      <ContactHero dictionary={dictionary} />

      <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <ContactForm dictionary={dictionary} />
      </section>
    </main>
  );
}
