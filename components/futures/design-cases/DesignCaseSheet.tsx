"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "poyraz-ui/molecules";
import {
  Modal,
  ModalContent,
  ModalTrigger,
  ModalTitle,
  ModalClose,
} from "poyraz-ui/molecules";
import { Typography, Badge, Button, Separator } from "poyraz-ui/atoms";
import { X, ExternalLink, Calendar, Briefcase } from "lucide-react";
import { DesignProject } from "@/data/design-data";

interface DesignCaseSheetProps {
  project: DesignProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DesignCaseSheet({
  project,
  open,
  onOpenChange,
}: DesignCaseSheetProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!project) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl md:max-w-2xl h-full max-h-none p-0 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b-2 border-dashed border-slate-300 bg-white z-10 relative">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {project.client && (
                      <Badge
                        variant="secondary"
                        className="uppercase tracking-widest text-[10px]"
                      >
                        {project.client}
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="border-slate-300 text-slate-500 text-[10px]"
                    >
                      {project.year}
                    </Badge>
                  </div>
                  <SheetTitle className="text-3xl font-bold">
                    {project.title}
                  </SheetTitle>
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="w-5 h-5" />
                  </Button>
                </SheetClose>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="default" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto bg-slate-50">
            <div className="p-6 space-y-8">
              {/* Description */}
              <div>
                <Typography variant="lead" className="text-slate-700">
                  {project.description}
                </Typography>
              </div>

              <Separator className="bg-slate-300" />

              {/* Gallery */}
              <div className="space-y-4">
                <Typography
                  variant="h4"
                  className="uppercase tracking-widest text-sm font-bold text-slate-400"
                >
                  Project Gallery
                </Typography>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-none overflow-hidden border-2 border-dashed border-slate-300 cursor-zoom-in bg-white aspect-square"
                      onClick={() => setSelectedImage(img)}
                    >
                      <div className="absolute inset-0 bg-slate-100 animate-pulse -z-10" />
                      <img
                        src={img}
                        alt={`${project.title} - View ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Lightbox Modal */}
      <Modal
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <ModalContent
          size="xl"
          hideClose
          className="border-none bg-transparent shadow-none p-0 max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-none"
        >
          <ModalTitle className="sr-only">
            Viewing image: {selectedImage}
          </ModalTitle>
          <div className="relative pointer-events-auto">
            <Button
              variant="secondary"
              size="icon"
              className="absolute -top-12 right-0 rounded-full border-2 border-white text-white bg-black/50 hover:bg-black/80"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </Button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Full view"
                className="max-w-full max-h-[85vh] object-contain rounded-sm border-2 border-white shadow-2xl"
              />
            )}
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
