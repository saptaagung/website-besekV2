import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function AdminIndexPage() {
  const supabase = await createServerSupabase();
  if (!supabase) {
    redirect("/admin/login?error=config");
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  redirect(user ? "/admin/dashboard" : "/admin/login");
}
