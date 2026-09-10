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
