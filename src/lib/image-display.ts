import type { CSSProperties } from "react";

/** CSS object-fit for Next/Image `className` */
export function imageObjectFitClass(fit: string | null | undefined): "object-cover" | "object-contain" {
  return fit === "contain" ? "object-contain" : "object-cover";
}

/** CSS object-position — use inline style so admin can enter e.g. `center 20%` or `50% 30%` */
export function imageObjectPositionStyle(
  position: string | null | undefined,
): CSSProperties | undefined {
  const p = (position ?? "").trim();
  if (!p) return undefined;
  return { objectPosition: p };
}

/** Next/Image `sizes` — helps pick resolution and avoid blur or over-downloading */
export function imageSizesOrDefault(sizes: string | null | undefined, fallback: string): string {
  const s = (sizes ?? "").trim();
  return s.length > 0 ? s : fallback;
}
