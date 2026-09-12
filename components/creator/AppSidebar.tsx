"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAV } from "@/content/creator/nav";
import { SHELL } from "@/content/creator/ui";
import { LogoLockup } from "@/components/LogoLockup";
import { SidebarNavItem } from "@/components/SidebarNavItem";
import { SurfaceSwitch } from "@/components/SurfaceSwitch";
import { appIconByName, BellIcon } from "./app-icons";
import { Avatar } from "./Avatar";
import { useCreator } from "./CreatorStateProvider";
import { StateSwitch } from "./StateSwitch";

/* The creator app's primary nav. Same SidebarNavItem, same LogoLockup as
   the marketing Sidebar — the point of Phase 9 is that these two asides
   are visibly one component family. Observed: ~248px, white, hairline
   right border, active = gray pill + left accent bar, Submissions dot,
   White Label promoted, avatar + name + bell pinned to the bottom. */
export function AppSidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const { fixtures, href } = useCreator();
  const { profile } = fixtures;

  return (
    <aside
      aria-label="Primary"
      className={`
        hidden md:flex sticky top-0 h-screen flex-col
        bg-surface border-r border-border
        py-4 transition-[width]
        ${collapsed ? "w-[var(--app-sidebar-collapsed)] px-1.5" : "w-[var(--app-sidebar)] px-3"}
      `}
    >
      <Link
        href={href("/creator/campaigns")}
        className={`mb-6 rounded-lg py-2 min-h-11 flex items-center ${collapsed ? "justify-center px-0" : "px-2"}`}
      >
        <LogoLockup size="md" showWordmark={!collapsed} />
      </Link>

      <nav className="flex-1 flex flex-col gap-1">
        {APP_NAV.map((item) => (
          <SidebarNavItem
            key={item.href}
            href={href(item.href)}
            label={item.label}
            icon={appIconByName[item.icon]}
            active={pathname.startsWith(item.href)}
            collapsed={collapsed}
            tone={item.promoted ? "promoted" : "app"}
            dot={item.dot}
          />
        ))}
      </nav>

      <div className="mt-4 flex flex-col gap-2">
        <StateSwitch collapsed={collapsed} />
        <SurfaceSwitch direction="toMarketing" collapsed={collapsed} />

        <div
          className={`flex items-center gap-3 rounded-[var(--radius-control)] min-h-12 ${collapsed ? "justify-center px-0 py-2" : "px-2 py-2"}`}
        >
          <Avatar handle={profile.handle} avatarUrl={profile.avatarUrl} size={32} />
          {!collapsed ? (
            <span className="flex-1 min-w-0 text-[15px] font-medium truncate">
              {profile.displayName}
            </span>
          ) : null}
          {!collapsed ? (
            <button
              type="button"
              aria-label={SHELL.notifications}
              title={SHELL.prototypeControl}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted hover:bg-ink/[0.05] hover:text-ink"
            >
              <BellIcon aria-hidden width={20} height={20} />
            </button>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
