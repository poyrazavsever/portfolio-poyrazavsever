"use client";

import {
  Textarea,
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Typography,
} from "poyraz-ui/atoms";
import { Send, Reply, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  content: string;
  likes: number;
}

interface CommentSectionProps {
  dictionary: any;
  initialComments?: Comment[];
}

export function CommentSection({
  dictionary,
  initialComments = [],
}: CommentSectionProps) {
  const t = dictionary.mediaCommon.labels;
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleSubmit = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: "Ziyaretçi", // Mock user
      date: "Şimdi",
      content: commentText,
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <div className="mt-16 pt-10 border-t border-dashed border-slate-200">
      <Typography variant="h3" className="mb-8 font-bold">
        {t.comments} ({comments.length})
      </Typography>

      {/* Input Area */}
      <div className="flex gap-4 mb-12">
        <Avatar className="w-10 h-10 border border-dashed border-slate-300 hidden sm:block">
          <AvatarFallback>Sen</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder={t.comments}
            className="min-h-[100px] mb-3 bg-slate-50 focus:bg-white transition-colors"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={!commentText.trim()}>
              <Send className="w-4 h-4 mr-2" />
              {t.send || "Gönder"}
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <Avatar className="w-10 h-10 border border-white shadow-sm">
              <AvatarImage src={comment.avatar} />
              <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">
                {comment.author.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-900">
                  {comment.author}
                </span>
                <span className="text-xs text-slate-400">• {comment.date}</span>
              </div>

              <p className="text-slate-600 mb-3 leading-relaxed">
                {comment.content}
              </p>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{comment.likes || "Beğen"}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
                  <Reply className="w-3 h-3" />
                  <span>Yanıtla</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
