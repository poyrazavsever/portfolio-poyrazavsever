"use client";

import { Button } from "poyraz-ui/atoms";
import { Heart } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "poyraz-ui";
import { useAuth } from "@/hooks/use-auth";
import {
  getLikesCount,
  getUserLikeStatus,
  toggleLike,
} from "@/lib/supabase/queries/blog";

interface LikeButtonProps {
  postId: string;
}

export function LikeButton({ postId }: LikeButtonProps) {
  const { user, isLoading: authLoading, signInWithGithub } = useAuth();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // İlk yüklemede beğeni sayısını ve kullanıcı durumunu çek
  const fetchLikeData = useCallback(async () => {
    const likesCount = await getLikesCount(postId);
    setCount(likesCount);

    if (user) {
      const status = await getUserLikeStatus(postId, user.id);
      setLiked(status);
    }
  }, [postId, user]);

  useEffect(() => {
    if (!authLoading) {
      fetchLikeData();
    }
  }, [authLoading, fetchLikeData]);

  const handleLike = async () => {
    // Giriş yapmamış → GitHub login'e yönlendir
    if (!user) {
      signInWithGithub();
      return;
    }

    // Optimistic UI
    setIsProcessing(true);
    const prevLiked = liked;
    const prevCount = count;
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);

    const { liked: newStatus, error } = await toggleLike(postId, user.id);

    if (error) {
      // Hata olursa geri al
      setLiked(prevLiked);
      setCount(prevCount);
    } else {
      setLiked(newStatus);
    }

    setIsProcessing(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleLike}
      disabled={isProcessing}
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
