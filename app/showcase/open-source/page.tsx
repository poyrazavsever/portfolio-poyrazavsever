"use client";

import { OpenSourceHero } from "@/components/futures/open-source/OpenSourceHero";
import { PackageCard } from "@/components/futures/open-source/PackageCard";
import { RepoCard } from "@/components/futures/open-source/RepoCard";
import {
  openSourcePageData,
  packages,
  repositories,
} from "@/data/open-source-data";
import { Typography, Separator } from "poyraz-ui/atoms";

export default function OpenSourcePage() {
  return (
    <div className="min-h-screen pb-24">
      <OpenSourceHero
        title={openSourcePageData.title}
        headerHighlight={openSourcePageData.headerHighlight}
        description={openSourcePageData.description}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24 space-y-20">
        {/* Packages Section */}
        <section>
          <div className="mb-8 flex items-center gap-4">
            <Typography
              variant="h2"
              className="text-2xl font-bold tracking-tight"
            >
              Published Packages
            </Typography>
            <Separator className="flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} item={pkg} />
            ))}
          </div>
        </section>

        {/* Repositories Section */}
        <section>
          <div className="mb-8 flex items-center gap-4">
            <Typography
              variant="h2"
              className="text-2xl font-bold tracking-tight"
            >
              Featured Repositories
            </Typography>
            <Separator className="flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repositories.map((repo) => (
              <RepoCard key={repo.name} item={repo} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
