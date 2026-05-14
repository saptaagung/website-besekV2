"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GalleryRow } from "@/lib/database.types";

export function GalleryAdmin({ initialRows }: { initialRows: GalleryRow[] }) {
  const supabase = createClient();
  const [rows, setRows] = useState(initialRows);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ image_url: "", alt_text: "", section_name: "AboutMosaic_Left" });

  async function refresh() {
    if (!supabase) return;
    const { data } = await supabase.from("gallery").select("*").order("section_name");
    setRows((data as GalleryRow[]) ?? []);
  }

  async function add() {
    if (!supabase) return;
    setError(null);
    const { error: insErr } = await supabase.from("gallery").insert({
      image_url: form.image_url.trim(),
      alt_text: form.alt_text.trim() || null,
      section_name: form.section_name.trim(),
    });
    if (insErr) {
      setError(insErr.message);
      return;
    }
    setForm({ image_url: "", alt_text: "", section_name: form.section_name });
    await refresh();
  }

  async function remove(id: string) {
    if (!supabase) return;
    if (!confirm("Hapus gambar ini?")) return;
    await supabase.from("gallery").delete().eq("id", id);
    await refresh();
  }

  return (
    <div className="space-y-6">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="font-serif text-lg text-olive">Tambah gambar</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <label className="text-sm md:col-span-3">
            <span className="font-medium">URL gambar</span>
            <input
              className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            />
          </label>
          <label className="text-sm">
            <span className="font-medium">Bagian</span>
            <input
              className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
              value={form.section_name}
              onChange={(e) => setForm({ ...form, section_name: e.target.value })}
            />
          </label>
          <label className="text-sm md:col-span-2">
            <span className="font-medium">Teks alt</span>
            <input
              className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
              value={form.alt_text}
              onChange={(e) => setForm({ ...form, alt_text: e.target.value })}
            />
          </label>
        </div>
        <button
          type="button"
          onClick={() => void add()}
          className="mt-3 rounded-md bg-olive px-4 py-2 text-sm font-semibold text-white hover:bg-olive-dark"
        >
          Tambahkan
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3">Bagian</th>
              <th className="px-4 py-3">Alt</th>
              <th className="px-4 py-3">URL</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-neutral-100 last:border-0">
                <td className="px-4 py-3 font-medium">{r.section_name}</td>
                <td className="px-4 py-3 text-neutral-600">{r.alt_text}</td>
                <td className="max-w-xs truncate px-4 py-3 text-neutral-500">{r.image_url}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="text-red-600 hover:underline"
                    onClick={() => void remove(r.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
