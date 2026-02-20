import { Typography } from "poyraz-ui/atoms";
import { Dictionary } from "@/types/dictionary";
import ReactMarkdown from "react-markdown";

interface AboutJourneyProps {
  dictionary: Dictionary;
}

export function AboutJourney({ dictionary }: AboutJourneyProps) {
  const { journey } = dictionary.about;

  return (
    <section className="container mx-auto px-4 max-w-6xl py-12 md:py-20">
      <div className="prose prose-lg prose-slate max-w-none">
        <Typography
          variant="h2"
          className="mb-8 font-bold text-3xl md:text-4xl text-slate-900 text-left"
        >
          {journey.title}{" "}
          <span className="text-red-600 font-secondary">
            {journey.highlight}
          </span>
        </Typography>

        <div className="space-y-6 text-slate-600 leading-relaxed text-left">
          {journey.paragraphs.map((paragraph, index) => (
            <ReactMarkdown key={index}>{paragraph}</ReactMarkdown>
          ))}
        </div>
      </div>
    </section>
  );
}
