"use client";

import { useState, useRef } from "react";
import {
  Button,
  Input,
  Label,
  Typography,
  Separator,
  Badge,
  Checkbox,
} from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { AdminCertification } from "@/types/admin";
import { X, Upload, Plus } from "lucide-react";

interface CertificationFormProps {
  certification?: AdminCertification;
  onCancel: () => void;
}

export function CertificationForm({
  certification,
  onCancel,
}: CertificationFormProps) {
  const isEditing = !!certification;
  const [preview, setPreview] = useState<string | null>(
    certification?.image || null,
  );
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
            ? `"${certification.title_tr}" Düzenleniyor`
            : "Yeni Sertifika Ekle"}
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
              <Label>Sertifika Adı (TR)</Label>
              <Input
                placeholder="React ile İleri Seviye Web Geliştirme"
                defaultValue={certification?.title_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Certificate Title (EN)</Label>
              <Input
                placeholder="Advanced Web Development with React"
                defaultValue={certification?.title_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kurum / Organizasyon (TR)</Label>
              <Input
                placeholder="BTK Akademi"
                defaultValue={certification?.organization_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Organization (EN)</Label>
              <Input
                placeholder="BTK Academy"
                defaultValue={certification?.organization_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Veriliş Tarihi (TR)</Label>
              <Input
                placeholder="Ocak 2024"
                defaultValue={certification?.issue_date_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Issue Date (EN)</Label>
              <Input
                placeholder="January 2024"
                defaultValue={certification?.issue_date_en}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sertifika No / Credential ID</Label>
            <Input
              placeholder="BTK-123456"
              defaultValue={certification?.credential_id}
            />
          </div>

          <div className="space-y-2">
            <Label>Yetenekler (virgülle ayır)</Label>
            <Input
              placeholder="React, State Management, UI/UX"
              defaultValue={certification?.tags.join(", ")}
            />
          </div>
        </TabsContent>

        {/* ── Görsel & Bağlantı ── */}
        <TabsContent value="media" className="space-y-4">
          <div className="space-y-2">
            <Label>Sertifika Bağlantısı (URL)</Label>
            <Input
              placeholder="https://example.com/certificate/123"
              defaultValue={certification?.link}
            />
          </div>

          <div className="space-y-2">
            <Label>Sertifika Görseli / Rozeti</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {preview ? (
              <div className="relative w-full aspect-video border-2 border-dashed border-slate-300 overflow-hidden">
                <img
                  src={preview}
                  alt="Sertifika Önizleme"
                  className="w-full h-full object-contain bg-slate-50"
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
                className="w-full aspect-video border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 hover:border-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-slate-400" />
                <Typography variant="muted">
                  Sertifika görselini veya rozetini yükle
                </Typography>
                <Typography variant="muted" className="text-xs">
                  PNG, JPG veya SVG (Önerilen: 16:9 oranında)
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
                type="number"
                defaultValue={certification?.sort_order ?? 1}
              />
            </div>
            <div className="flex items-end pb-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_published"
                  defaultChecked={certification?.is_published ?? true}
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
