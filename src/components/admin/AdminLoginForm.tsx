"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ADMIN_DEFAULT_EMAIL, ADMIN_DEFAULT_PASSWORD } from "@/lib/admin-login-defaults";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const supabase = createClient();
  const [email, setEmail] = useState(ADMIN_DEFAULT_EMAIL);
  const [password, setPassword] = useState(ADMIN_DEFAULT_PASSWORD);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const configError = params.get("error") === "config";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError("Variabel lingkungan Supabase belum disetel.");
      return;
    }
    setPending(true);
    const { error: signError } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);
    if (signError) {
      setError(signError.message);
      return;
    }
    router.replace("/admin/dashboard");
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5"
    >
      <h1 className="font-serif text-2xl text-olive">Masuk Admin</h1>
      {configError ? (
        <p className="text-sm text-red-600">
          Konfigurasi database tidak tersedia. Periksa file lingkungan (.env.local).
        </p>
      ) : null}
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-olive py-2 text-sm font-semibold text-white hover:bg-olive-dark disabled:opacity-60"
      >
        {pending ? "Memproses…" : "Masuk"}
      </button>
    </form>
  );
}
