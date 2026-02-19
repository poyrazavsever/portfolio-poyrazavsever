"use client";

import { Typography } from "poyraz-ui/atoms";
import { PatternGrid } from "poyraz-ui/atoms";
import { Badge } from "poyraz-ui/atoms";

export function PortfolioHero() {
  return (
    <div className="relative w-full py-20 md:py-32 border-b-2 border-dashed border-slate-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PatternGrid
          className="w-full h-full opacity-[0.04]"
          color="currentColor"
          size={40}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          <Badge
            variant="outline"
            className="mb-2 uppercase tracking-widest border-red-600/30 text-red-600 bg-red-50"
          >
            Showcase
          </Badge>

          <Typography
            variant="h1"
            className="text-5xl md:text-7xl font-black tracking-tight"
          >
            Featured <span className="text-red-600 font-secondary">Works</span>
          </Typography>

          <Typography
            variant="lead"
            className="text-xl md:text-2xl text-slate-600 max-w-2xl"
          >
            A selection of my featured works, open source contributions, and
            personal projects. Built with passion and precision.
          </Typography>

          <div className="flex gap-4 pt-4">
            {/* Potential future CTAs or filters could go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
