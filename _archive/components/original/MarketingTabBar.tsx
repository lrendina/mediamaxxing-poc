"use client";

import { SIDEBAR_NAV } from "@/content/nav";
import { iconByName } from "@/components/icons";
import { MobileTabBar } from "@/components/MobileTabBar";

/* Restored verbatim from the pre-loud-redesign commit for the /original
   demo toggle — see components/original/Sidebar.tsx for the restoration
   note. */

const items = SIDEBAR_NAV.map((item) => ({
  ...item,
  icon: iconByName[item.icon],
}));

export function MarketingTabBar() {
  return <MobileTabBar items={items} />;
}
