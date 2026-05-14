import Image from "next/image";
import Link from "next/link";
import { formatIdr, getContactInfo, getProducts } from "@/lib/data/queries";
import { waLink } from "@/lib/whatsapp";

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
    </svg>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();
  const contact = await getContactInfo();
  const wa = waLink(
    contact.phone_whatsapp ?? "+6281234567890",
    "Halo Besek Artisanal, saya ingin memesan produk.",
  );

  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-6xl px-4 py-14 text-center md:px-6 md:py-20">
        <h1 className="font-serif text-3xl text-olive md:text-5xl">Koleksi Anyaman Terbaik Kami</h1>
        <p className="mx-auto mt-4 max-w-3xl text-muted md:text-lg">
          Menghadirkan sentuhan alam dan warisan pengrajin lokal untuk kebutuhan kemasan modern,
          hantaran, dan suvenir premium yang ramah lingkungan.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          {products.map((p) => (
            <article
              key={p.id}
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <Link href={`/produk/${p.id}`} className="relative aspect-square bg-neutral-100">
                {p.main_image_url ? (
                  <Image
                    src={p.main_image_url}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : null}
                {p.collection_name ? (
                  <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-xs font-medium uppercase tracking-wide text-neutral-600">
                    {p.collection_name}
                  </span>
                ) : null}
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="font-serif text-2xl text-olive">
                  <Link href={`/produk/${p.id}`}>{p.name}</Link>
                </h2>
                <p className="text-sm leading-relaxed text-muted line-clamp-3">{p.description}</p>
                {p.dimensions ? (
                  <p className="text-xs text-neutral-500">Dimensi: {p.dimensions}</p>
                ) : null}
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md bg-olive py-3 text-sm font-semibold text-white transition hover:bg-olive-dark"
                >
                  <IconChat />
                  Pesan via WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
