"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
  Button,
  CardTitle,
  CardDescription,
} from "poyraz-ui/atoms";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "poyraz-ui";

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  features?: string[];
  startingPrice?: string;
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card
      variant="elevated"
      className="h-full flex flex-col group/card hover:border-red-600/30 transition-colors"
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4 mb-2">
          <Badge
            variant="outline"
            className="text-[10px] uppercase tracking-wider text-slate-500 border-slate-200"
          >
            {service.category}
          </Badge>
        </div>
        <CardTitle className="text-xl group-hover/card:text-red-600 transition-colors">
          {service.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-2">
          {service.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        {service.features && (
          <ul className="space-y-1.5">
            {service.features.slice(0, 3).map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-600"
              >
                <Check className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5 pt-2">
          {service.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[10px] px-1.5 h-5 bg-slate-50 border-slate-200"
            >
              {tag}
            </Badge>
          ))}
          {service.tags.length > 3 && (
            <span className="text-[10px] text-slate-400 self-center px-1">
              +{service.tags.length - 3}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-dashed border-slate-100 mt-auto">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between group/btn hover:bg-red-50 hover:text-red-700"
          asChild
        >
          <a href={`/contact?service=${service.id}`}>
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
