"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Label,
  Typography,
  Textarea,
  Checkbox,
  Separator,
} from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { AdminEpisode, EpisodeSeries, SERIES_LABELS } from "@/types/admin";
import { Upload, X } from "lucide-react";
import {
  createEpisode,
  updateEpisode,
  uploadGuestImage,
} from "@/lib/supabase/queries/media";

interface EpisodeFormProps {
  episode?: AdminEpisode;
  defaultSeries: EpisodeSeries;
  onCancel: () => void;
}

export function EpisodeForm({
  episode,
  defaultSeries,
  onCancel,
}: EpisodeFormProps) {
  const isEditing = !!episode;
  const series = episode?.series || defaultSeries;

  const [guestPreview, setGuestPreview] = useState<string | null>(null);
  const [guestFile, setGuestFile] = useState<File | null>(null);
  const guestInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    episode_number: episode?.episode_number?.toString() || "1",
    season: episode?.season?.toString() || "1",
    title_tr: episode?.title_tr || "",
    title_en: episode?.title_en || "",
    description_tr: episode?.description_tr || "",
    description_en: episode?.description_en || "",
    content_tr: episode?.content_tr || "",
    content_en: episode?.content_en || "",
    guest_name: episode?.guest_name || "",
    guest_role: episode?.guest_role || "",
    date: episode?.date || "",
    time: episode?.time || "",
    duration: episode?.duration || "",
    topics: episode?.topics?.join(", ") || "",
    youtube_url: episode?.youtube_url || "",
    spotify_url: episode?.spotify_url || "",
    is_upcoming: episode?.is_upcoming ?? false,
    is_published: episode?.is_published ?? true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    if (episode) {
      setGuestPreview(episode.guest_image || null);
    } else {
      setGuestPreview(null);
    }
    setGuestFile(null);
  }, [episode]);

  const handleGuestUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGuestFile(file);
      setGuestPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let guestImageUrl = episode?.guest_image || "";
    if (guestFile) {
      const path = `guests/${Date.now()}-${guestFile.name}`;
      guestImageUrl = await uploadGuestImage(guestFile, path);
    }

    const data = {
      series,
      episode_number: parseInt(formData.episode_number) || 1,
      season: parseInt(formData.season) || 1,
      title_tr: formData.title_tr,
      title_en: formData.title_en,
      description_tr: formData.description_tr,
      description_en: formData.description_en,
      content_tr: formData.content_tr,
      content_en: formData.content_en,
      guest_name: formData.guest_name,
      guest_role: formData.guest_role,
      guest_image: guestImageUrl,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      topics: formData.topics
        ? formData.topics.split(",").map((t) => t.trim())
        : [],
      youtube_url: formData.youtube_url,
      spotify_url: formData.spotify_url,
      is_upcoming: formData.is_upcoming,
      is_published: formData.is_published,
    };

    if (isEditing && episode) {
      await updateEpisode(episode.id, data);
    } else {
      await createEpisode(data);
    }

    setLoading(false);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Typography variant="h3">
          {isEditing
            ? `"${episode.title_tr}" Düzenleniyor`
            : `Yeni ${SERIES_LABELS[series]} Bölümü`}
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

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Genel</TabsTrigger>
          {series === "masa_basi" && (
            <TabsTrigger value="guest">Konuk</TabsTrigger>
          )}
          <TabsTrigger value="content">İçerik</TabsTrigger>
          <TabsTrigger value="links">Linkler</TabsTrigger>
          <TabsTrigger value="meta">Meta</TabsTrigger>
        </TabsList>

        {/* ── Genel ── */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Bölüm No</Label>
              <Input
                name="episode_number"
                type="number"
                placeholder="12"
                value={formData.episode_number}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Sezon</Label>
              <Input
                name="season"
                type="number"
                placeholder="1"
                value={formData.season}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Seri</Label>
              <Input
                value={SERIES_LABELS[series]}
                readOnly
                className="bg-slate-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Başlık (TR)</Label>
              <Input
                name="title_tr"
                placeholder="Bölüm başlığı"
                value={formData.title_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Başlık (EN)</Label>
              <Input
                name="title_en"
                placeholder="Episode title"
                value={formData.title_en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Açıklama (TR)</Label>
              <Textarea
                name="description_tr"
                placeholder="Kısa açıklama"
                rows={3}
                value={formData.description_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Açıklama (EN)</Label>
              <Textarea
                name="description_en"
                placeholder="Short description"
                rows={3}
                value={formData.description_en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tarih</Label>
              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Saat</Label>
              <Input
                name="time"
                type="time"
                placeholder="20:00"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Süre</Label>
              <Input
                name="duration"
                placeholder="1h 15m"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Konular (virgülle ayır)</Label>
            <Input
              name="topics"
              placeholder="React, TypeScript, Architecture"
              value={formData.topics}
              onChange={handleChange}
            />
          </div>
        </TabsContent>

        {/* ── Konuk ── */}
        {series === "masa_basi" && (
          <TabsContent value="guest" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Konuk Adı</Label>
                <Input
                  name="guest_name"
                  placeholder="Ahmet Yılmaz"
                  value={formData.guest_name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Konuk Rolü</Label>
                <Input
                  name="guest_role"
                  placeholder="Senior Developer @ Company"
                  value={formData.guest_role}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Konuk Fotoğrafı</Label>
              <input
                ref={guestInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleGuestUpload}
              />

              {guestPreview ? (
                <div className="relative w-24 h-24 border-2 border-dashed border-slate-300">
                  <img
                    src={guestPreview}
                    alt="Konuk"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setGuestPreview(null);
                      setGuestFile(null);
                      if (guestInputRef.current)
                        guestInputRef.current.value = "";
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => guestInputRef.current?.click()}
                  className="w-24 h-24 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 hover:border-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Upload className="w-5 h-5 text-slate-400" />
                  <Typography variant="muted" className="text-xs">
                    Yükle
                  </Typography>
                </button>
              )}
            </div>
          </TabsContent>
        )}

        {/* ── İçerik (Markdown) ── */}
        <TabsContent value="content" className="space-y-4">
          <Typography variant="muted">
            Bölüm notları (Markdown). PodcastSheet detay sayfasında gösterilir.
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>İçerik (TR)</Label>
              <Textarea
                name="content_tr"
                placeholder={
                  "# Bölüm Notları\n\n## Konular\n\n- Konu 1\n- Konu 2"
                }
                rows={15}
                className="font-mono text-sm"
                value={formData.content_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>İçerik (EN)</Label>
              <Textarea
                name="content_en"
                placeholder={
                  "# Episode Notes\n\n## Topics\n\n- Topic 1\n- Topic 2"
                }
                rows={15}
                className="font-mono text-sm"
                value={formData.content_en}
                onChange={handleChange}
              />
            </div>
          </div>
        </TabsContent>

        {/* ── Linkler ── */}
        <TabsContent value="links" className="space-y-4">
          <div className="space-y-2">
            <Label>YouTube URL</Label>
            <Input
              name="youtube_url"
              placeholder="https://youtube.com/watch?v=..."
              value={formData.youtube_url}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Spotify URL</Label>
            <Input
              name="spotify_url"
              placeholder="https://open.spotify.com/episode/..."
              value={formData.spotify_url}
              onChange={handleChange}
            />
          </div>
        </TabsContent>

        {/* ── Meta ── */}
        <TabsContent value="meta" className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_published"
                name="is_published"
                checked={formData.is_published}
                onCheckedChange={(c) =>
                  handleCheckboxChange("is_published", c as boolean)
                }
              />
              <Label htmlFor="is_published">Yayınla</Label>
            </div>
            {series === "masa_basi" && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_upcoming"
                  name="is_upcoming"
                  checked={formData.is_upcoming}
                  onCheckedChange={(c) =>
                    handleCheckboxChange("is_upcoming", c as boolean)
                  }
                />
                <Label htmlFor="is_upcoming">Yaklaşan Yayın</Label>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
