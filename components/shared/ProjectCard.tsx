/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "poyraz-ui/atoms";
import { Badge } from "poyraz-ui/atoms";
import { Button } from "poyraz-ui/atoms";
import { cn } from "poyraz-ui";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  demoUrl?: string;
  repoUrl?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  tags = [],
  demoUrl,
  repoUrl,
  className,
}: ProjectCardProps) {
  return (
    <Card className={cn("flex flex-col h-full", className)} variant="elevated">
      {imageUrl && (
        <CardImage className="aspect-video relative overflow-hidden border-b-2 border-dashed border-slate-900">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </CardImage>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="grow">
        <CardDescription className="text-base text-slate-600 line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="gap-2 pt-4">
        {demoUrl && (
          <Button asChild size="sm" className="flex-1">
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Link>
          </Button>
        )}
        {repoUrl && (
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Code
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
