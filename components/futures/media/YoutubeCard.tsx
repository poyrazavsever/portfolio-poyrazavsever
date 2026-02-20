"use client";

import { Badge, Button, Card, Typography } from "poyraz-ui/atoms";
import { cn } from "poyraz-ui";
import { Play, Youtube, Clock, Eye, ExternalLink } from "lucide-react";

export interface YoutubeCardProps {
  id: string;
  thumbnail: string;
  title: string;
  views: string;
  duration: string;
  publishedAt: string;
  videoUrl: string;
  className?: string;
}

export function YoutubeCard({
  id,
  thumbnail,
  title,
  views,
  duration,
  publishedAt,
  videoUrl,
  className,
}: YoutubeCardProps) {
  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group block", className)}
    >
      <Card className="overflow-hidden border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* Thumbnail Section */}
        <div className="relative aspect-video overflow-hidden bg-slate-900">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 text-white fill-current ml-1" />
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2">
            <Badge
              variant="secondary"
              className="bg-black/80 text-white hover:bg-black/90 border-none font-mono text-xs"
            >
              {duration}
            </Badge>
          </div>

          {/* Youtube Icon Badge */}
          <div className="absolute top-2 left-2">
            <div className="bg-red-600 p-1.5 rounded text-white shadow-sm">
              <Youtube className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-1">
          <Typography
            variant="h4"
            className="mb-3 font-bold text-lg leading-snug line-clamp-2 group-hover:text-red-600 transition-colors"
          >
            {title}
          </Typography>

          <div className="mt-auto pt-4 border-t border-dashed border-slate-100 flex items-center justify-between text-slate-500 text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {views}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {publishedAt}
              </span>
            </div>

            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300 text-red-600" />
          </div>
        </div>
      </Card>
    </a>
  );
}
