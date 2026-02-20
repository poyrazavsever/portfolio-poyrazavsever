"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Card,
  Button,
  Badge,
  Typography,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "poyraz-ui/atoms";
import { Calendar, Clock, Bell, Youtube } from "lucide-react";

interface UpcomingStreamCardProps {
  guestName: string;
  guestRole: string;
  guestImage?: string;
  topic: string;
  date: string; // e.g., "Oct 25, Wednesday"
  time: string; // e.g., "20:00"
  youtubeLink: string;
  dictionary: any;
}

export function UpcomingStreamCard({
  guestName,
  guestRole,
  guestImage,
  topic,
  date,
  time,
  youtubeLink,
  dictionary,
}: UpcomingStreamCardProps) {
  const t = dictionary.mediaMasaBasi.upcoming;
  const common = dictionary.mediaCommon.labels;
  return (
    <Card
      variant="default"
      className="max-w-6xl mx-auto overflow-hidden bg-white"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left: Content Info */}
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-6">
            <Badge>{t.title}</Badge>

            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-0 sm:gap-3 text-slate-500 text-sm font-mono font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-red-600" /> {date}
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-600" /> {time}
              </span>
            </div>
          </div>

          <Typography
            variant="h2"
            className="font-black mb-6 leading-tight text-slate-900"
          >
            {topic}
          </Typography>

          <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 border border-dashed border-slate-200 rounded-lg">
            <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
              <AvatarImage src={guestImage} alt={guestName} />
              <AvatarFallback className="bg-red-100 text-red-600 font-bold">
                {guestName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-slate-900">{guestName}</p>
              <p className="text-slate-500 text-sm">{guestRole}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
                <Youtube className="w-4 h-4" />
                {common.subscribe}
              </a>
            </Button>
            <Button variant="outline">
              <Bell className="w-4 h-4" />
              {common.follow}
            </Button>
          </div>
        </div>

        {/* Right: Visual / Placeholder Pattern */}
        <div className="flex-2 w-full md:w-1/3 bg-slate-50 border-l border-dashed border-slate-200 relative min-h-[200px] md:min-h-auto flex items-center justify-center overflow-hidden">
          {/* Simple Pattern */}
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000000_1px,transparent_1px)] bg-size-[16px_16px]" />

          <div className="transform -rotate-90 md:rotate-0 text-slate-200 font-black text-6xl md:text-8xl select-none absolute">
            LIVE
          </div>
        </div>
      </div>
    </Card>
  );
}
