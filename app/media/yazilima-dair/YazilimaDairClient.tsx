"use client";

import { MediaListItem } from "@/components/futures/media/MediaListItem";
import { MediaSheet, MediaItem } from "@/components/futures/media/MediaSheet";
import { useState } from "react";

interface YazilimaDairClientProps {
  episodes: any[];
  dictionary: any;
}

export function YazilimaDairClient({
  episodes,
  dictionary,
}: YazilimaDairClientProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<MediaItem | null>(
    null,
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleDetailsClick = (episode: MediaItem) => {
    setSelectedEpisode(episode);
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 max-w-4xl pt-8">
        <div className="border-t border-dashed border-slate-200">
          {episodes.map((ep) => (
            <MediaListItem
              key={ep.id}
              id={ep.id}
              title={ep.title}
              date={ep.date}
              duration="45 dk"
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
        badgePrefix="EPISODE"
        dictionary={dictionary}
      />
    </>
  );
}
