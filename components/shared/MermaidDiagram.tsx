"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { ScrollArea } from "poyraz-ui/atoms";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#dc2626",
    primaryTextColor: "#fff",
    primaryBorderColor: "#dc2626",
    lineColor: "#64748b",
    secondaryColor: "#f1f5f9",
    tertiaryColor: "#fff",
  },
  securityLevel: "loose",
});

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.contentLoaded();
      const renderDiagram = async () => {
        try {
          // Unique ID for each render to avoid conflicts
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid render error:", error);
          if (containerRef.current) {
            containerRef.current.innerHTML =
              '<div class="text-red-500 text-sm p-4 border border-red-200 bg-red-50 rounded">Failed to render diagram</div>';
          }
        }
      };
      renderDiagram();
    }
  }, [chart]);

  return (
    <div className="w-full border-2 border-dashed border-slate-300 bg-white p-4 overflow-hidden rounded-none">
      <ScrollArea className="w-full h-auto max-h-[500px]" orientation="both">
        <div
          ref={containerRef}
          className="mermaid-container w-full flex justify-center min-w-[600px]"
        />
      </ScrollArea>
    </div>
  );
}
