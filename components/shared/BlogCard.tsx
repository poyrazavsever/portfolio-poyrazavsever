/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardHeader,
  CardImage,
  CardTitle,
  CardContent,
  CardFooter,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "poyraz-ui/atoms";
import Link from "next/link";
import { Clock } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date?: string;
  category: string;
  slug: string;
  image: string;
  author?: {
    name: string;
    avatar: string;
  };
  readTime: string | number;
}

export function BlogCard({
  title,
  excerpt,
  date,
  category,
  slug,
  image,
  author,
  readTime,
}: BlogCardProps) {
  return (
    <Link href={`/media/blog/${slug}`} className="block group h-full">
      <Card
        className="h-full flex flex-col hover:border-red-600 transition-colors"
        variant="default"
      >
        <CardImage className="aspect-video relative overflow-hidden border-b border-dashed border-slate-200">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 border-slate-200 backdrop-blur-sm">
            {category}
          </Badge>
        </CardImage>

        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
            {date && (
              <>
                <span>{date}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
              </>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {readTime} dk
            </span>
          </div>
          <CardTitle className="text-xl md:text-2xl transition-colors group-hover:text-red-600 line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="grow">
          <p className="text-slate-500 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        </CardContent>

        <CardFooter className="pt-4 border-t border-dashed border-slate-100">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border border-dashed border-slate-300">
              <AvatarImage src={author?.avatar} />
              <AvatarFallback>{author?.name?.charAt(0) || "P"}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-bold text-slate-700">
              {author?.name || "Poyraz Avsever"}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
