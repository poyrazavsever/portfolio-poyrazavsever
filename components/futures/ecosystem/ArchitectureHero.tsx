"use client";

import { PatternGrid, Typography, Badge } from "poyraz-ui/atoms";
// import { cn } from "poyraz-ui";

interface ArchitectureHeroProps {
  title: string;
  subtitle: string;
  meta: string;
}

export function ArchitectureHero({
  title,
  subtitle,
  meta,
}: ArchitectureHeroProps) {
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
          Engineering Blog
        </Badge>
        <Typography
          variant="h1"
          className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900"
        >
          {title}
        </Typography>
        <Typography
          variant="lead"
          className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-8 font-light"
        >
          {subtitle}
        </Typography>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 font-mono">
          <span>{meta}</span>
        </div>
      </div>
    </section>
  );
}
