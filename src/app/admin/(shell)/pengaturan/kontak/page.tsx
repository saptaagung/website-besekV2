import { createServerSupabase } from "@/lib/supabase/server";
import type { ContactInfoRow, SiteContentRow } from "@/lib/database.types";
import { ContactInfoAdmin } from "@/components/admin/ContactInfoAdmin";
import { SiteContentAdmin } from "@/components/admin/SiteContentAdmin";

export default async function PengaturanKontakPage() {
  const supabase = await createServerSupabase();
  let contact: ContactInfoRow | null = null;
  let siteRows: SiteContentRow[] = [];
  if (supabase) {
    const [{ data: c }, { data: s }] = await Promise.all([
      supabase.from("contact_info").select("*").limit(1).maybeSingle(),
      supabase.from("site_content").select("*").eq("page_name", "Contact").order("section_name"),
    ]);
    contact = (c as ContactInfoRow) ?? null;
    siteRows = (s as SiteContentRow[]) ?? [];
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header>
        <h1 className="font-serif text-3xl font-semibold text-primary md:text-4xl">Pengaturan Kontak</h1>
        <p className="mt-2 text-base text-on-surface-variant">Informasi workshop dan teks pengantar halaman kontak.</p>
      </header>

      <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm md:p-6">
        <h2 className="font-serif text-xl text-primary">Informasi workshop</h2>
        <p className="mt-1 text-sm text-on-surface-variant">Alamat, WhatsApp, email, jam operasional, dan peta.</p>
        <div className="mt-6">
          <ContactInfoAdmin initial={contact} />
        </div>
      </section>

      <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm md:p-6">
        <h2 className="font-serif text-xl text-primary">Teks halaman kontak</h2>
        <div className="mt-6">
          <SiteContentAdmin initialRows={siteRows} />
        </div>
      </section>
    </div>
  );
}
