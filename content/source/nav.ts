import type { SourceMeta } from "./types";

export const NAV_META: SourceMeta = {
  provenance: "unknown",
  from: ["content/nav.ts"],
  note:
    "Primary nav labels fed both the sidebar and the loud top nav. Destinations match the live " +
    "site's routes; the labels themselves have no recorded origin.",
};

export const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "For brands", href: "/for-brands" },
  { label: "For agencies", href: "/for-agencies" },
  { label: "MCP", href: "/mcp" },
  { label: "Blog", href: "/blog" },
];

export const HEADER_CTA_META: SourceMeta = {
  provenance: "unknown",
  from: ["content/nav.ts"],
  note: "Superseded by the single CTA label in content/cta.ts (LANDING-PAGE.md).",
};

export const HEADER_CTAS = {
  signIn: "Sign in",
  getStarted: "Get started",
};

export const FOOTER_META: SourceMeta = {
  provenance: "live-site",
  from: ["content/nav.ts"],
  note:
    "Mirrors the live site's two-group footer. The /mcp footer variant (a dropped link and a " +
    "different company name) was never captured.",
};

export const FOOTER_GROUPS = [
  {
    heading: "Platform",
    items: [
      { label: "For Creators", href: "/" },
      { label: "For Brands", href: "/for-brands" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Careers", href: "/careers" },
      { label: "Sign In", href: "/auth" },
      { label: "Text Updates", href: "#" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
    ],
  },
];

export const FOOTER_COPYRIGHT = "© 2026 MediaMaxxing LLC. All rights reserved.";

export const SURFACE_SWITCH_META: SourceMeta = {
  provenance: "prototype",
  from: ["content/nav.ts"],
};

export const SURFACE_SWITCH = {
  toCreator: "Creator app",
  toMarketing: "Marketing site",
  note: "Prototype switch",
};
