"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  Typography,
  Button,
  ScrollArea,
  Badge,
} from "poyraz-ui"; // Barrel export
import { Calendar, Youtube } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Music } from "lucide-react";

interface PodcastEpisode {
  id: string;
  title: string;
  date: string;
  youtubeLink?: string;
  spotifyLink?: string;
  content: string; // Markdown
}

interface PodcastSheetProps {
  episode: PodcastEpisode | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PodcastSheet({
  episode,
  isOpen,
  onOpenChange,
}: PodcastSheetProps) {
  if (!episode) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl p-0 overflow-hidden flex flex-col bg-white">
        {/* Header Section */}
        <div className="p-6 border-b border-dashed border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-white">
              EPISODE #{episode.id}
            </Badge>
            <Typography
              variant="muted"
              className="flex items-center gap-1 font-mono"
            >
              <Calendar className="w-3 h-3" /> {episode.date}
            </Typography>
          </div>

          <SheetTitle asChild>
            <Typography variant="h3" className="leading-tight mb-6">
              {episode.title}
            </Typography>
          </SheetTitle>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {episode.youtubeLink && (
              <Button size="sm" className="gap-2 flex-1" asChild>
                <a
                  href={episode.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-4 h-4" />
                  YouTube
                </a>
              </Button>
            )}
            {episode.spotifyLink && (
              <Button
                size="sm"
                variant="outline"
                className="gap-2 flex-1"
                asChild
              >
                <a
                  href={episode.spotifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Music className="w-4 h-4" /> {/* Spotify Fallback */}
                  Spotify
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <ScrollArea className="flex-1 p-6" maxHeight="100%">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <div className="mb-4 pt-2">
                  <Typography variant="h2">{children}</Typography>
                  <div className="h-px w-20 bg-red-600 mt-2" />
                </div>
              ),
              h2: ({ children }) => (
                <Typography
                  variant="h3"
                  className="mt-8 mb-4 border-l-4 border-red-600 pl-4 py-1 bg-slate-50"
                >
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography
                  variant="h4"
                  className="mt-6 mb-3 font-bold text-slate-900"
                >
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
                <p className="text-slate-600 leading-relaxed mb-4 text-base">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-600">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-4 space-y-2 text-slate-600">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="pl-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-dashed border-red-300 bg-red-50/50 p-4 italic text-slate-700 mb-6">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-red-600 border border-slate-200">
                  {children}
                </code>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-red-600 hover:text-red-700 underline decoration-dashed underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {episode.content}
          </ReactMarkdown>
          <div className="h-20" /> {/* Bottom Spacer */}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
