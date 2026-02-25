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
import {
  createCareerRecord,
  updateCareerRecord,
  deleteCareerRecord,
} from "@/lib/supabase/queries/career";
import { X, Plus, Trash } from "lucide-react";

interface CareerFormProps {
  item?: AdminCareerItem;
  defaultType: CareerItemType;
  onCancel: () => void;
  onSave: () => void;
}

export function CareerForm({
  item,
  defaultType,
  onCancel,
  onSave,
}: CareerFormProps) {
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

  const [formData, setFormData] = useState({
    role_tr: item?.role_tr || "",
    role_en: item?.role_en || "",
    company_tr: item?.company_tr || "",
    company_en: item?.company_en || "",
    location_tr: item?.location_tr || "",
    location_en: item?.location_en || "",
    date_tr: item?.date_tr || "",
    date_en: item?.date_en || "",
    employment_type_tr: item?.employment_type_tr || "",
    employment_type_en: item?.employment_type_en || "",
    skills: item?.skills?.join(", ") || "",
    sort_order: item?.sort_order?.toString() || "1",
    is_published: item?.is_published ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const payload: Omit<AdminCareerItem, "id" | "created_at"> = {
      type: type,
      role_tr: formData.role_tr,
      role_en: formData.role_en,
      company_tr: formData.company_tr,
      company_en: formData.company_en,
      location_tr: formData.location_tr,
      location_en: formData.location_en,
      date_tr: formData.date_tr,
      date_en: formData.date_en,
      employment_type_tr: formData.employment_type_tr,
      employment_type_en: formData.employment_type_en,
      description_tr: descTr.filter((d) => d.trim() !== ""),
      description_en: descEn.filter((d) => d.trim() !== ""),
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
      sort_order: parseInt(formData.sort_order || "1", 10),
      is_published: formData.is_published,
    };

    try {
      if (isEditing && item) {
        const { error } = await updateCareerRecord(item.id, payload);
        if (error) throw error;
        alert("Deneyim güncellendi.");
      } else {
        const { error } = await createCareerRecord(payload);
        if (error) throw error;
        alert("Deneyim eklendi.");
      }
      onSave();
    } catch (err: any) {
      alert(err.message || "Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!item) return;
    if (
      confirm("Bu deneyimi kalıcı olarak silmek istediğinize emin misiniz?")
    ) {
      setIsLoading(true);
      try {
        const success = await deleteCareerRecord(item.id);
        if (success) {
          alert("Deneyim silindi.");
          onSave();
        } else {
          alert("Deneyim silinemedi.");
        }
      } catch (err) {
        alert("Silinirken bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    }
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
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            İptal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isEditing ? "Güncelle" : "Oluştur"}
          </Button>
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
                name="role_tr"
                required
                placeholder={
                  type === "education"
                    ? "Bilgisayar Mühendisliği"
                    : "Senior Developer"
                }
                value={formData.role_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Role / Department (EN)</Label>
              <Input
                name="role_en"
                required
                placeholder={
                  type === "education"
                    ? "Computer Engineering"
                    : "Senior Developer"
                }
                value={formData.role_en}
                onChange={handleChange}
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
                name="company_tr"
                required
                placeholder={
                  type === "education"
                    ? "İstanbul Teknik Üniversitesi"
                    : "Teknoloji A.Ş."
                }
                value={formData.company_tr}
                onChange={handleChange}
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
                name="company_en"
                required
                placeholder={type === "education" ? "ITU" : "Tech Corp"}
                value={formData.company_en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tarih Aralığı (TR)</Label>
              <Input
                name="date_tr"
                required
                placeholder="Haziran 2021 - Günümüz"
                value={formData.date_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Date Range (EN)</Label>
              <Input
                name="date_en"
                required
                placeholder="June 2021 - Present"
                value={formData.date_en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Konum (TR)</Label>
              <Input
                name="location_tr"
                placeholder="İstanbul, Türkiye"
                value={formData.location_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Location (EN)</Label>
              <Input
                name="location_en"
                placeholder="Istanbul, Turkey"
                value={formData.location_en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                {type === "education" ? "Derece" : "Çalışma Şekli"} (TR)
              </Label>
              <Input
                name="employment_type_tr"
                placeholder={type === "education" ? "Lisans" : "Tam Zamanlı"}
                value={formData.employment_type_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>
                {type === "education" ? "Degree" : "Employment Type"} (EN)
              </Label>
              <Input
                name="employment_type_en"
                placeholder={
                  type === "education" ? "Bachelor's Degree" : "Full-time"
                }
                value={formData.employment_type_en}
                onChange={handleChange}
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
              name="skills"
              placeholder="React, TypeScript, Node.js"
              value={formData.skills}
              onChange={handleChange}
            />
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
                  name="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(c) =>
                    handleCheckboxChange("is_published", c as boolean)
                  }
                />
                <Label htmlFor="is_published">Yayınla</Label>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 pt-6 border-t border-dashed border-red-200">
              <div className="flex items-center justify-between">
                <Typography variant="muted" className="text-sm">
                  Bu deneyimi sistemden tamamen silin.
                </Typography>
                <Button
                  type="button"
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  <Trash className="w-4 h-4 mr-2" /> Sil
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </form>
  );
}
