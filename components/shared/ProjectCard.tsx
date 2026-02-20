"use client";
/* eslint-disable @next/next/no-img-element */

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
import { Project } from "@/types/project";

import { Dictionary } from "@/types/dictionary";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  className?: string;
  dictionary: Dictionary;
}

export function ProjectCard({
  project,
  onClick,
  className,
  dictionary,
}: ProjectCardProps) {
  const t = dictionary.shared.projectCard;
  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:border-red-600 h-full flex flex-col",
        className,
      )}
      variant="default"
      onClick={onClick}
    >
      <CardImage className="aspect-4/3 relative overflow-hidden border-b-2 border-dashed border-inherit shrink-0">
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
            {t.viewDetails} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardImage>

      <CardHeader className="pb-2 shrink-0">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Typography
              variant="muted"
              className="uppercase tracking-wider font-semibold"
            >
              {project.category}
            </Typography>
            <CardTitle className="group-hover:text-red-600 transition-colors line-clamp-1">
              {project.title}
            </CardTitle>
          </div>
          <Layers className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors shrink-0 mt-1" />
        </div>
      </CardHeader>

      <CardContent className="pb-4 grow">
        <Typography variant="muted" className="line-clamp-3">
          {project.description}
        </Typography>
      </CardContent>

      <CardFooter className="pt-4 flex flex-wrap gap-2 shrink-0 mt-auto">
        {project.tags.slice(0, 3).map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="text-xs font-normal text-slate-500 border-slate-300"
          >
            {tag}
          </Badge>
        ))}
        {project.tags.length > 3 && (
          <Badge
            variant="outline"
            className="text-xs font-normal text-slate-500 border-slate-300"
          >
            +{project.tags.length - 3}
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}
