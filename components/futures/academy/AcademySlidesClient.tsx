"use client";

import dynamic from "next/dynamic";
import { Dictionary } from "@/types/dictionary";

const LinkedInSlides = dynamic<{
  pdfFiles: string[];
  dictionary: Dictionary;
}>(() => import("./LinkedInSlides").then((mod) => mod.LinkedInSlides), {
  ssr: false,
});

export function AcademySlidesClient(props: {
  pdfFiles: string[];
  dictionary: Dictionary;
}) {
  return <LinkedInSlides {...props} />;
}
