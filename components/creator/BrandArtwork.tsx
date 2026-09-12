import type { ReactNode } from "react";
import { brandGradient } from "@/lib/brand-art";

/* Deterministic gradient stand-in for brand art (see lib/brand-art.ts).
   The wordmark is drawn over it so a card reads as intentional rather than
   as a missing image. `children` layers pills and countdowns on top. */
export function BrandArtwork({
  brandId,
  wordmark,
  aspect = "aspect-video",
  wordmarkClass = "text-[24px]",
  className = "",
  children,
}: {
  brandId: string;
  wordmark: string;
  aspect?: string;
  wordmarkClass?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={`${wordmark} artwork`}
      className={`relative w-full overflow-hidden bg-surface-dark ${aspect} ${className}`}
      style={{ backgroundImage: brandGradient(brandId) }}
    >
      <span
        aria-hidden
        className={`absolute inset-0 flex items-center justify-center font-medium tracking-tight text-on-art/90 ${wordmarkClass}`}
      >
        {wordmark}
      </span>
      {children}
    </div>
  );
}
