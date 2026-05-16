"use client";
/* eslint-disable @next/next/no-img-element -- admin previews use arbitrary image URLs */

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { HOME_CAROUSEL_SECTION } from "@/lib/content/sections";
import type { GalleryRow } from "@/lib/database.types";

const MAX_SLIDES = 8;

const UNDERLINE_INPUT =
  "w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-3 text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/50";
const UNDERLINE_LABEL = "block text-label-sm text-on-surface-variant mb-1";
const SECTION_CARD =
  "bg-surface rounded-xl p-6 md:p-12 border border-surface-container-high shadow-[0_4px_24px_rgba(85,107,47,0.03)]";
const SECTION_HEADER = "mb-6 border-b border-surface-container-highest pb-3 flex items-center gap-3";

export function BerandaCarouselAdmin({
  initialSlides,
}: {
  initialSlides: GalleryRow[];
}) {
  const supabase = createClient();
  const [slides, setSlides] = useState(initialSlides);
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    if (!supabase) return;
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .eq("section_name", HOME_CAROUSEL_SECTION)
      .order("created_at", { ascending: true });
    setSlides((data as GalleryRow[]) ?? []);
  }

  async function addSlide() {
    if (!supabase) return;
    const url = imageUrl.trim();
    if (!url) {
      setError("URL gambar wajib diisi.");
      return;
    }
    if (slides.length >= MAX_SLIDES) {
      setError(`Maksimal ${MAX_SLIDES} slide.`);
      return;
    }
    setPending(true);
    setError(null);
    const { error: insErr } = await supabase.from("gallery").insert({
      image_url: url,
      alt_text: altText.trim() || null,
      section_name: HOME_CAROUSEL_SECTION,
      image_fit: "cover",
      image_position: "center center",
      image_sizes: "(max-width: 768px) 100vw, 50vw",
    });
    setPending(false);
    if (insErr) {
      setError(insErr.message);
      return;
    }
    setImageUrl("");
    setAltText("");
    await refresh();
  }

  async function removeSlide(id: string) {
    if (!supabase) return;
    if (!confirm("Hapus slide carousel ini?")) return;
    setPending(true);
    setError(null);
    const { error: delErr } = await supabase.from("gallery").delete().eq("id", id);
    setPending(false);
    if (delErr) {
      setError(delErr.message);
      return;
    }
    await refresh();
  }

  return (
    <section className={SECTION_CARD}>
      <div className={SECTION_HEADER}>
        <span className="material-symbols-outlined text-primary">view_carousel</span>
        <h3 className="font-serif text-headline-md text-on-background">Carousel Beranda</h3>
      </div>
      <p className="mb-6 text-sm text-on-surface-variant">
        Gambar carousel ditampilkan di area hero beranda (menggantikan gambar hero tunggal jika ada
        minimal satu slide). Maks. {MAX_SLIDES} gambar.
      </p>

      {error ? <p className="mb-4 text-sm text-error">{error}</p> : null}

      {slides.length > 0 ? (
        <ul className="mb-8 grid gap-4 sm:grid-cols-2">
          {slides.map((slide, i) => (
            <li
              key={slide.id}
              className="flex gap-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-3"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-surface-container">
                <img
                  src={slide.image_url}
                  alt={slide.alt_text ?? ""}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-1 top-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-on-primary">
                  {i + 1}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-label-sm text-on-surface">{slide.image_url}</p>
                {slide.alt_text ? (
                  <p className="mt-1 line-clamp-2 text-xs text-on-surface-variant">{slide.alt_text}</p>
                ) : null}
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => void removeSlide(slide.id)}
                  className="mt-2 text-label-sm text-error hover:underline disabled:opacity-50"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-6 rounded-lg border border-dashed border-outline-variant bg-surface-container-lowest px-4 py-6 text-center text-sm text-on-surface-variant">
          Belum ada slide. Tambahkan URL gambar di bawah, atau gunakan gambar hero tunggal di
          bagian Hero Section.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className={UNDERLINE_LABEL}>URL Gambar Baru</label>
          <input
            className={UNDERLINE_INPUT}
            placeholder="https://…"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={pending || slides.length >= MAX_SLIDES}
          />
        </div>
        <div>
          <label className={UNDERLINE_LABEL}>Teks Alt (opsional)</label>
          <input
            className={UNDERLINE_INPUT}
            placeholder="Deskripsi singkat gambar"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            disabled={pending || slides.length >= MAX_SLIDES}
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            disabled={pending || slides.length >= MAX_SLIDES}
            onClick={() => void addSlide()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-label-md text-on-primary transition hover:bg-surface-tint disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
            {pending ? "Menyimpan…" : "Tambah Slide"}
          </button>
        </div>
      </div>
    </section>
  );
}
