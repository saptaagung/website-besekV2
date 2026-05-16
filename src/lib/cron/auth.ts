/**
 * Verifies cron / keepalive callers via `Authorization: Bearer <CRON_SECRET>`.
 * Vercel Cron sends this header when `CRON_SECRET` is set in project env.
 */
export function isCronAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}
