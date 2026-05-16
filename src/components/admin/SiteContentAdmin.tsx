"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SiteContentRow } from "@/lib/database.types";
import {
  adminBtnPrimary,
  adminBtnSecondary,
  adminErrorBanner,
  adminHint,
  adminCard,
  adminFieldUnderline,
  adminInput,
  adminInputMono,
  adminLabel,
  adminLabelMuted,
  adminSelect,
  adminTextareaUnderline,
} from "@/components/admin/admin-ui";

/** DB keys — keep as-is for Supabase; UI shows Indonesian labels. */
const PAGE_LABEL: Record<string, string> = {
  Home: "Beranda",
  About: "Tentang kami",
  Contact: "Kontak",
};

const SECTION_META: Record<string, { title: string; hint?: string }> = {
  "Home|Hero": {
    title: "Banner utama (atas halaman)",
    hint: "Judul besar, teks pengantar, dan gambar latar paling atas beranda.",
  },
  "Home|WhyUs_1": { title: "Keunggulan 1", hint: "Kolom pertama di blok “mengapa memilih kami”." },
  "Home|WhyUs_2": { title: "Keunggulan 2", hint: "Kolom kedua di blok keunggulan." },
  "Home|WhyUs_3": { title: "Keunggulan 3", hint: "Kolom ketiga di blok keunggulan." },
  "Home|SignatureIntro": {
    title: "Pengantar koleksi signature",
    hint: "Judul dan teks di atas grid produk pilihan di beranda.",
  },
  "About|Mission": {
    title: "Misi & gambar samping",
    hint: "Teks misi di halaman tentang; gambar dipakai jika diisi URL.",
  },
  "About|CreationStory": { title: "Cerita pembuatan", hint: "Paragraf cerita di bawah misi." },
  "Contact|Intro": { title: "Pengantar halaman kontak", hint: "Judul dan teks pembuka sebelum formulir." },
};

const PAGE_ORDER = ["Home", "About", "Contact"] as const;

const SECTION_ORDER: Record<string, number> = {
  Hero: 0,
  WhyUs_1: 1,
  WhyUs_2: 2,
  WhyUs_3: 3,
  SignatureIntro: 4,
  Mission: 0,
  CreationStory: 1,
  Intro: 0,
};

function sectionKey(row: SiteContentRow) {
  return `${row.page_name}|${row.section_name}`;
}

function getSectionTitle(row: SiteContentRow) {
  return SECTION_META[sectionKey(row)]?.title ?? row.section_name.replace(/_/g, " ");
}

function getSectionHint(row: SiteContentRow) {
  return SECTION_META[sectionKey(row)]?.hint;
}

function sortSiteContentRows(rows: SiteContentRow[]) {
  return [...rows].sort((a, b) => {
    const pa = PAGE_ORDER.indexOf(a.page_name as (typeof PAGE_ORDER)[number]);
    const pb = PAGE_ORDER.indexOf(b.page_name as (typeof PAGE_ORDER)[number]);
    const ia = pa === -1 ? 99 : pa;
    const ib = pb === -1 ? 99 : pb;
    if (ia !== ib) return ia - ib;
    const sa = SECTION_ORDER[a.section_name] ?? 50;
    const sb = SECTION_ORDER[b.section_name] ?? 50;
    if (sa !== sb) return sa - sb;
    return a.section_name.localeCompare(b.section_name);
  });
}

const FIT_OPTIONS = [
  { value: "cover", label: "Penuh area (disarankan)", hint: "Gambar memenuhi kotak; pinggiran boleh terpotong." },
  { value: "contain", label: "Tampil utuh", hint: "Seluruh gambar terlihat; bisa ada ruang kosong di samping/atas." },
] as const;

const POSITION_PRESETS: { value: string; label: string }[] = [
  { value: "", label: "Tengah (bawaan)" },
  { value: "center top", label: "Condong ke atas" },
  { value: "center bottom", label: "Condong ke bawah" },
  { value: "left center", label: "Condong ke kiri" },
  { value: "right center", label: "Condong ke kanan" },
];

const SIZE_PRESETS: { value: string; label: string }[] = [
  { value: "", label: "Otomatis (disarankan)" },
  { value: "100vw", label: "Selebar layar (cocok untuk banner besar)" },
  { value: "(max-width: 768px) 100vw, 50vw", label: "Setengah layar di desktop" },
  { value: "(max-width: 1024px) 50vw, 25vw", label: "Kartu kecil / grid produk" },
];

function positionPresetFromStored(stored: string | null | undefined): { preset: string; custom: string } {
  const s = (stored ?? "").trim();
  if (!s || s === "center center") return { preset: "", custom: "" };
  const match = POSITION_PRESETS.find((p) => p.value === s);
  if (match) return { preset: s, custom: "" };
  return { preset: "__custom__", custom: s };
}

function sizePresetFromStored(stored: string | null | undefined): { preset: string; custom: string } {
  const s = (stored ?? "").trim();
  if (!s) return { preset: "", custom: "" };
  const match = SIZE_PRESETS.find((p) => p.value === s);
  if (match) return { preset: s, custom: "" };
  return { preset: "__custom__", custom: s };
}

export function SiteContentAdmin({ initialRows }: { initialRows: SiteContentRow[] }) {
  const supabase = createClient();
  const [rows, setRows] = useState(initialRows);
  const [error, setError] = useState<string | null>(null);

  const sorted = useMemo(() => sortSiteContentRows(rows), [rows]);
  const grouped = useMemo(() => {
    const m = new Map<string, SiteContentRow[]>();
    for (const r of sorted) {
      const list = m.get(r.page_name) ?? [];
      list.push(r);
      m.set(r.page_name, list);
    }
    return m;
  }, [sorted]);

  const pageKeys = useMemo(() => {
    const keys = [...new Set(sorted.map((r) => r.page_name))];
    keys.sort((a, b) => {
      const ia = PAGE_ORDER.indexOf(a as (typeof PAGE_ORDER)[number]);
      const ib = PAGE_ORDER.indexOf(b as (typeof PAGE_ORDER)[number]);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    return keys;
  }, [sorted]);

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
    <div className="space-y-10">
      {error ? <p className={adminErrorBanner}>{error}</p> : null}

      {pageKeys.map((pageName) => {
        const list = grouped.get(pageName) ?? [];
        const pageTitle = PAGE_LABEL[pageName] ?? pageName;
        return (
          <section key={pageName} className="space-y-4">
            <div className="border-b border-outline-variant pb-2">
              <h2 className="font-serif text-xl font-semibold text-primary md:text-2xl">{pageTitle}</h2>
              <p className="mt-1 text-xs text-on-surface-variant">
                Ubah teks dan gambar untuk bagian-bagian di halaman ini.
              </p>
            </div>
            <div className="space-y-5">
              {list.map((row) => (
                <SiteContentRowEditor key={row.id} row={row} onSave={save} />
              ))}
            </div>
          </section>
        );
      })}

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
  const [posPreset, setPosPreset] = useState(() => positionPresetFromStored(row.image_position));
  const [sizePreset, setSizePreset] = useState(() => sizePresetFromStored(row.image_sizes));

  useEffect(() => {
    setDraft(row);
    setPosPreset(positionPresetFromStored(row.image_position));
    setSizePreset(sizePresetFromStored(row.image_sizes));
  }, [row]);

  const hasImage = Boolean((draft.image_url ?? "").trim());
  const pageTitle = PAGE_LABEL[row.page_name] ?? row.page_name;
  const cardTitle = getSectionTitle(row);
  const cardHint = getSectionHint(row);

  function applyPositionPreset(next: string) {
    if (next === "__custom__") {
      const cur = (draft.image_position ?? "").trim();
      setPosPreset({ preset: "__custom__", custom: cur });
      return;
    }
    setPosPreset({ preset: next, custom: "" });
    setDraft((d) => ({ ...d, image_position: next.trim() || null }));
  }

  function applyPositionCustom(text: string) {
    setPosPreset({ preset: "__custom__", custom: text });
    setDraft((d) => ({ ...d, image_position: text.trim() || null }));
  }

  function applySizePreset(next: string) {
    if (next === "__custom__") {
      const cur = (draft.image_sizes ?? "").trim();
      setSizePreset({ preset: "__custom__", custom: cur });
      return;
    }
    setSizePreset({ preset: next, custom: "" });
    setDraft((d) => ({ ...d, image_sizes: next.trim() || null }));
  }

  function applySizeCustom(text: string) {
    setSizePreset({ preset: "__custom__", custom: text });
    setDraft((d) => ({ ...d, image_sizes: text.trim() || null }));
  }

  return (
    <article className={adminCard}>
      <header className="mb-4 flex items-start gap-2 border-b border-surface-container-highest pb-3">
        <span className="material-symbols-outlined text-primary">article</span>
        <div>
          <p className={adminLabelMuted}>{pageTitle}</p>
          <h3 className="font-serif text-headline-md text-on-background">{cardTitle}</h3>
          {cardHint ? <p className="mt-1 text-body-md text-on-surface-variant">{cardHint}</p> : null}
        </div>
      </header>

      <div className="space-y-6">
        <label className={adminLabel}>
          Judul
          <input
            className={adminFieldUnderline}
            value={draft.headline_text ?? ""}
            onChange={(e) => setDraft({ ...draft, headline_text: e.target.value })}
          />
        </label>

        <label className={adminLabel}>
          Teks / deskripsi
          <textarea
            className={adminTextareaUnderline}
            rows={3}
            value={draft.description_text ?? ""}
            onChange={(e) => setDraft({ ...draft, description_text: e.target.value })}
          />
        </label>

        <label className={adminLabel}>
          Gambar (tautan URL)
          <span className={adminHint}>
            Tempel alamat gambar dari penyimpanan Anda (misalnya Supabase Storage atau layanan gambar). Kosongkan jika
            tidak perlu gambar.
          </span>
          <input
            className={adminInputMono}
            value={draft.image_url ?? ""}
            onChange={(e) => setDraft({ ...draft, image_url: e.target.value || null })}
            placeholder="https://…"
          />
        </label>

        <details className="group rounded-lg border border-outline-variant bg-surface-container-low/60">
          <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-medium text-on-surface marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-2">
              <span className="text-primary transition group-open:rotate-90" aria-hidden>
                ▸
              </span>
              Pengaturan tampilan gambar
              {!hasImage ? (
                <span className="rounded-full bg-surface-variant px-2 py-0.5 text-[10px] font-normal text-on-surface-variant">
                  isi URL gambar dulu
                </span>
              ) : null}
            </span>
          </summary>
          <div className="space-y-4 border-t border-outline-variant bg-surface-container-lowest px-3 py-4 md:px-4">
            <p className="text-xs text-on-surface-variant">
              Opsional. Biasanya cukup biarkan bawaan kecuali gambar terpotong aneh atau tampak buram di layar besar.
            </p>

            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-on-surface">Cara gambar mengisi kotak</legend>
              <div className="space-y-2">
                {FIT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer gap-3 rounded-lg border p-3 text-sm transition ${
                      (draft.image_fit === "contain" ? "contain" : "cover") === opt.value
                        ? "border-primary-container bg-primary-fixed/40 ring-1 ring-primary-container/40"
                        : "border-outline-variant hover:border-primary-container/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`fit-${row.id}`}
                      checked={(draft.image_fit === "contain" ? "contain" : "cover") === opt.value}
                      onChange={() => setDraft({ ...draft, image_fit: opt.value })}
                      className="mt-0.5 border-outline-variant text-primary-container focus:ring-primary-container"
                    />
                    <span>
                      <span className="font-medium text-on-surface">{opt.label}</span>
                      <span className="mt-0.5 block text-xs text-on-surface-variant">{opt.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-on-surface">Fokus gambar</span>
              <p className="text-xs text-on-surface-variant">Mengatur bagian gambar yang diutamakan saat ada pemotongan.</p>
              <select
                className={adminSelect}
                value={posPreset.preset === "__custom__" ? "__custom__" : posPreset.preset}
                onChange={(e) => applyPositionPreset(e.target.value)}
              >
                {POSITION_PRESETS.map((p) => (
                  <option key={p.label} value={p.value}>
                    {p.label}
                  </option>
                ))}
                <option value="__custom__">Lainnya…</option>
              </select>
              {posPreset.preset === "__custom__" ? (
                <input
                  className={`${adminInput} font-mono text-xs`}
                  value={posPreset.custom}
                  onChange={(e) => applyPositionCustom(e.target.value)}
                  placeholder="contoh: 30% 60%"
                />
              ) : null}
            </div>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-on-surface">Ketajaman di berbagai layar</span>
              <p className="text-xs text-on-surface-variant">
                Membantu memilih ukuran file gambar. &quot;Otomatis&quot; sudah cocok untuk kebanyakan bagian.
              </p>
              <select
                className={adminSelect}
                value={sizePreset.preset === "__custom__" ? "__custom__" : sizePreset.preset}
                onChange={(e) => applySizePreset(e.target.value)}
              >
                {SIZE_PRESETS.map((p) => (
                  <option key={p.label} value={p.value === "" ? "" : p.value}>
                    {p.label}
                  </option>
                ))}
                <option value="__custom__">Lainnya…</option>
              </select>
              {sizePreset.preset === "__custom__" ? (
                <input
                  className={`${adminInput} font-mono text-xs`}
                  value={sizePreset.custom}
                  onChange={(e) => applySizeCustom(e.target.value)}
                  placeholder="hanya jika Anda mengerti sintaks ukuran responsif"
                />
              ) : null}
            </div>
          </div>
        </details>

        <details className="rounded-lg border border-dashed border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs text-on-surface-variant">
          <summary className="cursor-pointer font-medium text-on-surface">Untuk pengembang (ID bagian)</summary>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-on-surface">
            Halaman: <code className="rounded bg-surface-container px-1">{row.page_name}</code> · Bagian:{" "}
            <code className="rounded bg-surface-container px-1">{row.section_name}</code>
          </p>
        </details>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            disabled={pending}
            onClick={async () => {
              setPending(true);
              await onSave(draft);
              setPending(false);
            }}
            className={adminBtnPrimary}
          >
            {pending ? "Menyimpan…" : "Simpan perubahan"}
          </button>
        </div>
      </div>
    </article>
  );
}

const NEW_PAGE_OPTIONS = [
  { value: "Home", label: "Beranda" },
  { value: "About", label: "Tentang kami" },
  { value: "Contact", label: "Kontak" },
] as const;

const NEW_SECTION_SUGGESTIONS = [
  { page: "Home", value: "Hero", label: "Banner utama (Hero)" },
  { page: "Home", value: "WhyUs_1", label: "Keunggulan 1" },
  { page: "Home", value: "WhyUs_2", label: "Keunggulan 2" },
  { page: "Home", value: "WhyUs_3", label: "Keunggulan 3" },
  { page: "Home", value: "SignatureIntro", label: "Pengantar koleksi signature" },
  { page: "About", value: "Mission", label: "Misi" },
  { page: "About", value: "CreationStory", label: "Cerita pembuatan" },
  { page: "Contact", value: "Intro", label: "Pengantar kontak" },
] as const;

function NewSectionForm({
  onCreate,
}: {
  onCreate: (f: { page_name: string; section_name: string }) => void | Promise<void>;
}) {
  const [page_name, setPageName] = useState<string>("Home");
  const [sectionChoice, setSectionChoice] = useState<string>("Hero");
  const [section_custom, setSectionCustom] = useState("");

  const suggestions = NEW_SECTION_SUGGESTIONS.filter((s) => s.page === page_name);

  function resolvedSectionName(): string {
    if (sectionChoice !== "__custom__") return sectionChoice;
    return section_custom.trim();
  }

  return (
    <div className="rounded-xl border border-dashed border-outline-variant bg-gradient-to-b from-surface-container-lowest to-surface-container-low/90 p-5 md:p-6">
      <h2 className="font-serif text-lg font-semibold text-primary md:text-xl">Tambah bagian baru</h2>
      <p className="mt-2 text-sm text-on-surface-variant">
        Hanya perlu jika Anda menambah blok konten baru. Pilih halaman dan jenis bagian; hindari duplikat nama bagian
        yang sama di satu halaman.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className={`${adminLabel} md:col-span-1`}>
          Halaman
          <select
            className={adminSelect}
            value={page_name}
            onChange={(e) => {
              const p = e.target.value;
              setPageName(p);
              const first = NEW_SECTION_SUGGESTIONS.find((s) => s.page === p);
              setSectionChoice(first?.value ?? "__custom__");
            }}
          >
            {NEW_PAGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={`${adminLabel} md:col-span-1`}>
          Jenis bagian
          <select className={adminSelect} value={sectionChoice} onChange={(e) => setSectionChoice(e.target.value)}>
            {suggestions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
            <option value="__custom__">Lainnya (nama teknis)</option>
          </select>
        </label>
        {sectionChoice === "__custom__" ? (
          <label className={`${adminLabel} md:col-span-2`}>
            Nama bagian (teknis)
            <input
              className={`${adminInput} font-mono text-sm`}
              value={section_custom}
              onChange={(e) => setSectionCustom(e.target.value)}
              placeholder="mis. PromoBanner"
            />
            <span className={adminHint}>
              Huruf besar/kecil harus sama persis jika kode situs sudah memakai nama ini.
            </span>
          </label>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => {
          const sn = resolvedSectionName();
          if (!sn) return;
          void onCreate({ page_name, section_name: sn });
          setSectionCustom("");
        }}
        className={`${adminBtnSecondary} mt-4`}
      >
        Buat bagian
      </button>
    </div>
  );
}
