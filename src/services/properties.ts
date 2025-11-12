import { supabase } from "./supabaseClient";

export type PropertyPurpose = "venda" | "locacao";

export interface PropertyListItem {
  id: string;
  cover_image: string;
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
  const locationParts = [];
  if (row.address) locationParts.push(row.address);
  if (row.cities?.name) locationParts.push(row.cities.name);

  return {
    id: String(row.id),
    cover_image: row.cover_image ?? row.image_url ?? "/placeholder.svg",
    title: row.title ?? "Imóvel",
    type: row.type ?? "",
    location: locationParts.join(", "),
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
    images: (row.images as string[]) ?? (row.cover_image ? [row.cover_image] : undefined),
    broker: row.broker ?? undefined,
  };
}

export async function listProperties(filters?: {
  type?: string;
  purpose?: PropertyPurpose;
  cityId?: number;
}): Promise<PropertyListItem[]> {
  let query = supabase
    .from("properties")
    .select(
      "*, cities(name)"
    )
    .order("created_at", { ascending: false });

  if (filters?.purpose) {
    query = query.eq("purpose", filters.purpose);
  }
  if (filters?.type) {
    query = query.eq("type", filters.type);
  }
  if (typeof filters?.cityId === "number") {
    query = query.eq("city_id", filters.cityId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data ?? []).map(mapRowToListItem);
}

export async function getPropertyById(id: string): Promise<PropertyDetail | null> {
  const { data, error } = await supabase
    .from("properties")
    .select(
      "*, cities(name)"
    )
    .eq("id", id)
    .maybeSingle();

    if (error) throw error;

    return data ? mapRowToDetail(data) : null;

  }

  

  export async function listCities(): Promise<{ id: number; name: string }[]> {

    const { data, error } = await supabase.from("cities").select("id, name");

    if (error) throw error;

    return data ?? [];

  }

  