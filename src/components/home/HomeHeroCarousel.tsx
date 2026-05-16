"use client";

import { useCallback, useEffect, useState } from "react";
import { CmsImage } from "@/components/cms/CmsImage";
import type { GalleryRow } from "@/lib/database.types";

type Props = {
  slides: GalleryRow[];
};

export function HomeHeroCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (count <= 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    setIndex(0);
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [count]);

  if (count === 0) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-olive/30 to-olive-dark/40" />
    );
  }

  const current = slides[index];

  return (
    <>
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <CmsImage
            src={slide.image_url}
            alt={slide.alt_text ?? ""}
            fit={slide.image_fit}
            position={slide.image_position}
            sizes={slide.image_sizes}
            sizesFallback="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-olive shadow-md ring-1 ring-black/5 transition hover:bg-white"
            aria-label="Slide sebelumnya"
          >
            <span aria-hidden className="text-xl leading-none">
              ‹
            </span>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-olive shadow-md ring-1 ring-black/5 transition hover:bg-white"
            aria-label="Slide berikutnya"
          >
            <span aria-hidden className="text-xl leading-none">
              ›
            </span>
          </button>
          <div
            className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2"
            role="tablist"
            aria-label="Indikator carousel"
          >
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}

      <span className="sr-only">
        Gambar {index + 1} dari {count}
        {current.alt_text ? `: ${current.alt_text}` : ""}
      </span>
    </>
  );
}
