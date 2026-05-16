"use client";

import { useState } from "react";
import {
  imageObjectFitClass,
  imageObjectPositionStyle,
} from "@/lib/image-display";

export function ProductMedia({
  images,
  productName,
  mainImageUrl,
  mainImageFit,
  mainImagePosition,
}: {
  images: string[];
  productName: string;
  mainImageUrl?: string | null;
  mainImageFit?: string | null;
  mainImagePosition?: string | null;
  mainImageSizes?: string | null;
}) {
  const unique = Array.from(new Set(images.filter(Boolean)));
  const [active, setActive] = useState(unique[0] ?? "");
  if (!unique.length) return null;

  const mainRef = mainImageUrl ?? unique[0];
  const isMainView = active === mainRef;
  const fitClass = isMainView ? imageObjectFitClass(mainImageFit) : "object-cover";
  const posStyle = isMainView ? imageObjectPositionStyle(mainImagePosition) : undefined;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={active}
          alt={productName}
          className={`absolute inset-0 h-full w-full ${fitClass}`}
          style={posStyle}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {unique.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(src)}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ring-2 ring-offset-2 transition ${
              active === src ? "ring-olive" : "ring-transparent hover:ring-neutral-300"
            }`}
            aria-label="Ganti gambar produk"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
