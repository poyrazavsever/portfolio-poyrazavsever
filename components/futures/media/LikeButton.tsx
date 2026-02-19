"use client";

import { Button } from "poyraz-ui/atoms";
import { Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "poyraz-ui";

interface LikeButtonProps {
  initialCount?: number;
}

export function LikeButton({ initialCount = 0 }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleLike = () => {
    if (liked) {
      setCount((prev) => prev - 1);
    } else {
      setCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <Button
      variant="outline"
      onClick={handleLike}
      className={cn(
        "gap-2 transition-all duration-300",
        liked
          ? "border-red-600 text-red-600 bg-red-50"
          : "text-slate-500 hover:text-red-600 hover:border-red-600",
      )}
    >
      <Heart
        className={cn(
          "w-4 h-4 transition-transform",
          liked && "fill-current scale-110",
        )}
      />
      <span>{count}</span>
      <span className="hidden sm:inline-block ml-1">
        {liked ? "Liked" : "Like"}
      </span>
    </Button>
  );
}
