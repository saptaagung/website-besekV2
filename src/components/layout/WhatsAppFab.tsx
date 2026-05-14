"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function IconWa(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.5 12.2c0 4.4-3.6 8-8 8-1.4 0-2.7-.4-3.8-1l-4.4 1.2 1.2-4.2c-.7-1.1-1.2-2.5-1.2-4 0-4.4 3.6-8 8-8s8 3.6 8 8Z" />
      <path
        fill="#fff"
        d="M12.5 7.5c-.3 0-.5.1-.7.3l-.5.5c-.1.2-.2.4-.2.6 0 .6.2 1.1.5 1.6.4.7 1 1.4 1.7 1.9.3.2.6.4.9.5.2.1.4.1.6 0l.5-.3c.2-.1.4-.2.6-.1l1.4.7c.2.1.3.3.3.5 0 .2-.1.4-.2.6-.4.5-1 .8-1.7.8-1.8 0-4.3-1.6-5.8-3.8-1.2-1.7-1.5-3.2-1-4.3.2-.4.5-.7.9-.9.2-.1.4-.1.6 0Z"
      />
    </svg>
  );
}

export function WhatsAppFab({ href }: { href: string }) {
  const pathname = usePathname();
  const isProductDetail = /^\/produk\/[^/]+$/.test(pathname);
  if (isProductDetail) return null;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
      aria-label="WhatsApp"
    >
      <IconWa className="h-8 w-8" />
    </Link>
  );
}
