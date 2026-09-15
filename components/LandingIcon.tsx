import type { ReactNode, SVGProps } from "react";

export type LandingIconName =
  | "briefcase"
  | "template"
  | "user"
  | "receipt"
  | "gift"
  | "eye"
  | "dollar"
  | "clock";

const GLYPHS: Record<LandingIconName, ReactNode> = {
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  template: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13M5 12v9h14v-9" />
      <path d="M12 8c-2 0-4-1-4-3a2 2 0 0 1 4 0 2 2 0 0 1 4 0c0 2-2 3-4 3z" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  dollar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5C15 8.1 13.7 7 12 7s-3 1-3 2.3c0 3 6 1.7 6 4.9 0 1.3-1.3 2.3-3 2.3s-3-1.1-3-2.5M12 5.5V7M12 16.5V18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

/* 24px stroke glyphs for the landing page's feature cards and trust tiles.
   Always decorative: the title beside each one carries the meaning. */
export function LandingIcon({
  name,
  ...props
}: { name: LandingIconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {GLYPHS[name]}
    </svg>
  );
}
