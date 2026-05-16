"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ADMIN_DEFAULT_EMAIL, ADMIN_DEFAULT_PASSWORD } from "@/lib/admin-login-defaults";
import { createClient } from "@/lib/supabase/client";
import { adminBtnPrimary, adminErrorBanner, adminInput, adminLabel } from "@/components/admin/admin-ui";

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
      className="w-full max-w-md space-y-5 rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-[0_4px_24px_rgba(85,107,47,0.06)]"
    >
      <div>
        <p className="font-serif text-xl font-bold text-primary">Besek Artisanal</p>
        <h1 className="mt-1 font-serif text-2xl font-semibold text-on-surface">Masuk Admin</h1>
      </div>
      {configError ? (
        <p className={adminErrorBanner}>
          Konfigurasi database tidak tersedia. Periksa file lingkungan (.env.local).
        </p>
      ) : null}
      <div>
        <label className={adminLabel}>Email</label>
        <input
          className={adminInput}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className={adminLabel}>Password</label>
        <input
          className={adminInput}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error ? <p className={adminErrorBanner}>{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className={`${adminBtnPrimary} w-full py-3`}
      >
        {pending ? "Memproses…" : "Masuk"}
      </button>
    </form>
  );
}
