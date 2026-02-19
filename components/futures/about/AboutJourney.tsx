"use client";

import { Typography } from "poyraz-ui/atoms";

export function AboutJourney() {
  return (
    <section className="container mx-auto px-4 max-w-6xl py-12 md:py-20">
      <div className="prose prose-lg prose-slate max-w-none">
        <Typography
          variant="h2"
          className="mb-8 font-bold text-3xl md:text-4xl text-slate-900 text-left"
        >
          The Journey{" "}
          <span className="text-red-600 font-secondary">So Far</span>
        </Typography>

        <div className="space-y-6 text-slate-600 leading-relaxed text-left">
          <p>
            I started my journey with a curiosity for how things work on the
            web. What began as editing HTML files in Notepad has evolved into a
            passion for building complex, scalable ecosystems.
          </p>
          <p>
            Over the years, I&apos;ve worn many hats: developer, designer,
            content creator, and mentor. I don&apos;t just write code; I craft
            experiences. My philosophy is simple: **build things that matter,
            and build them well.**
          </p>
          <p>
            I created my own ecosystem not just to showcase my work, but to have
            a playground where I can experiment with new technologies (like the
            one you&apos;re looking at right now!) and share my knowledge with
            the community.
          </p>
        </div>
      </div>
    </section>
  );
}
