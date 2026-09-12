"use client";

import { SIDEBAR_NAV } from "@/content/nav";
import { iconByName } from "./icons";
import { MobileTabBar } from "./MobileTabBar";

const items = SIDEBAR_NAV.map((item) => ({
  ...item,
  icon: iconByName[item.icon],
}));

export function MarketingTabBar() {
  return <MobileTabBar items={items} />;
}
