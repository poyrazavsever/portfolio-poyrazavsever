import { PatternGrid, Typography, Badge } from "poyraz-ui/atoms";
import { Dictionary } from "@/types/dictionary";

interface ArchitectureHeroProps {
  dictionary: Dictionary;
}

export function ArchitectureHero({ dictionary }: ArchitectureHeroProps) {
  const { hero } = dictionary.ecosystem;

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-dashed border-slate-200 bg-slate-50/50">
      {/* Background Pattern */}
      <PatternGrid
        className="absolute inset-0 z-0 opacity-[0.03]"
        color="currentColor"
        size={20}
      />

      <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
        <Badge
          variant="outline"
          className="mb-6 uppercase tracking-widest border-red-600/30 text-red-600 bg-red-50"
        >
          {hero.badge}
        </Badge>
        <Typography
          variant="h1"
          className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900"
        >
          {hero.title}{" "}
          {hero.highlight && (
            <span className="text-red-600 font-secondary">
              {hero.highlight}
            </span>
          )}
        </Typography>
        <Typography
          variant="lead"
          className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-8 font-light"
        >
          {hero.subtitle}
        </Typography>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 font-mono">
          <span>{hero.meta}</span>
        </div>
      </div>
    </section>
  );
}
