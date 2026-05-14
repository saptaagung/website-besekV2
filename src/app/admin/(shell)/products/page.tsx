import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/database.types";
import { formatIdr } from "@/lib/data/queries";

export default async function AdminProductsPage() {
  const supabase = await createServerSupabase();
  let products: ProductRow[] = [];
  if (supabase) {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    products = (data as ProductRow[]) ?? [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-olive">Produk</h1>
          <p className="mt-2 text-sm text-muted">CRUD produk untuk halaman koleksi dan detail.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-olive px-4 py-2 text-sm font-semibold text-white hover:bg-olive-dark"
        >
          Tambah produk
        </Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Koleksi</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Signature</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-neutral-100 last:border-0">
                <td className="px-4 py-3 font-medium text-neutral-900">{p.name}</td>
                <td className="px-4 py-3 text-neutral-600">{p.collection_name}</td>
                <td className="px-4 py-3 text-neutral-600">{formatIdr(p.price_starting_from ?? 0)}</td>
                <td className="px-4 py-3">{p.is_signature ? "Ya" : "Tidak"}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/products/${p.id}`} className="text-olive hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 ? (
          <p className="p-6 text-sm text-muted">Belum ada produk. Tambahkan entri pertama.</p>
        ) : null}
      </div>
    </div>
  );
}
