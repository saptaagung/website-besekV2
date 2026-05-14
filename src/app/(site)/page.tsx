import Image from "next/image";
import Link from "next/link";
import {
  formatIdr,
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

  return (
    <>
      <section className="relative -mt-24 overflow-hidden bg-neutral-900 pt-24 md:-mt-[5.75rem] md:pt-[5.75rem]">
        {/*
          Portrait hero photos + object-cover scale up with viewport width (subject looks "huge").
          Constrain both max width and max height so the crop stays reasonable on large monitors.
        */}
        <div className="relative mx-auto h-[clamp(22rem,85dvh,56rem)] w-full max-w-[90rem]">
          {hero?.image_url ? (
            <Image
              src={hero.image_url}
              alt=""
              fill
              priority
              className="object-cover object-center brightness-[0.85]"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900" />
          )}
          <div className="absolute inset-0 z-10 mx-auto flex max-w-6xl flex-col justify-center gap-6 px-4 py-16 text-left md:px-6 md:py-24">
            <h1 className="max-w-2xl font-serif text-4xl leading-tight text-olive md:text-5xl lg:text-6xl">
              {hero?.headline_text ?? "Tradisi dalam Anyaman Modern"}
            </h1>
            <p className="max-w-xl text-base text-neutral-100 md:text-lg">
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
        </div>
      </section>

      <section className="border-b border-neutral-100 bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3 md:gap-8 md:px-6">
          {whyBlocks.map(({ section, Icon }, idx) => (
            <div key={idx} className="flex flex-col items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-peach">
                <Icon />
              </div>
              <h3 className="font-serif text-xl text-neutral-900">
                {section?.headline_text ?? "—"}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {section?.description_text ?? ""}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="font-serif text-3xl text-olive md:text-4xl">
                {signatureIntro?.headline_text ?? "Koleksi Signature"}
              </h2>
              <p className="mt-3 max-w-xl text-muted">
                {signatureIntro?.description_text ??
                  "Estetika natural untuk setiap kebutuhan presentasi Anda."}
              </p>
            </div>
            <Link
              href="/produk"
              className="inline-flex items-center rounded-full border border-neutral-800 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:border-olive hover:text-olive"
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
                    <Image
                      src={p.main_image_url}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
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
