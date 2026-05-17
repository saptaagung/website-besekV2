"use client";

import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export function AdminMobileTopBar() {
  return (
    <header className="bg-surface border-b border-outline-variant sticky top-0 z-40">
      <div className="flex justify-between items-center w-full px-4 md:px-16 py-2 h-16">
        <button className="md:hidden text-on-surface-variant p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="ml-auto flex items-center gap-2">
          <AdminLogoutButton variant="header" />
        </div>
      </div>
    </header>
  );
}
