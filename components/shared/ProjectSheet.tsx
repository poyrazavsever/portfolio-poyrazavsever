/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "poyraz-ui/molecules";
import { Badge, Button, Typography, ScrollArea } from "poyraz-ui/atoms";
import { Project } from "@/types/project";
import { ExternalLink, Github, Globe, X, ZoomIn } from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

// Dynamically import Mermaid component to avoid SSR issues if used
const MermaidDiagram = dynamic(
  () => import("./MermaidDiagram").then((mod) => mod.MermaidDiagram),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse h-64 bg-slate-100 rounded-lg"></div>
    ),
  },
);

import { Dictionary } from "@/types/dictionary";

interface ProjectSheetProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dictionary: Dictionary;
}

export function ProjectSheet({
  project,
  open,
  onOpenChange,
  dictionary,
}: ProjectSheetProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const t = dictionary.shared.projectSheet;

  if (!project) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-0 flex flex-col bg-white z-50 overflow-hidden"
        >
          <SheetTitle className="sr-only">{project.title}</SheetTitle>
          <SheetDescription className="sr-only">
            {project.description}
          </SheetDescription>

          <div className="p-6 border-b shrink-0 bg-white z-20">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-red-600 border-red-200 bg-red-50"
                >
                  {project.category}
                </Badge>
                <Badge variant="outline">{project.year}</Badge>
                {project.client && (
                  <Badge
                    variant="outline"
                    className="border-slate-300 text-slate-600"
                  >
                    {t.client}: {project.client}
                  </Badge>
                )}
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-slate-100 hover:bg-slate-200 ml-auto"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <Typography variant="h2" className="font-bold tracking-tight">
                {project.title}
              </Typography>

              <Typography
                variant="lead"
                className="text-slate-600 leading-relaxed"
              >
                {project.description}
              </Typography>

              {/* Links */}
              {project.links && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.links.demo && (
                    <Button size="sm" asChild>
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="w-4 h-4 mr-2" /> {t.links.demo}
                      </a>
                    </Button>
                  )}
                  {project.links.repo && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" /> {t.links.repo}
                      </a>
                    </Button>
                  )}
                  {project.links.caseStudy && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.links.caseStudy}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />{" "}
                        {t.links.caseStudy}
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          <ScrollArea className="flex-1 max-h-none!">
            <div className="p-6 space-y-12 pb-20">
              {/* 1. Problem & Solution */}
              {(project.problem || project.solution) && (
                <div className="grid md:grid-cols-2 gap-8">
                  {project.problem && (
                    <div className="space-y-3">
                      <Typography
                        variant="h4"
                        className="font-bold flex items-center gap-2"
                      >
                        <span className="w-1.5 h-6 bg-red-600 rounded-full block"></span>{" "}
                        {t.problem}
                      </Typography>
                      <div className="text-slate-600 leading-relaxed text-sm">
                        <ReactMarkdown>{project.problem}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                  {project.solution && (
                    <div className="space-y-3">
                      <Typography
                        variant="h4"
                        className="font-bold flex items-center gap-2"
                      >
                        <span className="w-1.5 h-6 bg-green-600 rounded-full block"></span>{" "}
                        {t.solution}
                      </Typography>
                      <div className="text-slate-600 leading-relaxed text-sm">
                        <ReactMarkdown>{project.solution}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. Design Process */}
              {project.designProcess && (
                <div className="space-y-4">
                  <Typography variant="h4" className="font-bold border-b pb-2">
                    {t.designProcess}
                  </Typography>
                  <div className="prose prose-sm prose-slate max-w-none text-slate-600">
                    <ReactMarkdown>{project.designProcess}</ReactMarkdown>
                  </div>
                </div>
              )}

              {/* 3. Technical Architecture */}
              {(project.technicalDetails || project.mermaid) && (
                <div className="space-y-4">
                  <Typography variant="h4" className="font-bold border-b pb-2">
                    {t.technicalArchitecture}
                  </Typography>
                  {project.technicalDetails && (
                    <div className="prose prose-sm prose-slate max-w-none text-slate-600 mb-4">
                      <ReactMarkdown>{project.technicalDetails}</ReactMarkdown>
                    </div>
                  )}
                  {project.mermaid && (
                    <div className="bg-slate-50 border rounded-lg p-4 overflow-x-auto">
                      <MermaidDiagram chart={project.mermaid} />
                    </div>
                  )}
                </div>
              )}

              {/* 4. Lessons Learned */}
              {project.lessonsLearned && (
                <div className="space-y-4">
                  <Typography variant="h4" className="font-bold border-b pb-2">
                    {t.lessonsLearned}
                  </Typography>
                  <div className="prose prose-sm prose-slate max-w-none text-slate-600">
                    <ReactMarkdown>{project.lessonsLearned}</ReactMarkdown>
                  </div>
                </div>
              )}

              {/* 5. My Role */}
              {project.role && (
                <div className="space-y-4">
                  <Typography variant="h4" className="font-bold border-b pb-2">
                    {t.role}
                  </Typography>
                  <Typography className="text-slate-600 leading-relaxed">
                    {project.role}
                  </Typography>
                </div>
              )}

              {/* 6. Key Features */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-4">
                  <Typography variant="h4" className="font-bold border-b pb-2">
                    {t.features}
                  </Typography>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-slate-700"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {project.galleryImages && project.galleryImages.length > 0 && (
                <div className="space-y-4">
                  <Typography variant="h4" className="font-bold border-b pb-2">
                    {t.gallery}
                  </Typography>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="group relative aspect-square rounded-lg overflow-hidden border bg-slate-100 cursor-zoom-in"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img
                          src={img}
                          alt={`${project.title} - Preview ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Tags */}
              <div className="space-y-3 pt-4 border-t">
                <Typography
                  variant="muted"
                  className="font-semibold uppercase tracking-wider text-slate-500"
                >
                  {t.technologies}
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Lightbox Modal */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="max-w-[90vw] md:max-w-[80vw] h-auto p-0 bg-transparent border-none shadow-none flex items-center justify-center [&>button]:hidden pointer-events-none">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          <DialogDescription className="sr-only">
            Enlarged view of the selected project image
          </DialogDescription>
          {selectedImage && (
            <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center group/image pointer-events-auto">
              <img
                src={selectedImage}
                alt="Zoomed preview"
                className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-black/50 hover:bg-white text-white hover:text-red-600 transition-colors cursor-pointer"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
