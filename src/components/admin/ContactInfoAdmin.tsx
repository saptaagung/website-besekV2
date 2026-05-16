"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ContactInfoRow } from "@/lib/database.types";
import {
  adminBtnPrimarySm,
  adminCardPadded,
  adminErrorBanner,
  adminInput,
  adminLabel,
  adminTextarea,
} from "@/components/admin/admin-ui";

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
  const [mapJson, setMapJson] = useState(JSON.stringify(initial?.map_location_data ?? {}, null, 2));
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
    <div className={`${adminCardPadded} max-w-2xl space-y-4`}>
      <h2 className="border-b border-surface-variant pb-3 font-serif text-lg text-primary">Informasi workshop</h2>
      {error ? <p className={adminErrorBanner}>{error}</p> : null}
      <label className={adminLabel}>
        Alamat
        <textarea className={adminTextarea} value={row.address ?? ""} onChange={(e) => setRow({ ...row, address: e.target.value })} />
      </label>
      <label className={adminLabel}>
        Telepon / WhatsApp
        <input
          className={adminInput}
          value={row.phone_whatsapp ?? ""}
          onChange={(e) => setRow({ ...row, phone_whatsapp: e.target.value })}
        />
      </label>
      <label className={adminLabel}>
        Email
        <input className={adminInput} value={row.email ?? ""} onChange={(e) => setRow({ ...row, email: e.target.value })} />
      </label>
      <label className={adminLabel}>
        Jam operasional
        <textarea
          className={adminTextarea}
          value={row.operational_hours ?? ""}
          onChange={(e) => setRow({ ...row, operational_hours: e.target.value })}
        />
      </label>
      <label className={adminLabel}>
        Data peta (JSON)
        <textarea
          className={`${adminInput} min-h-[120px] font-mono text-xs`}
          value={mapJson}
          onChange={(e) => setMapJson(e.target.value)}
        />
      </label>
      <button type="button" disabled={pending} onClick={() => void save()} className={adminBtnPrimarySm}>
        Simpan
      </button>
    </div>
  );
}
