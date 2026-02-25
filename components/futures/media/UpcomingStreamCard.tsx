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
  Logo,
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
      <div className="flex flex-col md:flex-row min-h-[400px]">
        {/* Left: Content Info */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <Badge
              variant="default"
              className="bg-red-600 text-white border-none py-1 px-4 text-[10px] font-black uppercase tracking-[0.2em]"
            >
              {t.badge || "LIVE"}
            </Badge>

            <div className="flex items-center gap-3 text-slate-400 text-[10px] font-mono font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-600" /> {date}
              </span>
              <span className="w-1 h-1 bg-slate-200 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-600" /> {time}
              </span>
            </div>
          </div>

          <Typography
            variant="h2"
            className="mb-8 leading-[1.1] text-slate-900 tracking-tight"
          >
            {topic.split(" ").map((word, i) =>
              i === 0 ? (
                <span key={i} className="font-secondary text-red-600 mr-2">
                  {word}
                </span>
              ) : (
                word + " "
              ),
            )}
          </Typography>

          <div className="flex items-center gap-4 mb-10 p-5 bg-slate-50 border border-dashed border-slate-200">
            <Avatar className="w-14 h-14 border-2 border-white shadow-md ring-1 ring-slate-100">
              <AvatarImage src={guestImage} alt={guestName} />
              <AvatarFallback className="bg-red-50 text-red-600 font-bold text-lg">
                {guestName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <Typography
                variant="small"
                className="font-black text-slate-900 uppercase tracking-wide leading-none mb-1"
              >
                {guestName}
              </Typography>
              <Typography
                variant="muted"
                className="text-[11px] font-medium leading-none"
              >
                {guestRole}
              </Typography>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="h-14 px-8 text-xs font-black uppercase tracking-widest"
              asChild
            >
              <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
                <Youtube className="w-5 h-5 mr-2" />
                {common.subscribe}
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-xs font-black uppercase tracking-widest border-2"
            >
              <Bell className="w-5 h-5 mr-2" />
              {common.follow}
            </Button>
          </div>
        </div>

        {/* Right: Visual Section */}
        <div className="md:w-2/5 bg-slate-900 relative overflow-hidden flex items-center justify-center group">
          {/* Background Image / Overlay */}
          {guestImage && (
            <div className="absolute inset-0">
              <img
                src={guestImage}
                alt=""
                className="w-full h-full object-cover opacity-30 grayscale blur-[2px] scale-110 transition-transform duration-700 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent" />
            </div>
          )}

          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[24px_24px]" />

          {/* Typrographic Backplate */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-white/10 font-black text-9xl leading-none select-none tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              LIVE
            </div>

            <div className="bg-white p-1 mb-4 border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
              <div className="border border-dashed border-slate-200 p-2">
              </div>
            </div>

            <Typography
              variant="small"
              className="text-white font-mono font-bold uppercase tracking-[0.5em] text-[10px] opacity-60"
            >
              Masa Başı
            </Typography>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-red-600 opacity-40" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-red-600 opacity-40" />
        </div>
      </div>
    </Card>
  );
}
