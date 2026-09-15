import Image from "next/image";

export type LogoItem = {
  name: string;
  src?: string;
};

/* Plain logo rail: no heading, no invented eyebrow copy, one accessible name
   per brand. Local assets only — nothing is fetched or downloaded here.
   `unoptimized` keeps SVGs (and any odd local format) rendering as-is without
   needing remote-pattern or dangerouslyAllowSVG config. */
export function LogoRow({
  logos,
  className = "",
}: {
  logos: readonly LogoItem[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-8 gap-y-4 ${className}`}>
      {logos.map((logo, index) => (
        <li key={`${logo.name}-${index}`} className="flex min-w-0 items-center">
          {logo.src ? (
            <span className="relative flex h-8 w-24 items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="96px"
                unoptimized
                className="object-contain grayscale"
              />
            </span>
          ) : (
            <span className="flex min-h-8 max-w-full items-center rounded bg-surface-sunk px-4 text-small font-medium text-muted">
              {logo.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
