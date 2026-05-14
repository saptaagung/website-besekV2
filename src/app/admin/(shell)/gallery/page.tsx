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
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-olive">Galeri</h1>
        <p className="mt-2 text-sm text-muted">
          Gambar mosaik untuk halaman Cerita Kami. Gunakan nama bagian seperti{" "}
          <code className="rounded bg-neutral-100 px-1">AboutMosaic_Left</code>,{" "}
          <code className="rounded bg-neutral-100 px-1">AboutMosaic_RightTop</code>,{" "}
          <code className="rounded bg-neutral-100 px-1">AboutMosaic_RightBottom</code>.
        </p>
      </div>
      <GalleryAdmin initialRows={rows} />
    </div>
  );
}
