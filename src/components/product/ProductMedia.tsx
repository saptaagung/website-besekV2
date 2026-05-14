"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductMedia({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const unique = Array.from(new Set(images.filter(Boolean)));
  const [active, setActive] = useState(unique[0] ?? "");
  if (!unique.length) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={active}
          alt={productName}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
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
