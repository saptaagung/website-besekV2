import { notFound } from "next/navigation";
import { AdminProductForm } from "@/components/admin/AdminProductForm";
import { createServerSupabase } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/database.types";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  if (!supabase) notFound();
  const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <AdminProductForm product={data as ProductRow} />;
}
