import Link from "next/link";
import { notFound } from "next/navigation";
import { formatIdr, getContactInfo, getProductById } from "@/lib/data/queries";
import { waLink } from "@/lib/whatsapp";
import { ProductMedia } from "@/components/product/ProductMedia";

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
    </svg>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const contact = await getContactInfo();
  const wa = waLink(
    contact.phone_whatsapp ?? "+6281234567890",
    `Halo, saya tertarik dengan ${product.name}.`,
  );

  const thumbs = [product.main_image_url, ...(product.image_gallery_urls ?? [])].filter(
    Boolean,
  ) as string[];

  const tags = product.labels?.length ? product.labels : ["Handmade", "Sustainable"];

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2 md:gap-16 md:px-6 md:py-16">
        <ProductMedia
          images={thumbs}
          productName={product.name}
          mainImageUrl={product.main_image_url}
          mainImageFit={product.main_image_fit}
          mainImagePosition={product.main_image_position}
          mainImageSizes={product.main_image_sizes}
        />

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-serif text-3xl text-olive md:text-4xl">{product.name}</h1>
          <p className="font-serif text-2xl text-olive">
            Mulai dari {formatIdr(product.price_starting_from ?? 0)}
          </p>
          <p className="text-sm leading-relaxed text-muted md:text-base">{product.description}</p>

          <div>
            <h2 className="font-serif text-xl text-olive">Spesifikasi Produk</h2>
            <table className="mt-4 w-full border-collapse text-sm">
              <tbody>
                {[
                  ["Material", product.material],
                  ["Dimensi", product.dimensions],
                  ["Teknik", product.technique],
                  ["Warna", product.color],
                ].map(([label, val]) =>
                  val ? (
                    <tr key={String(label)} className="border-b border-neutral-200">
                      <th className="py-2 pr-4 text-left font-semibold text-neutral-800">{label}</th>
                      <td className="py-2 text-muted">{val}</td>
                    </tr>
                  ) : null,
                )}
              </tbody>
            </table>
          </div>

          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-olive py-4 text-sm font-semibold text-white transition hover:bg-olive-dark"
          >
            <IconChat />
            Pesan via WhatsApp
          </a>
          <p className="text-center text-xs text-neutral-500">
            Estimasi pengerjaan pre-order: 3-5 hari kerja
          </p>
          <p className="text-sm">
            <Link href="/produk" className="text-olive underline-offset-4 hover:underline">
              ← Kembali ke koleksi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
