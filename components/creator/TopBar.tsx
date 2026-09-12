"use client";

import { APP_BREADCRUMB_ROOT } from "@/content/creator/nav";
import { SHELL } from "@/content/creator/ui";
import { DiscordIcon, PanelLeftIcon } from "./app-icons";
import { PrototypeButton } from "./PrototypeButton";

/* Observed: collapse toggle · "Creator › {Page}" breadcrumb · blurple
   Join Discord at the right. The toggle is the one shell control that is
   real — it drives the sidebar width. */
export function TopBar({
  page,
  collapsed,
  onToggle,
}: {
  page: string;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <header className="flex items-center gap-3 px-4 md:px-6 min-h-14 border-b border-border bg-surface">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={collapsed}
        aria-label={collapsed ? SHELL.expandSidebar : SHELL.collapseSidebar}
        className="hidden md:inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] text-muted hover:bg-ink/[0.05] hover:text-ink"
      >
        <PanelLeftIcon aria-hidden width={20} height={20} />
      </button>

      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className="flex items-center gap-2 text-[13px] text-muted">
          <li>{APP_BREADCRUMB_ROOT}</li>
          <li aria-hidden>›</li>
          <li className="text-ink font-medium truncate" aria-current="page">
            {page}
          </li>
        </ol>
      </nav>

      <PrototypeButton tone="discord" size="sm">
        <DiscordIcon aria-hidden width={16} height={16} />
        {SHELL.joinDiscord}
      </PrototypeButton>
    </header>
  );
}
