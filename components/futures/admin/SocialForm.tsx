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
import {
  AdminSocialVideo,
  SocialPlatform,
  PLATFORM_LABELS,
} from "@/types/admin";
import { Upload, X } from "lucide-react";

interface SocialFormProps {
  video?: AdminSocialVideo;
  onCancel: () => void;
}

export function SocialForm({ video, onCancel }: SocialFormProps) {
  const isEditing = !!video;
  const [platform, setPlatform] = useState<SocialPlatform>("instagram");
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
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
          <Button type="submit">{isEditing ? "Güncelle" : "Oluştur"}</Button>
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
            <Input type="number" defaultValue={video?.sort_order ?? 0} />
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
                placeholder="React 19 ile gelen yeni hook'lar 🔥 #react #webdev"
                rows={3}
                defaultValue={video?.caption}
              />
            </div>
            <div className="space-y-2">
              <Label>Video URL</Label>
              <Input
                placeholder="https://instagram.com/reel/..."
                defaultValue={video?.video_url}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Beğeni Sayısı</Label>
                <Input placeholder="2.4K" defaultValue={video?.likes_count} />
              </div>
              <div className="space-y-2">
                <Label>Yorum Sayısı</Label>
                <Input placeholder="128" defaultValue={video?.comments_count} />
              </div>
            </div>
          </div>
        )}

        {platform === "youtube" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Video Başlığı</Label>
              <Input
                placeholder="Next.js Full Tutorial"
                defaultValue={video?.title}
              />
            </div>
            <div className="space-y-2">
              <Label>Video URL</Label>
              <Input
                placeholder="https://youtube.com/watch?v=..."
                defaultValue={video?.video_url}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>İzlenme</Label>
                <Input placeholder="12K" defaultValue={video?.views_count} />
              </div>
              <div className="space-y-2">
                <Label>Süre</Label>
                <Input placeholder="1:24:30" defaultValue={video?.duration} />
              </div>
              <div className="space-y-2">
                <Label>Yayın Zamanı</Label>
                <Input
                  placeholder="2 hafta önce"
                  defaultValue={video?.published_at}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Beğeni</Label>
                <Input placeholder="890" defaultValue={video?.likes_count} />
              </div>
              <div className="space-y-2">
                <Label>Yorum</Label>
                <Input placeholder="67" defaultValue={video?.comments_count} />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Checkbox
            id="is_published"
            defaultChecked={video?.is_published ?? true}
          />
          <Label htmlFor="is_published">Yayınla</Label>
        </div>
      </div>
    </form>
  );
}
