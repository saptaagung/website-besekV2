import {
  imageObjectFitClass,
  imageObjectPositionStyle,
} from "@/lib/image-display";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string | null;
  sizesFallback?: string;
  fit?: string | null;
  position?: string | null;
  priority?: boolean;
};

/**
 * CMS images use a native <img> so admins can paste any HTTPS URL
 * (Supabase Storage, Google, Unsplash, etc.) without next.config host allowlists.
 */
export function CmsImage({
  src,
  alt,
  className = "",
  fit,
  position,
}: Props) {
  const fitClass = imageObjectFitClass(fit);
  const posStyle = imageObjectPositionStyle(position);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full ${fitClass} ${className}`.trim()}
      style={posStyle}
      loading="lazy"
      decoding="async"
    />
  );
}
