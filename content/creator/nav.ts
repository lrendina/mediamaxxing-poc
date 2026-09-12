/* Creator app nav, in the observed order. Labels are the app's own —
   do not rename. Icon names resolve in components/creator/app-icons.tsx. */

export type AppIconName =
  | "campaigns"
  | "submissions"
  | "earnings"
  | "retainers"
  | "courses"
  | "whiteLabel";

export type AppNavItem = {
  label: string;
  shortLabel?: string;
  href: string;
  icon: AppIconName;
  /* Observed: Submissions carries a red dot. */
  dot?: boolean;
  /* Observed: Campaign White Label has a gradient-tinted background —
     a promoted item, not a normal nav entry. */
  promoted?: boolean;
};

export const APP_NAV: AppNavItem[] = [
  { label: "Campaigns",            href: "/creator/campaigns",   icon: "campaigns" },
  { label: "Submissions",          href: "/creator/submissions", icon: "submissions", dot: true },
  { label: "Earnings",             href: "/creator/earnings",    icon: "earnings" },
  { label: "Retainers",            href: "/creator/retainers",   icon: "retainers" },
  { label: "Courses",              href: "/creator/courses",     icon: "courses" },
  { label: "Campaign White Label", shortLabel: "White Label", href: "/creator/white-label", icon: "whiteLabel", promoted: true },
];

/* Breadcrumb page names keyed by route prefix. */
export const APP_BREADCRUMB_ROOT = "Creator";
