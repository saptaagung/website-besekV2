import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import type { SiteContentRow } from "@/lib/database.types";
import { SiteContentAdmin } from "@/components/admin/SiteContentAdmin";

export default async function PengaturanCeritaPage() {
  const supabase = await createServerSupabase();
  let siteRows: SiteContentRow[] = [];
  if (supabase) {
    const { data: s } = await supabase.from("site_content").select("*").eq("page_name", "About").order("section_name");
    siteRows = (s as SiteContentRow[]) ?? [];
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header>
        <h1 className="font-serif text-3xl font-semibold text-primary md:text-4xl">Pengaturan Cerita Kami</h1>
        <p className="mt-2 text-base text-on-surface-variant">Teks halaman tentang kami. Gambar mosaik dikelola di halaman galeri.</p>
      </header>

      <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm md:p-6">
        <h2 className="font-serif text-xl text-primary">Teks halaman</h2>
        <p className="mt-1 text-sm text-on-surface-variant">Misi, cerita pembuatan, dan bagian lain di halaman Tentang.</p>
        <div className="mt-6">
          <SiteContentAdmin initialRows={siteRows} />
        </div>
      </section>

      <section className="rounded-xl border border-outline-variant bg-primary-fixed/30 p-6 text-center md:p-8">
        <h2 className="font-serif text-lg text-primary">Galeri mosaik</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-on-surface-variant">
          Atur gambar grid (kiri, kanan atas, kanan bawah) untuk halaman cerita kami di publik.
        </p>
        <Link
          href="/admin/gallery"
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition hover:opacity-90"
        >
          Buka manajemen galeri
        </Link>
      </section>
    </div>
  );
}
