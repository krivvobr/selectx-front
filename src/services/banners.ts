import { supabase } from "./supabaseClient";

export interface Banner {
  id: number | string;
  image_desktop: string;
  image_mobile: string;
  alt?: string | null;
  active?: boolean | null;
  order?: number | null;
}

function normalizeBanner(row: Record<string, unknown>): Banner | null {
  const id = (row["id"] as number | string | undefined) ?? 0;
  const firstUrlOf = (value: unknown): string => {
    if (Array.isArray(value)) {
      const s = value.find((v) => typeof v === "string" && v.length > 0) as string | undefined;
      return s ?? "";
    }
    return typeof value === "string" ? value : "";
  };

  const rawImageDesktop = firstUrlOf(
    row["desktop_images"] ??
      row["image_desktop"] ??
      row["desktop_url"] ??
      row["imageDesktop"] ??
      row["image_desktop_url"] ??
      row["url_desktop"] ??
      row["urlDesktop"]
  );
  const rawImageMobile = firstUrlOf(
    row["mobile_image"] ??
      row["image_mobile"] ??
      row["mobile_url"] ??
      row["imageMobile"] ??
      row["image_mobile_url"] ??
      row["url_mobile"] ??
      row["urlMobile"]
  );

  if (!rawImageDesktop && !rawImageMobile) return null;

  const resolveUrl = (u: string): string => {
    if (!u) return "";
    if (/^https?:\/\//i.test(u)) return u;
    if (u.startsWith("/")) return u;
    return u;
  };

  const imageDesktop = resolveUrl(rawImageDesktop);
  const imageMobile = resolveUrl(rawImageMobile || rawImageDesktop);

  return {
    id,
    image_desktop: imageDesktop,
    image_mobile: imageMobile || imageDesktop,
    alt: (row["alt"] as string | undefined) ?? (row["title"] as string | undefined) ?? null,
    active: (row["active"] as boolean | undefined) ?? null,
    order:
      (row["order"] as number | undefined) ??
      (row["position"] as number | undefined) ??
      (row["priority"] as number | undefined) ??
      null,
  };
}

export async function listBanners(): Promise<Banner[]> {
  // Try ordered by `order` if exists
  let { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("order", { ascending: true });

  // Fallback if `order` column doesn't exist
  if (error) {
    const fallback = await supabase.from("banners").select("*");
    data = fallback.data ?? null;
    error = fallback.error ?? null;
  }

  if (error) throw error;
  const rows = (data ?? []) as Record<string, unknown>[];
  return rows
    .map((r) => normalizeBanner(r))
    .filter((b): b is Banner => Boolean(b));
}