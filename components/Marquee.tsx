import type { ReactNode } from "react";

/* Endless horizontal ticker. Content is rendered twice and the track
   translates by half its width, so the loop is seamless at any content
   length. Screen readers get the content once. */
export function Marquee({
  children,
  duration = 40,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={`marquee overflow-hidden whitespace-nowrap ${className}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div className="marquee-track inline-flex w-max">
        <div className="inline-flex items-center">{children}</div>
        <div className="inline-flex items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
