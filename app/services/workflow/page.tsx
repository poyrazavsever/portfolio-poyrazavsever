"use client";

import { WorkflowHero } from "@/components/futures/services/WorkflowHero";
import { WorkflowStep } from "@/components/futures/services/WorkflowStep";
import { Button } from "poyraz-ui/atoms";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Alignment",
    description:
      "Every great project starts with the right communication. This is where we test the compatibility of your vision with my technical expertise.",
    action:
      "You submit project details via the form or schedule a 15-30 min Discovery Call.",
    result:
      "We agree on project goals, budget range, and tech stack (Web, Mobile, Architecture).",
  },
  {
    number: "02",
    title: "Proposal & Agreement",
    description:
      "Scope is defined and the professional framework is set. No room for surprise costs or extended timelines.",
    action:
      "You receive a detailed proposal including timeline, tech stack, and payment schedule.",
    result:
      "Proposal approved, deposit paid, and the development calendar is locked.",
  },
  {
    number: "03",
    title: "The Onboarding",
    description:
      "This is where we depart from the standard freelancer experience. You step into the project's command center.",
    action:
      "A client account is created for you on portal.poyrazavsever.com immediately after agreement.",
    result:
      "All your contracts, invoices, meeting notes, and project progress become accessible in one secure panel.",
  },
  {
    number: "04",
    title: "Requirements & UI/UX",
    description:
      "Before writing code, we draw a flawless plan of what we are building.",
    action:
      "You submit brand assets (logo, text, colors) and a detailed brief via the Portal.",
    result:
      "High-fidelity Figma designs and prototypes are prepared. You see and approve the finished look before coding begins.",
  },
  {
    number: "05",
    title: "Development, QA & Launch",
    description:
      "The final stage where design comes to life and the project goes live.",
    action:
      "Development sprints begin. You track transparently via Portal. We perform QA testing on staging servers.",
    result:
      "Project is launched to Production. Source code and docs delivered. Optional transition to Retainer/Maintenance.",
  },
];

export default function WorkflowPage() {
  return (
    <div className="min-h-screen pb-32 bg-white">
      <WorkflowHero />

      <div className="container mx-auto px-4 max-w-6xl mt-20">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <WorkflowStep
              key={step.number}
              {...step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        <div className="mt-20 p-12 bg-slate-50 border-2 border-dashed border-slate-200 text-center rounded-lg">
          <div className="max-w-xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to start this journey?
            </h3>
            <p className="text-slate-600 mb-8">
              Now that you know how we work, let&apos;s discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <a href="/contact">
                  Start a Project <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/services">View Services</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
