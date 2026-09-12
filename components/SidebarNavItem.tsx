import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";

export type SidebarNavTone = "marketing" | "app" | "promoted";

/* Active treatment differs per surface, and that difference is observed,
   not invented: the marketing feed uses an ink pill (Phase 2); the live
   creator app uses a light gray pill with a left accent bar. `promoted`
   is the Campaign White Label entry — a gradient-tinted item that is a
   promotion wearing a nav item's clothes. */
const toneClasses: Record<
  SidebarNavTone,
  { base: string; active: string; idle: string }
> = {
  marketing: {
    base: "rounded-full",
    active: "bg-ink text-canvas",
    idle: "text-ink/80 hover:bg-ink/[0.05]",
  },
  app: {
    base: "rounded-[var(--radius-control)] relative",
    active:
      "bg-surface-sunk text-ink before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:rounded-full before:bg-action",
    idle: "text-ink/80 hover:bg-ink/[0.04]",
  },
  promoted: {
    base: "rounded-[var(--radius-control)] relative bg-gradient-to-r from-action-sunk to-money-sunk",
    active: "text-ink ring-1 ring-action/30",
    idle: "text-ink hover:brightness-[0.98]",
  },
};

export function SidebarNavItem({
  href,
  label,
  icon: Icon,
  active,
  collapsed = false,
  tone = "marketing",
  trailing,
  dot = false,
}: {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active: boolean;
  /* Icon-only rail. Label moves to sr-only. */
  collapsed?: boolean;
  tone?: SidebarNavTone;
  /* Right-aligned slot — counts, badges. Hidden when collapsed. */
  trailing?: ReactNode;
  /* Red notification dot (observed on Submissions). */
  dot?: boolean;
}) {
  const t = toneClasses[tone];
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      className={`
        flex items-center gap-3 min-h-11 px-3 py-2
        text-[15px] transition
        ${collapsed ? "justify-center" : "justify-start"}
        ${t.base} ${active ? t.active : t.idle}
      `}
    >
      <span className="relative shrink-0">
        <Icon aria-hidden />
        {dot ? (
          <span
            aria-hidden
            className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-streak ring-2 ring-surface"
          />
        ) : null}
      </span>
      <span className={collapsed ? "sr-only" : "truncate"}>{label}</span>
      {dot ? <span className="sr-only">, has updates</span> : null}
      {trailing && !collapsed ? (
        <span className="ml-auto shrink-0">{trailing}</span>
      ) : null}
    </Link>
  );
}
