"use client";
/* eslint-disable @next/next/no-img-element -- product thumbnails use arbitrary stored URLs */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ProductRow } from "@/lib/database.types";

function displaySku(id: string) {
  return `BSK-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export function ProductsListClient({ initialProducts }: { initialProducts: ProductRow[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [products, setProducts] = useState(initialProducts);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!supabase) return;
    if (!confirm(`Hapus produk "${name}"?`)) return;
    setDeletingId(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    setDeletingId(null);
    if (error) {
      alert(error.message);
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    router.refresh();
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="hidden md:grid grid-cols-12 gap-6 px-6 py-3 border-b border-surface-variant text-on-surface-variant text-label-sm uppercase tracking-wider">
        <div className="col-span-6">Detail Produk</div>
        <div className="col-span-3">Status</div>
        <div className="col-span-3 text-right">Aksi</div>
      </div>

      {products.length === 0 ? (
        <p className="rounded-xl border border-outline-variant bg-surface-container-lowest p-8 text-center text-body-md text-on-surface-variant">
          Belum ada produk. Tambahkan entri pertama.
        </p>
      ) : (
        products.map((p) => {
          const isDraft = !p.main_image_url?.trim();
          const subtitle = [p.material, p.collection_name].filter(Boolean).join(" • ") || "Menunggu Foto Produk";
          return (
            <div
              key={p.id}
              className={`group grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-surface-container-lowest p-6 rounded-xl shadow-[0_2px_10px_rgba(85,107,47,0.03)] hover:shadow-[0_4px_16px_rgba(85,107,47,0.06)] transition-shadow border border-transparent hover:border-surface-variant ${isDraft ? "opacity-80" : ""}`}
            >
              <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-surface-container rounded-lg overflow-hidden relative flex items-center justify-center">
                  {p.main_image_url ? (
                    <img src={p.main_image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-outline text-[32px]">inventory_2</span>
                  )}
                </div>
                <div>
                  <h3
                    className={`font-serif text-headline-md mb-1 ${isDraft ? "text-on-surface" : "text-primary"}`}
                  >
                    {p.name}
                  </h3>
                  <p className="text-body-md text-on-surface-variant text-sm">SKU: {displaySku(p.id)}</p>
                  <p className="text-label-sm text-secondary mt-2 hidden md:block">{subtitle}</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-3 flex items-center md:justify-start">
                {isDraft ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-label-sm">
                    <span className="w-2 h-2 rounded-full bg-outline" />
                    Draft
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Aktif
                  </span>
                )}
              </div>
              <div className="col-span-1 md:col-span-3 flex items-center justify-start md:justify-end gap-3 border-t border-surface-variant md:border-t-0 pt-3 md:pt-0">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-label-sm p-2 rounded-lg hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                  <span className="md:hidden">Edit</span>
                </Link>
                <button
                  type="button"
                  disabled={deletingId === p.id}
                  onClick={() => void handleDelete(p.id, p.name)}
                  className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors text-label-sm p-2 rounded-lg hover:bg-error-container hover:text-on-error-container disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                  <span className="md:hidden">Hapus</span>
                </button>
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}
