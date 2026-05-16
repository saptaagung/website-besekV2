"use client";
/* eslint-disable @next/next/no-img-element -- previews use admin-pasted image URLs from any host */

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SiteContentRow } from "@/lib/database.types";

/* ─── helpers ─────────────────────────────────────────────── */
const UNDERLINE_INPUT =
  "w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-3 text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/50";
const UNDERLINE_TEXTAREA =
  "w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-3 text-body-md text-on-surface transition-colors resize-none placeholder:text-on-surface-variant/50";
const UNDERLINE_LABEL = "block text-label-sm text-on-surface-variant mb-1";
const SECTION_CARD =
  "bg-surface rounded-xl p-6 md:p-12 border border-surface-container-high shadow-[0_4px_24px_rgba(85,107,47,0.03)]";
const SECTION_HEADER = "mb-6 border-b border-surface-container-highest pb-3 flex items-center gap-3";

/* ─── component ───────────────────────────────────────────── */
export function PengaturanBerandaClient({
  initialRows,
}: {
  initialRows: SiteContentRow[];
}) {
  const supabase = createClient();
  const [rows, setRows] = useState<SiteContentRow[]>(initialRows);
  const [pending, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function row(pageName: string, sectionName: string): SiteContentRow | undefined {
    return rows.find((r) => r.page_name === pageName && r.section_name === sectionName);
  }

  function patch(pageName: string, sectionName: string, changes: Partial<SiteContentRow>) {
    setRows((prev) =>
      prev.map((r) =>
        r.page_name === pageName && r.section_name === sectionName ? { ...r, ...changes } : r,
      ),
    );
    setSaved(false);
  }

  async function handleSave() {
    if (!supabase) return;
    setSaving(true);
    setError(null);
    for (const r of rows) {
      const { error: e } = await supabase
        .from("site_content")
        .update({
          headline_text: r.headline_text,
          description_text: r.description_text,
          image_url: r.image_url,
        })
        .eq("id", r.id);
      if (e) { setError(e.message); setSaving(false); return; }
    }
    setSaving(false);
    setSaved(true);
  }

  /* convenience getters */
  const hero = row("Home", "Hero");
  const why1 = row("Home", "WhyUs_1");
  const why2 = row("Home", "WhyUs_2");
  const why3 = row("Home", "WhyUs_3");
  const story = row("About", "CreationStory");
  const contact = row("Contact", "Intro");

  const whyItems = [
    { key: "WhyUs_1", r: why1, icon: "eco", label: "Nilai 1" },
    { key: "WhyUs_2", r: why2, icon: "hardware", label: "Nilai 2" },
    { key: "WhyUs_3", r: why3, icon: "group", label: "Nilai 3" },
  ];

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); void handleSave(); }}
      className="space-y-20"
    >
      {/* ── 1. Hero Section ───────────────────────────────── */}
      <section className={SECTION_CARD}>
        <div className={SECTION_HEADER}>
          <span className="material-symbols-outlined text-primary">view_carousel</span>
          <h3 className="font-serif text-headline-md text-on-background">Hero Section</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className={UNDERLINE_LABEL}>Headline Utama</label>
              <input
                className={UNDERLINE_INPUT}
                placeholder="Masukkan headline..."
                value={hero?.headline_text ?? ""}
                onChange={(e) => patch("Home", "Hero", { headline_text: e.target.value })}
              />
            </div>
            <div>
              <label className={UNDERLINE_LABEL}>Sub-headline</label>
              <textarea
                className={UNDERLINE_TEXTAREA}
                rows={3}
                placeholder="Tuliskan deskripsi singkat..."
                value={hero?.description_text ?? ""}
                onChange={(e) => patch("Home", "Hero", { description_text: e.target.value })}
              />
            </div>
          </div>
          {/* Hero Image */}
          <div className="space-y-1">
            <label className={UNDERLINE_LABEL}>Gambar Latar Hero</label>
            <div className="h-64 border-2 border-dashed border-outline-variant rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors group relative overflow-hidden">
              {hero?.image_url ? (
                <img
                  src={hero.image_url}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity"
                />
              ) : null}
              <div className="relative z-10 flex flex-col items-center text-on-surface-variant group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-4xl mb-3">cloud_upload</span>
                <span className="text-label-md">Klik untuk mengganti gambar</span>
                <span className="text-label-sm mt-1 opacity-70">PNG, JPG (Max. 5MB)</span>
              </div>
            </div>
            <div className="pt-2">
              <label className={UNDERLINE_LABEL}>URL Gambar</label>
              <input
                className={UNDERLINE_INPUT}
                placeholder="https://…"
                value={hero?.image_url ?? ""}
                onChange={(e) => patch("Home", "Hero", { image_url: e.target.value || null })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Nilai Jual Utama ───────────────────────────── */}
      <section className={SECTION_CARD}>
        <div className={SECTION_HEADER}>
          <span className="material-symbols-outlined text-primary">diamond</span>
          <h3 className="font-serif text-headline-md text-on-background">Nilai Jual Utama</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyItems.map(({ key, r, icon, label }) => (
            <div
              key={key}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 space-y-3 hover:border-outline transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                <button type="button" className="text-outline hover:text-primary">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
              <div>
                <label className={UNDERLINE_LABEL}>Judul {label}</label>
                <input
                  className="w-full bg-transparent border-b border-surface-container-high focus:border-primary focus:outline-none py-1 text-label-md text-on-surface"
                  value={r?.headline_text ?? ""}
                  onChange={(e) => patch("Home", key, { headline_text: e.target.value })}
                />
              </div>
              <div>
                <label className={UNDERLINE_LABEL}>Deskripsi Singkat</label>
                <textarea
                  className="w-full bg-transparent border-b border-surface-container-high focus:border-primary focus:outline-none py-1 text-body-md text-on-surface resize-none text-sm"
                  rows={2}
                  value={r?.description_text ?? ""}
                  onChange={(e) => patch("Home", key, { description_text: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Koleksi Unggulan (static UI, products managed elsewhere) */}
      <section className={SECTION_CARD}>
        <div className={`${SECTION_HEADER} justify-between`}>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">featured_play_list</span>
            <h3 className="font-serif text-headline-md text-on-background">Koleksi Unggulan</h3>
          </div>
          <button type="button" className="text-primary text-label-sm hover:underline">
            Pilih Produk
          </button>
        </div>
        <p className="text-body-md text-on-surface-variant mb-6 text-sm">
          Pilih hingga 4 produk untuk ditampilkan di halaman utama.
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-6 p-3 rounded-lg border border-surface-container-high text-on-surface-variant text-label-sm">
            <span className="material-symbols-outlined">info</span>
            Kelola produk signature di halaman{" "}
            <Link href="/admin/products" className="text-primary underline underline-offset-2">
              Manajemen Produk
            </Link>{" "}
            (tandai &ldquo;Tampil di koleksi signature&rdquo;).
          </div>
        </div>
      </section>

      {/* ── 4. Pengaturan Cerita Kami ─────────────────────── */}
      <section className={SECTION_CARD}>
        <div className={SECTION_HEADER}>
          <span className="material-symbols-outlined text-primary">auto_stories</span>
          <h3 className="font-serif text-headline-md text-on-background">Pengaturan Cerita Kami</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className={UNDERLINE_LABEL}>Headline Cerita</label>
              <input
                className={UNDERLINE_INPUT}
                value={story?.headline_text ?? ""}
                onChange={(e) => patch("About", "CreationStory", { headline_text: e.target.value })}
              />
            </div>
            <div>
              <label className={UNDERLINE_LABEL}>Konten Utama</label>
              <textarea
                className={UNDERLINE_TEXTAREA}
                rows={4}
                value={story?.description_text ?? ""}
                onChange={(e) => patch("About", "CreationStory", { description_text: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className={UNDERLINE_LABEL}>Gambar Cerita Kami</label>
            <div className="h-64 border-2 border-dashed border-outline-variant rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors group relative overflow-hidden">
              {story?.image_url ? (
                <img
                  src={story.image_url}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity"
                />
              ) : null}
              <div className="relative z-10 flex flex-col items-center text-on-surface-variant group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-4xl mb-3">cloud_upload</span>
                <span className="text-label-md">Klik untuk mengunggah gambar</span>
                <span className="text-label-sm mt-1 opacity-70">PNG, JPG (Max. 5MB)</span>
              </div>
            </div>
            <div className="pt-2">
              <label className={UNDERLINE_LABEL}>URL Gambar</label>
              <input
                className={UNDERLINE_INPUT}
                placeholder="https://…"
                value={story?.image_url ?? ""}
                onChange={(e) => patch("About", "CreationStory", { image_url: e.target.value || null })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Pengaturan Kontak ──────────────────────────── */}
      <section className={SECTION_CARD}>
        <div className={SECTION_HEADER}>
          <span className="material-symbols-outlined text-primary">contacts</span>
          <h3 className="font-serif text-headline-md text-on-background">Pengaturan Kontak</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className={UNDERLINE_LABEL}>Email</label>
              <input
                className={UNDERLINE_INPUT}
                type="email"
                value={contact?.headline_text ?? ""}
                onChange={(e) => patch("Contact", "Intro", { headline_text: e.target.value })}
              />
            </div>
            <div>
              <label className={UNDERLINE_LABEL}>Telepon</label>
              <input
                className={UNDERLINE_INPUT}
                value={contact?.description_text ?? ""}
                onChange={(e) => patch("Contact", "Intro", { description_text: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className={UNDERLINE_LABEL}>Alamat Lengkap</label>
              <textarea
                className={UNDERLINE_TEXTAREA}
                rows={4}
                value={contact?.image_url ?? ""}
                onChange={(e) => patch("Contact", "Intro", { image_url: e.target.value || null })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Actions ───────────────────────────────────────── */}
      <div className="flex justify-end gap-6 pt-12 border-t border-outline-variant">
        {error ? <p className="mr-auto text-sm text-error">{error}</p> : null}
        {saved ? <p className="mr-auto text-sm text-primary">Tersimpan ✓</p> : null}
        <button
          type="button"
          className="text-label-md text-secondary border border-secondary px-12 py-3 rounded-full hover:bg-secondary/5 transition-colors"
          onClick={() => setRows(initialRows)}
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={pending}
          className="text-label-md bg-primary text-on-primary px-12 py-3 rounded-full shadow-sm hover:bg-surface-tint transition-colors flex items-center gap-1 disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-sm">save</span>
          {pending ? "Menyimpan…" : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
