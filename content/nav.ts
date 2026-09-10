export type NavIconName = "home" | "brands" | "agencies" | "mcp" | "blog";

export type NavItem = {
  label: string;
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
