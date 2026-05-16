import type {
  ContactInfoRow,
  GalleryRow,
  ProductRow,
  SiteContentRow,
} from "@/lib/database.types";
import { HOME_CAROUSEL_SECTION } from "@/lib/content/sections";
import {
  defaultContact,
  defaultGallery,
  defaultHomeCarousel,
  defaultProducts,
  defaultSiteContent,
} from "@/lib/content/defaults";
import { createServerSupabase } from "@/lib/supabase/server";

function bySection(rows: SiteContentRow[]) {
  return new Map(rows.map((r) => [r.section_name, r]));
}

function mergeSiteContent(pageName: string, dbRows: SiteContentRow[] | null) {
  const defaults = defaultSiteContent.filter((r) => r.page_name === pageName);
  const map = bySection(defaults);
  (dbRows ?? []).forEach((r) => {
    if (r.page_name === pageName) map.set(r.section_name, r);
  });
  return map;
}

export async function getSiteSections(pageName: string) {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return mergeSiteContent(pageName, null);
  }
  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("page_name", pageName);
  if (error) {
    console.error(error);
    return mergeSiteContent(pageName, null);
  }
  return mergeSiteContent(pageName, data as SiteContentRow[]);
}

export async function getProducts(): Promise<ProductRow[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return defaultProducts;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });
  if (error || !data?.length) {
    if (error) console.error(error);
    return defaultProducts;
  }
  return data as ProductRow[];
}

export async function getSignatureProducts(): Promise<ProductRow[]> {
  const all = await getProducts();
  const sig = all.filter((p) => p.is_signature);
  return sig.length ? sig.slice(0, 4) : all.slice(0, 4);
}

export async function getProductById(id: string): Promise<ProductRow | null> {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return defaultProducts.find((p) => p.id === id) ?? null;
  }
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error(error);
    return defaultProducts.find((p) => p.id === id) ?? null;
  }
  return (data as ProductRow) ?? defaultProducts.find((p) => p.id === id) ?? null;
}

export async function getContactInfo(): Promise<ContactInfoRow> {
  const supabase = await createServerSupabase();
  if (!supabase) return defaultContact;
  const { data, error } = await supabase.from("contact_info").select("*").limit(1).maybeSingle();
  if (error || !data) {
    if (error) console.error(error);
    return defaultContact;
  }
  return data as ContactInfoRow;
}

export async function getHomeCarouselSlides(): Promise<GalleryRow[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return defaultHomeCarousel;
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("section_name", HOME_CAROUSEL_SECTION)
    .order("created_at", { ascending: true });
  if (error) {
    console.error(error);
    return [];
  }
  return (data as GalleryRow[]) ?? [];
}

export async function getGalleryBySections(sections: string[]): Promise<GalleryRow[]> {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return defaultGallery.filter((g) => sections.includes(g.section_name));
  }
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .in("section_name", sections)
    .order("created_at", { ascending: true });
  if (error || !data?.length) {
    if (error) console.error(error);
    return defaultGallery.filter((g) => sections.includes(g.section_name));
  }
  return data as GalleryRow[];
}

export function formatIdr(amount: number | null | undefined) {
  if (amount == null || Number.isNaN(amount)) return "—";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
