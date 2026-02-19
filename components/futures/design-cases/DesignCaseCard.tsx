"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardImage,
  CardFooter,
} from "poyraz-ui/atoms";
import { Badge } from "poyraz-ui/atoms";
import { Typography } from "poyraz-ui/atoms";
import { Button } from "poyraz-ui/atoms";
import { cn } from "poyraz-ui";
import { ArrowRight, Layers } from "lucide-react";
import { DesignProject } from "@/data/design-data";

interface DesignCaseCardProps {
  project: DesignProject;
  onClick: () => void;
  className?: string;
}

export function DesignCaseCard({
  project,
  onClick,
  className,
}: DesignCaseCardProps) {
  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:border-red-600",
        className,
      )}
      variant="default"
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[4/3] border-b-2 border-dashed border-inherit">
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
        <img
          src={project.coverImage}
          alt={project.title}
          className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 z-20">
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm shadow-sm border-slate-200"
          >
            {project.year}
          </Badge>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 z-30 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="secondary"
            className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            View Details <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            {project.client && (
              <Typography
                variant="muted"
                className="text-xs uppercase tracking-wider font-semibold"
              >
                {project.client}
              </Typography>
            )}
            <CardTitle className="text-2xl group-hover:text-red-600 transition-colors">
              {project.title}
            </CardTitle>
          </div>
          <Layers className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors" />
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <Typography variant="muted" className="line-clamp-2 text-sm">
          {project.description}
        </Typography>
      </CardContent>

      <CardFooter className="pt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="text-xs font-normal text-slate-500 border-slate-300"
          >
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
