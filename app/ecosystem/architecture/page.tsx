"use client";

import { ArchitectureHero } from "@/components/futures/ecosystem/ArchitectureHero";
import { ArchitectureDiagram } from "@/components/futures/ecosystem/ArchitectureDiagram";
import { Typography } from "poyraz-ui/atoms";

const ecosystemMap = `
graph TD
    User((User))
    
    subgraph "The Hub"
        Main[poyrazavsever.com]
    end

    subgraph "Subdomains (Specialized Services)"
        Portal[portal.poyrazavsever.com]
        Status[status.poyrazavsever.com]
        UI[ui.poyrazavsever.com]
        JS[js.poyrazavsever.com]
        Meet[meet.poyrazavsever.com]
    end

    User --> Main
    Main --> Portal
    Main --> Status
    Main --> UI
    Main --> JS
    Main --> Meet

    click Main "https://poyrazavsever.com"
    click Portal "https://portal.poyrazavsever.com"
    click Status "https://status.poyrazavsever.com"
    click UI "https://ui.poyrazavsever.com"
`;

const userJourneyDiagram = `
sequenceDiagram
    participant U as User
    participant H as Hub (poyrazavsever.com)
    participant P as Portal
    participant L as Learning/Labs

    U->>H: Lands on Portfolio
    H->>U: Showcases Work & Skills

    opt Client / Sponsor
        U->>P: Login to Portal
        P->>U: Project Tracking & Invoices
    end

    opt Learner / Developer
        U->>L: Access Notes & Labs (js.poyrazavsever.com)
        L->>U: Interactive Examples
    end
`;

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen pb-24 bg-white">
      <ArchitectureHero
        title="The Ecosystem Strategy"
        subtitle="Building a comprehensive digital universe, not just a portfolio."
        meta="Feb 2026 • 7 min read • Ecosystem"
      />

      <article className="container mx-auto px-4 max-w-3xl mt-12 md:mt-20 prose prose-slate prose-lg">
        <Typography variant="h2">The Vision</Typography>
        <p>
          My goal is to build a complete <strong>digital ecosystem</strong>.
          It&apos;s not enough to just have a static portfolio. I wanted a
          structure that supports my freelance work, my learning journey, and my
          experimental side projects, all interconnected.
        </p>

        <Typography variant="h2" className="mt-12">
          The Central Hub
        </Typography>
        <p>
          At the center of everything lies <strong>poyrazavsever.com</strong>.
          This is the gateway. It serves as the main showcase for my work, case
          studies, and professional identity. From here, users are routed to
          specialized subdomains based on their intent.
        </p>

        <ArchitectureDiagram
          chart={ecosystemMap}
          caption="Fig 1. The Hub-and-Spoke Topology of the Ecosystem."
        />

        <Typography variant="h3">Specialized Subdomains</Typography>
        <ul className="list-none pl-0 space-y-6">
          <li className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
            <span className="font-bold md:min-w-[220px] text-red-600 break-all md:break-normal">
              portal.poyrazavsever.com
            </span>
            <span className="flex-1">
              The client interface. Here, freelancers and sponsors can log in to
              track project progress, view invoices, and manage collaboration.
            </span>
          </li>
          <li className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
            <span className="font-bold md:min-w-[220px] text-red-600 break-all md:break-normal">
              status.poyrazavsever.com
            </span>
            <span className="flex-1">
              Transparency is key. This dashboard monitors the health of all my
              services and APIs in real-time.
            </span>
          </li>
          <li className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
            <span className="font-bold md:min-w-[220px] text-red-600 break-all md:break-normal">
              ui.poyrazavsever.com
            </span>
            <span className="flex-1">
              <strong>Poyraz UI Kit</strong>. A dedicated space for my custom
              design system. Every component used in my projects is documented
              here to ensure brand consistency.
            </span>
          </li>
          <li className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
            <span className="font-bold md:min-w-[220px] text-red-600 break-all md:break-normal">
              js.poyrazavsever.com
            </span>
            <span className="flex-1">
              My learning garden. This is where I share my notes, lab
              experiments, and code snippets from my ongoing learning journey.
            </span>
          </li>
        </ul>

        <Typography variant="h2" className="mt-12">
          User Journeys
        </Typography>
        <p>
          Different users interact with the ecosystem in different ways. A
          client needs streamlined access to project data, while a developer
          might be interested in my open-source contributions or learning notes.
        </p>

        <ArchitectureDiagram
          chart={userJourneyDiagram}
          caption="Fig 2. User Journey flows for Clients and Learners."
        />

        <div className="mt-16 p-6 bg-slate-50 border border-dashed border-red-200 rounded-lg">
          <Typography variant="h4" className="text-red-600 mb-2">
            Detailed Structure Plan
          </Typography>
          <p className="text-sm text-slate-600 m-0">
            We are currently fleshing out the detailed navigation for the Hub.
            Sections like <strong>Showcase</strong>,{" "}
            <strong>Client Portal</strong>, <strong>Products</strong>, and{" "}
            <strong>Career & Life</strong> will organize the vast content of
            this ecosystem.
          </p>
        </div>
      </article>
    </div>
  );
}
