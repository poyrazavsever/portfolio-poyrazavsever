"use client";

import { useEffect, useRef } from "react";
// import mermaid from "mermaid"; // Dynamic import used instead

interface ArchitectureDiagramProps {
  chart: string;
  caption?: string;
}

export function ArchitectureDiagram({
  chart,
  caption,
}: ArchitectureDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMermaidAndRender = async () => {
      try {
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        mermaid.initialize({
          startOnLoad: false, // We will manually trigger render
          theme: "neutral",
          fontFamily: "Inter, sans-serif",
          securityLevel: "loose",
        });

        if (ref.current) {
          // Clear previous content if any (though React handles this usually)
          // ref.current.innerHTML = chart; // React does this via children
          await mermaid.run({
            nodes: [ref.current],
            suppressErrors: true,
          });
        }
      } catch (e) {
        console.error("Mermaid initialization failed", e);
      }
    };

    // Small timeout to ensure DOM is ready and to unblock main thread
    const timeoutId = setTimeout(() => {
      initMermaidAndRender();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [chart]);

  return (
    <figure className="my-12 w-full overflow-x-auto">
      <div
        ref={ref}
        className="mermaid flex justify-center bg-slate-50 p-6 md:p-8 rounded-lg border border-dashed border-slate-200 min-w-full"
      >
        {chart}
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-slate-500 mt-3 font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
