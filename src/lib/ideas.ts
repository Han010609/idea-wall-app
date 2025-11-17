import { getSupabaseClient } from "./supabase-client";
import type { Idea } from "@/types/idea";

export async function fetchIdeas(): Promise<Idea[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("ideas")
    .select("id, content, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function insertIdea(content: string): Promise<Idea> {
  const supabase = getSupabaseClient();
  const payload = { content: content.trim() };
  const { data, error } = await supabase
    .from("ideas")
    .insert(payload)
    .select("id, content, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function removeIdea(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("ideas").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

