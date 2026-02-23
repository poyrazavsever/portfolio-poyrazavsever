"use client";

import { useState } from "react";
import { Badge, Button, Typography } from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { DataTable } from "poyraz-ui/organisms";
import type { DataTableColumnDef } from "poyraz-ui/organisms";
import { AdminCertification } from "@/types/admin";
import { mockCertifications } from "@/data/admin/mock-certifications";
import { CertificationForm } from "./CertificationForm";

const columns: DataTableColumnDef<AdminCertification>[] = [
  {
    id: "image",
    header: "Sertifika",
    accessorKey: "image",
    cell: (row) => (
      <div className="w-16 h-10 bg-slate-50 border border-slate-200 rounded overflow-hidden flex items-center justify-center">
        {row.image ? (
          <img
            src={row.image}
            alt={row.title_tr}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-[10px] text-slate-300">Resim Yok</span>
        )}
      </div>
    ),
  },
  {
    id: "title",
    header: "Sertifika Adı",
    accessorKey: "title_tr",
    sortable: true,
  },
  {
    id: "organization",
    header: "Kurum",
    accessorKey: "organization_tr",
    sortable: true,
  },
  {
    id: "date",
    header: "Veriliş Tarihi",
    accessorKey: "issue_date_tr",
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

export function CertificationTable() {
  const [activeTab, setActiveTab] = useState("list");
  const [editingCertification, setEditingCertification] = useState<
    AdminCertification | undefined
  >();

  const handleEdit = (rows: AdminCertification[]) => {
    if (rows.length === 1) {
      setEditingCertification(rows[0]);
      setActiveTab("form");
    }
  };

  const handleAddNew = () => {
    setEditingCertification(undefined);
    setActiveTab("form");
  };

  const handleFormClose = () => {
    setEditingCertification(undefined);
    setActiveTab("list");
  };

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2">
          Sertifika{" "}
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
          Eğitim sertifikalarını ve başarı belgelerini yönet.
        </Typography>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">Sertifikalar</TabsTrigger>
          <TabsTrigger value="form">
            {editingCertification ? "Düzenle" : "Yeni Ekle"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center">
            <Typography variant="h4">Sertifika Listesi</Typography>
            <Button onClick={handleAddNew}>Yeni Sertifika Ekle</Button>
          </div>
          <DataTable
            columns={columns}
            data={mockCertifications}
            getRowId={(row) => row.id}
            selectable
            onSelectionChange={handleEdit}
            searchPlaceholder="Sertifika ara..."
            pageSize={10}
            emptyMessage="Henüz bir sertifika eklenmemiş."
          />
        </TabsContent>

        <TabsContent value="form">
          <CertificationForm
            certification={editingCertification}
            onCancel={handleFormClose}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
