import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/database.types";
import { ProductsListClient } from "@/components/admin/ProductsListClient";

export default async function AdminProductsPage() {
  const supabase = await createServerSupabase();
  let products: ProductRow[] = [];
  if (supabase) {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    products = (data as ProductRow[]) ?? [];
  }

  return (
    <div className="space-y-12 py-6 md:py-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider">Admin Dashboard</p>
          <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary">Manajemen Produk</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-1 bg-primary text-on-primary text-label-md px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm self-start"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Tambah Produk Baru
        </Link>
      </header>

      <ProductsListClient initialProducts={products} />
    </div>
  );
}
