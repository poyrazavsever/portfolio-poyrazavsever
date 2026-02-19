"use client";

import { Button } from "poyraz-ui/atoms";
import { FileText, Calendar, Clock } from "lucide-react";

interface PodcastListItemProps {
  id: string;
  title: string;
  date: string;
  duration: string;
  onDetailsClick: () => void;
}

export function PodcastListItem({
  id,
  title,
  date,
  duration,
  onDetailsClick,
}: PodcastListItemProps) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border-b border-dashed border-slate-200 hover:bg-slate-50 transition-colors">
      <div className="flex gap-4">
        <span className="text-slate-300 font-mono font-bold text-lg pt-1 select-none">
          #{id}
        </span>
        <div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> {date}
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {duration}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-0 pl-10 sm:pl-0">
        <Button
          variant="outline"
          size="sm"
          onClick={onDetailsClick}
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Detaylar
        </Button>
      </div>
    </div>
  );
}
