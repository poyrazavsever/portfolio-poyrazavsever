import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "poyraz-ui/atoms";
import { Typography } from "poyraz-ui/atoms";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { RepoItem } from "@/data/open-source-data";

interface RepoCardProps {
  item: RepoItem;
}

export function RepoCard({ item }: RepoCardProps) {
  return (
    <Card className="flex flex-col h-full border-2 border-slate-200 hover:border-slate-800 transition-colors duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-slate-100 group-hover:bg-slate-800 transition-colors duration-300">
              <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline decoration-2 underline-offset-2"
            >
              <CardTitle>{item.name}</CardTitle>
            </a>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <Typography variant="muted">{item.description}</Typography>
      </CardContent>

      <CardFooter className="pt-0 border-t border-dashed border-slate-200 mt-auto pt-4 flex justify-between items-center text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span>{item.language}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-slate-800 cursor-default">
            <Star className="w-3.5 h-3.5" />
            <span>{item.stars}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-slate-800 cursor-default">
            <GitFork className="w-3.5 h-3.5" />
            <span>{item.forks}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
