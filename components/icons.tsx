import type { ComponentType, SVGProps } from "react";
import type { NavIconName } from "@/content/nav";

export type SvgProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const HomeIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h5v-6h4v6h5V10" />
  </svg>
);

export const BrandsIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export const AgenciesIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="9" r="3.2" />
    <circle cx="17" cy="10" r="2.4" />
    <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
    <path d="M14 20c.2-2 2-3.5 4-3.5s3 1 3 3" />
  </svg>
);

export const McpIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="6.5" width="8" height="11" rx="1.5" />
    <path d="M12 10h7M12 14h7" />
    <path d="M7.5 6.5V4M7.5 20v-2.5" />
  </svg>
);

export const BlogIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M5 4h11l3 3v13H5z" />
    <path d="M8 10h8M8 14h8M8 18h5" />
  </svg>
);

export const ArrowRightIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h16" />
    <path d="M14 6l6 6-6 6" />
  </svg>
);

export const ArrowLeftIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M20 12H4" />
    <path d="M10 6l-6 6 6 6" />
  </svg>
);

export const ChevronDownIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const ChevronRightIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const SwapIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h13l-3-3" />
    <path d="M20 17H7l3 3" />
  </svg>
);

/* Content modules reference icons by name (a string survives the
   server → client boundary; a component function does not). */
export const iconByName: Record<NavIconName, ComponentType<SvgProps>> = {
  home: HomeIcon,
  brands: BrandsIcon,
  agencies: AgenciesIcon,
  mcp: McpIcon,
  blog: BlogIcon,
};
