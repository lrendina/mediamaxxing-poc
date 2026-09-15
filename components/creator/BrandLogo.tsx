import { brandGradient } from "@/lib/brand-art";

/* Small square brand mark — the same gradient as the artwork, so the
   thumbnail and the card visibly belong to one brand. */
export function BrandLogo({
  brandId,
  name,
  size = 28,
  className = "",
}: {
  brandId: string;
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`${name} logo`}
      className={`inline-flex shrink-0 items-center justify-center rounded text-on-art font-medium ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.45),
        backgroundImage: brandGradient(brandId),
      }}
    >
      <span aria-hidden>{name[0]}</span>
    </span>
  );
}
