"use client";
/* eslint-disable @next/next/no-img-element -- previews use admin-pasted image URLs from any host */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ProductRow } from "@/lib/database.types";
import {
  FORM_CARD,
  UNDERLINE_INPUT,
  UNDERLINE_LABEL,
  UNDERLINE_TEXTAREA,
} from "@/components/admin/admin-mockup-ui";
import { adminErrorBanner } from "@/components/admin/admin-ui";

type Props = { product?: ProductRow | null };

/** Main image + up to 4 gallery URLs (matches mockup “3/5” style cap). */
const MAX_GALLERY_URLS = 4;
const MAX_IMAGE_SLOTS = 1 + MAX_GALLERY_URLS;

function parseGalleryLines(raw: string) {
  return raw.split("\n").map((line) => line.trim());
}

function isImageUrl(line: string) {
  return /^https?:\/\//i.test(line);
}

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

  const isActive = Boolean(form.main_image_url.trim());
  const galleryLines = parseGalleryLines(form.image_gallery_urls);
  const galleryFilledCount = galleryLines.filter(Boolean).length;
  const thumbCount = (form.main_image_url.trim() ? 1 : 0) + galleryFilledCount;
  const canAddGallery = galleryFilledCount < MAX_GALLERY_URLS;
  const invalidGalleryLines = galleryLines.filter((line) => line && !isImageUrl(line));

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

  function removeGalleryLine(lineIndex: number) {
    const next = galleryLines.filter((_, i) => i !== lineIndex);
    setForm({ ...form, image_gallery_urls: next.join("\n") });
  }

  function appendGalleryUrl(url: string) {
    if (galleryFilledCount >= MAX_GALLERY_URLS) return;
    const lines = [...galleryLines];
    if (lines.length > 0 && lines[lines.length - 1] !== "") {
      lines.push(url);
    } else {
      const emptyIdx = lines.findIndex((l) => !l);
      if (emptyIdx >= 0) lines[emptyIdx] = url;
      else lines.push(url);
    }
    setForm({ ...form, image_gallery_urls: lines.join("\n") });
  }

  return (
    <div className="pb-12">
      <div className="mb-12 flex items-center gap-3">
        <Link
          href="/admin/products"
          className="text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Kembali"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary">
          {isEdit ? "Edit Produk" : "Produk Baru"}
        </h1>
      </div>

      {error ? <p className={`${adminErrorBanner} mb-6`}>{error}</p> : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Left: details */}
        <div className="md:col-span-8 space-y-6">
          <div className={FORM_CARD}>
            <h2 className="font-serif text-headline-md text-primary mb-6">Informasi Dasar</h2>
            <div className="space-y-3">
              <div>
                <label className={UNDERLINE_LABEL}>Nama Produk</label>
                <input
                  className={UNDERLINE_INPUT}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className={`${UNDERLINE_LABEL} mt-3`}>Deskripsi</label>
                <textarea
                  className={UNDERLINE_TEXTAREA}
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <label className={UNDERLINE_LABEL}>Harga (IDR)</label>
                  <input
                    className={UNDERLINE_INPUT}
                    type="number"
                    value={form.price_starting_from}
                    onChange={(e) => setForm({ ...form, price_starting_from: e.target.value })}
                  />
                </div>
                <div>
                  <label className={UNDERLINE_LABEL}>Koleksi (label kartu)</label>
                  <input
                    className={UNDERLINE_INPUT}
                    value={form.collection_name}
                    onChange={(e) => setForm({ ...form, collection_name: e.target.value })}
                  />
                </div>
              </div>
              <label className="mt-4 flex items-center gap-2 text-label-sm text-on-surface">
                <input
                  type="checkbox"
                  checked={form.is_signature}
                  onChange={(e) => setForm({ ...form, is_signature: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary"
                />
                Tampil di koleksi signature beranda
              </label>
            </div>
          </div>

          <div className={FORM_CARD}>
            <h2 className="font-serif text-headline-md text-primary mb-6">Spesifikasi</h2>
            <div className="space-y-3">
              <div>
                <label className={UNDERLINE_LABEL}>Material</label>
                <input
                  className={UNDERLINE_INPUT}
                  value={form.material}
                  onChange={(e) => setForm({ ...form, material: e.target.value })}
                />
              </div>
              <div>
                <label className={UNDERLINE_LABEL}>Dimensi (mis. 20 × 20 × 10 cm)</label>
                <input
                  className={UNDERLINE_INPUT}
                  value={form.dimensions}
                  onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                  placeholder="Panjang × lebar × tinggi"
                />
              </div>
              <div>
                <label className={UNDERLINE_LABEL}>Teknik Anyaman</label>
                <input
                  className={UNDERLINE_INPUT}
                  value={form.technique}
                  onChange={(e) => setForm({ ...form, technique: e.target.value })}
                />
              </div>
              <div>
                <label className={UNDERLINE_LABEL}>Warna</label>
                <input
                  className={UNDERLINE_INPUT}
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
              </div>
              <div>
                <label className={UNDERLINE_LABEL}>Tag (pisahkan koma)</label>
                <input
                  className={UNDERLINE_INPUT}
                  value={form.labels}
                  onChange={(e) => setForm({ ...form, labels: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: media & actions */}
        <div className="md:col-span-4 space-y-6">
          <div className={FORM_CARD}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-headline-md text-primary">Galeri Gambar</h2>
              <span className="text-label-sm text-on-surface-variant">
                {thumbCount}/{MAX_IMAGE_SLOTS}
              </span>
            </div>
            {invalidGalleryLines.length > 0 ? (
              <p className="mb-3 text-label-sm text-error">
                Beberapa baris galeri bukan URL lengkap — gunakan link yang diawali{" "}
                <span className="font-mono">https://</span>
              </p>
            ) : null}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 relative aspect-square rounded-lg overflow-hidden group bg-surface-container">
                {form.main_image_url.trim() ? (
                  <>
                    <img src={form.main_image_url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, main_image_url: "" })}
                      className="absolute top-2 right-2 bg-surface/80 p-1 rounded-full text-error opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                    <div className="absolute bottom-2 left-2 bg-surface/80 px-2 py-1 rounded text-[10px] text-label-sm">
                      Utama
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                  </div>
                )}
              </div>
              {galleryLines.map((line, lineIndex) => {
                if (!line) return null;
                const previewable = isImageUrl(line);
                return (
                  <div
                    key={`gallery-${lineIndex}`}
                    className="relative aspect-square rounded-lg overflow-hidden group bg-surface-container"
                  >
                    {previewable ? (
                      <img src={line} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-2xl text-error">link_off</span>
                        <span className="line-clamp-2 break-all text-[10px]">{line}</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeGalleryLine(lineIndex)}
                      className="absolute top-1 right-1 bg-surface/80 p-1 rounded-full text-error opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                    </button>
                  </div>
                );
              })}
              {canAddGallery ? (
                <button
                  type="button"
                  className="aspect-square rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors hover:bg-surface-container-low"
                  onClick={() => {
                    const url = prompt("Tempel URL gambar (https://…):");
                    if (url?.trim()) appendGalleryUrl(url.trim());
                  }}
                >
                  <span className="material-symbols-outlined mb-1">add_photo_alternate</span>
                  <span className="text-label-sm">Unggah</span>
                </button>
              ) : null}
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <label className={UNDERLINE_LABEL}>URL gambar utama</label>
                <input
                  className={UNDERLINE_INPUT}
                  placeholder="https://…"
                  value={form.main_image_url}
                  onChange={(e) => setForm({ ...form, main_image_url: e.target.value })}
                />
              </div>
              <div>
                <label className={UNDERLINE_LABEL}>Galeri (satu URL per baris)</label>
                <textarea
                  className={`${UNDERLINE_TEXTAREA} text-xs font-mono`}
                  rows={5}
                  placeholder={"https://…\nhttps://…"}
                  value={form.image_gallery_urls}
                  onChange={(e) => setForm({ ...form, image_gallery_urls: e.target.value })}
                />
                <p className="mt-1 text-label-sm text-on-surface-variant">
                  Maks. {MAX_GALLERY_URLS} URL galeri (satu per baris). Semua pratinjau ditampilkan di atas.
                </p>
              </div>
            </div>
          </div>

          <div className={`${FORM_CARD} flex flex-col gap-6`}>
            <div>
              <label className={UNDERLINE_LABEL}>Status Produk</label>
              <select
                className="w-full bg-transparent border border-outline-variant rounded-lg focus:border-primary text-on-surface text-body-md p-3 focus:outline-none transition-colors mt-1"
                value={isActive ? "active" : "draft"}
                onChange={(e) => {
                  if (e.target.value === "draft") setForm({ ...form, main_image_url: "" });
                }}
              >
                <option value="active">Aktif (Tampil di Toko)</option>
                <option value="draft">Draf (Disembunyikan)</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={pending}
                className="w-full bg-primary text-on-primary text-label-md py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm disabled:opacity-60"
              >
                {pending ? "Menyimpan…" : "Simpan Perubahan"}
              </button>
              <Link
                href="/admin/products"
                className="w-full border border-secondary text-secondary text-label-md py-3 rounded-lg hover:bg-secondary/5 transition-colors text-center block"
              >
                Batal
              </Link>
              {isEdit ? (
                <button
                  type="button"
                  onClick={() => void remove()}
                  disabled={pending}
                  className="w-full border border-error text-error text-label-md py-3 rounded-lg hover:bg-error-container transition-colors disabled:opacity-60"
                >
                  Hapus Produk
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
