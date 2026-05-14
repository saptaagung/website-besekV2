"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GalleryRow } from "@/lib/database.types";

export function GalleryAdmin({ initialRows }: { initialRows: GalleryRow[] }) {
  const supabase = createClient();
  const [rows, setRows] = useState(initialRows);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    image_url: "",
    alt_text: "",
    section_name: "AboutMosaic_Left",
    image_fit: "cover" as "cover" | "contain",
    image_position: "",
    image_sizes: "",
  });

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
      image_fit: form.image_fit,
      image_position: form.image_position.trim() || null,
      image_sizes: form.image_sizes.trim() || null,
    });
    if (insErr) {
      setError(insErr.message);
      return;
    }
    setForm({
      image_url: "",
      alt_text: "",
      section_name: form.section_name,
      image_fit: "cover",
      image_position: "",
      image_sizes: "",
    });
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
          <label className="text-sm">
            <span className="font-medium">Isi frame</span>
            <select
              className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
              value={form.image_fit}
              onChange={(e) =>
                setForm({ ...form, image_fit: e.target.value as "cover" | "contain" })
              }
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="font-medium">Posisi crop (CSS)</span>
            <input
              className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
              value={form.image_position}
              onChange={(e) => setForm({ ...form, image_position: e.target.value })}
              placeholder="center center"
            />
          </label>
          <label className="text-sm md:col-span-3">
            <span className="font-medium">Sizes (Next.js)</span>
            <input
              className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
              value={form.image_sizes}
              onChange={(e) => setForm({ ...form, image_sizes: e.target.value })}
              placeholder="(max-width:768px) 100vw, 50vw"
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

      <div className="space-y-4">
        {rows.map((r) => (
          <GalleryRowCard key={r.id} row={r} onRemove={() => void remove(r.id)} onSaved={refresh} />
        ))}
      </div>
    </div>
  );
}

function GalleryRowCard({
  row,
  onRemove,
  onSaved,
}: {
  row: GalleryRow;
  onRemove: () => void;
  onSaved: () => void | Promise<void>;
}) {
  const supabase = createClient();
  const [draft, setDraft] = useState(row);
  const [pending, setPending] = useState(false);
  const [localErr, setLocalErr] = useState<string | null>(null);

  useEffect(() => {
    setDraft(row);
  }, [row]);

  async function save() {
    if (!supabase) return;
    setPending(true);
    setLocalErr(null);
    const { error: upErr } = await supabase
      .from("gallery")
      .update({
        image_url: draft.image_url.trim(),
        alt_text: draft.alt_text?.trim() || null,
        section_name: draft.section_name.trim(),
        image_fit: draft.image_fit === "contain" ? "contain" : "cover",
        image_position: draft.image_position?.trim() || null,
        image_sizes: draft.image_sizes?.trim() || null,
      })
      .eq("id", row.id);
    setPending(false);
    if (upErr) {
      setLocalErr(upErr.message);
      return;
    }
    await onSaved();
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Galeri · {row.section_name}
      </p>
      {localErr ? <p className="mt-2 text-sm text-red-600">{localErr}</p> : null}
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <label className="text-sm md:col-span-2">
          <span className="font-medium">URL gambar</span>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.image_url}
            onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
          />
        </label>
        <label className="text-sm">
          <span className="font-medium">Bagian</span>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.section_name}
            onChange={(e) => setDraft({ ...draft, section_name: e.target.value })}
          />
        </label>
        <label className="text-sm">
          <span className="font-medium">Alt</span>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.alt_text ?? ""}
            onChange={(e) => setDraft({ ...draft, alt_text: e.target.value || null })}
          />
        </label>
        <label className="text-sm">
          <span className="font-medium">Isi frame</span>
          <select
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.image_fit === "contain" ? "contain" : "cover"}
            onChange={(e) => setDraft({ ...draft, image_fit: e.target.value })}
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="font-medium">Posisi crop</span>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.image_position ?? ""}
            onChange={(e) => setDraft({ ...draft, image_position: e.target.value || null })}
            placeholder="center center"
          />
        </label>
        <label className="text-sm md:col-span-2">
          <span className="font-medium">Sizes</span>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.image_sizes ?? ""}
            onChange={(e) => setDraft({ ...draft, image_sizes: e.target.value || null })}
            placeholder="(max-width:768px) 100vw, 50vw"
          />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => void save()}
          className="rounded-md bg-olive px-4 py-2 text-sm font-semibold text-white hover:bg-olive-dark disabled:opacity-60"
        >
          Simpan
        </button>
        <button
          type="button"
          className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
          onClick={onRemove}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
