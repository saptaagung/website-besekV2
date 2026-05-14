/**
 * Supabase URL + key for browser and server clients.
 * Supports the newer publishable key name; falls back to the legacy anon key env name.
 */
export function getSupabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
}

export function getSupabasePublishableKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    ""
  );
}

export function hasSupabaseEnv(): boolean {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey());
}
