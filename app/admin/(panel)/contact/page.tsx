import { ContactTable } from "@/components/futures/admin/ContactTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gelen Mesajlar | Poyraz Admin",
};

export default function ContactAdminPage() {
  return <ContactTable />;
}
