import { ImgHTMLAttributes, useState } from "react";
import { ImagePlus } from "lucide-react";

interface ImagePlaceholderProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  aspect?: string;
}

/**
 * <img> con fallback elegante cuando la imagen no existe todavía.
 * Nunca rompe el layout ni la aplicación.
 */
export function ImagePlaceholder({ src, alt, aspect = "aspect-[4/5]", className = "", ...props }: ImagePlaceholderProps) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <div
        className={`${aspect} w-full h-full flex flex-col items-center justify-center gap-2 bg-[var(--warm)]/50 text-muted ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImagePlus className="w-6 h-6 opacity-60" strokeWidth={1.25} />
        <span className="text-xs font-sans">[INSERTAR FOTO]</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${aspect} w-full object-cover ${className}`}
      {...props}
    />
  );
}
