"use client";

import { useMemo, useState } from "react";
import type { ContactMessageRow } from "@/lib/database.types";
import { SOFT_SHADOW } from "@/components/admin/admin-mockup-ui";

type MessageRow = Pick<ContactMessageRow, "id" | "full_name" | "email" | "message" | "created_at">;

function formatWhen(createdAt: string) {
  return new Date(createdAt).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function excerptSubject(message: string) {
  const line = message.split("\n")[0]?.trim() || message.trim();
  return line.length > 60 ? `${line.slice(0, 60)}…` : line;
}

export function ManajemenPesanClient({ initialRows }: { initialRows: MessageRow[] }) {
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "replied">("all");
  const [doneIds, setDoneIds] = useState<Set<string>>(() => new Set());

  const rows = useMemo(() => {
    return initialRows.filter((m) => {
      const done = doneIds.has(m.id);
      if (statusFilter === "unread") return !done;
      if (statusFilter === "replied") return done;
      return true;
    });
  }, [initialRows, statusFilter, doneIds]);

  const unreadCount = initialRows.filter((m) => !doneIds.has(m.id)).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-serif text-headline-lg-mobile md:text-headline-xl text-primary">Manajemen Pesan</h1>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="bg-surface-container-lowest border border-outline-variant text-on-surface rounded px-3 py-2 text-label-sm focus:outline-none focus:border-primary"
          >
            <option value="all">Semua Status</option>
            <option value="unread">Belum Dibaca</option>
            <option value="replied">Sudah Dibalas</option>
          </select>
          <select
            defaultValue="form"
            className="bg-surface-container-lowest border border-outline-variant text-on-surface rounded px-3 py-2 text-label-sm focus:outline-none focus:border-primary"
          >
            <option value="all">Semua Sumber</option>
            <option value="form">Web Form</option>
          </select>
        </div>
      </div>

      {unreadCount > 0 && statusFilter === "all" ? (
        <p className="text-label-sm text-on-surface-variant">{unreadCount} pesan belum ditandai selesai</p>
      ) : null}

      <div className="flex flex-col gap-3">
        {rows.length === 0 ? (
          <p className="rounded-lg bg-surface-container-lowest p-8 text-center text-body-md text-on-surface-variant border border-outline-variant">
            Tidak ada pesan untuk filter ini.
          </p>
        ) : (
          rows.map((m) => {
            const done = doneIds.has(m.id);
            return (
              <article
                key={m.id}
                className={`bg-surface-container-lowest rounded-lg p-6 ${SOFT_SHADOW} flex flex-col md:flex-row gap-6 items-start md:items-center transition-all hover:-translate-y-1 ${
                  done ? "opacity-70 hover:opacity-100" : "border-l-4 border-primary"
                }`}
              >
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-label-md text-on-surface font-bold">{m.full_name}</span>
                    <span className="text-on-surface-variant text-label-sm">•</span>
                    <span className="text-on-surface-variant text-label-sm">{m.email}</span>
                    <span
                      className={`ml-auto md:ml-4 text-[10px] px-2 py-1 rounded uppercase tracking-wider font-label-sm ${
                        done
                          ? "bg-surface-container-high text-on-surface"
                          : "bg-error-container text-on-error-container"
                      }`}
                    >
                      {done ? "Selesai" : "Baru"}
                    </span>
                  </div>
                  <h3 className="font-serif text-headline-md text-primary mb-2 text-lg">
                    {excerptSubject(m.message)}
                  </h3>
                  <p className="text-on-surface-variant text-body-md line-clamp-2">{m.message}</p>
                  <div className="mt-3 flex items-center gap-4 text-outline text-label-sm">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      {formatWhen(m.created_at ?? "")}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">language</span>
                      Web Form
                    </span>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2 w-full md:w-auto shrink-0">
                  {!done ? (
                    <>
                      <a
                        href={`mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent("Besek Artisanal")}&body=${encodeURIComponent(`Halo ${m.full_name},\n\n`)}`}
                        className="flex-1 md:flex-none bg-primary text-on-primary text-label-md px-4 py-2 rounded hover:opacity-90 transition-opacity whitespace-nowrap text-center"
                      >
                        Balas Email
                      </a>
                      <button
                        type="button"
                        onClick={() => setDoneIds((s) => new Set(s).add(m.id))}
                        className="flex-1 md:flex-none border border-outline-variant text-on-surface text-label-md px-4 py-2 rounded hover:bg-surface-container-low transition-colors"
                      >
                        Tandai Selesai
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setDoneIds((s) => {
                          const next = new Set(s);
                          next.delete(m.id);
                          return next;
                        })
                      }
                      className="flex-1 md:flex-none border border-outline-variant text-on-surface text-label-md px-4 py-2 rounded hover:bg-surface-container-low transition-colors"
                    >
                      Lihat Detail
                    </button>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
