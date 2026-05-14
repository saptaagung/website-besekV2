import { createServerSupabase } from "@/lib/supabase/server";
import type { ContactInfoRow } from "@/lib/database.types";
import { ContactInfoAdmin } from "@/components/admin/ContactInfoAdmin";

export default async function AdminContactInfoPage() {
  const supabase = await createServerSupabase();
  let row: ContactInfoRow | null = null;
  if (supabase) {
    const { data } = await supabase.from("contact_info").select("*").limit(1).maybeSingle();
    row = (data as ContactInfoRow) ?? null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-olive">Info kontak</h1>
        <p className="mt-2 text-sm text-muted">
          Data yang ditampilkan pada halaman Hubungi Kami dan tautan WhatsApp.
        </p>
      </div>
      <ContactInfoAdmin initial={row} />
    </div>
  );
}
