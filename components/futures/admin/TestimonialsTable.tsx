"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Badge, Button, Typography } from "poyraz-ui/atoms";
import { DataTable } from "poyraz-ui/organisms";
import type { DataTableColumnDef } from "poyraz-ui/organisms";
import { AdminTestimonial } from "@/types/admin";
import {
  getAllTestimonials,
  deleteTestimonial,
} from "@/lib/supabase/queries/testimonials";
import { TestimonialForm } from "./TestimonialForm";
import { Pencil, Trash2 } from "lucide-react";

export function TestimonialsTable() {
  const [data, setData] = useState<AdminTestimonial[]>([]);
  const [editingItem, setEditingItem] = useState<
    AdminTestimonial | undefined
  >();
  const [activeTab, setActiveTab] = useState("list");
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAllTestimonials();
      setData(result);
    } catch (error) {
      console.error("Referanslar yüklenirken hata:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    fetchData();
  }, [fetchData]);

  const handleEdit = useCallback((row: AdminTestimonial) => {
    setEditingItem(row);
    setActiveTab("form");
  }, []);

  const handleDelete = useCallback(
    async (id: string, name: string) => {
      if (window.confirm(`${name} referansı silinsin mi?`)) {
        await deleteTestimonial(id);
        fetchData();
      }
    },
    [fetchData],
  );

  const columns = useMemo<DataTableColumnDef<AdminTestimonial>[]>(
    () => [
      {
        id: "name",
        header: "İsim / Ünvan",
        accessorKey: "full_name",
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-bold border border-slate-200 uppercase">
              {row.full_name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{row.full_name}</span>
              <span className="text-[10px] text-slate-500">{row.title}</span>
            </div>
          </div>
        ),
      },
      {
        id: "content",
        header: "İçerik (TR)",
        accessorKey: "content_tr",
        cell: (row) => (
          <span className="text-sm text-slate-600 line-clamp-1 max-w-[300px]">
            {row.content_tr}
          </span>
        ),
      },
      {
        id: "order",
        header: "Sıra",
        accessorKey: "order_index",
        sortable: true,
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
      {
        id: "actions",
        header: "İşlemler",
        accessorKey: "id",
        cell: (row) => (
          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
            <Button variant="outline" size="sm" onClick={() => handleEdit(row)}>
              <Pencil className="w-3.5 h-3.5 mr-2" /> Düzenle
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => handleDelete(row.id, row.full_name)}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ),
      },
    ],
    [handleEdit, handleDelete],
  );

  const handleFormClose = useCallback(
    (shouldRefresh?: boolean) => {
      setEditingItem(undefined);
      setActiveTab("list");
      if (shouldRefresh) {
        fetchData();
      }
    },
    [fetchData],
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h2">
            Referans{" "}
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
            About sayfasındaki referansları ve müşteri görüşlerini yönet.
          </Typography>
        </div>
        {activeTab === "list" && (
          <Button
            onClick={() => {
              setEditingItem(undefined);
              setActiveTab("form");
            }}
          >
            Yeni Referans Ekle
          </Button>
        )}
      </div>

      {!isMounted ? null : activeTab === "form" ? (
        <TestimonialForm testimonial={editingItem} onCancel={handleFormClose} />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          getRowId={(row) => row.id}
          selectable
          onSelectionChange={(rows) => {
            if (rows.length === 1) handleEdit(rows[0]);
          }}
          searchPlaceholder="İsim veya içerik ara..."
          pageSize={10}
          emptyMessage={isLoading ? "Yükleniyor..." : "Referans bulunamadı."}
        />
      )}
    </div>
  );
}
