"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SiteContentRow } from "@/lib/database.types";

export function SiteContentAdmin({ initialRows }: { initialRows: SiteContentRow[] }) {
  const supabase = createClient();
  const [rows, setRows] = useState(initialRows);
  const [error, setError] = useState<string | null>(null);

  async function save(row: SiteContentRow) {
    if (!supabase) {
      setError("Supabase tidak tersedia.");
      return;
    }
    setError(null);
    const { error: upErr } = await supabase
      .from("site_content")
      .update({
        headline_text: row.headline_text,
        description_text: row.description_text,
        image_url: row.image_url,
        image_fit: row.image_fit ?? "cover",
        image_position: row.image_position?.trim() || null,
        image_sizes: row.image_sizes?.trim() || null,
      })
      .eq("id", row.id);
    if (upErr) {
      setError(upErr.message);
      return;
    }
    const { data } = await supabase.from("site_content").select("*").order("page_name").order("section_name");
    setRows((data as SiteContentRow[]) ?? rows);
  }

  async function addRow(form: { page_name: string; section_name: string }) {
    if (!supabase) return;
    setError(null);
    const { error: insErr } = await supabase.from("site_content").insert({
      page_name: form.page_name.trim(),
      section_name: form.section_name.trim(),
      headline_text: "",
      description_text: "",
      image_url: null,
    });
    if (insErr) {
      setError(insErr.message);
      return;
    }
    const { data } = await supabase.from("site_content").select("*").order("page_name").order("section_name");
    setRows((data as SiteContentRow[]) ?? []);
  }

  return (
    <div className="space-y-6">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="space-y-6">
        {rows.map((row) => (
          <SiteContentRowEditor key={row.id} row={row} onSave={save} />
        ))}
      </div>
      <NewSectionForm onCreate={addRow} />
    </div>
  );
}

function SiteContentRowEditor({
  row,
  onSave,
}: {
  row: SiteContentRow;
  onSave: (r: SiteContentRow) => void | Promise<void>;
}) {
  const [draft, setDraft] = useState(row);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setDraft(row);
  }, [row]);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {row.page_name} · {row.section_name}
      </p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          <span className="font-medium">Judul</span>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.headline_text ?? ""}
            onChange={(e) => setDraft({ ...draft, headline_text: e.target.value })}
          />
        </label>
        <label className="text-sm md:col-span-2">
          <span className="font-medium">URL gambar (opsional)</span>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.image_url ?? ""}
            onChange={(e) => setDraft({ ...draft, image_url: e.target.value || null })}
          />
        </label>
        <label className="text-sm">
          <span className="font-medium">Gambar: isi frame</span>
          <select
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.image_fit === "contain" ? "contain" : "cover"}
            onChange={(e) => setDraft({ ...draft, image_fit: e.target.value })}
          >
            <option value="cover">Cover (penuh, bisa terpotong)</option>
            <option value="contain">Contain (utuh, bisa ada ruang)</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="font-medium">Posisi crop (CSS)</span>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.image_position ?? ""}
            onChange={(e) => setDraft({ ...draft, image_position: e.target.value || null })}
            placeholder="center center"
          />
        </label>
        <label className="text-sm md:col-span-2">
          <span className="font-medium">Ukuran responsif (sizes, Next.js)</span>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.image_sizes ?? ""}
            onChange={(e) => setDraft({ ...draft, image_sizes: e.target.value || null })}
            placeholder="100vw atau (max-width:768px) 100vw, 50vw"
          />
          <span className="mt-1 block text-xs text-neutral-500">
            Mengatur resolusi gambar yang dimuat; kosongkan untuk pakai default halaman.
          </span>
        </label>
        <label className="text-sm md:col-span-2">
          <span className="font-medium">Deskripsi / isi</span>
          <textarea
            className="mt-1 min-h-[100px] w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={draft.description_text ?? ""}
            onChange={(e) => setDraft({ ...draft, description_text: e.target.value })}
          />
        </label>
      </div>
      <button
        type="button"
        disabled={pending}
        onClick={async () => {
          setPending(true);
          await onSave(draft);
          setPending(false);
        }}
        className="mt-4 rounded-md bg-olive px-4 py-2 text-sm font-semibold text-white hover:bg-olive-dark disabled:opacity-60"
      >
        Simpan bagian
      </button>
    </div>
  );
}

function NewSectionForm({
  onCreate,
}: {
  onCreate: (f: { page_name: string; section_name: string }) => void | Promise<void>;
}) {
  const [page_name, setPageName] = useState("Home");
  const [section_name, setSectionName] = useState("");
  return (
    <div className="rounded-xl border border-dashed border-neutral-300 bg-white/60 p-5">
      <h2 className="font-serif text-lg text-olive">Tambah bagian baru</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          <span className="font-medium">Nama halaman</span>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={page_name}
            onChange={(e) => setPageName(e.target.value)}
            placeholder="Home, About, Contact"
          />
        </label>
        <label className="text-sm">
          <span className="font-medium">Nama bagian</span>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
            value={section_name}
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="Hero, Mission, …"
          />
        </label>
      </div>
      <button
        type="button"
        onClick={() => void onCreate({ page_name, section_name })}
        className="mt-3 rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
      >
        Buat bagian
      </button>
    </div>
  );
}
