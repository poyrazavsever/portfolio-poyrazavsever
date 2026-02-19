"use client";

import { PatternGrid, Typography, Badge } from "poyraz-ui/atoms";

export function PricingHero() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden border-b border-dashed border-slate-200">
      <PatternGrid
        className="absolute inset-0 z-0 opacity-[0.03]"
        color="currentColor"
        size={40}
      />

      <div className="relative z-10 container mx-auto px-4 max-w-5xl text-center">
        <Badge
          variant="outline"
          className="mb-6 mx-auto w-fit uppercase tracking-widest border-red-600/30 text-red-600 bg-red-50"
        >
          Transparent Pricing
        </Badge>
        <Typography
          variant="h1"
          className="text-5xl md:text-7xl font-black tracking-tight mb-8"
        >
          Value-Focused{" "}
          <span className="text-red-600 font-secondary">Models</span>
        </Typography>
        <Typography
          variant="lead"
          className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
        >
          I prioritize project-based outcome over hourly billing. Here are the
          structured engagement models designed for clarity and value.
        </Typography>
      </div>
    </section>
  );
}
