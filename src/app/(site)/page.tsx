import Link from "next/link";
import { CmsImage } from "@/components/cms/CmsImage";
import { HomeHeroCarousel } from "@/components/home/HomeHeroCarousel";
import { HOME_CAROUSEL_SECTION } from "@/lib/content/sections";
import type { GalleryRow } from "@/lib/database.types";
import {
  formatIdr,
  getHomeCarouselSlides,
  getSignatureProducts,
  getSiteSections,
} from "@/lib/data/queries";

function IconLeaf() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-olive" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3C7 7 4 12 4 17c0 2 2 4 4 4s4-2 4-4c0-5 3-10 8-14-1 4-1 8 0 12" />
    </svg>
  );
}

function IconWeave() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-olive" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16v16H4z" />
      <path d="M4 12h16M12 4v16" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-olive" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 21a5 5 0 0 1 10 0M11 21a5 5 0 0 1 9-3" />
    </svg>
  );
}

const whyIcons = [IconLeaf, IconWeave, IconPeople] as const;

export default async function HomePage() {
  const sections = await getSiteSections("Home");
  const hero = sections.get("Hero");
  const signatureIntro = sections.get("SignatureIntro");
  const whyBlocks = ["WhyUs_1", "WhyUs_2", "WhyUs_3"].map((key, i) => ({
    section: sections.get(key),
    Icon: whyIcons[i],
  }));
  const signatureProducts = await getSignatureProducts();
  const carouselSlides = await getHomeCarouselSlides();

  const heroMediaSlides: GalleryRow[] =
    carouselSlides.length > 0
      ? carouselSlides
      : hero?.image_url
        ? [
            {
              id: "hero-fallback",
              image_url: hero.image_url,
              alt_text: hero.headline_text,
              section_name: HOME_CAROUSEL_SECTION,
              image_fit: hero.image_fit,
              image_position: hero.image_position,
              image_sizes: hero.image_sizes,
            },
          ]
        : [];

  return (
    <>
      <section className="relative -mt-24 overflow-hidden bg-cream pt-24 md:-mt-[5.75rem] md:pt-[5.75rem]">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2 md:gap-12 md:px-6 md:py-16 lg:gap-16 lg:py-20">
          <div className="flex min-w-0 w-full flex-1 flex-col justify-center gap-6">
            <h1 className="w-full max-w-2xl font-serif text-3xl leading-tight text-olive sm:text-4xl md:text-5xl lg:text-6xl">
              {hero?.headline_text ?? "Tradisi dalam Anyaman Modern"}
            </h1>
            <p className="w-full max-w-2xl whitespace-normal text-base leading-relaxed text-muted md:text-lg">
              {hero?.description_text ??
                "Solusi kemasan ramah lingkungan, estetik, dan berkelanjutan untuk katering dan hampers premium."}
            </p>
            <div>
              <Link
                href="/produk"
                className="inline-flex items-center gap-2 rounded-md bg-olive px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-olive-dark"
              >
                Jelajahi Produk
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-2xl bg-olive/10 shadow-lg ring-1 ring-black/5 sm:aspect-square md:aspect-[4/5]">
            <HomeHeroCarousel slides={heroMediaSlides} />
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-100 bg-white py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 md:grid-cols-3 md:gap-8 md:px-6">
          {whyBlocks.map(({ section, Icon }, idx) => (
            <div key={idx} className="flex min-w-0 w-full flex-col items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-peach">
                <Icon />
              </div>
              <h3 className="w-full font-serif text-xl text-neutral-900 md:text-2xl">
                {section?.headline_text ?? "—"}
              </h3>
              <p className="w-full max-w-prose text-sm leading-relaxed text-muted md:text-base">
                {section?.description_text ?? ""}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="mb-10 flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0 flex-1 w-full max-w-3xl">
              <h2 className="w-full font-serif text-3xl text-olive md:text-4xl lg:text-5xl">
                {signatureIntro?.headline_text ?? "Koleksi Signature"}
              </h2>
              <p className="mt-3 w-full max-w-2xl whitespace-normal text-base leading-relaxed text-muted md:text-lg">
                {signatureIntro?.description_text ??
                  "Estetika natural untuk setiap kebutuhan presentasi Anda."}
              </p>
            </div>
            <Link
              href="/produk"
              className="inline-flex shrink-0 items-center rounded-full border border-neutral-800 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:border-olive hover:text-olive"
            >
              Lihat Semua Produk
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {signatureProducts.map((p) => (
              <article
                key={p.id}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5"
              >
                <Link href={`/produk/${p.id}`} className="relative aspect-square bg-neutral-100">
                  {p.main_image_url ? (
                    <CmsImage
                      src={p.main_image_url}
                      alt={p.name}
                      fit={p.main_image_fit}
                      position={p.main_image_position}
                      sizes={p.main_image_sizes}
                      sizesFallback="(max-width: 1024px) 50vw, 25vw"
                    />
                  ) : null}
                  {p.collection_name ? (
                    <span className="absolute right-3 top-3 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-neutral-700 shadow-sm">
                      {p.collection_name}
                    </span>
                  ) : null}
                </Link>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="font-serif text-lg text-olive">
                    <Link href={`/produk/${p.id}`}>{p.name}</Link>
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted">{p.description}</p>
                  <p className="mt-auto pt-2 text-sm font-semibold text-neutral-900">
                    Mulai {formatIdr(p.price_starting_from ?? 0)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
