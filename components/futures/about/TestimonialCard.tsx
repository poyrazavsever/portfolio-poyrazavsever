"use client";

import { motion } from "framer-motion";
import { Card, Avatar, Typography } from "poyraz-ui/atoms";
import { AdminTestimonial } from "@/types/admin";
import { Locale } from "@/i18n-config";

interface TestimonialCardProps {
  testimonial: AdminTestimonial;
  locale: Locale;
}

export function TestimonialCard({ testimonial, locale }: TestimonialCardProps) {
  const content =
    locale === "tr" ? testimonial.content_tr : testimonial.content_en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card
        variant="bordered"
        className="h-full flex flex-col p-6 border-2 hover:border-red-600/50 transition-colors group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56929 13 5.017 13H3.017V21H5.017Z" />
          </svg>
        </div>

        <div className="flex-1 relative">
          <Typography
            variant="p"
            className="italic text-slate-700 leading-relaxed mb-8"
          >
            &ldquo;{content}&rdquo;
          </Typography>
        </div>

        <div className="flex items-center gap-4 pt-6 border-t border-dashed border-slate-200">
          <Avatar
            fallback={testimonial.full_name.substring(0, 2).toUpperCase()}
            className="border-2 border-red-600/10"
          />
          <div className="flex-1 min-w-0">
            <Typography variant="p" className="font-bold truncate">
              {testimonial.full_name}
            </Typography>
            <Typography variant="small" className="text-slate-500 truncate">
              {testimonial.title}
            </Typography>
          </div>
          {testimonial.company_logo_url && (
            <div className="h-8 w-px bg-slate-200 hidden sm:block mx-2" />
          )}
          {testimonial.company_logo_url && (
            <div className="relative h-6 w-16 grayscale opacity-50 contrast-125">
              <img
                src={testimonial.company_logo_url}
                alt="Company logo"
                className="object-contain h-6 w-auto"
              />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
