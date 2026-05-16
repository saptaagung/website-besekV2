import { createClient } from "@supabase/supabase-js";
import { getSupabasePublishableKey, getSupabaseUrl, hasSupabaseEnv } from "@/utils/supabase/keys";

export type KeepaliveResult = {
  ok: boolean;
  checkedAt: string;
  tables?: Record<string, "ok" | string>;
  error?: string;
};

/** Lightweight reads so the Supabase project stays active (avoids free-tier pause). */
export async function pingSupabase(): Promise<KeepaliveResult> {
  const checkedAt = new Date().toISOString();

  if (!hasSupabaseEnv()) {
    return { ok: false, checkedAt, error: "missing_supabase_env" };
  }

  const supabase = createClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const checks = [
    { name: "site_content", run: () => supabase.from("site_content").select("section_name").limit(1) },
    { name: "contact_info", run: () => supabase.from("contact_info").select("id").limit(1) },
    { name: "products", run: () => supabase.from("products").select("id").limit(1) },
  ] as const;

  const tables: Record<string, "ok" | string> = {};

  for (const { name, run } of checks) {
    const { error } = await run();
    tables[name] = error ? error.message : "ok";
  }

  const ok = Object.values(tables).every((v) => v === "ok");
  return { ok, checkedAt, tables, ...(ok ? {} : { error: "query_failed" }) };
}
