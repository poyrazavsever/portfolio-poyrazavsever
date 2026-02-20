"use client";

import { MediaListItem } from "@/components/futures/media/MediaListItem";
import { MediaSheet, MediaItem } from "@/components/futures/media/MediaSheet";
import { Button } from "poyraz-ui/atoms";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MasaBasiArchiveClientProps {
  episodes: any[];
  dictionary: any;
}

export function MasaBasiArchiveClient({
  episodes,
  dictionary,
}: MasaBasiArchiveClientProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<MediaItem | null>(
    null,
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const t = dictionary.mediaMasaBasi;

  const handleDetailsClick = (episode: MediaItem) => {
    setSelectedEpisode(episode);
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 max-w-4xl pt-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-900 -ml-2"
            asChild
          >
            <Link href="/media/masa-basi">
              <ArrowLeft className="mr-2 w-4 h-4" />
              {t.archive.backToLive}
            </Link>
          </Button>
        </div>

        <div className="border-t border-dashed border-slate-200">
          {episodes.map((ep) => (
            <MediaListItem
              key={ep.id}
              id={ep.id}
              title={ep.title}
              guest={ep.guest}
              date={ep.date}
              onDetailsClick={() => handleDetailsClick(ep)}
              dictionary={dictionary}
            />
          ))}
        </div>
      </div>

      <MediaSheet
        item={selectedEpisode}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        badgePrefix="ARCHIVE"
        dictionary={dictionary}
      />
    </>
  );
}
