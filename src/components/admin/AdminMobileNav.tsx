"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/admin/actions";

const links: { href: string; label: string; match: (p: string) => boolean }[] = [
  { href: "/admin/dashboard", label: "Dashboard", match: (p) => p === "/admin/dashboard" },
  { href: "/admin/products", label: "Produk", match: (p) => p.startsWith("/admin/products") },
  { href: "/admin/pesan", label: "Pesan", match: (p) => p.startsWith("/admin/pesan") },
  { href: "/admin/gallery", label: "Cerita", match: (p) => p.startsWith("/admin/gallery") },
  {
    href: "/admin/pengaturan/beranda",
    label: "Pengaturan",
    match: (p) =>
      p.startsWith("/admin/pengaturan") ||
      p.startsWith("/admin/site-content") ||
      p.startsWith("/admin/contact-info"),
  },
];

export function AdminMobileNav() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-1 overflow-x-auto border-b border-outline-variant bg-surface-container-lowest px-2 py-2 md:hidden">
      {links.map((l) => {
        const active = l.match(pathname);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`shrink-0 rounded-lg px-3 py-2 text-label-sm transition-colors ${
              active
                ? "bg-primary-container text-on-primary-container"
                : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
      <form action={signOutAction} className="ml-auto shrink-0">
        <button type="submit" className="px-2 text-label-sm font-medium text-error">
          Keluar
        </button>
      </form>
    </div>
  );
}
