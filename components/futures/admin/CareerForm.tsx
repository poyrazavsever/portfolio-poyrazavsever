"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Typography,
  Textarea,
  Checkbox,
  Separator,
  Badge,
} from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import {
  AdminCareerItem,
  CareerItemType,
  CAREER_ITEM_TYPE_LABELS,
} from "@/types/admin";
import { X, Plus } from "lucide-react";

interface CareerFormProps {
  item?: AdminCareerItem;
  defaultType: CareerItemType;
  onCancel: () => void;
}

export function CareerForm({ item, defaultType, onCancel }: CareerFormProps) {
  const isEditing = !!item;
  const type = item?.type || defaultType;

  // Manage description lists
  const [descTr, setDescTr] = useState<string[]>(item?.description_tr || [""]);
  const [descEn, setDescEn] = useState<string[]>(item?.description_en || [""]);

  const handleAddDesc = (lang: "tr" | "en") => {
    if (lang === "tr") setDescTr([...descTr, ""]);
    else setDescEn([...descEn, ""]);
  };

  const handleRemoveDesc = (lang: "tr" | "en", index: number) => {
    if (lang === "tr") {
      const newDesc = descTr.filter((_, i) => i !== index);
      setDescTr(newDesc.length ? newDesc : [""]);
    } else {
      const newDesc = descEn.filter((_, i) => i !== index);
      setDescEn(newDesc.length ? newDesc : [""]);
    }
  };

  const handleDescChange = (
    lang: "tr" | "en",
    index: number,
    value: string,
  ) => {
    if (lang === "tr") {
      const newDesc = [...descTr];
      newDesc[index] = value;
      setDescTr(newDesc);
    } else {
      const newDesc = [...descEn];
      newDesc[index] = value;
      setDescEn(newDesc);
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
            ? `"${item.role_tr}" Düzenleniyor`
            : `Yeni ${CAREER_ITEM_TYPE_LABELS[type]} Ekle`}
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
          <TabsTrigger value="details">Detaylar & Açıklama</TabsTrigger>
          <TabsTrigger value="meta">Yayın Ayarları</TabsTrigger>
        </TabsList>

        {/* ── Temel Bilgiler ── */}
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Pozisyon / Bölüm (TR)</Label>
              <Input
                placeholder={
                  type === "education"
                    ? "Bilgisayar Mühendisliği"
                    : "Senior Developer"
                }
                defaultValue={item?.role_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Role / Department (EN)</Label>
              <Input
                placeholder={
                  type === "education"
                    ? "Computer Engineering"
                    : "Senior Developer"
                }
                defaultValue={item?.role_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                {type === "education"
                  ? "Kurum / Üniversite"
                  : "Şirket / Organizasyon"}{" "}
                (TR)
              </Label>
              <Input
                placeholder={
                  type === "education"
                    ? "İstanbul Teknik Üniversitesi"
                    : "Teknoloji A.Ş."
                }
                defaultValue={item?.company_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>
                {type === "education"
                  ? "Institution / University"
                  : "Company / Organization"}{" "}
                (EN)
              </Label>
              <Input
                placeholder={type === "education" ? "ITU" : "Tech Corp"}
                defaultValue={item?.company_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tarih Aralığı (TR)</Label>
              <Input
                placeholder="Haziran 2021 - Günümüz"
                defaultValue={item?.date_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Date Range (EN)</Label>
              <Input
                placeholder="June 2021 - Present"
                defaultValue={item?.date_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Konum (TR)</Label>
              <Input
                placeholder="İstanbul, Türkiye"
                defaultValue={item?.location_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Location (EN)</Label>
              <Input
                placeholder="Istanbul, Turkey"
                defaultValue={item?.location_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                {type === "education" ? "Derece" : "Çalışma Şekli"} (TR)
              </Label>
              <Input
                placeholder={type === "education" ? "Lisans" : "Tam Zamanlı"}
                defaultValue={item?.employment_type_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>
                {type === "education" ? "Degree" : "Employment Type"} (EN)
              </Label>
              <Input
                placeholder={
                  type === "education" ? "Bachelor's Degree" : "Full-time"
                }
                defaultValue={item?.employment_type_en}
              />
            </div>
          </div>
        </TabsContent>

        {/* ── Detaylar ── */}
        <TabsContent value="details" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Başarılar / Açıklamalar (TR)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddDesc("tr")}
                className="h-7 px-2"
              >
                <Plus className="w-3 h-3 mr-1" /> Ekle
              </Button>
            </div>
            <div className="space-y-2">
              {descTr.map((desc, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={desc}
                    onChange={(e) =>
                      handleDescChange("tr", idx, e.target.value)
                    }
                    placeholder="Elde edilen başarı..."
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveDesc("tr", idx)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Responsibilities / Description (EN)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddDesc("en")}
                className="h-7 px-2"
              >
                <Plus className="w-3 h-3 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              {descEn.map((desc, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={desc}
                    onChange={(e) =>
                      handleDescChange("en", idx, e.target.value)
                    }
                    placeholder="Key accomplishment..."
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveDesc("en", idx)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Yetenekler (virgülle ayır)</Label>
            <Input
              placeholder="React, TypeScript, Node.js"
              defaultValue={item?.skills?.join(", ")}
            />
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
