export type NavIconName = "home" | "brands" | "agencies" | "mcp" | "blog";

export type NavItem = {
  label: string;
  /* Shorter label for the mobile tab bar when the full one won't fit. */
  shortLabel?: string;
  href: string;
  icon: NavIconName;
};

export const SIDEBAR_NAV: NavItem[] = [
  { label: "Home",         href: "/",             icon: "home" },
  { label: "For brands",   href: "/for-brands",   icon: "brands" },
  { label: "For agencies", href: "/for-agencies", icon: "agencies" },
  { label: "MCP",          href: "/mcp",          icon: "mcp" },
  { label: "Blog",         href: "/blog",         icon: "blog" },
];

/* Dev-only switch between the two surfaces. Lives in content so the
   label is not inlined in JSX. */
export const SURFACE_SWITCH = {
  toCreator: { label: "Creator app", href: "/creator/campaigns" },
  toMarketing: { label: "Marketing site", href: "/" },
  note: "Prototype switch",
};

/* TopNav's right-hand pair. "Get started" lands on Campaigns with the
   welcome modal open (?welcome=1) rather than a bare Campaigns view —
   there's no real session in this prototype, so every click plays the
   same brand-new-account moment (see components/creator/WelcomeModal.tsx). */
export const TOP_NAV_CTA = {
  signIn: { label: "Sign in", href: "/auth" },
  getStarted: { label: "Get started", href: "/creator/campaigns?welcome=1" },
};

/* Footer nav mirrors the live site's two-group layout. */
export type FooterGroup = {
  heading: string;
  items: { label: string; href: string }[];
};

export const FOOTER_NAV: FooterGroup[] = [
  {
    heading: "Platform",
    items: [
      { label: "For Creators", href: "/"             },
      { label: "For Brands",   href: "/for-brands"   },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Blog",         href: "/blog"         },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Careers",           href: "/careers"        },
      { label: "Sign In",           href: "/auth"           },
      { label: "Text Updates",      href: "#"               },
      { label: "Terms of Service",  href: "/legal/terms"    },
      { label: "Privacy Policy",    href: "/legal/privacy"  },
    ],
  },
];

export const FOOTER_COPYRIGHT = "© 2026 MediaMaxxing LLC. All rights reserved.";
