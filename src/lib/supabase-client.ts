import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";
import type { Idea } from "@/types/idea";

type IdeaTable = {
  Row: Idea;
  Insert: {
    content: string;
  };
};

let browserClient: SupabaseClient<{ ideas: IdeaTable }> | null = null;

function createSupabaseClient() {
  const { url, key } = getSupabaseEnv();

  return createClient<{ ideas: IdeaTable }>(url, key, {
    auth: { persistSession: false }
  });
}

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    return createSupabaseClient();
  }

  if (!browserClient) {
    browserClient = createSupabaseClient();
  }

  return browserClient;
}

