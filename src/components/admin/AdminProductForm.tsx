"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ProductRow } from "@/lib/database.types";

type Props = { product?: ProductRow | null };

export function AdminProductForm({ product }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(product?.id);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    collection_name: product?.collection_name ?? "",
    description: product?.description ?? "",
    price_starting_from: product?.price_starting_from?.toString() ?? "",
    main_image_url: product?.main_image_url ?? "",
    image_gallery_urls: (product?.image_gallery_urls ?? []).join("\n"),
    is_signature: product?.is_signature ?? false,
    labels: (product?.labels ?? []).join(", "),
    material: product?.material ?? "",
    dimensions: product?.dimensions ?? "",
    technique: product?.technique ?? "",
    color: product?.color ?? "",
    main_image_fit: product?.main_image_fit === "contain" ? "contain" : "cover",
    main_image_position: product?.main_image_position ?? "",
    main_image_sizes: product?.main_image_sizes ?? "",
  });

  async function save() {
    if (!supabase) {
      setError("Supabase tidak tersedia.");
      return;
    }
    setPending(true);
    setError(null);
    const payload = {
      name: form.name,
      collection_name: form.collection_name || null,
      description: form.description || null,
      price_starting_from: form.price_starting_from ? Number(form.price_starting_from) : null,
      main_image_url: form.main_image_url || null,
      main_image_fit: form.main_image_fit === "contain" ? "contain" : "cover",
      main_image_position: form.main_image_position.trim() || null,
      main_image_sizes: form.main_image_sizes.trim() || null,
      image_gallery_urls: form.image_gallery_urls
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      is_signature: form.is_signature,
      labels: form.labels
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      material: form.material || null,
      dimensions: form.dimensions || null,
      technique: form.technique || null,
      color: form.color || null,
    };

    if (isEdit && product?.id) {
      const { error: upErr } = await supabase.from("products").update(payload).eq("id", product.id);
      setPending(false);
      if (upErr) {
        setError(upErr.message);
        return;
      }
      router.refresh();
    } else {
      const { data, error: insErr } = await supabase
        .from("products")
        .insert(payload)
        .select("id")
        .single();
      setPending(false);
      if (insErr) {
        setError(insErr.message);
        return;
      }
      if (data?.id) {
        router.replace(`/admin/products/${data.id}`);
        router.refresh();
      }
    }
  }

  async function remove() {
    if (!supabase || !product?.id) return;
    if (!confirm("Hapus produk ini?")) return;
    setPending(true);
    const { error: delErr } = await supabase.from("products").delete().eq("id", product.id);
    setPending(false);
    if (delErr) {
      setError(delErr.message);
      return;
    }
    router.replace("/admin/products");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h1 className="font-serif text-2xl text-olive">{isEdit ? "Edit Produk" : "Produk Baru"}</h1>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Nama">
          <input
            className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field label="Koleksi (label kartu)">
          <input
            className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={form.collection_name}
            onChange={(e) => setForm({ ...form, collection_name: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Deskripsi">
        <textarea
          className="min-h-[100px] w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </Field>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Harga mulai (IDR)">
          <input
            className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            type="number"
            value={form.price_starting_from}
            onChange={(e) => setForm({ ...form, price_starting_from: e.target.value })}
          />
        </Field>
        <Field label="Signature (Beranda)">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_signature}
              onChange={(e) => setForm({ ...form, is_signature: e.target.checked })}
            />
            Tampilkan di Koleksi Signature
          </label>
        </Field>
      </div>
      <Field label="URL gambar utama">
        <input
          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
          value={form.main_image_url}
          onChange={(e) => setForm({ ...form, main_image_url: e.target.value })}
        />
      </Field>
      <div className="grid gap-3 md:grid-cols-3">
        <Field label="Gambar utama: isi frame">
          <select
            className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={form.main_image_fit}
            onChange={(e) => setForm({ ...form, main_image_fit: e.target.value })}
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
          </select>
        </Field>
        <Field label="Posisi crop (CSS)">
          <input
            className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={form.main_image_position}
            onChange={(e) => setForm({ ...form, main_image_position: e.target.value })}
            placeholder="center center"
          />
        </Field>
        <Field label="Sizes (Next.js)">
          <input
            className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={form.main_image_sizes}
            onChange={(e) => setForm({ ...form, main_image_sizes: e.target.value })}
            placeholder="(max-width:768px) 100vw, 50vw"
          />
        </Field>
      </div>
      <p className="text-xs text-neutral-500">
        <strong>Sizes</strong> mengatur resolusi yang dimuat di grid dan halaman produk. Kosongkan untuk pakai default situs.
      </p>
      <Field label="Galeri (satu URL per baris)">
        <textarea
          className="min-h-[100px] w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
          value={form.image_gallery_urls}
          onChange={(e) => setForm({ ...form, image_gallery_urls: e.target.value })}
        />
      </Field>
      <Field label="Tag (pisahkan koma)">
        <input
          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
          value={form.labels}
          onChange={(e) => setForm({ ...form, labels: e.target.value })}
          placeholder="Handmade, Sustainable"
        />
      </Field>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Material">
          <input
            className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={form.material}
            onChange={(e) => setForm({ ...form, material: e.target.value })}
          />
        </Field>
        <Field label="Dimensi">
          <input
            className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={form.dimensions}
            onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
          />
        </Field>
        <Field label="Teknik">
          <input
            className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={form.technique}
            onChange={(e) => setForm({ ...form, technique: e.target.value })}
          />
        </Field>
        <Field label="Warna">
          <input
            className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
        </Field>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={() => void save()}
          disabled={pending}
          className="rounded-md bg-olive px-4 py-2 text-sm font-semibold text-white hover:bg-olive-dark disabled:opacity-60"
        >
          Simpan
        </button>
        {isEdit ? (
          <button
            type="button"
            onClick={() => void remove()}
            disabled={pending}
            className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
          >
            Hapus
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-neutral-800">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
