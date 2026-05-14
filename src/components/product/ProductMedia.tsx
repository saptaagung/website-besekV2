"use client";

import Image from "next/image";
import { useState } from "react";
import {
  imageObjectFitClass,
  imageObjectPositionStyle,
  imageSizesOrDefault,
} from "@/lib/image-display";

export function ProductMedia({
  images,
  productName,
  mainImageUrl,
  mainImageFit,
  mainImagePosition,
  mainImageSizes,
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
  const mainSizes = imageSizesOrDefault(mainImageSizes, "(max-width: 768px) 100vw, 50vw");

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={active}
          alt={productName}
          fill
          priority
          className={fitClass}
          style={posStyle}
          sizes={isMainView ? mainSizes : "(max-width: 768px) 100vw, 50vw"}
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
            <Image src={src} alt="" fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
