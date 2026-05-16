import { createServerSupabase } from "@/lib/supabase/server";
import type { SiteContentRow } from "@/lib/database.types";
import { PengaturanBerandaClient } from "@/components/admin/PengaturanBerandaClient";

export default async function PengaturanBerandaPage() {
  const supabase = await createServerSupabase();
  let siteRows: SiteContentRow[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .in("page_name", ["Home", "About", "Contact"])
      .order("section_name");
    siteRows = (data as SiteContentRow[]) ?? [];
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
      <PengaturanBerandaClient initialRows={siteRows} />
    </div>
  );
}
