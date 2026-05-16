import { createServerSupabase } from "@/lib/supabase/server";
import type { GalleryRow } from "@/lib/database.types";
import { GalleryAdmin } from "@/components/admin/GalleryAdmin";

export default async function AdminGalleryPage() {
  const supabase = await createServerSupabase();
  let rows: GalleryRow[] = [];
  if (supabase) {
    const { data } = await supabase.from("gallery").select("*").order("section_name");
    rows = (data as GalleryRow[]) ?? [];
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <h1 className="font-serif text-3xl font-semibold text-primary md:text-4xl">Galeri Cerita Kami</h1>
        <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
          Gambar mosaik di halaman tentang kami. Nama bagian standar:{" "}
          <code className="rounded bg-surface-container-low px-1 text-xs">AboutMosaic_Left</code>,{" "}
          <code className="rounded bg-surface-container-low px-1 text-xs">AboutMosaic_RightTop</code>,{" "}
          <code className="rounded bg-surface-container-low px-1 text-xs">AboutMosaic_RightBottom</code>.
        </p>
      </header>
      <GalleryAdmin initialRows={rows} />
    </div>
  );
}
