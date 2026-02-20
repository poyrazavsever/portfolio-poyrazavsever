import { ContactHero } from "@/components/futures/contact/ContactHero";
import { ContactForm } from "@/components/futures/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactHero />

      <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <ContactForm />
      </section>
    </main>
  );
}
