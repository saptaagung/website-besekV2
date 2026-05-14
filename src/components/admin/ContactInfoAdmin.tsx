"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ContactInfoRow } from "@/lib/database.types";

const emptyRow: ContactInfoRow = {
  id: "",
  address: "",
  phone_whatsapp: "",
  email: "",
  operational_hours: "",
  map_location_data: {},
};

export function ContactInfoAdmin({ initial }: { initial: ContactInfoRow | null }) {
  const supabase = createClient();
  const [row, setRow] = useState<ContactInfoRow>(initial ?? emptyRow);
  const [mapJson, setMapJson] = useState(
    JSON.stringify(initial?.map_location_data ?? {}, null, 2),
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setRow(initial ?? emptyRow);
    setMapJson(JSON.stringify(initial?.map_location_data ?? {}, null, 2));
  }, [initial]);

  async function save() {
    if (!supabase) return;
    setPending(true);
    setError(null);
    let mapData: Record<string, unknown> = {};
    try {
      mapData = JSON.parse(mapJson || "{}") as Record<string, unknown>;
    } catch {
      setError("JSON peta tidak valid.");
      setPending(false);
      return;
    }
    const payload = {
      address: row.address,
      phone_whatsapp: row.phone_whatsapp,
      email: row.email,
      operational_hours: row.operational_hours,
      map_location_data: mapData,
    };
    if (row.id) {
      const { error: upErr } = await supabase.from("contact_info").update(payload).eq("id", row.id);
      if (upErr) setError(upErr.message);
    } else {
      const { data, error: insErr } = await supabase.from("contact_info").insert(payload).select("*").single();
      if (insErr) setError(insErr.message);
      else if (data) setRow(data as ContactInfoRow);
    }
    setPending(false);
  }

  return (
    <div className="max-w-2xl space-y-4 rounded-xl border border-neutral-200 bg-white p-6">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <label className="block text-sm">
        <span className="font-medium">Alamat</span>
        <textarea
          className="mt-1 min-h-[80px] w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
          value={row.address ?? ""}
          onChange={(e) => setRow({ ...row, address: e.target.value })}
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Telepon / WhatsApp</span>
        <input
          className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
          value={row.phone_whatsapp ?? ""}
          onChange={(e) => setRow({ ...row, phone_whatsapp: e.target.value })}
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Email</span>
        <input
          className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
          value={row.email ?? ""}
          onChange={(e) => setRow({ ...row, email: e.target.value })}
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Jam operasional</span>
        <textarea
          className="mt-1 min-h-[80px] w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
          value={row.operational_hours ?? ""}
          onChange={(e) => setRow({ ...row, operational_hours: e.target.value })}
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Data peta (JSON)</span>
        <textarea
          className="mt-1 min-h-[120px] w-full rounded-md border border-neutral-200 px-3 py-2 font-mono text-xs"
          value={mapJson}
          onChange={(e) => setMapJson(e.target.value)}
        />
      </label>
      <button
        type="button"
        disabled={pending}
        onClick={() => void save()}
        className="rounded-md bg-olive px-4 py-2 text-sm font-semibold text-white hover:bg-olive-dark disabled:opacity-60"
      >
        Simpan
      </button>
    </div>
  );
}
