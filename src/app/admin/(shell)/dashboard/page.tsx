import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabase();
  let productCount = 0;
  let messageCount = 0;
  if (supabase) {
    const { count: p } = await supabase.from("products").select("id", { count: "exact", head: true });
    const { count: m } = await supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true });
    productCount = p ?? 0;
    messageCount = m ?? 0;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-olive">Ringkasan</h1>
        <p className="mt-2 text-sm text-muted">
          Kelola produk, konten halaman, kontak workshop, dan galeri proses.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Produk" value={productCount} href="/admin/products" />
        <StatCard title="Pesan kontak" value={messageCount} href="/admin/dashboard#pesan" />
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-sm font-medium text-neutral-600">Tautan cepat</p>
          <ul className="mt-3 space-y-2 text-sm text-olive">
            <li>
              <Link className="hover:underline" href="/admin/site-content">
                Konten situs
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/admin/contact-info">
                Info kontak
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/admin/gallery">
                Galeri tentang kami
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <RecentMessages />
    </div>
  );
}

function StatCard({ title, value, href }: { title: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-olive/40"
    >
      <p className="text-sm font-medium text-neutral-600">{title}</p>
      <p className="mt-2 font-serif text-3xl text-olive">{value}</p>
    </Link>
  );
}

async function RecentMessages() {
  const supabase = await createServerSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("contact_messages")
    .select("id, full_name, email, message, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (!data?.length) {
    return (
      <section id="pesan" className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="font-serif text-xl text-olive">Pesan terbaru</h2>
        <p className="mt-2 text-sm text-muted">Belum ada pesan masuk.</p>
      </section>
    );
  }

  return (
    <section id="pesan" className="rounded-xl border border-neutral-200 bg-white p-6">
      <h2 className="font-serif text-xl text-olive">Pesan terbaru</h2>
      <ul className="mt-4 divide-y divide-neutral-100">
        {data.map((row) => (
          <li key={row.id} className="py-3 text-sm">
            <p className="font-semibold text-neutral-900">{row.full_name}</p>
            <p className="text-xs text-neutral-500">{row.email}</p>
            <p className="mt-1 text-neutral-700 line-clamp-2">{row.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
