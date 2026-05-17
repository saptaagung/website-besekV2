"use client";

import { signOutAction } from "@/app/admin/actions";

type Props = {
  variant?: "sidebar" | "header";
};

export function AdminLogoutButton({ variant = "sidebar" }: Props) {
  if (variant === "header") {
    return (
      <form action={signOutAction}>
        <button
          type="submit"
          title="Keluar"
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-label-sm font-medium text-on-surface-variant transition-colors hover:bg-error-container/40 hover:text-error"
        >
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </form>
    );
  }

  return (
    <form action={signOutAction} className="w-full">
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-body-md text-on-surface-variant transition-colors hover:bg-error-container/40 hover:text-error"
      >
        <span className="material-symbols-outlined text-[20px]">logout</span>
        Keluar
      </button>
    </form>
  );
}
