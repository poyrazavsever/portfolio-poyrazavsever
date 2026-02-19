"use client";

import { PatternGrid, Badge, Typography } from "poyraz-ui/atoms";
import { cn } from "poyraz-ui";

interface MediaHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  className?: string;
}

export function MediaHero({
  title,
  subtitle,
  badge,
  className,
}: MediaHeroProps) {
  return (
    <div
      className={cn(
        "relative py-20 px-4 text-center border-b border-dashed border-slate-200 overflow-hidden",
        className,
      )}
    >
      <PatternGrid
        className="absolute inset-0 z-0 opacity-[0.03]"
        color="currentColor"
        size={40}
      />
      <div className="relative z-10 max-w-4xl mx-auto">
        {badge && (
          <Badge
            variant="outline"
            className="mb-6 uppercase tracking-widest border-red-600/30 text-red-600 bg-red-50"
          >
            {badge}
          </Badge>
        )}
        <Typography
          variant="h1"
          className="text-5xl md:text-7xl font-black tracking-tight mb-6"
        >
          {title}
        </Typography>
        <Typography
          variant="lead"
          className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </Typography>
      </div>
    </div>
  );
}
