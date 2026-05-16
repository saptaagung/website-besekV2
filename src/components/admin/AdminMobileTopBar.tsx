"use client";

export function AdminMobileTopBar() {
  return (
    <header className="bg-surface border-b border-outline-variant sticky top-0 z-40">
      <div className="flex justify-between items-center w-full px-4 md:px-16 py-2 h-16">
        <button className="md:hidden text-on-surface-variant p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex items-center gap-4 ml-auto">
          <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
}
