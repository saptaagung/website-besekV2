"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";

function activeHrefFromPath(pathname: string) {
  if (pathname === "/") return "/";
  if (pathname.startsWith("/produk")) return "/produk";
  if (pathname.startsWith("/about")) return "/about";
  if (pathname.startsWith("/kontak")) return "/kontak";
  return "/";
}

export function MarketingHeader() {
  const pathname = usePathname();
  const activeHref = activeHrefFromPath(pathname);
  const variant = pathname === "/" ? "transparent" : "solid";
  return <SiteHeader variant={variant} activeHref={activeHref} />;
}
