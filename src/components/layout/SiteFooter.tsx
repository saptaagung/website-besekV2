import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Kebijakan Privasi" },
  { href: "/terms", label: "Syarat & Ketentuan" },
  { href: "/faq", label: "FAQ" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-[#f2f2f2]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <p className="font-serif text-lg text-olive">Besek Artisanal</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
          {footerLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-olive">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-neutral-200/80">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center font-serif text-sm text-neutral-600 md:px-6 md:text-left">
          © 2024 Besek Artisanal. Sustainable Indonesian Craftsmanship.
        </p>
      </div>
    </footer>
  );
}
