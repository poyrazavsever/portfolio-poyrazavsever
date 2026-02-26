import { TestimonialCard } from "./TestimonialCard";
import { getPublishedTestimonials } from "@/lib/supabase/queries/testimonials";
import { Locale } from "@/i18n-config";

interface TestimonialsSectionProps {
  locale: Locale;
}

export async function TestimonialsSection({
  locale,
}: TestimonialsSectionProps) {
  const data = await getPublishedTestimonials();

  if (data.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-slate-50/50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
