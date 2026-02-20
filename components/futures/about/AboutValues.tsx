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
import { Dictionary } from "@/types/dictionary";

interface AboutValuesProps {
  dictionary: Dictionary;
}

export function AboutValues({ dictionary }: AboutValuesProps) {
  const { values } = dictionary.about;

  const icons = [
    <Target key="target" className="w-6 h-6 text-red-600" />,
    <Zap key="zap" className="w-6 h-6 text-red-600" />,
    <Heart key="heart" className="w-6 h-6 text-red-600" />,
    <ShieldCheck key="shield" className="w-6 h-6 text-red-600" />,
    <Lightbulb key="lightbulb" className="w-6 h-6 text-red-600" />,
    <Puzzle key="puzzle" className="w-6 h-6 text-red-600" />,
  ];

  return (
    <section className="container mx-auto px-4 max-w-6xl py-12 md:py-20">
      <div className="text-left mb-12">
        <Typography
          variant="h2"
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {values.title}{" "}
          <span className="text-red-600 font-secondary">
            {values.highlight}
          </span>
        </Typography>
        <Typography variant="muted" className="text-slate-500 max-w-xl">
          {values.subtitle}
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.items.map((item, index) => (
          <ValueCard
            key={index}
            icon={icons[index]}
            title={item.title}
            description={item.description}
          />
        ))}
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
