import { createClient } from "../client";
import { AdminTestimonial } from "@/types/admin";

/**
 * Get all published testimonials for public site
 */
export async function getPublishedTestimonials() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }

  return data;
}

/**
 * Get all testimonials for admin panel
 */
export async function getAllTestimonials() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching all testimonials:", error);
    return [];
  }

  return data;
}

/**
 * Create a new testimonial
 */
export async function createTestimonial(
  testimonial: Partial<AdminTestimonial>,
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .insert([testimonial])
    .select();

  if (error) {
    throw error;
  }

  return data[0];
}

/**
 * Update an existing testimonial
 */
export async function updateTestimonial(
  id: string,
  testimonial: Partial<AdminTestimonial>,
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .update(testimonial)
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }

  return data[0];
}

/**
 * Delete a testimonial
 */
export async function deleteTestimonial(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}
