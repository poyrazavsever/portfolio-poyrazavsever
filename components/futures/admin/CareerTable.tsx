"use client";

import { useState, useMemo } from "react";
import { Badge, Button, Typography } from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { DataTable } from "poyraz-ui/organisms";
import type { DataTableColumnDef } from "poyraz-ui/organisms";
import {
  AdminCareerItem,
  CareerItemType,
  CAREER_ITEM_TYPE_LABELS,
} from "@/types/admin";
import { mockCareerItems } from "@/data/admin/mock-career";
import { CareerForm } from "./CareerForm";

const columns: DataTableColumnDef<AdminCareerItem>[] = [
  {
    id: "role",
    header: "Pozisyon / Bölüm",
    accessorKey: "role_tr",
    sortable: true,
  },
  {
    id: "company",
    header: "Kurum / Şirket",
    accessorKey: "company_tr",
    sortable: true,
  },
  {
    id: "date",
    header: "Tarih",
    accessorKey: "date_tr",
  },
  {
    id: "type",
    header: "Tür",
    accessorKey: "type",
    cell: (row) => (
      <Badge variant="secondary" className="text-[10px] uppercase">
        {CAREER_ITEM_TYPE_LABELS[row.type]}
      </Badge>
    ),
  },
  {
    id: "status",
    header: "Durum",
    accessorKey: "is_published",
    cell: (row) =>
      row.is_published ? (
        <Badge variant="default">Yayında</Badge>
      ) : (
        <Badge variant="outline">Taslak</Badge>
      ),
  },
];

export function CareerTable() {
  const [activeTab, setActiveTab] = useState("experience");
  const [editingItem, setEditingItem] = useState<AdminCareerItem | undefined>();
  const [formType, setFormType] = useState<CareerItemType>("work");

  const experienceItems = useMemo(
    () =>
      mockCareerItems.filter(
        (i) => i.type === "work" || i.type === "volunteer",
      ),
    [],
  );
  const educationItems = useMemo(
    () => mockCareerItems.filter((i) => i.type === "education"),
    [],
  );

  const handleEdit = (rows: AdminCareerItem[]) => {
    if (rows.length === 1) {
      setEditingItem(rows[0]);
      setFormType(rows[0].type);
      setActiveTab("form");
    }
  };

  const handleAddNew = (type: CareerItemType) => {
    setEditingItem(undefined);
    setFormType(type);
    setActiveTab("form");
  };

  const handleFormClose = () => {
    setEditingItem(undefined);
    setActiveTab(formType === "education" ? "education" : "experience");
  };

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2">
          Kariyer{" "}
          <Typography
            variant="h2"
            component="span"
            secondaryFont
            className="text-red-600"
          >
            Yönetimi
          </Typography>
        </Typography>
        <Typography variant="muted">
          Deneyim ve eğitim geçmişini yönet.
        </Typography>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="experience">Deneyim</TabsTrigger>
          <TabsTrigger value="education">Eğitim</TabsTrigger>
          <TabsTrigger value="form">
            {editingItem ? "Düzenle" : "Yeni Ekle"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="experience" className="space-y-4">
          <div className="flex justify-between items-center">
            <Typography variant="h4">İş & Gönüllülük Deneyimi</Typography>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleAddNew("volunteer")}
              >
                Gönüllü Ekle
              </Button>
              <Button onClick={() => handleAddNew("work")}>
                İş Deneyimi Ekle
              </Button>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={experienceItems}
            getRowId={(row) => row.id}
            selectable
            onSelectionChange={handleEdit}
            searchPlaceholder="Deneyim ara..."
            pageSize={10}
            emptyMessage="Henüz bir deneyim eklenmemiş."
          />
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <div className="flex justify-between items-center">
            <Typography variant="h4">Eğitim Geçmişi</Typography>
            <Button onClick={() => handleAddNew("education")}>
              Eğitim Ekle
            </Button>
          </div>
          <DataTable
            columns={columns}
            data={educationItems}
            getRowId={(row) => row.id}
            selectable
            onSelectionChange={handleEdit}
            searchPlaceholder="Eğitim ara..."
            pageSize={10}
            emptyMessage="Henüz bir eğitim eklenmemiş."
          />
        </TabsContent>

        <TabsContent value="form">
          <CareerForm
            item={editingItem}
            defaultType={formType}
            onCancel={handleFormClose}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
