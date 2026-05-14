"use server";

import { createServerSupabase } from "@/lib/supabase/server";

export type ContactFormState = { ok: boolean; message: string };

export async function submitContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!full_name || !email || !message) {
    return { ok: false, message: "Mohon lengkapi semua kolom." };
  }

  const supabase = await createServerSupabase();
  if (!supabase) {
    return {
      ok: false,
      message: "Database belum dikonfigurasi. Hubungi administrator.",
    };
  }

  const { error } = await supabase.from("contact_messages").insert({
    full_name,
    email,
    message,
  });

  if (error) {
    console.error(error);
    return {
      ok: false,
      message: "Gagal mengirim pesan. Periksa koneksi atau coba lagi nanti.",
    };
  }

  return { ok: true, message: "Terima kasih! Pesan Anda telah terkirim." };
}
