import { supabase } from "./supabaseClient";

export interface Lead {
  id?: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  property_url: string;
  created_at?: string;
}

export async function createLead(lead: Omit<Lead, "id" | "created_at">) {
  const { data, error } = await supabase.from("leads").insert([lead]).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function listLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return (data ?? []) as Lead[];
}