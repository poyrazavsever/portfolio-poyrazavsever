"use client";

import { useState, useEffect } from "react";
import { Badge, Button, Typography } from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { DataTable } from "poyraz-ui/organisms";
import type { DataTableColumnDef } from "poyraz-ui/organisms";
import { AdminCertification } from "@/types/admin";
import {
  getAdminCertifications,
  deleteCertification,
} from "@/lib/supabase/queries/certifications";
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
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<AdminCertification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<AdminCertification[]>([]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const records = await getAdminCertifications();
      setData(records);
    } catch (error) {
      console.error("Failed to load certifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    loadData();
  }, []);

  const handleSelection = (rows: AdminCertification[]) => {
    setSelectedRows(rows);
    if (rows.length === 1) {
      setEditingCertification(rows[0]);
    } else {
      setEditingCertification(undefined);
    }
  };

  const handleEditClick = () => {
    if (editingCertification) {
      setActiveTab("form");
    }
  };

  const handleAddNew = () => {
    setEditingCertification(undefined);
    setSelectedRows([]);
    setActiveTab("form");
  };

  const handleFormClose = (shouldRefresh?: boolean) => {
    setEditingCertification(undefined);
    setActiveTab("list");
    if (shouldRefresh) {
      loadData();
    }
  };

  const handleDelete = async (rows: AdminCertification[]) => {
    if (
      window.confirm(
        `${rows.length} sertifikayı silmek istediğinizden emin misiniz?`,
      )
    ) {
      try {
        for (const row of rows) {
          await deleteCertification(row.id);
        }
        await loadData();
      } catch (error) {
        console.error("Sertifika silinirken hata:", error);
        alert("Sertifika silinirken bir hata oluştu.");
      }
    }
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

      {!isMounted ? null : (
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
              <div className="flex gap-2">
                {selectedRows.length > 0 && (
                  <>
                    {selectedRows.length === 1 && (
                      <Button variant="outline" onClick={handleEditClick}>
                        Seçileni Düzenle
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(selectedRows)}
                    >
                      Seçilenleri Sil ({selectedRows.length})
                    </Button>
                  </>
                )}
                <Button onClick={handleAddNew}>Yeni Sertifika Ekle</Button>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={data}
              getRowId={(row) => row.id}
              selectable
              onSelectionChange={handleSelection}
              searchPlaceholder="Sertifika ara..."
              pageSize={10}
              emptyMessage={
                isLoading ? "Yükleniyor..." : "Henüz bir sertifika eklenmemiş."
              }
            />
          </TabsContent>

          <TabsContent value="form">
            <CertificationForm
              certification={editingCertification}
              onCancel={handleFormClose}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
