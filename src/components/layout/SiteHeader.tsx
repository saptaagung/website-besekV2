import Link from "next/link";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/produk", label: "Produk" },
  { href: "/about", label: "Cerita Kami" },
  { href: "/kontak", label: "Kontak" },
];

function IconBag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M6 7h12l-1 12H7L6 7Z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3-3" />
    </svg>
  );
}

export function SiteHeader({
  variant = "solid",
  activeHref,
}: {
  variant?: "transparent" | "solid";
  activeHref: string;
}) {
  const navClass =
    variant === "transparent"
      ? "border-white/20 bg-white/40 text-neutral-900 backdrop-blur-md"
      : "border-neutral-200/80 bg-white/90 text-neutral-800 backdrop-blur";

  return (
    <header
      className={`sticky top-0 z-40 border-b ${navClass}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 md:px-6">
        <Link href="/" className="font-serif text-xl tracking-tight text-olive md:text-2xl">
          Besek Artisanal
        </Link>
        <details className="group relative md:hidden">
          <summary className="list-none cursor-pointer rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-800 [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-48 rounded-lg border border-neutral-200 bg-white py-2 shadow-lg">
            {links.map((l) => {
              const active = activeHref === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block px-4 py-2 font-serif text-sm ${active ? "text-olive" : "text-neutral-700"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </details>
        <nav className="hidden items-center gap-8 font-serif text-sm font-medium md:flex">
          {links.map((l) => {
            const active = activeHref === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative pb-1 transition hover:text-olive ${
                  active ? "text-olive" : variant === "transparent" ? "text-neutral-800" : "text-neutral-600"
                }`}
              >
                {l.label}
                {active ? (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-olive" />
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 text-neutral-700">
          <button
            type="button"
            aria-label="Keranjang"
            className="rounded-full p-2 transition hover:bg-black/5"
          >
            <IconBag className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Cari"
            className="rounded-full p-2 transition hover:bg-black/5"
          >
            <IconSearch className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
