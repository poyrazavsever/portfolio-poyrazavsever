"use client";

import { Button } from "poyraz-ui/atoms";
import { ArrowRight, User } from "lucide-react";

interface EpisodeListItemProps {
  episodeNumber: string;
  title: string;
  guest: string;
  date: string;
  youtubeLink: string;
}

export function EpisodeListItem({
  episodeNumber,
  title,
  guest,
  date,
  youtubeLink,
}: EpisodeListItemProps) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border-b border-dashed border-slate-200 hover:bg-slate-50 transition-colors">
      <div className="flex gap-4">
        <span className="text-slate-300 font-mono font-bold text-lg pt-1 select-none">
          #{episodeNumber}
        </span>
        <div>
          <h3 className="font-bold text-lg text-slate-900 mb-1">{title}</h3>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" /> {guest}
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>{date}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-0 pl-10 sm:pl-0">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
            Watch
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
