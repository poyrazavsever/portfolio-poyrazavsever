"use client";

import { useState, useLayoutEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Card,
  CardHeader,
  CardTitle,
  Badge,
  Typography,
  Button,
} from "poyraz-ui/atoms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "poyraz-ui/molecules";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Dictionary } from "@/types/dictionary";

// PDF Worker Setup (Standard v10 config)
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface LinkedInSlidesProps {
  pdfFiles: string[];
  dictionary: Dictionary;
}

export function LinkedInSlides({ pdfFiles, dictionary }: LinkedInSlidesProps) {
  const { slides } = dictionary.academy;
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  // Initialize width on client
  useLayoutEffect(() => {
    const handleResize = () => {
      const width =
        window.innerWidth > 768 ? 700 : Math.min(600, window.innerWidth - 64);
      setContainerWidth(width);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePdfClick = (file: string) => {
    setSelectedPdf(file);
    setPageNumber(1); // Reset page number when selecting new PDF
    setIsViewerOpen(true);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPage = prevPageNumber + offset;
      if (newPage < 1) return 1;
      if (newPage > numPages) return numPages;
      return newPage;
    });
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col space-y-2">
        <Typography variant="h2">
          LinkedIn{" "}
          <Typography
            variant="h2"
            component="span"
            secondaryFont
            className="text-red-600"
          >
            {slides.hero.highlight}
          </Typography>
        </Typography>
        <Typography variant="muted" className="text-lg">
          {slides.hero.description}
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pdfFiles.map((file) => (
          <motion.div
            key={file}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
              variant="bordered"
              className="group cursor-pointer h-full border-2 hover:border-red-600/50 transition-all overflow-hidden"
              onClick={() => handlePdfClick(file)}
            >
              <div className="aspect-square bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-200 opacity-0 group-hover:opacity-10 transition-opacity z-10" />

                <div className="flex flex-col items-center gap-4 text-slate-400 group-hover:text-red-600 transition-colors">
                  <Icon icon="mdi:file-pdf-box" width={80} height={80} />
                  <Typography
                    variant="small"
                    className="font-bold uppercase tracking-widest text-[10px]"
                  >
                    {slides.hero.badge}
                  </Typography>
                </div>
              </div>

              <CardHeader className="p-4 bg-white border-t border-dashed border-slate-200">
                <CardTitle className="text-sm line-clamp-2">
                  {file
                    .replace(".pdf", "")
                    .replace(/([A-Z])/g, " $1")
                    .trim()}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="text-[10px] py-0 px-2 h-5"
                  >
                    1:1 Carousel
                  </Badge>
                  <Icon icon="mdi:linkedin" className="text-blue-600 w-4 h-4" />
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 flex flex-col gap-0 border-none bg-slate-100 overflow-hidden">
          <DialogHeader className="p-4 bg-white border-b border-dashed border-slate-200 shrink-0">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 p-2 border border-red-600/20">
                  <Icon
                    icon="mdi:file-pdf-box"
                    className="text-red-600"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <DialogTitle className="text-base font-bold leading-tight">
                    {selectedPdf
                      ?.replace(".pdf", "")
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                  </DialogTitle>
                  <Typography
                    variant="small"
                    className="text-slate-500 font-mono text-[10px] uppercase tracking-tighter"
                  >
                    {slides.labels.page} {pageNumber} {slides.labels.of}{" "}
                    {numPages}
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-2 mr-8">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-dashed border-2 hover:bg-slate-50"
                >
                  <a href={`/pdf/${selectedPdf}`} download>
                    <Icon icon="mdi:download" className="mr-2 h-4 w-4" />
                    DOWNLOAD
                  </a>
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-auto relative flex items-start justify-center p-4 md:p-8">
            <Button
              variant="outline"
              size="icon"
              className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 rounded-none bg-white/80 backdrop-blur disabled:opacity-30 h-12 w-12 border-2 z-50 shadow-xl border-dashed"
              onClick={() => changePage(-1)}
              disabled={pageNumber === 1}
            >
              <Icon icon="mdi:chevron-left" width={32} height={32} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 rounded-none bg-white/80 backdrop-blur disabled:opacity-30 h-12 w-12 border-2 z-50 shadow-xl border-dashed"
              onClick={() => changePage(1)}
              disabled={pageNumber === numPages}
            >
              <Icon icon="mdi:chevron-right" width={32} height={32} />
            </Button>

            <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-8 border-white max-w-full relative transition-all mx-auto">
              {selectedPdf && (
                <Document
                  file={`/pdf/${selectedPdf}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex items-center justify-center w-full aspect-square bg-slate-50 min-w-[300px]">
                      <Icon
                        icon="eos-icons:loading"
                        width={48}
                        height={48}
                        className="text-red-600"
                      />
                    </div>
                  }
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={pageNumber}
                      initial={{ opacity: 0, scale: 0.98, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="origin-center"
                    >
                      <Page
                        pageNumber={pageNumber}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="max-h-full"
                        width={containerWidth}
                      />
                    </motion.div>
                  </AnimatePresence>
                </Document>
              )}
            </div>
          </div>

          <div className="p-4 bg-white border-t border-dashed border-slate-200 shrink-0 flex items-center justify-center">
            <div className="flex gap-1">
              {Array.from({ length: numPages }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 transition-all duration-300 ${
                    i + 1 === pageNumber ? "w-8 bg-red-600" : "w-2 bg-slate-200"
                  } rounded-full`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
