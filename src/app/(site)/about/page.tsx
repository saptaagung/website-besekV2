import { CmsImage } from "@/components/cms/CmsImage";
import { getGalleryBySections, getSiteSections } from "@/lib/data/queries";

const mosaicSections = [
  "AboutMosaic_Left",
  "AboutMosaic_RightTop",
  "AboutMosaic_RightBottom",
] as const;

export default async function AboutPage() {
  const sections = await getSiteSections("About");
  const mission = sections.get("Mission");
  const story = sections.get("CreationStory");
  const gallery = await getGalleryBySections([...mosaicSections]);
  const pick = (name: string) => gallery.find((g) => g.section_name === name);

  const left = pick("AboutMosaic_Left");
  const rt = pick("AboutMosaic_RightTop");
  const rb = pick("AboutMosaic_RightBottom");

  const missionImage = mission?.image_url ?? left?.image_url;
  const missionUsesSiteContent = Boolean(mission?.image_url);
  const missionFit = missionUsesSiteContent ? mission?.image_fit : left?.image_fit;
  const missionPosition = missionUsesSiteContent ? mission?.image_position : left?.image_position;
  const missionSizes = missionUsesSiteContent ? mission?.image_sizes : left?.image_sizes;

  return (
    <div className="bg-white">
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-2 md:items-center md:gap-16 md:px-6 md:py-20">
        <div className="order-2 md:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b7355]">
            MISI KAMI
          </p>
          <h1 className="mt-3 font-serif text-3xl text-olive md:text-5xl">
            {mission?.headline_text ?? "Lebih dari Sekadar Wadah"}
          </h1>
          <div className="my-6 h-px w-16 bg-olive/40" />
          <div className="space-y-4 text-sm leading-relaxed text-muted md:text-base">
            {(mission?.description_text ?? "")
              .split("\n\n")
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100 md:aspect-[4/5]">
            {missionImage ? (
              <CmsImage
                src={missionImage}
                alt="Ilustrasi bambu dan alam"
                priority
                fit={missionFit}
                position={missionPosition}
                sizes={missionSizes}
                sizesFallback="(max-width: 768px) 100vw, 45vw"
              />
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-6 md:py-20">
        <h2 className="font-serif text-3xl text-olive md:text-4xl">
          {story?.headline_text ?? "Dibuat dengan Hati"}
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
          {story?.description_text ?? ""}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-neutral-100 md:row-span-2 md:min-h-[640px]">
            {left?.image_url ? (
              <CmsImage
                src={left.image_url}
                alt={left.alt_text ?? "Proses anyaman tangan"}
                fit={left.image_fit}
                position={left.image_position}
                sizes={left.image_sizes}
                sizesFallback="(max-width: 768px) 100vw, 50vw"
              />
            ) : null}
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-neutral-100">
            {rt?.image_url ? (
              <CmsImage
                src={rt.image_url}
                alt={rt.alt_text ?? "Produk besek jadi"}
                fit={rt.image_fit}
                position={rt.image_position}
                sizes={rt.image_sizes}
                sizesFallback="(max-width: 768px) 100vw, 50vw"
              />
            ) : null}
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-neutral-100">
            {rb?.image_url ? (
              <CmsImage
                src={rb.image_url}
                alt={rb.alt_text ?? "Bengkel pengrajin bambu"}
                fit={rb.image_fit}
                position={rb.image_position}
                sizes={rb.image_sizes}
                sizesFallback="(max-width: 768px) 100vw, 50vw"
              />
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
