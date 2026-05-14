import Image from "next/image";
import {
  imageObjectFitClass,
  imageObjectPositionStyle,
  imageSizesOrDefault,
} from "@/lib/image-display";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes: string | null | undefined;
  sizesFallback: string;
  fit?: string | null;
  position?: string | null;
  priority?: boolean;
};

/** Next/Image `fill` with CMS-controlled fit, object-position, and `sizes`. */
export function CmsImage({
  src,
  alt,
  className = "",
  sizes,
  sizesFallback,
  fit,
  position,
  priority,
}: Props) {
  const fitClass = imageObjectFitClass(fit);
  const posStyle = imageObjectPositionStyle(position);
  const sz = imageSizesOrDefault(sizes, sizesFallback);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={`${fitClass} ${className}`.trim()}
      style={posStyle}
      sizes={sz}
    />
  );
}
