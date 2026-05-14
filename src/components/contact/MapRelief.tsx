export function MapRelief({
  mapData,
  label,
}: {
  mapData: Record<string, unknown> | null;
  label: string;
}) {
  const lat = typeof mapData?.lat === "number" ? mapData.lat : -7.75;
  const lng = typeof mapData?.lng === "number" ? mapData.lng : 110.36;
  const title =
    typeof mapData?.label === "string" && mapData.label.length ? mapData.label : "Lokasi workshop";

  return (
    <div className="overflow-hidden rounded-xl bg-gradient-to-br from-[#dfe6d8] via-peach to-[#c5d4b8] shadow-sm ring-1 ring-black/5">
      <div
        className="relative h-56 w-full md:h-72"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(61,79,47,0.15) 0, transparent 45%),
            radial-gradient(circle at 80% 20%, rgba(61,79,47,0.12) 0, transparent 40%),
            radial-gradient(circle at 60% 80%, rgba(255,255,255,0.35) 0, transparent 50%),
            linear-gradient(120deg, #e8e4dc 0%, #d4dcc8 40%, #c9b8a4 100%)
          `,
        }}
      >
        <div className="absolute inset-0 opacity-40 mix-blend-multiply">
          <svg className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <pattern id="topo" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M0 40 Q20 20 40 40 T80 40"
                  fill="none"
                  stroke="rgba(61,79,47,0.25)"
                  strokeWidth="1"
                />
                <path
                  d="M0 60 Q30 45 60 60 T120 60"
                  fill="none"
                  stroke="rgba(61,79,47,0.2)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topo)" />
          </svg>
        </div>
        <div className="relative flex h-full flex-col justify-end p-6 text-neutral-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-olive/90">{title}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-800">{label}</p>
          <p className="mt-3 text-xs text-neutral-600">
            Peta interaktif:{" "}
            <a
              className="font-medium text-olive underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
            >
              Buka di Google Maps
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
