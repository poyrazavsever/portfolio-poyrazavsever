import { createClient } from "../client";
import { AdminContactMessage, ContactMessageStatus } from "@/types/admin";
import { unstable_noStore as noStore } from "next/cache";

export async function getContactMessages(): Promise<AdminContactMessage[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }

  return data as AdminContactMessage[];
}

export async function getContactMessageById(
  id: string,
): Promise<AdminContactMessage | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching contact message:", error);
    return null;
  }

  return data as AdminContactMessage;
}

export async function createContactMessage(
  message: Omit<AdminContactMessage, "id" | "created_at" | "status">,
): Promise<AdminContactMessage | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .insert([{ ...message, status: "unread" }])
    .select()
    .single();

  if (error) {
    console.error("Error creating contact message:", error);
    throw error;
  }

  return data as AdminContactMessage;
}

export async function updateContactMessageStatus(
  id: string,
  status: ContactMessageStatus,
): Promise<AdminContactMessage | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating contact message status:", error);
    throw error;
  }

  return data as AdminContactMessage;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting contact message:", error);
    return false;
  }

  return true;
}
