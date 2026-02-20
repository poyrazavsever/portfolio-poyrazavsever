"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  Typography,
} from "poyraz-ui/atoms";
import { cn } from "poyraz-ui";
import { Heart, MessageCircle, Share2, Instagram, Play } from "lucide-react";
import Link from "next/link";

export interface InstagramCardProps {
  id: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  videoUrl?: string; // Optional if it's a video/reel
  className?: string;
}

export function InstagramCard({
  id,
  thumbnail,
  caption,
  likes,
  comments,
  videoUrl,
  className,
}: InstagramCardProps) {
  const isVideo = !!videoUrl;

  return (
    <Card
      className={cn(
        "group overflow-hidden border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
        className,
      )}
    >
      {/* Header / Brand */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
          <Instagram className="w-4 h-4 text-[#E1306C]" />
        </div>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <img
          src={thumbnail}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />

        {/* Play Button if Video */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <Play className="w-5 h-5 text-white fill-current" />
            </div>
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <Typography
            variant="small"
            className="line-clamp-2 text-white/90 mb-3 font-normal text-sm leading-relaxed"
          >
            {caption}
          </Typography>

          <div className="flex items-center justify-between border-t border-white/20 pt-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Heart className="w-4 h-4" />
                {likes.toLocaleString()}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <MessageCircle className="w-4 h-4" />
                {comments.toLocaleString()}
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white hover:text-white hover:bg-white/20 rounded-full"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
