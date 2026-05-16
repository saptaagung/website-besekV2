"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GalleryRow } from "@/lib/database.types";
import {
  adminBtnDanger,
  adminBtnPrimarySm,
  adminCard,
  adminCardPadded,
  adminErrorBanner,
  adminInput,
  adminLabel,
  adminLabelMuted,
  adminSelect,
} from "@/components/admin/admin-ui";

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
      {error ? <p className={adminErrorBanner}>{error}</p> : null}
      <div className={adminCardPadded}>
        <h2 className="border-b border-surface-variant pb-3 font-serif text-lg text-primary">Tambah gambar</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className={`${adminLabel} md:col-span-3`}>
            URL gambar
            <input className={adminInput} value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          </label>
          <label className={adminLabel}>
            Bagian
            <input className={adminInput} value={form.section_name} onChange={(e) => setForm({ ...form, section_name: e.target.value })} />
          </label>
          <label className={`${adminLabel} md:col-span-2`}>
            Teks alt
            <input className={adminInput} value={form.alt_text} onChange={(e) => setForm({ ...form, alt_text: e.target.value })} />
          </label>
          <label className={adminLabel}>
            Isi frame
            <select
              className={adminSelect}
              value={form.image_fit}
              onChange={(e) => setForm({ ...form, image_fit: e.target.value as "cover" | "contain" })}
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
            </select>
          </label>
          <label className={adminLabel}>
            Posisi crop (CSS)
            <input
              className={adminInput}
              value={form.image_position}
              onChange={(e) => setForm({ ...form, image_position: e.target.value })}
              placeholder="center center"
            />
          </label>
          <label className={`${adminLabel} md:col-span-3`}>
            Ukuran responsif (sizes)
            <input
              className={adminInput}
              value={form.image_sizes}
              onChange={(e) => setForm({ ...form, image_sizes: e.target.value })}
              placeholder="(max-width:768px) 100vw, 50vw"
            />
          </label>
        </div>
        <button type="button" onClick={() => void add()} className={`${adminBtnPrimarySm} mt-4`}>
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
    <div className={`${adminCard} p-4 md:p-5`}>
      <p className={adminLabelMuted}>Galeri · {row.section_name}</p>
      {localErr ? <p className={`${adminErrorBanner} mt-2`}>{localErr}</p> : null}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className={`${adminLabel} md:col-span-2`}>
          URL gambar
          <input className={adminInput} value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} />
        </label>
        <label className={adminLabel}>
          Bagian
          <input className={adminInput} value={draft.section_name} onChange={(e) => setDraft({ ...draft, section_name: e.target.value })} />
        </label>
        <label className={adminLabel}>
          Alt
          <input
            className={adminInput}
            value={draft.alt_text ?? ""}
            onChange={(e) => setDraft({ ...draft, alt_text: e.target.value || null })}
          />
        </label>
        <label className={adminLabel}>
          Isi frame
          <select
            className={adminSelect}
            value={draft.image_fit === "contain" ? "contain" : "cover"}
            onChange={(e) => setDraft({ ...draft, image_fit: e.target.value as "cover" | "contain" })}
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
          </select>
        </label>
        <label className={adminLabel}>
          Posisi crop
          <input
            className={adminInput}
            value={draft.image_position ?? ""}
            onChange={(e) => setDraft({ ...draft, image_position: e.target.value || null })}
            placeholder="center center"
          />
        </label>
        <label className={`${adminLabel} md:col-span-2`}>
          Sizes
          <input
            className={adminInput}
            value={draft.image_sizes ?? ""}
            onChange={(e) => setDraft({ ...draft, image_sizes: e.target.value || null })}
            placeholder="(max-width:768px) 100vw, 50vw"
          />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" disabled={pending} onClick={() => void save()} className={adminBtnPrimarySm}>
          Simpan
        </button>
        <button type="button" className={adminBtnDanger} onClick={onRemove}>
          Hapus
        </button>
      </div>
    </div>
  );
}
