"use client";

import { useActionState } from "react";
import { submitContactMessage, type ContactFormState } from "@/app/(site)/kontak/actions";

const initial: ContactFormState = { ok: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initial);

  return (
    <div className="relative rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
      <h2 className="font-serif text-2xl text-olive">Kirim Pesan</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Silakan isi formulir di bawah ini untuk pertanyaan umum atau pemesanan khusus. Kami akan
        merespons dalam waktu 1×24 jam.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label htmlFor="full_name" className="text-sm font-medium text-neutral-800">
            Nama Lengkap
          </label>
          <input
            id="full_name"
            name="full_name"
            required
            placeholder="Masukkan nama Anda"
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none ring-olive/30 focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-neutral-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="alamat@email.com"
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none ring-olive/30 focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium text-neutral-800">
            Pesan / Catatan Pesanan
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tuliskan pesan Anda di sini..."
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none ring-olive/30 focus:ring-2"
          />
        </div>

        {state.message ? (
          <p
            className={`text-sm ${state.ok ? "text-emerald-700" : "text-red-600"}`}
            role="status"
          >
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-olive py-3 text-sm font-semibold text-white transition hover:bg-olive-dark disabled:opacity-60"
        >
          Kirim Pesan
          <span aria-hidden>→</span>
        </button>
      </form>
    </div>
  );
}
