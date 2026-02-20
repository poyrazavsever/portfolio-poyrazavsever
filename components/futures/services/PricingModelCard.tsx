import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  Badge,
} from "poyraz-ui/atoms";
import { Check } from "lucide-react";

interface PricingModelCardProps {
  title: string;
  description: string;
  scope: string[];
  priceInfo: string;
  variant?: "default" | "elevated" | "highlight";
}

export function PricingModelCard({
  title,
  description,
  scope,
  priceInfo,
  variant = "default",
}: PricingModelCardProps) {
  return (
    <Card
      variant={variant}
      className="h-full flex flex-col relative overflow-hidden group/card hover:border-red-600/30 transition-colors"
    >
      {variant === "elevated" && (
        <div className="absolute top-0 right-0 p-2">
          <Badge className="bg-red-600 text-white border-0">Popular</Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl mb-2">{title}</CardTitle>
        <CardDescription className="text-base text-slate-600 mb-4 h-12">
          {description}
        </CardDescription>
        <div className="py-4 border-t border-b border-dashed border-slate-200 mb-4">
          <span className="text-lg font-bold text-slate-900 block">
            {priceInfo}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {scope.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-slate-600"
            >
              <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
              <span className="leading-tight">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
