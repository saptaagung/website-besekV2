"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const pengaturanSub = [
  { href: "/admin/pengaturan/beranda", label: "Beranda" },
  { href: "/admin/pengaturan/cerita", label: "Cerita Kami" },
  { href: "/admin/pengaturan/kontak", label: "Kontak" },
  { href: "/admin/pengaturan/produk", label: "Produk" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(
    () =>
      pathname.startsWith("/admin/pengaturan") ||
      pathname.startsWith("/admin/site-content") ||
      pathname.startsWith("/admin/contact-info"),
  );

  const pengaturan =
    pathname.startsWith("/admin/pengaturan") ||
    pathname.startsWith("/admin/site-content") ||
    pathname.startsWith("/admin/contact-info");

  useEffect(() => {
    if (pengaturan) setSettingsOpen(true);
  }, [pengaturan]);

  const navItems = [
    { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard", match: pathname === "/admin/dashboard" },
    { href: "/admin/products", icon: "inventory_2", label: "Produk", match: pathname.startsWith("/admin/products") },
    { href: "/admin/pesan", icon: "mail", label: "Pesan Masuk", match: pathname.startsWith("/admin/pesan") },
    { href: "/admin/gallery", icon: "auto_stories", label: "Cerita Kami", match: pathname.startsWith("/admin/gallery") },
  ];

  return (
    <nav className="bg-surface-container h-screen w-64 fixed left-0 top-0 shadow-sm flex flex-col py-6 px-3 z-50 border-r border-surface-container-high hidden md:flex overflow-y-auto">
      {/* Header */}
      <div className="mb-12 px-3 shrink-0">
        <Link href="/admin/dashboard">
          <h1 className="font-serif text-headline-md font-bold text-primary mb-1">Besek Artisanal</h1>
        </Link>
        <p className="text-label-sm text-on-surface-variant">Admin Panel</p>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-body-md transition-colors ${
              item.match
                ? pathname === "/admin/dashboard"
                  ? "bg-primary-container text-on-primary-container font-semibold"
                  : "bg-primary-container/10 text-primary font-semibold"
                : "text-on-surface-variant hover:bg-surface-container-highest"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={item.match ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}

        {/* Pengaturan with submenu */}
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => setSettingsOpen((o) => !o)}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-body-md transition-all duration-200 ${
              pengaturan
                ? "bg-primary-container/10 text-primary font-bold"
                : "text-on-surface-variant hover:bg-surface-container-highest"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={pengaturan ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              settings
            </span>
            Pengaturan
          </button>
          {settingsOpen && (
            <div className="pl-12 pr-3 py-3 space-y-3 flex flex-col">
              {pengaturanSub.map((s) => {
                const subActive =
                  s.href === "/admin/pengaturan/produk"
                    ? pathname.startsWith("/admin/products")
                    : pathname === s.href || pathname.startsWith(`${s.href}/`);
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    className={`text-label-md transition-colors ${
                      subActive ? "text-primary font-semibold" : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    {s.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* User Profile Minimal */}
      <div className="mt-auto pt-6 border-t border-outline-variant flex items-center gap-3 px-3 shrink-0">
        <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container text-label-md">
          A
        </div>
        <span className="text-label-sm text-on-surface">Admin Profile</span>
      </div>
    </nav>
  );
}
