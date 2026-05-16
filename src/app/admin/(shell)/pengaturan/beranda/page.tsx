import { createServerSupabase } from "@/lib/supabase/server";
import { HOME_CAROUSEL_SECTION } from "@/lib/content/sections";
import type { GalleryRow, SiteContentRow } from "@/lib/database.types";
import { PengaturanBerandaClient } from "@/components/admin/PengaturanBerandaClient";

export default async function PengaturanBerandaPage() {
  const supabase = await createServerSupabase();
  let siteRows: SiteContentRow[] = [];
  let carouselSlides: GalleryRow[] = [];

  if (supabase) {
    const [{ data: siteData }, { data: carouselData }] = await Promise.all([
      supabase
        .from("site_content")
        .select("*")
        .in("page_name", ["Home", "About", "Contact"])
        .order("section_name"),
      supabase
        .from("gallery")
        .select("*")
        .eq("section_name", HOME_CAROUSEL_SECTION)
        .order("created_at", { ascending: true }),
    ]);
    siteRows = (siteData as SiteContentRow[]) ?? [];
    carouselSlides = (carouselData as GalleryRow[]) ?? [];
  }

  return (
    <div className="mx-auto max-w-[1024px] space-y-12">
      {/* Page Title */}
      <div>
        <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-on-background mb-1">
          Pengaturan Beranda
        </h2>
        <p className="text-body-md text-on-surface-variant">
          Kelola konten dan tampilan halaman utama Besek Artisanal.
        </p>
      </div>
      <PengaturanBerandaClient initialRows={siteRows} initialCarouselSlides={carouselSlides} />
    </div>
  );
}
