"use client";

import { PatternGrid, Typography, Badge } from "poyraz-ui/atoms";

interface ServicesHeroProps {
  title?: string;
  highlight?: string;
  description?: string;
}

export function ServicesHero({
  title = "My",
  highlight = "Services",
  description = "Specialized engineering and design solutions tailored for scalable growth.",
}: ServicesHeroProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden border-b border-dashed border-slate-200 bg-slate-50/30">
      {/* Background Pattern */}
      <PatternGrid
        className="absolute inset-0 z-0 opacity-[0.03]"
        color="currentColor"
        size={30}
      />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl">
          <Badge
            variant="outline"
            className="mb-4 uppercase tracking-widest border-red-600/30 text-red-600 bg-red-50"
          >
            Work With Me
          </Badge>
          <Typography
            variant="h1"
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900"
          >
            {title}{" "}
            <span className="text-red-600 font-secondary">{highlight}</span>
          </Typography>
          <Typography
            variant="lead"
            className="text-xl md:text-2xl text-slate-600 max-w-2xl font-light leading-relaxed"
          >
            {description}
          </Typography>
        </div>
      </div>
    </section>
  );
}
