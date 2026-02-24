"use client";

import {
  Textarea,
  Button,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Typography,
} from "poyraz-ui/atoms";
import { Send, Github, Clock } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  getApprovedComments,
  getUserPendingComments,
  submitComment,
  checkCommentSpam,
  type PublicComment,
} from "@/lib/supabase/queries/blog";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface CommentSectionProps {
  dictionary: any;
  postId: string;
}

export function CommentSection({ dictionary, postId }: CommentSectionProps) {
  const t = dictionary.mediaCommon.labels;
  const isEn = dictionary.shared?.warning === "Warning";
  const { user, isLoading: authLoading, signInWithGithub, signOut } = useAuth();

  const [commentText, setCommentText] = useState("");
  const [approvedComments, setApprovedComments] = useState<PublicComment[]>([]);
  const [pendingComments, setPendingComments] = useState<PublicComment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    const approved = await getApprovedComments(postId);
    setApprovedComments(approved);

    if (user) {
      const pending = await getUserPendingComments(postId, user.id);
      setPendingComments(pending);
    }
  }, [postId, user]);

  useEffect(() => {
    if (!authLoading) {
      fetchComments();
    }
  }, [authLoading, fetchComments]);

  const handleSubmit = async () => {
    if (!commentText.trim() || !user) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    // Spam kontrolü
    const isSpam = await checkCommentSpam(postId, user.id);
    if (isSpam) {
      setSubmitMessage(
        isEn
          ? "You are commenting too fast. Please wait a moment."
          : "Çok hızlı yorum yapıyorsunuz. Lütfen biraz bekleyin.",
      );
      setIsSubmitting(false);
      return;
    }

    const userName =
      user.user_metadata?.user_name ||
      user.user_metadata?.full_name ||
      user.email ||
      "Kullanıcı";
    const userAvatar = user.user_metadata?.avatar_url || null;

    const { error } = await submitComment(
      postId,
      user.id,
      userName,
      userAvatar,
      commentText.trim(),
    );

    if (!error) {
      setCommentText("");
      setSubmitMessage(
        isEn
          ? "Your comment has been submitted and is awaiting approval."
          : "Yorumunuz gönderildi ve onay bekliyor.",
      );
      // Bekleyen yorumları yeniden çek
      fetchComments();
    } else {
      setSubmitMessage(
        isEn
          ? "An error occurred. Please try again."
          : "Bir hata oluştu. Lütfen tekrar deneyin.",
      );
    }

    setIsSubmitting(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (isEn) {
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString("en-US");
    }

    if (diffMins < 1) return "Şimdi";
    if (diffMins < 60) return `${diffMins} dk önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays < 7) return `${diffDays} gün önce`;
    return date.toLocaleDateString("tr-TR");
  };

  const allComments = [...pendingComments, ...approvedComments];
  const totalCount = approvedComments.length;

  const renderComment = (comment: PublicComment) => {
    const isPending = !comment.is_approved;

    return (
      <div
        key={comment.id}
        className={`flex gap-4 group ${isPending ? "opacity-75" : ""}`}
      >
        <Avatar className="w-10 h-10 border border-white shadow-sm">
          {comment.user_avatar ? (
            <AvatarImage src={comment.user_avatar} />
          ) : null}
          <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">
            {comment.user_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-slate-900">
              {comment.user_name}
            </span>
            <span className="text-xs text-slate-400">
              • {formatDate(comment.created_at)}
            </span>
            {isPending && (
              <Badge
                variant="outline"
                className="text-amber-600 border-amber-300 bg-amber-50 text-[10px] px-1.5 py-0 h-5"
              >
                <Clock className="w-2.5 h-2.5 mr-1" />
                {isEn ? "Pending" : "Beklemede"}
              </Badge>
            )}
          </div>

          <p className="text-slate-600 mb-3 leading-relaxed">
            {comment.content}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-16 pt-10 border-t border-dashed border-slate-200">
      <Typography variant="h3" className="mb-8 font-bold">
        {t.comments} ({totalCount})
      </Typography>

      {/* Auth durumuna göre input alanı */}
      {authLoading ? (
        <div className="flex gap-4 mb-12">
          <div className="flex-1 h-[100px] bg-slate-50 animate-pulse" />
        </div>
      ) : !user ? (
        /* Giriş yapmamış kullanıcı */
        <div className="flex flex-col items-center gap-4 mb-12 py-8 border border-dashed border-slate-200 bg-slate-50/50">
          <p className="text-slate-500 text-sm">
            {isEn
              ? "Sign in with your GitHub account to comment."
              : "Yorum yapmak için GitHub hesabınızla giriş yapın."}
          </p>
          <Button onClick={() => signInWithGithub()} className="gap-2">
            <Github className="w-4 h-4" />
            {isEn ? "Sign in with GitHub" : "GitHub ile Giriş Yap"}
          </Button>
        </div>
      ) : (
        /* Giriş yapmış kullanıcı */
        <div className="flex gap-4 mb-12">
          <Avatar className="w-10 h-10 border border-dashed border-slate-300 hidden sm:block">
            {user.user_metadata?.avatar_url ? (
              <AvatarImage src={user.user_metadata.avatar_url} />
            ) : null}
            <AvatarFallback>
              {(user.user_metadata?.user_name || "U").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                {user.user_metadata?.user_name ||
                  user.user_metadata?.full_name ||
                  user.email}
              </span>
              <button
                onClick={signOut}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                {isEn ? "Sign out" : "Çıkış Yap"}
              </button>
            </div>
            <Textarea
              placeholder={
                isEn ? "Write your comment..." : "Yorumunuzu yazın..."
              }
              className="min-h-[100px] mb-3 bg-slate-50 focus:bg-white transition-colors"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                {isEn
                  ? "Your comment will be published after admin approval."
                  : "Yorumunuz admin onayından sonra yayınlanacaktır."}
              </p>
              <Button
                onClick={handleSubmit}
                disabled={!commentText.trim() || isSubmitting}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting
                  ? isEn
                    ? "Sending..."
                    : "Gönderiliyor..."
                  : t.send || (isEn ? "Send" : "Gönder")}
              </Button>
            </div>
            {submitMessage && (
              <p className="text-xs text-amber-600 mt-2 font-medium">
                {submitMessage}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Yorumlar Listesi */}
      <div className="space-y-8">
        {allComments.length === 0 && (
          <p className="text-center text-slate-400 py-8 border border-dashed border-slate-200 bg-slate-50/50 text-sm">
            {isEn
              ? "No comments yet. Be the first to comment!"
              : "Henüz yorum yapılmamış. İlk yorumu sen yap!"}
          </p>
        )}
        {allComments.map(renderComment)}
      </div>
    </div>
  );
}
