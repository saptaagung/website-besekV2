import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";

function startOfMonthIso() {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function formatRelativeId(createdAt: string) {
  const t = new Date(createdAt).getTime();
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Baru saja";
  if (m < 60) return `${m} Menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} Jam lalu`;
  const days = Math.floor(h / 24);
  if (days === 1) return "Kemarin";
  if (days < 7) return `${days} hari lalu`;
  return new Date(createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabase();
  let productCount = 0;
  let messageCount = 0;
  let messagesThisMonth = 0;
  let signatureCount = 0;
  const monthIso = startOfMonthIso();

  if (supabase) {
    const { count: p } = await supabase.from("products").select("id", { count: "exact", head: true });
    const { count: m } = await supabase.from("contact_messages").select("id", { count: "exact", head: true });
    const { count: mm } = await supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .gte("created_at", monthIso);
    const { count: sig } = await supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("is_signature", true);
    productCount = p ?? 0;
    messageCount = m ?? 0;
    messagesThisMonth = mm ?? 0;
    signatureCount = sig ?? 0;
  }

  return (
    <div className="space-y-12">
      {/* Page Header — ringkasan.md */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-serif text-headline-xl text-primary mb-1">Ringkasan</h2>
          <p className="text-body-md text-on-surface-variant">
            Pantau aktivitas terbaru dan performa toko Anda.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="hidden md:flex bg-primary text-on-primary px-6 py-3 rounded-full text-label-md items-center gap-1 hover:bg-surface-tint transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Tambah Produk
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard
          label="Total Produk Aktif"
          value={String(productCount)}
          trend="+12 bulan ini"
          trendTone="up"
          icon="inventory_2"
          iconBg="bg-primary-container text-on-primary-container"
        />
        <StatCard
          label="Pesan Masuk (Bulan Ini)"
          value={String(messagesThisMonth)}
          trend={messageCount > 0 ? `${messageCount} total sepanjang waktu` : "Belum ada pesan"}
          trendTone="up"
          icon="forum"
          iconBg="bg-secondary-container text-on-secondary-container"
        />
        <StatCard
          label="Produk Signature"
          value={String(signatureCount)}
          trend="Ditampilkan di beranda"
          trendTone="neutral"
          icon="visibility"
          iconBg="bg-tertiary-container text-on-tertiary"
        />
      </div>

      <RecentActivityTable />
    </div>
  );
}

function StatCard({
  label,
  value,
  trend,
  trendTone = "up",
  icon,
  iconBg,
}: {
  label: string;
  value: string;
  trend: string;
  trendTone?: "up" | "down" | "neutral";
  icon: string;
  iconBg: string;
}) {
  const toneClass =
    trendTone === "down" ? "text-error" : trendTone === "neutral" ? "text-on-surface-variant" : "text-primary";
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group min-h-[160px]">
      <div className="absolute -right-6 -top-6 bg-surface-container-low w-24 h-24 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
      <div className="flex items-start justify-between relative z-10 mb-6">
        <div>
          <p className="text-label-md text-on-surface-variant mb-1">{label}</p>
          <h3 className="font-serif text-headline-lg text-on-surface">{value}</h3>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <div className={`flex items-center gap-1 relative z-10 text-label-sm ${toneClass}`}>
        {trendTone === "up" ? <span className="material-symbols-outlined text-[16px]">trending_up</span> : null}
        {trendTone === "down" ? <span className="material-symbols-outlined text-[16px]">trending_down</span> : null}
        {trendTone === "neutral" ? <span className="material-symbols-outlined text-[16px]">insights</span> : null}
        <span>{trend}</span>
      </div>
    </div>
  );
}

async function RecentActivityTable() {
  const supabase = await createServerSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("contact_messages")
    .select("id, full_name, email, message, created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
        <h3 className="font-serif text-headline-md text-primary">Aktivitas Terbaru</h3>
        <Link
          href="/admin/pesan"
          className="text-label-md text-secondary hover:text-primary transition-colors flex items-center gap-1"
        >
          Lihat Semua
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
      <div className="overflow-x-auto">
        {!data?.length ? (
          <p className="p-8 text-center text-body-md text-on-surface-variant">Belum ada pesan masuk.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant">
                {["Tipe", "Klien", "Produk Terkait", "Waktu", "Aksi"].map((h) => (
                  <th
                    key={h}
                    className={`py-3 px-6 text-label-sm text-on-surface-variant uppercase tracking-wider ${h === "Aksi" ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-body-md">
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors"
                >
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                      </div>
                      <span className="text-label-md">Pertanyaan</span>
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <p className="text-label-md text-on-surface">{row.full_name}</p>
                    <p className="text-label-sm text-on-surface-variant">{row.email}</p>
                  </td>
                  <td className="py-6 px-6 text-on-surface-variant line-clamp-1 max-w-xs">
                    {row.message.slice(0, 60)}
                    {row.message.length > 60 ? "…" : ""}
                  </td>
                  <td className="py-6 px-6 text-on-surface-variant whitespace-nowrap">
                    {formatRelativeId(row.created_at ?? "")}
                  </td>
                  <td className="py-6 px-6 text-right">
                    <a
                      href={`mailto:${encodeURIComponent(row.email)}?subject=${encodeURIComponent("Besek Artisanal — balasan")}`}
                      className="text-primary hover:text-surface-tint p-1 rounded-full hover:bg-primary-container/20 transition-colors inline-flex"
                      title="Balas"
                    >
                      <span className="material-symbols-outlined">reply</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
