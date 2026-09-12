"use client";

import { MobileTabBar } from "@/components/MobileTabBar";
import { APP_NAV } from "@/content/creator/nav";
import { appIconByName } from "./app-icons";
import { useCreator } from "./CreatorStateProvider";

const items = APP_NAV.map((item) => ({
  ...item,
  icon: appIconByName[item.icon],
}));

/* Below 768px the app sidebar gives way to the same bottom tab bar the
   marketing surface uses. The live app's mobile chrome was not observed
   (assumed). */
export function AppTabBar() {
  const { href } = useCreator();
  return <MobileTabBar items={items} hrefFor={href} />;
}
