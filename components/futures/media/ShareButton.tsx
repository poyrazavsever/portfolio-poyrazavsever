"use client";

import { Button } from "poyraz-ui/atoms";
import { Share2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  slug: string;
}

export function ShareButton({ title, slug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/media/blog/${slug}`;

    // Web Share API destekleniyorsa (mobil vs.)
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Kullanıcı paylaşımı iptal etti, clipboard'a kopyala
      }
    }

    // Fallback: Clipboard'a kopyala
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={
        copied ? "text-green-600" : "text-slate-400 hover:text-slate-900"
      }
      onClick={handleShare}
    >
      {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
    </Button>
  );
}
