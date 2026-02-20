"use client";

import { useState } from "react";
import { RepoItem } from "@/data/open-source-data";
import { RepoCard } from "@/components/futures/open-source/RepoCard";
import { Button, Separator, Typography } from "poyraz-ui/atoms";

interface AllReposListProps {
  repos: RepoItem[];
  dictionary: any;
}

const ITEMS_PER_PAGE = 6;

export function AllReposList({ repos, dictionary }: AllReposListProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const labels = dictionary.showcaseCommon.labels;

  const visibleRepos = repos.slice(0, visibleCount);
  const hasMore = visibleCount < repos.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section>
      <div className="mb-8 flex items-center gap-4">
        <Typography variant="h2">
          {labels.allRepos} ({repos.length})
        </Typography>
        <Separator className="flex-1 bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleRepos.map((repo) => (
          <RepoCard key={repo.name} item={repo} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="min-w-[200px]"
            onClick={handleLoadMore}
          >
            {labels.loadMore}
          </Button>
        </div>
      )}
    </section>
  );
}
