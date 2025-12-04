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
  videoUrl?: string;
  virtualTourUrl?: string;
}

function mapRowToListItem(row: Record<string, unknown>): PropertyListItem {
  const locationParts = [];
  const address = row["address"] as string | undefined;
  const cities = row["cities"] as { name?: string } | undefined;
  if (address) locationParts.push(address);
  if (cities?.name) locationParts.push(cities.name);

  return {
    id: String(row["id"]),
    cover_image: (row["cover_image"] as string | undefined) ?? (row["image_url"] as string | undefined) ?? "/placeholder.svg",
    title: (row["title"] as string | undefined) ?? "Imóvel",
    type: (row["type"] as string | undefined) ?? "",
    location: locationParts.join(", "),
    price: Number((row["price"] as number | string | undefined) ?? 0),
    purpose: (row["purpose"] as PropertyPurpose | undefined) ?? "venda",
    bedrooms: Number((row["bedrooms"] as number | string | undefined) ?? 0),
    parking: Number((row["parking"] as number | string | undefined) ?? 0),
    area: Number((row["area"] as number | string | undefined) ?? 0),
  };
}

function mapRowToDetail(row: Record<string, unknown>): PropertyDetail {
  const base = mapRowToListItem(row);
  return {
    ...base,
    code: (row["code"] as string | undefined) ?? undefined,
    suites: (row["suites"] as number | undefined) ?? undefined,
    bathrooms: (row["bathrooms"] as number | undefined) ?? undefined,
    totalArea: (row["total_area"] as number | undefined) ?? undefined,
    floor: (row["floor"] as number | undefined) ?? undefined,
    furnished: (row["furnished"] as boolean | undefined) ?? undefined,
    financing: (row["financing"] as boolean | undefined) ?? undefined,
    description: (row["description"] as string | undefined) ?? undefined,
    amenities: (row["amenities"] as string[] | undefined) ?? undefined,
    images: (row["images"] as string[] | undefined) ?? ((row["cover_image"] as string | undefined) ? [row["cover_image"] as string] : undefined),
    broker: row["broker"] as { name?: string; phone?: string; email?: string } | undefined,
    videoUrl: row["video_url"] as string | undefined,
    virtualTourUrl: row["virtual_tour_url"] as string | undefined,
  };
}

export async function listProperties(filters?: {
  type?: string;
  purpose?: PropertyPurpose;
  cityId?: string;
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
  if (filters?.cityId) {
    query = query.eq("city_id", filters.cityId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data ?? []).map(mapRowToListItem);
}

export async function listPropertiesPaginated(filters?: {
  type?: string;
  purpose?: PropertyPurpose;
  cityId?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ items: PropertyListItem[]; total: number }> {
  const page = Math.max(1, Number(filters?.page ?? 1));
  const pageSize = Math.max(1, Number(filters?.pageSize ?? 20));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("properties")
    .select("*, cities(name)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filters?.purpose) {
    query = query.eq("purpose", filters.purpose);
  }
  if (filters?.type) {
    query = query.eq("type", filters.type);
  }
  if (filters?.cityId) {
    query = query.eq("city_id", filters.cityId);
  }

  const { data, error, count } = await query;

  if (error) throw error;
  return { items: (data ?? []).map(mapRowToListItem), total: count ?? 0 };
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

  
