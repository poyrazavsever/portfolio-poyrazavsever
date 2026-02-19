/* eslint-disable @next/next/no-img-element */
"use client";

import { PatternGrid, Typography, Badge } from "poyraz-ui/atoms";

interface AboutHeroProps {
  title: string;
  highlight: string;
  description: string;
  badge?: string;
}

export function AboutHero({
  title,
  highlight,
  description,
  badge = "About Me",
}: AboutHeroProps) {
  return (
    <section className="relative pt-16 overflow-hidden border-b-2 border-dashed border-red-200">
      {/* Background Pattern */}
      <PatternGrid
        className="absolute inset-0 z-0 opacity-[0.04]"
        color="currentColor"
        size={40}
      />

      {/* Red stripe background - The "Floor" */}
      <div className="absolute inset-x-0 bottom-0 h-16 md:h-24 bg-red-200 z-10" />

      <div className="relative z-20 container mx-auto px-4 max-w-6xl h-full flex flex-col md:flex-row items-center md:items-end md:justify-between md:gap-8">
        {/* Text Content */}
        <div className="w-full md:w-1/2 pb-16 md:pb-32 text-center md:text-left z-30">
          {badge && (
            <Badge
              variant="outline"
              className="mb-4 uppercase tracking-widest border-red-600/30 text-red-600 bg-red-50"
            >
              {badge}
            </Badge>
          )}
          <Typography
            variant="h1"
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            {title}{" "}
            <span className="text-red-600 font-secondary block md:inline">
              {highlight}
            </span>
          </Typography>

          <Typography
            variant="lead"
            className="text-xl text-slate-600 md:max-w-lg mx-auto md:mx-0"
          >
            {description}
          </Typography>
        </div>

        {/* Image Content - Positioned to sit on the red line */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative items-end">
          <div className="relative h-[200px] md:h-[450px]">
            <img
              src="/about/about.png"
              alt="Poyraz Avsever"
              className="h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
