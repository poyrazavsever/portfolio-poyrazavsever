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
import {
  AdminReadingItem,
  ReadingItemType,
  ReadingStatus,
} from "@/types/admin";
import { X, Upload } from "lucide-react";
import {
  createReadingItem,
  updateReadingItem,
  uploadReadingItemImage,
} from "@/lib/supabase/queries/reading-list";

interface ReadingListFormProps {
  item?: AdminReadingItem;
  defaultType: ReadingItemType;
  onCancel: (shouldRefresh?: boolean) => void;
}

export function ReadingListForm({
  item,
  defaultType,
  onCancel,
}: ReadingListFormProps) {
  const isEditing = !!item;
  const type = item?.type || defaultType;
  const [preview, setPreview] = useState<string | null>(item?.image || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title_tr: item?.title_tr || "",
    title_en: item?.title_en || "",
    author_tr: item?.author_tr || "",
    author_en: item?.author_en || "",
    status: item?.status || (type === "book" ? "read" : "watched"),
    category_tr: item?.category_tr || "",
    category_en: item?.category_en || "",
    platform: item?.platform || "",
    link: item?.link || "",
    sort_order: item?.sort_order?.toString() || "1",
    is_published: item?.is_published ?? true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalImageUrl = preview || undefined;
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${type}.${fileExt}`;
        finalImageUrl = await uploadReadingItemImage(imageFile, fileName);
      }

      const payload: Omit<
        AdminReadingItem,
        "id" | "created_at" | "updated_at"
      > = {
        type: type,
        title_tr: formData.title_tr,
        title_en: formData.title_en,
        author_tr: formData.author_tr,
        author_en: formData.author_en,
        status: formData.status as ReadingStatus,
        category_tr: formData.category_tr || undefined,
        category_en: formData.category_en || undefined,
        platform: formData.platform || undefined,
        link: formData.link || undefined,
        image: finalImageUrl,
        sort_order: parseInt(formData.sort_order || "1", 10),
        is_published: formData.is_published,
      };

      if (isEditing && item?.id) {
        await updateReadingItem(item.id, payload);
      } else {
        await createReadingItem(payload);
      }

      onCancel(true);
    } catch (error) {
      console.error("Failed to save reading item:", error);
      alert(
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Öğe kaydedilirken hata oluştu.",
      );
    } finally {
      setIsLoading(false);
    }
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
          <Button type="button" variant="outline" onClick={() => onCancel()}>
            İptal
          </Button>
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            {isEditing ? "Güncelle" : "Oluştur"}
          </Button>
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
                name="title_tr"
                placeholder={
                  type === "book" ? "Atomik Alışkanlıklar" : "React Tutorial"
                }
                value={formData.title_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Title (EN)</Label>
              <Input
                name="title_en"
                placeholder={
                  type === "book" ? "Atomic Habits" : "React Tutorial"
                }
                value={formData.title_en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                {type === "book" ? "Yazar" : "Kanal / İçerik Üreticisi"} (TR)
              </Label>
              <Input
                name="author_tr"
                placeholder={
                  type === "book" ? "James Clear" : "Jack Herrington"
                }
                value={formData.author_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>
                {type === "book" ? "Author" : "Channel / Creator"} (EN)
              </Label>
              <Input
                name="author_en"
                placeholder={
                  type === "book" ? "James Clear" : "Jack Herrington"
                }
                value={formData.author_en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Durum</Label>
              <Select
                value={formData.status}
                onValueChange={(val) => handleSelectChange("status", val)}
              >
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
              <>
                <div className="space-y-2">
                  <Label>Kategori (TR)</Label>
                  <Input
                    name="category_tr"
                    placeholder="Kişisel Gelişim"
                    value={formData.category_tr}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category (EN)</Label>
                  <Input
                    name="category_en"
                    placeholder="Self Development"
                    value={formData.category_en}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label>Platform</Label>
                <Input
                  name="platform"
                  placeholder="YouTube"
                  value={formData.platform}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </TabsContent>

        {/* ── Görsel & Bağlantı ── */}
        <TabsContent value="media" className="space-y-4">
          <div className="space-y-2">
            <Label>Bağlantı (URL)</Label>
            <Input
              name="link"
              placeholder={type === "book" ? "Amazon Linki" : "YouTube Linki"}
              value={formData.link}
              onChange={handleChange}
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
                    setImageFile(null);
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
              <Input
                name="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-end pb-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(c) =>
                    handleCheckboxChange("is_published", c as boolean)
                  }
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
