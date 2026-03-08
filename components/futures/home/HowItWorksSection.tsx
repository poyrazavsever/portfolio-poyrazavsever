"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Typography } from "poyraz-ui/atoms";
import Image from "next/image";
import { cn } from "poyraz-ui";
import { Dictionary } from "@/types/dictionary";

const staticSteps = [
  {
    number: 1,
    image: "/howItWorks/1.png",
  },
  {
    number: 2,
    image: "/howItWorks/2.png",
  },
  {
    number: 3,
    image: "/howItWorks/3.png",
  },
  {
    number: 4,
    image: "/howItWorks/4.png",
  },
];

interface HowItWorksSectionProps {
  dictionary: Dictionary;
}

export function HowItWorksSection({ dictionary }: HowItWorksSectionProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { howItWorks } = dictionary.home;
  const steps = staticSteps.map((step, i) => ({
    ...step,
    title: howItWorks.steps[i].title,
  }));

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length);
  }, [steps.length]);

  // Auto-slide every 4 seconds, pause on hover
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Bottom red stripe */}
      <div className="absolute inset-x-0 bottom-0 h-20 md:h-28 bg-red-200 z-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Typography variant="h1">
            {howItWorks.title}{" "}
            <span className="text-red-600 font-secondary">
              {howItWorks.highlight}
            </span>
          </Typography>
          <Typography variant="lead" className="mt-2 text-slate-500">
            {howItWorks.subtitle}
          </Typography>
        </div>

        {/* Step titles + numbers */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {steps.map((step, i) => (
            <button
              key={step.number}
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <Typography
                variant="small"
                className={cn(
                  "transition-colors duration-300",
                  i === active
                    ? "text-slate-900 font-semibold"
                    : "text-slate-400",
                )}
              >
                {step.title}
              </Typography>

              <div
                className={cn(
                  "relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border-2 border-dashed transition-all duration-300",
                  i === active
                    ? "border-red-600 bg-red-50"
                    : "border-slate-300 bg-white group-hover:border-slate-400",
                )}
              >
                <span
                  className={cn(
                    "text-xl md:text-2xl font-secondary font-bold transition-colors duration-300",
                    i === active ? "text-red-600" : "text-slate-400",
                  )}
                >
                  {step.number}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Progress line */}
        <div className="flex items-center justify-center gap-0 mb-10 px-8 md:px-20">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              {/* Dot */}
              <div
                className={cn(
                  "w-3 h-3 border-2 shrink-0 transition-colors duration-300",
                  i <= active
                    ? "border-red-600 bg-red-600"
                    : "border-slate-300 bg-white",
                )}
              />
              {/* Line */}
              {i < steps.length - 1 && (
                <div className="h-0.5 flex-1 relative bg-slate-200">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 bg-red-600 transition-all duration-500",
                      i < active ? "w-full" : "w-0",
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="relative z-0 grid grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <button
              key={step.number}
              onClick={() => setActive(i)}
              className={cn(
                "relative cursor-pointer transition-all duration-500 overflow-hidden",
                i === active
                  ? "opacity-100 scale-110"
                  : "opacity-50 grayscale scale-105",
              )}
            >
              <Image
                src={step.image}
                alt={step.title}
                width={450}
                height={520}
                className="w-full h-auto object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
