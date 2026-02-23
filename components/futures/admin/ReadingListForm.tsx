"use client";

import { useState, useRef } from "react";
import {
  Button,
  Input,
  Label,
  Typography,
  Separator,
  Checkbox,
} from "poyraz-ui/atoms";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "poyraz-ui/molecules";
import { AdminReadingItem, ReadingItemType } from "@/types/admin";
import { X, Upload } from "lucide-react";

interface ReadingListFormProps {
  item?: AdminReadingItem;
  defaultType: ReadingItemType;
  onCancel: () => void;
}

export function ReadingListForm({
  item,
  defaultType,
  onCancel,
}: ReadingListFormProps) {
  const isEditing = !!item;
  const type = item?.type || defaultType;
  const [preview, setPreview] = useState<string | null>(item?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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
            ? `"${item.title_tr}" Düzenleniyor`
            : `Yeni ${type === "book" ? "Kitap" : "Video"} Ekle`}
        </Typography>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            İptal
          </Button>
          <Button type="submit">{isEditing ? "Güncelle" : "Oluştur"}</Button>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="basic">
        <TabsList className="mb-6">
          <TabsTrigger value="basic">Temel Bilgiler</TabsTrigger>
          <TabsTrigger value="media">Görsel & Bağlantı</TabsTrigger>
          <TabsTrigger value="meta">Yayın Ayarları</TabsTrigger>
        </TabsList>

        {/* ── Temel Bilgiler ── */}
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Başlık (TR)</Label>
              <Input
                placeholder={
                  type === "book" ? "Atomik Alışkanlıklar" : "React Tutorial"
                }
                defaultValue={item?.title_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Title (EN)</Label>
              <Input
                placeholder={
                  type === "book" ? "Atomic Habits" : "React Tutorial"
                }
                defaultValue={item?.title_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                {type === "book" ? "Yazar" : "Kanal / İçerik Üreticisi"} (TR)
              </Label>
              <Input
                placeholder={
                  type === "book" ? "James Clear" : "Jack Herrington"
                }
                defaultValue={item?.author_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>
                {type === "book" ? "Author" : "Channel / Creator"} (EN)
              </Label>
              <Input
                placeholder={
                  type === "book" ? "James Clear" : "Jack Herrington"
                }
                defaultValue={item?.author_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Durum</Label>
              <Select defaultValue={item?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  {type === "book" ? (
                    <>
                      <SelectItem value="read">Okundu</SelectItem>
                      <SelectItem value="reading">Okunuyor</SelectItem>
                      <SelectItem value="queue">Sırada</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="watched">İzlendi</SelectItem>
                      <SelectItem value="watching">İzleniyor</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            {type === "book" ? (
              <div className="space-y-2">
                <Label>Kategori (TR)</Label>
                <Input
                  placeholder="Kişisel Gelişim"
                  defaultValue={item?.category_tr}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Platform</Label>
                <Input placeholder="YouTube" defaultValue={item?.platform} />
              </div>
            )}
          </div>
        </TabsContent>

        {/* ── Görsel & Bağlantı ── */}
        <TabsContent value="media" className="space-y-4">
          <div className="space-y-2">
            <Label>Bağlantı (URL)</Label>
            <Input
              placeholder={type === "book" ? "Amazon Linki" : "YouTube Linki"}
              defaultValue={item?.link}
            />
          </div>

          <div className="space-y-2">
            <Label>{type === "book" ? "Kapak Görseli" : "Thumbnail"}</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {preview ? (
              <div
                className={`relative ${type === "book" ? "w-40 aspect-2/3" : "w-full aspect-video"} border-2 border-dashed border-slate-300 overflow-hidden`}
              >
                <img
                  src={preview}
                  alt="Önizleme"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`w-full ${type === "book" ? "h-64" : "aspect-video"} border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 hover:border-red-600 hover:bg-red-50 transition-colors cursor-pointer`}
              >
                <Upload className="w-8 h-8 text-slate-400" />
                <Typography variant="muted">
                  {type === "book" ? "Kapak görseli yükle" : "Thumbnail yükle"}
                </Typography>
              </button>
            )}
          </div>
        </TabsContent>

        {/* ── Meta ── */}
        <TabsContent value="meta" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sıralama</Label>
              <Input type="number" defaultValue={item?.sort_order ?? 1} />
            </div>
            <div className="flex items-end pb-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_published"
                  defaultChecked={item?.is_published ?? true}
                />
                <Label htmlFor="is_published">Yayınla</Label>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
