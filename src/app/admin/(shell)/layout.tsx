import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/admin/actions";
import { createServerSupabase } from "@/lib/supabase/server";

const links = [
  { href: "/admin/dashboard", label: "Ringkasan" },
  { href: "/admin/products", label: "Produk" },
  { href: "/admin/site-content", label: "Konten Situs" },
  { href: "/admin/contact-info", label: "Kontak" },
  { href: "/admin/gallery", label: "Galeri" },
];

export default async function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  if (!supabase) {
    redirect("/admin/login?error=config");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-56 flex-shrink-0 flex-col border-r border-neutral-200 bg-white p-4 md:flex">
        <Link href="/admin/dashboard" className="font-serif text-lg text-olive">
          Admin
        </Link>
        <nav className="mt-8 flex flex-col gap-2 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-neutral-700 hover:bg-peach/60 hover:text-olive"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <form action={signOutAction} className="mt-auto pt-8">
          <button
            type="submit"
            className="text-sm font-medium text-neutral-600 underline-offset-2 hover:underline"
          >
            Keluar
          </button>
        </form>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="border-b border-neutral-200 bg-white md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/admin/dashboard" className="font-serif text-olive">
              Admin
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-sm font-medium text-neutral-600 underline-offset-2 hover:underline"
              >
                Keluar
              </button>
            </form>
          </div>
          <nav className="flex flex-wrap gap-2 border-t border-neutral-100 px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 hover:border-olive hover:text-olive"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
