"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, useRef, useEffect } from "react";
import {
  Button,
  Input,
  Label,
  Typography,
  Textarea,
  Checkbox,
  Separator,
} from "poyraz-ui/atoms";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "poyraz-ui/molecules";
import { AdminSocialVideo, SocialPlatform } from "@/types/admin";
import { Upload, X } from "lucide-react";
import {
  createSocialVideo,
  updateSocialVideo,
} from "@/lib/supabase/queries/media";

interface SocialFormProps {
  video?: AdminSocialVideo;
  onCancel: () => void;
}

export function SocialForm({ video, onCancel }: SocialFormProps) {
  const isEditing = !!video;
  const [platform, setPlatform] = useState<SocialPlatform>("instagram");
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (video) {
      setPlatform(video.platform);
      setThumbPreview(video.thumbnail_url || null);
    } else {
      setPlatform("instagram");
      setThumbPreview(null);
    }
  }, [video]);

  const handleThumbUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = formRef.current;
    if (!form) return;

    const fd = new FormData(form);

    const data = {
      platform,
      title: (fd.get("title") as string) || "",
      caption: (fd.get("caption") as string) || "",
      thumbnail_url: video?.thumbnail_url || thumbPreview || "",
      video_url: (fd.get("video_url") as string) || "",
      likes_count: (fd.get("likes_count") as string) || "",
      comments_count: (fd.get("comments_count") as string) || "",
      views_count: (fd.get("views_count") as string) || "",
      duration: (fd.get("duration") as string) || "",
      published_at: (fd.get("published_at") as string) || "",
      sort_order: parseInt(fd.get("sort_order") as string) || 0,
      is_published: fd.get("is_published") === "on",
    };

    if (isEditing && video) {
      await updateSocialVideo(video.id, data);
    } else {
      await createSocialVideo(data);
    }

    setLoading(false);
    onCancel();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Typography variant="h3">
          {isEditing
            ? "Sosyal Medya İçeriği Düzenle"
            : "Yeni Sosyal Medya İçeriği"}
        </Typography>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            İptal
          </Button>
          <Button type="submit" loading={loading} disabled={loading}>
            {isEditing ? "Güncelle" : "Oluştur"}
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Platform</Label>
            <Select
              value={platform}
              onValueChange={(v) => setPlatform(v as SocialPlatform)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Sıralama</Label>
            <Input
              name="sort_order"
              type="number"
              defaultValue={video?.sort_order ?? 0}
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-2">
          <Label>Thumbnail</Label>
          <input
            ref={thumbInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleThumbUpload}
          />

          {thumbPreview ? (
            <div
              className={`relative border-2 border-dashed border-slate-300 ${
                platform === "instagram"
                  ? "w-40 aspect-[4/5]"
                  : "w-64 aspect-video"
              }`}
            >
              <img
                src={thumbPreview}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setThumbPreview(null);
                  if (thumbInputRef.current) thumbInputRef.current.value = "";
                }}
                className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => thumbInputRef.current?.click()}
              className={`border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 hover:border-red-600 hover:bg-red-50 transition-colors cursor-pointer ${
                platform === "instagram"
                  ? "w-40 aspect-[4/5]"
                  : "w-64 aspect-video"
              }`}
            >
              <Upload className="w-6 h-6 text-slate-400" />
              <Typography variant="muted">Yükle</Typography>
            </button>
          )}
        </div>

        {/* Platform-specific fields */}
        {platform === "instagram" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Caption</Label>
              <Textarea
                name="caption"
                placeholder="React 19 ile gelen yeni hook'lar 🔥 #react #webdev"
                rows={3}
                defaultValue={video?.caption}
              />
            </div>
            <div className="space-y-2">
              <Label>Video URL</Label>
              <Input
                name="video_url"
                placeholder="https://instagram.com/reel/..."
                defaultValue={video?.video_url}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Beğeni Sayısı</Label>
                <Input
                  name="likes_count"
                  placeholder="2.4K"
                  defaultValue={video?.likes_count}
                />
              </div>
              <div className="space-y-2">
                <Label>Yorum Sayısı</Label>
                <Input
                  name="comments_count"
                  placeholder="128"
                  defaultValue={video?.comments_count}
                />
              </div>
            </div>
          </div>
        )}

        {platform === "youtube" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Video Başlığı</Label>
              <Input
                name="title"
                placeholder="Next.js Full Tutorial"
                defaultValue={video?.title}
              />
            </div>
            <div className="space-y-2">
              <Label>Video URL</Label>
              <Input
                name="video_url"
                placeholder="https://youtube.com/watch?v=..."
                defaultValue={video?.video_url}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>İzlenme</Label>
                <Input
                  name="views_count"
                  placeholder="12K"
                  defaultValue={video?.views_count}
                />
              </div>
              <div className="space-y-2">
                <Label>Süre</Label>
                <Input
                  name="duration"
                  placeholder="1:24:30"
                  defaultValue={video?.duration}
                />
              </div>
              <div className="space-y-2">
                <Label>Yayın Zamanı</Label>
                <Input
                  name="published_at"
                  placeholder="2 hafta önce"
                  defaultValue={video?.published_at}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Beğeni</Label>
                <Input
                  name="likes_count"
                  placeholder="890"
                  defaultValue={video?.likes_count}
                />
              </div>
              <div className="space-y-2">
                <Label>Yorum</Label>
                <Input
                  name="comments_count"
                  placeholder="67"
                  defaultValue={video?.comments_count}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Checkbox
            id="is_published"
            name="is_published"
            defaultChecked={video?.is_published ?? true}
          />
          <Label htmlFor="is_published">Yayınla</Label>
        </div>
      </div>
    </form>
  );
}
