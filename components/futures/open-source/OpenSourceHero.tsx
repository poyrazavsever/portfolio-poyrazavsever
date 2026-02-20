import { Typography } from "poyraz-ui/atoms";
import { PatternGrid } from "poyraz-ui/atoms";
import { Badge } from "poyraz-ui/atoms";

interface OpenSourceHeroProps {
  title: string;
  headerHighlight: string;
  description: string;
  badge: string;
}

export function OpenSourceHero({
  title,
  headerHighlight,
  description,
  badge,
}: OpenSourceHeroProps) {
  return (
    <div className="relative w-full py-20 md:py-32 border-b-2 border-dashed border-slate-300 overflow-hidden bg-slate-50/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PatternGrid
          className="w-full h-full opacity-[0.03]"
          color="currentColor"
          size={50}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-start md:items-center text-left md:text-center max-w-4xl mx-auto space-y-6">
          <Badge
            variant="outline"
            className="mb-2 uppercase tracking-widest border-red-600/30 text-red-600 bg-red-50"
          >
            {badge}
          </Badge>

          <Typography
            variant="h1"
            className="text-5xl md:text-7xl font-black tracking-tight"
          >
            {title}{" "}
            <span className="text-red-600 font-secondary">
              {headerHighlight}
            </span>
          </Typography>

          <Typography
            variant="lead"
            className="text-xl md:text-2xl text-slate-600 max-w-2xl"
          >
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
}
