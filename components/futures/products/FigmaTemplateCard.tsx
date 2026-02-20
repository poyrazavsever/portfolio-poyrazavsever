import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  Badge,
} from "poyraz-ui/atoms";
import { Project } from "@/types/project";
import Link from "next/link";
import { ArrowRight, Layers, Layout, Palette } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

interface FigmaTemplateCardProps {
  project: Project;
  dictionary: Dictionary;
}

export function FigmaTemplateCard({
  project,
  dictionary,
}: FigmaTemplateCardProps) {
  const { labels } = dictionary.productsCommon;

  return (
    <Link
      href={project.links?.demo || "#"}
      target="_blank"
      className="h-full block group/card"
    >
      <Card
        variant="elevated"
        className="h-full flex flex-col transition-all duration-300 group-hover/card:border-red-600/30"
      >
        <CardImage className="aspect-[16/10] overflow-hidden bg-slate-100 group-hover/card:opacity-90 transition-opacity relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
          {project.links?.demo?.includes("gumroad") && (
            <div className="absolute top-4 right-4">
              <Badge
                variant="default"
                className="font-mono text-xs uppercase tracking-wider shadow-sm"
              >
                {labels.premium}
              </Badge>
            </div>
          )}
        </CardImage>

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-4">
            <div>
              <CardTitle className="text-xl group-hover/card:text-red-600 transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-2 text-sm">
                {project.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow space-y-4">
          {/* Feature Highlights Mockup */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 border border-dashed border-slate-200">
              <Layout className="w-3.5 h-3.5 text-red-600" />
              <span>{labels.autoLayout}</span>
            </div>
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 border border-dashed border-slate-200">
              <Palette className="w-3.5 h-3.5 text-red-600" />
              <span>{labels.components}</span>
            </div>
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 border border-dashed border-slate-200">
              <Layers className="w-3.5 h-3.5 text-red-600" />
              <span>{labels.variants}</span>
            </div>
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 border border-dashed border-slate-200">
              <span className="font-bold text-red-600">50+</span>
              <span>{labels.screens}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] px-1.5 h-5"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-4 flex justify-end">
          <div className="text-sm font-medium flex items-center text-red-600 group-hover/card:translate-x-1 transition-transform">
            {labels.openInFigma} <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
