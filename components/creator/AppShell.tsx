"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { APP_NAV } from "@/content/creator/nav";
import { AppSidebar } from "./AppSidebar";
import { AppTabBar } from "./AppTabBar";
import { DarkModeToggle } from "./DarkModeToggle";
import { DiscordBanner } from "./DiscordBanner";
import { TopBar } from "./TopBar";
import { useCreator } from "./CreatorStateProvider";

/* Composes the global shell: sidebar · top bar · banner · page. RankBar
   lives in AppSidebar now (see CREATOR-APP.md). The campaign detail route
   collapses the sidebar to the icon rail
   (observed) to make room for the campaign's own sidebar; the top bar
   toggle can override that until the next navigation. */
function isDetailRoute(pathname: string) {
  return /^\/creator\/campaigns\/[^/]+\/[^/]+/.test(pathname);
}

function pageTitle(pathname: string) {
  const item = APP_NAV.find((i) => pathname.startsWith(i.href));
  return item?.label ?? "Campaigns";
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { fixtures } = useCreator();
  const detail = isDetailRoute(pathname);
  /* The manual override is stored with the pathname it was set on, so a
     route change silently discards it and each screen opens in its
     observed default — no effect needed. */
  const [override, setOverride] = useState<{ path: string; value: boolean } | null>(null);
  const collapsed = override?.path === pathname ? override.value : detail;

  return (
    <>
      <div
        className="min-h-svh grid grid-cols-1 md:grid-cols-[auto_1fr]"
      >
        <AppSidebar collapsed={collapsed} />

        <div className="min-w-0 flex flex-col">
          <TopBar
            page={pageTitle(pathname)}
            collapsed={collapsed}
            onToggle={() => setOverride({ path: pathname, value: !collapsed })}
          />

          <main
            id="main"
            tabIndex={-1}
            className="
              min-w-0 flex-1 flex flex-col gap-4
              px-4 md:px-6 py-5
              pb-[calc(var(--mobile-tabs)+env(safe-area-inset-bottom)+1rem)] md:pb-6
            "
          >
            {!fixtures.profile.discordConnected ? <DiscordBanner /> : null}
            <div className="w-full">{children}</div>
          </main>
        </div>
      </div>

      <AppTabBar />
      <DarkModeToggle />
    </>
  );
}
