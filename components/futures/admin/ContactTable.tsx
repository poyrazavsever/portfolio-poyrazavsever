"use client";

import { useState, useCallback, useEffect } from "react";
import { Badge, Button, Typography } from "poyraz-ui/atoms";
import { DataTable } from "poyraz-ui/organisms";
import type { DataTableColumnDef } from "poyraz-ui/organisms";
import {
  AdminContactMessage,
  CONTACT_TOPIC_LABELS,
  CONTACT_STATUS_LABELS,
  ContactMessageStatus,
} from "@/types/admin";
import {
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
} from "@/lib/supabase/queries/contact";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "poyraz-ui/molecules";
import { Mail, Trash2, CheckCircle, MailOpen } from "lucide-react";

const getStatusBadgeVariant = (status: ContactMessageStatus) => {
  switch (status) {
    case "unread":
      return "destructive";
    case "read":
      return "secondary";
    case "replied":
      return "default";
    default:
      return "outline";
  }
};

export function ContactTable() {
  const [messages, setMessages] = useState<AdminContactMessage[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedMessage, setSelectedMessage] =
    useState<AdminContactMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMessages = useCallback(async () => {
    const data = await getContactMessages();
    setMessages(data);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleViewMessage = async (msg: AdminContactMessage) => {
    setSelectedMessage(msg);
    setIsModalOpen(true);

    if (msg.status === "unread") {
      await updateContactMessageStatus(msg.id, "read");
      fetchMessages();
    }
  };

  const handleMarkAsReplied = async (id: string) => {
    await updateContactMessageStatus(id, "replied");
    fetchMessages();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu mesajı silmek istediğinize emin misiniz?")) {
      await deleteContactMessage(id);
      fetchMessages();
      setIsModalOpen(false);
    }
  };

  const columns: DataTableColumnDef<AdminContactMessage>[] = [
    {
      id: "name",
      header: "Gönderen",
      accessorKey: "name",
      sortable: true,
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.name}</span>
          <span className="text-xs text-slate-500">{row.email}</span>
        </div>
      ),
    },
    {
      id: "topic",
      header: "Konu",
      accessorKey: "topic",
      sortable: true,
      cell: (row) => CONTACT_TOPIC_LABELS[row.topic],
    },
    {
      id: "date",
      header: "Tarih",
      accessorKey: "created_at",
      sortable: true,
      cell: (row) =>
        new Intl.DateTimeFormat("tr-TR", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(row.created_at)),
    },
    {
      id: "status",
      header: "Durum",
      accessorKey: "status",
      sortable: true,
      cell: (row) => (
        <Badge
          variant={getStatusBadgeVariant(row.status)}
          className="text-[10px] uppercase"
        >
          {CONTACT_STATUS_LABELS[row.status]}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "id",
      cell: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleViewMessage(row);
          }}
        >
          {row.status === "unread" ? (
            <Mail className="w-4 h-4 text-red-600" />
          ) : (
            <MailOpen className="w-4 h-4 text-slate-400" />
          )}
        </Button>
      ),
    },
  ];

  if (!isMounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2">
          Gelen{" "}
          <Typography
            variant="h2"
            component="span"
            secondaryFont
            className="text-red-600"
          >
            Mesajlar
          </Typography>
        </Typography>
        <Typography variant="muted">
          İletişim formu üzerinden gönderilen mesajları yönet.
        </Typography>
      </div>

      <DataTable
        columns={columns}
        data={messages}
        getRowId={(row) => row.id}
        searchPlaceholder="İsim veya e-posta ara..."
        pageSize={10}
        emptyMessage="Henüz bir mesaj bulunmuyor."
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Badge variant="outline">
                    {CONTACT_TOPIC_LABELS[selectedMessage.topic]}
                  </Badge>
                  {selectedMessage.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedMessage.email} •{" "}
                  {new Intl.DateTimeFormat("tr-TR", {
                    dateStyle: "long",
                    timeStyle: "short",
                  }).format(new Date(selectedMessage.created_at))}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4">
                {(selectedMessage.date || selectedMessage.time) && (
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-100 flex gap-4 text-sm">
                    {selectedMessage.date && (
                      <div>
                        <span className="font-semibold text-slate-600">
                          Tercih Edilen Tarih:{" "}
                        </span>
                        <span>
                          {new Intl.DateTimeFormat("tr-TR", {
                            dateStyle: "long",
                          }).format(new Date(selectedMessage.date))}
                        </span>
                      </div>
                    )}
                    {selectedMessage.time && (
                      <div>
                        <span className="font-semibold text-slate-600">
                          Saat:{" "}
                        </span>
                        <span>{selectedMessage.time}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="bg-white border rounded-md p-4 whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              <DialogFooter className="flex items-center justify-between sm:justify-between w-full">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Sil
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Kapat
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleMarkAsReplied(selectedMessage.id)}
                    disabled={selectedMessage.status === "replied"}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {selectedMessage.status === "replied"
                      ? "Yanıtlandı Olarak İşaretlendi"
                      : "Yanıtlandı İşaretle"}
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
