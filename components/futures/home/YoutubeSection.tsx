import { Typography } from "poyraz-ui/atoms";
import Image from "next/image";
import Link from "next/link";
import { Dictionary } from "@/types/dictionary";

const staticVideos = [
  { id: "b3SL2S1zYwU" },
  { id: "W1b6K7C86HY" },
  { id: "N17_NNAHgzk" },
];

interface VideoData {
  id: string;
  title: string;
}

function VideoCard({
  video,
  featured = false,
}: {
  video: VideoData;
  featured?: boolean;
}) {
  return (
    <Link
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden border border-dashed border-slate-300 bg-white"
    >
      <div className={`relative ${featured ? "aspect-video" : "aspect-video"}`}>
        <Image
          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center bg-red-600 text-white transition-transform duration-300 group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 ml-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3">
        <Typography variant="small" className="text-white line-clamp-1">
          {video.title}
        </Typography>
      </div>
    </Link>
  );
}

interface YoutubeSectionProps {
  dictionary: Dictionary;
}

export function YoutubeSection({ dictionary }: YoutubeSectionProps) {
  const { youtube } = dictionary.home;

  const videos: VideoData[] = staticVideos.map((v, i) => ({
    ...v,
    title: youtube.videos[i].title,
  }));

  const [featured, ...rest] = videos;

  return (
    <section className="relative py-16 md:py-24">
      {/* Red stripe background */}
      <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-red-200" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <Typography variant="h2">
            {youtube.title}{" "}
            <span className="text-red-600 font-secondary">
              {youtube.highlight}
            </span>
          </Typography>
          <Typography variant="muted" className="mt-2 text-slate-500">
            {youtube.subtitle}
          </Typography>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Featured video — spans 2 columns */}
          <div className="md:col-span-2">
            <VideoCard video={featured} featured />
          </div>

          {/* Side videos */}
          <div className="flex flex-col gap-4">
            {rest.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
