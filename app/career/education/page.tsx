"use client";

import { AboutHero } from "@/components/futures/about/AboutHero";
import { Timeline, TimelineItem } from "@/components/futures/career/Timeline";
import { Typography } from "poyraz-ui/atoms";

const education: TimelineItem[] = [
  {
    id: "ostimtech-software",
    role: "Software Engineering (B.Sc.)",
    company: "OSTİM Technical University",
    date: "Aug 2024 - Jun 2028",
    description: [
      "Founding President of Debate & Rhetoric Club.",
      "Ottoqua Technology Team Core Team (2024-2025).",
      "Google Developers Group Core Team (2024-2025).",
      "Huawei Student Developers Core Team (2024-2025).",
    ],
    skills: [
      "Software Engineering",
      "Algorithms",
      "Data Structures",
      "System Design",
    ],
  },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen pb-24">
      <AboutHero
        title="Academic"
        highlight="Background"
        description="My educational journey and academic achievements."
        badge="Education"
        imageSrc="/about/education.png"
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <Typography
          variant="h2"
          className="text-3xl font-bold mb-12 flex items-center gap-3"
        >
          <span className="w-2 h-8 bg-red-600 rounded-sm inline-block" />
          University <span className="text-slate-500 font-normal">Degree</span>
        </Typography>
        <Timeline items={education} />
      </div>
    </div>
  );
}
