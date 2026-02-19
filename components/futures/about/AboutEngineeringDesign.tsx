"use client";

import { Typography, Card, CardContent } from "poyraz-ui/atoms";
import { Code2, PenTool } from "lucide-react";

export function AboutEngineeringDesign() {
  return (
    <section className="container mx-auto px-4 max-w-6xl py-12 md:py-20">
      <Typography
        variant="h2"
        className="text-3xl md:text-4xl font-bold mb-8 text-left"
      >
        Engineering &{" "}
        <span className="text-red-600 font-secondary">Design</span>
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card variant="bordered" className="bg-slate-50 border-dashed">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white border border-dashed border-slate-300">
                <Code2 className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-2xl font-bold font-sans">Engineering</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              I view code as the structural integrity of the digital world. My
              approach is rooted in:
            </p>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside marker:text-red-600">
              <li>Scalable Architecture</li>
              <li>Clean & Maintainable Code</li>
              <li>Performance Optimization</li>
              <li>Security Best Practices</li>
            </ul>
          </CardContent>
        </Card>

        <Card variant="bordered" className="bg-slate-50 border-dashed">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white border border-dashed border-slate-300">
                <PenTool className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold font-sans">Design</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              Design is the soul. It&apos;s not just about looks; it&apos;s about how it
              feels and works. I focus on:
            </p>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside marker:text-red-600">
              <li>User-Centric UI/UX</li>
              <li>Brutalist & Modern Aesthetics</li>
              <li>Accessibility (a11y)</li>
              <li>Consistent Design Systems</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-slate-600 leading-relaxed">
        <p>
          The intersection of these two fields is where I thrive. I don&apos;t just
          hand off designs to developers; I build what I design, ensuring the
          vision remains intact from Figma to production.
        </p>
      </div>
    </section>
  );
}
