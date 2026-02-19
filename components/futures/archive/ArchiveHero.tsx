"use client";

import { motion } from "framer-motion";
import { Badge, PatternGrid, Typography } from "poyraz-ui/atoms";

interface ArchiveHeroProps {
  title?: string;
  headerHighlight?: string;
  description?: string;
}

export function ArchiveHero({
  title = "Project",
  headerHighlight = "Archive",
  description = "A comprehensive collection of all my works across design, development, and engineering.",
}: ArchiveHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white border-b-2 border-dashed border-slate-200">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PatternGrid
          className="w-full h-full opacity-[0.04]"
          color="currentColor"
          size={40}
        />
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-2 uppercase tracking-widest border-red-600/30 text-red-600 bg-red-50"
            >
              Community First
            </Badge>
            <Typography
              variant="h1"
              className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-2"
            >
              {title}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-500 font-secondary">
                {headerHighlight}
              </span>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography
              variant="lead"
              className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </Typography>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
