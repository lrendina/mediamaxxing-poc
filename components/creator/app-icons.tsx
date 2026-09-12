import type { ComponentType } from "react";
import type { SvgProps } from "@/components/icons";
import type { AppIconName } from "@/content/creator/nav";

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

/* ---- nav ---- */

export const CampaignsIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M4 6h16v12H4z" />
    <path d="M4 10h16" />
    <path d="M9 14h6" />
  </svg>
);

export const SubmissionsIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M12 4v11" />
    <path d="M8 8l4-4 4 4" />
    <path d="M5 15v4h14v-4" />
  </svg>
);

export const EarningsIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v10" />
    <path d="M14.5 9.5c0-1-1.1-1.7-2.5-1.7s-2.5.7-2.5 1.7 1.1 1.5 2.5 1.7 2.5.8 2.5 1.8-1.1 1.7-2.5 1.7-2.5-.7-2.5-1.7" />
  </svg>
);

export const RetainersIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16v13H4z" />
    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    <path d="M4 12h16" />
  </svg>
);

export const CoursesIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4z" />
    <path d="M20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z" />
  </svg>
);

export const WhiteLabelIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l2.4 5.2 5.6.6-4.2 3.9 1.2 5.6L12 15.5l-5 2.8 1.2-5.6L4 8.8l5.6-.6z" />
  </svg>
);

export const appIconByName: Record<AppIconName, ComponentType<SvgProps>> = {
  campaigns: CampaignsIcon,
  submissions: SubmissionsIcon,
  earnings: EarningsIcon,
  retainers: RetainersIcon,
  courses: CoursesIcon,
  whiteLabel: WhiteLabelIcon,
};

/* ---- shell ---- */

export const PanelLeftIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M9.5 5v14" />
  </svg>
);

export const BellIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);

export const MoonIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
);

export const DiscordIcon = (p: SvgProps) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M19.3 5.6A16 16 0 0 0 15.4 4.4l-.5 1a15 15 0 0 0-5.8 0l-.5-1a16 16 0 0 0-3.9 1.2C2.2 9.3 1.5 12.9 1.9 16.4a16 16 0 0 0 4.8 2.4l1-1.6a10 10 0 0 1-1.6-.8l.4-.3a11.4 11.4 0 0 0 11 0l.4.3-1.6.8 1 1.6a16 16 0 0 0 4.8-2.4c.5-4-.8-7.6-3-10.8zM8.7 14.2c-.9 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2zm6.6 0c-.9 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2z" />
  </svg>
);

export const WarningIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M12 4l9 16H3z" />
    <path d="M12 10v4" />
    <circle cx="12" cy="17" r=".6" fill="currentColor" />
  </svg>
);

export const InfoIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5" />
    <circle cx="12" cy="8" r=".6" fill="currentColor" />
  </svg>
);

/* Shared with the marketing surface — one drawing, two surfaces. */
export {
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@/components/icons";

export const ChevronUpIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M6 15l6-6 6 6" />
  </svg>
);

export const ExternalLinkIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M14 5h5v5" />
    <path d="M19 5l-8 8" />
    <path d="M18 13v6H5V6h6" />
  </svg>
);

export const CloseIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

/* ---- gamification ---- */

export const GiftIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M4 10h16v10H4z" />
    <path d="M3 7h18v3H3z" />
    <path d="M12 7v13" />
    <path d="M12 7c-1.5-3-5-3-5-1s3 1 5 1zM12 7c1.5-3 5-3 5-1s-3 1-5 1z" />
  </svg>
);

export const TargetIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const LightningIcon = (p: SvgProps) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M13 2L5 13h6l-1 9 9-12h-6z" />
  </svg>
);

export const FlameIcon = (p: SvgProps) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 1-3s.5 2 2 2c0-4 2-5 2-9z" />
  </svg>
);

export const TrophyIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
    <path d="M8 6H5v2a3 3 0 0 0 3 3M16 6h3v2a3 3 0 0 1-3 3" />
    <path d="M12 13v4M9 20h6M10 17h4v3h-4z" />
  </svg>
);

export const LockIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

export const MedalIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="14" r="5" />
    <path d="M9 9.5L7 3h4l1 3 1-3h4l-2 6.5" />
  </svg>
);

export const SparkleIcon = (p: SvgProps) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
  </svg>
);

/* ---- content ---- */

export const PeopleIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="9" r="3.2" />
    <circle cx="17" cy="10" r="2.4" />
    <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
    <path d="M14 20c.2-2 2-3.5 4-3.5s3 1 3 3" />
  </svg>
);

export const LayersIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M12 4l9 5-9 5-9-5z" />
    <path d="M3 14l9 5 9-5" />
  </svg>
);

export const WalletIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
    <circle cx="16.5" cy="14.5" r="1" fill="currentColor" />
  </svg>
);

export const VideoIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="7" width="13" height="10" rx="2" />
    <path d="M16 11l5-3v8l-5-3z" />
  </svg>
);

export const BookIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z" />
    <path d="M5 17a2 2 0 0 1 2-2h11" />
  </svg>
);

export const ClockIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 8v4l3 2" />
  </svg>
);

export const ChartIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M4 18l5-6 4 3 7-8" />
    <path d="M4 20h16" />
  </svg>
);

export const CalendarIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16M8 3v4M16 3v4" />
  </svg>
);

export const CheckIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M5 12l5 5 9-10" />
  </svg>
);

export const TableIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M3.5 10h17M3.5 14.5h17M10 5v14" />
  </svg>
);

export const GridIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </svg>
);

export const ListIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M8 6h12M8 12h12M8 18h12" />
    <circle cx="4.5" cy="6" r=".8" fill="currentColor" />
    <circle cx="4.5" cy="12" r=".8" fill="currentColor" />
    <circle cx="4.5" cy="18" r=".8" fill="currentColor" />
  </svg>
);

export const PlusIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const FilterIcon = (p: SvgProps) => (
  <svg {...base} {...p}>
    <path d="M4 6h16l-6 7v5l-4 2v-7z" />
  </svg>
);
