import { createServerSupabase } from "@/lib/supabase/server";
import type { SiteContentRow } from "@/lib/database.types";
import { SiteContentAdmin } from "@/components/admin/SiteContentAdmin";

export default async function AdminSiteContentPage() {
  const supabase = await createServerSupabase();
  let rows: SiteContentRow[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .order("page_name")
      .order("section_name");
    rows = (data as SiteContentRow[]) ?? [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-olive">Konten situs</h1>
        <p className="mt-2 text-sm text-muted">
          Sunting teks untuk Beranda, Tentang Kami, dan Kontak. Gunakan nama halaman dan bagian yang konsisten.
        </p>
      </div>
      <SiteContentAdmin initialRows={rows} />
    </div>
  );
}
