import { createServerSupabase } from "@/lib/supabase/server";
import { ManajemenPesanClient } from "@/components/admin/ManajemenPesanClient";

export default async function AdminMessagesPage() {
  const supabase = await createServerSupabase();
  let rows: { id: string; full_name: string; email: string; message: string; created_at: string }[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("contact_messages")
      .select("id, full_name, email, message, created_at")
      .order("created_at", { ascending: false });
    rows = data ?? [];
  }

  return <ManajemenPesanClient initialRows={rows} />;
}
