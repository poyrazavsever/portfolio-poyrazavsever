import { createClient } from "@/lib/supabase/client";

// Supabase hook for client components
export function useSupabase() {
  const supabase = createClient();
  return { supabase };
}
