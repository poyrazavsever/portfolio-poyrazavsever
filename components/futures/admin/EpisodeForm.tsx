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

  // Guest image
  const [guestPreview, setGuestPreview] = useState<string | null>(null);
  const guestInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (episode) {
      setGuestPreview(episode.guest_image || null);
    } else {
      setGuestPreview(null);
    }
  }, [episode]);

  const handleGuestUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGuestPreview(URL.createObjectURL(file));
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
            ? `"${episode.title_tr}" Düzenleniyor`
            : `Yeni ${SERIES_LABELS[series]} Bölümü`}
        </Typography>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            İptal
          </Button>
          <Button type="submit">{isEditing ? "Güncelle" : "Oluştur"}</Button>
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
                type="number"
                placeholder="12"
                defaultValue={episode?.episode_number}
              />
            </div>
            <div className="space-y-2">
              <Label>Sezon</Label>
              <Input
                type="number"
                placeholder="1"
                defaultValue={episode?.season ?? 1}
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
                placeholder="Bölüm başlığı"
                defaultValue={episode?.title_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Başlık (EN)</Label>
              <Input
                placeholder="Episode title"
                defaultValue={episode?.title_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Açıklama (TR)</Label>
              <Textarea
                placeholder="Kısa açıklama"
                rows={3}
                defaultValue={episode?.description_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Açıklama (EN)</Label>
              <Textarea
                placeholder="Short description"
                rows={3}
                defaultValue={episode?.description_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tarih</Label>
              <Input type="date" defaultValue={episode?.date} />
            </div>
            <div className="space-y-2">
              <Label>Saat</Label>
              <Input
                type="time"
                placeholder="20:00"
                defaultValue={episode?.time}
              />
            </div>
            <div className="space-y-2">
              <Label>Süre</Label>
              <Input placeholder="1h 15m" defaultValue={episode?.duration} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Konular (virgülle ayır)</Label>
            <Input
              placeholder="React, TypeScript, Architecture"
              defaultValue={episode?.topics?.join(", ")}
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
                  placeholder="Ahmet Yılmaz"
                  defaultValue={episode?.guest_name}
                />
              </div>
              <div className="space-y-2">
                <Label>Konuk Rolü</Label>
                <Input
                  placeholder="Senior Developer @ Company"
                  defaultValue={episode?.guest_role}
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
                placeholder={
                  "# Bölüm Notları\n\n## Konular\n\n- Konu 1\n- Konu 2"
                }
                rows={15}
                className="font-mono text-sm"
                defaultValue={episode?.content_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>İçerik (EN)</Label>
              <Textarea
                placeholder={
                  "# Episode Notes\n\n## Topics\n\n- Topic 1\n- Topic 2"
                }
                rows={15}
                className="font-mono text-sm"
                defaultValue={episode?.content_en}
              />
            </div>
          </div>
        </TabsContent>

        {/* ── Linkler ── */}
        <TabsContent value="links" className="space-y-4">
          <div className="space-y-2">
            <Label>YouTube URL</Label>
            <Input
              placeholder="https://youtube.com/watch?v=..."
              defaultValue={episode?.youtube_url}
            />
          </div>
          <div className="space-y-2">
            <Label>Spotify URL</Label>
            <Input
              placeholder="https://open.spotify.com/episode/..."
              defaultValue={episode?.spotify_url}
            />
          </div>
        </TabsContent>

        {/* ── Meta ── */}
        <TabsContent value="meta" className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_published"
                defaultChecked={episode?.is_published ?? true}
              />
              <Label htmlFor="is_published">Yayınla</Label>
            </div>
            {series === "masa_basi" && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_upcoming"
                  defaultChecked={episode?.is_upcoming}
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
