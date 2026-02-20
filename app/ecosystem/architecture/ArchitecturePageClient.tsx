"use client";

import { ArchitectureHero } from "@/components/futures/ecosystem/ArchitectureHero";
import { ArchitectureDiagram } from "@/components/futures/ecosystem/ArchitectureDiagram";
import { Typography } from "poyraz-ui/atoms";
import { Dictionary } from "@/types/dictionary";

interface ArchitecturePageClientProps {
  dictionary: Dictionary;
}

export function ArchitecturePageClient({
  dictionary,
}: ArchitecturePageClientProps) {
  const { ecosystem: eco } = dictionary;

  const ecosystemMap = `
graph TD
    User((${eco.diagrams.ecosystem.user}))
    
    subgraph "${eco.diagrams.ecosystem.hub}"
        Main[poyrazavsever.com]
    end

    subgraph "${eco.diagrams.ecosystem.subdomains}"
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
    participant U as ${eco.diagrams.journeys.user}
    participant H as ${eco.diagrams.journeys.hub}
    participant P as ${eco.diagrams.journeys.portal}
    participant L as ${eco.diagrams.journeys.labs}

    U->>H: ${eco.diagrams.journeys.step1}
    H->>U: ${eco.diagrams.journeys.step2}

    opt ${eco.diagrams.journeys.clientOpt}
        U->>P: ${eco.diagrams.journeys.login}
        P->>U: ${eco.diagrams.journeys.tracking}
    end

    opt ${eco.diagrams.journeys.learnerOpt}
        U->>L: ${eco.diagrams.journeys.access}
        L->>U: ${eco.diagrams.journeys.examples}
    end
`;

  return (
    <div className="min-h-screen pb-24 bg-white">
      <ArchitectureHero dictionary={dictionary} />

      <article className="container mx-auto px-4 max-w-3xl mt-12 md:mt-20 prose prose-slate prose-lg">
        <Typography variant="h2">{eco.vision.title}</Typography>
        <p>{eco.vision.description}</p>

        <Typography variant="h2" className="mt-12">
          {eco.hub.title}
        </Typography>
        <p>{eco.hub.description}</p>

        <ArchitectureDiagram chart={ecosystemMap} caption={eco.hub.caption} />

        <Typography variant="h3">{eco.subdomains.title}</Typography>
        <ul className="list-none pl-0 space-y-6">
          {eco.subdomains.items.map((item) => (
            <li
              key={item.name}
              className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4"
            >
              <span className="font-bold md:min-w-[220px] text-red-600 break-all md:break-normal">
                {item.name}
              </span>
              <span className="flex-1">{item.description}</span>
            </li>
          ))}
        </ul>

        <Typography variant="h2" className="mt-12">
          {eco.journeys.title}
        </Typography>
        <p>{eco.journeys.description}</p>

        <ArchitectureDiagram
          chart={userJourneyDiagram}
          caption={eco.journeys.caption}
        />

        <div className="mt-16 p-6 bg-slate-50 border border-dashed border-red-200 rounded-lg">
          <Typography variant="h4" className="text-red-600 mb-2">
            {eco.plan.title}
          </Typography>
          <p className="text-sm text-slate-600 m-0">{eco.plan.description}</p>
        </div>
      </article>
    </div>
  );
}
