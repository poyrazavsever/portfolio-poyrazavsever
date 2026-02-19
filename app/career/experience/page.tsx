"use client";

import { AboutHero } from "@/components/futures/about/AboutHero";
import { Timeline, TimelineItem } from "@/components/futures/career/Timeline";
import { Typography } from "poyraz-ui/atoms";

const workExperience: TimelineItem[] = [
  {
    id: "omedya-fullstack",
    role: "Fullstack Developer",
    company: "Omedya A.Ş. | Dijital Ajans",
    date: "Jul 2025 - Present",
    location: "Ankara, Türkiye - Hybrid",
    type: "Part-time",
    description: [
      "Developed and managed corporate-scale web applications.",
      "Created AI Agents and integrated them into applications.",
      "Frontend: Angular, Next.js, Astro.js, Tailwind, Material UI.",
      "Backend: C# .NET 10, Node.js (Nest.js & Express.js), PostgreSQL, Supabase, Firebase, MongoDB.",
    ],
    skills: [
      "Next.js",
      "Express.js",
      "Supabase",
      "MongoDB",
      "Figma",
      ".NET 10",
    ],
  },
  {
    id: "omedya-intern",
    role: "Fullstack Developer (Intern)",
    company: "Omedya A.Ş. | Dijital Ajans",
    date: "Jun 2025 - Jul 2025",
    location: "Ankara, Türkiye - On-site",
    type: "Internship",
    description: [
      "Gained hands-on experience with Next.js and AI Agents.",
      "Worked on Web Services APIs and general software development.",
    ],
    skills: [
      "Next.js",
      "AI Agent",
      "JavaScript",
      "Web Services API",
      "Google Gemini",
    ],
  },
  {
    id: "arc-fullstack",
    role: "Full Stack Developer",
    company: "ARC Foreign Trade",
    date: "Feb 2025 - Jun 2025",
    location: "Ankara, Türkiye - On-site",
    type: "Part-time",
    description: [
      "Designed and coded corporate websites and landing pages.",
      "Integrated Chat Bots (Gemini, ChatGPT) into websites.",
    ],
    skills: [
      "React",
      "Next.js",
      "Express.js",
      "Supabase",
      "Firebase",
      "MongoDB",
      "Tailwind",
    ],
  },
  {
    id: "tarvina-intern",
    role: "Fullstack Developer (Intern)",
    company: "Tarvina Yazılım Teknoloji",
    date: "Oct 2024 - Dec 2024",
    location: "Ankara, Türkiye - Remote",
    type: "Internship",
    description: [
      "Learned to work with Agile/Scrum methodologies.",
      "Designed various web apps and flows to improve UI/UX skills.",
      "Built end-to-end projects using Next.js, Express.js & MongoDB.",
    ],
    skills: [
      "Next.js",
      "Angular",
      "Nest.js",
      "MongoDB",
      "Figma",
      "React Native",
      "Redux",
    ],
  },
];

const volunteerExperience: TimelineItem[] = [
  {
    id: "huawei-hsd",
    role: "Project Committee Chair",
    company: "Huawei Student Developers",
    date: "Apr 2025 - Dec 2025",
    type: "Volunteer",
    description: [
      "Selected as part of the Core Team for the newly established HSD community at OSTIM Technical University.",
    ],
    skills: ["Leadership", "Project Management", "Community Building"],
  },
  {
    id: "gdsc-core",
    role: "Technology Dept. Core Team",
    company: "OSTIMTECH GDSC",
    date: "Feb 2025 - Jul 2025",
    type: "Volunteer",
    skills: ["Technology", "Teamwork"],
  },
  {
    id: "ottoqua",
    role: "Software Developer Member",
    company: "OTTOQUA Techno Team",
    date: "Nov 2024 - Dec 2025",
    type: "Volunteer",
    description: [
      "Undertook software tasks with teammates for Tubitak and Teknofest competitions.",
      "Assisted teammates in UI/UX areas in various projects.",
      "Actively participated in meetings and made presentations.",
    ],
    skills: ["Teamwork", "UI/UX", "Presentations", "Competitions"],
  },
  {
    id: "ostimtech-munazara",
    role: "Founding President",
    company: "OstimTech Münazara & Hitabet",
    date: "Nov 2024 - Present",
    type: "Club",
    description: ["Founding president of the Debate & Rhetoric club."],
    skills: ["Leadership", "Public Speaking", "Management"],
  },
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pb-24">
      <AboutHero
        title="Professional"
        highlight="Experience"
        description="A timeline of my professional journey, including internships, jobs, and volunteer work."
        badge="Career"
        imageSrc="/about/experience.png" // TODO: Update with career specific image
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        {/* Professional Experience */}
        <div className="mb-20">
          <Typography
            variant="h2"
            className="text-3xl font-bold mb-12 flex items-center gap-3"
          >
            <span className="w-2 h-8 bg-red-600 rounded-sm inline-block" />
            Work <span className="text-slate-500 font-normal">History</span>
          </Typography>
          <Timeline items={workExperience} />
        </div>

        {/* Volunteer Experience */}
        <div>
          <Typography
            variant="h2"
            className="text-3xl font-bold mb-12 flex items-center gap-3"
          >
            <span className="w-2 h-8 bg-red-600 rounded-sm inline-block" />
            Volunteer{" "}
            <span className="text-slate-500 font-normal">History</span>
          </Typography>
          <Timeline items={volunteerExperience} />
        </div>
      </div>
    </div>
  );
}
