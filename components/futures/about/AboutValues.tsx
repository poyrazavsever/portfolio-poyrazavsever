"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
} from "poyraz-ui/atoms";
import {
  Target,
  Zap,
  Heart,
  ShieldCheck,
  Lightbulb,
  Puzzle,
} from "lucide-react";

export function AboutValues() {
  return (
    <section className="container mx-auto px-4 max-w-6xl py-12 md:py-20">
      <div className="text-left mb-12">
        <Typography
          variant="h2"
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Core <span className="text-red-600 font-secondary">Values</span>
        </Typography>
        <Typography variant="muted" className="text-slate-500 max-w-xl">
          The principles that guide my work and life.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ValueCard
          icon={<Target className="w-6 h-6 text-red-600" />}
          title="Purpose Driven"
          description="I don't build just for the sake of it. Every line of code solves a problem."
        />
        <ValueCard
          icon={<Zap className="w-6 h-6 text-red-600" />}
          title="Performance First"
          description="Speed is a feature. I optimize for the best possible user experience."
        />
        <ValueCard
          icon={<Heart className="w-6 h-6 text-red-600" />}
          title="Passion"
          description="I love what I do, and that energy reflects in the quality of my work."
        />
        <ValueCard
          icon={<ShieldCheck className="w-6 h-6 text-red-600" />}
          title="Transparency"
          description="Open source and open process. I believe in sharing knowledge freely."
        />
        <ValueCard
          icon={<Lightbulb className="w-6 h-6 text-red-600" />}
          title="Innovation"
          description="Always learning, always exploring new ways to solve old problems."
        />
        <ValueCard
          icon={<Puzzle className="w-6 h-6 text-red-600" />}
          title="Simplicity"
          description="Complexity is easy. Simplicity is hard, but it's always worth the effort."
        />
      </div>
    </section>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card
      variant="default"
      className="hover:border-red-600/50 transition-colors h-full"
    >
      <CardHeader className="pb-2">
        <div className="w-12 h-12 bg-red-50 border border-dashed border-red-200 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
