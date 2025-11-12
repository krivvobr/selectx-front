import { supabase } from "./supabaseClient";

export type PropertyPurpose = "venda" | "locacao";

export interface PropertyListItem {
  id: string;
  image: string;
  title: string;
  type: string;
  location: string;
  price: number;
  purpose: PropertyPurpose;
  bedrooms: number;
  parking: number;
  area: number;
}

export interface PropertyDetail extends PropertyListItem {
  code?: string;
  suites?: number;
  bathrooms?: number;
  totalArea?: number;
  floor?: number;
  furnished?: boolean;
  financing?: boolean;
  description?: string;
  amenities?: string[];
  images?: string[];
  broker?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

function mapRowToListItem(row: any): PropertyListItem {
  return {
    id: String(row.id),
    image: row.image_url ?? "/placeholder.svg",
    title: row.title ?? "Imóvel",
    type: row.type ?? "",
    location: row.location ?? "",
    price: Number(row.price ?? 0),
    purpose: (row.purpose as PropertyPurpose) ?? "venda",
    bedrooms: Number(row.bedrooms ?? 0),
    parking: Number(row.parking ?? 0),
    area: Number(row.area ?? 0),
  };
}

function mapRowToDetail(row: any): PropertyDetail {
  const base = mapRowToListItem(row);
  return {
    ...base,
    code: row.code ?? undefined,
    suites: row.suites ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    totalArea: row.total_area ?? undefined,
    floor: row.floor ?? undefined,
    furnished: row.furnished ?? undefined,
    financing: row.financing ?? undefined,
    description: row.description ?? undefined,
    amenities: (row.amenities as string[]) ?? undefined,
    images: (row.images as string[]) ?? (row.image_url ? [row.image_url] : undefined),
    broker: row.broker ?? undefined,
  };
}

export async function listProperties(): Promise<PropertyListItem[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRowToListItem);
}

export async function getPropertyById(id: string): Promise<PropertyDetail | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRowToDetail(data) : null;
}