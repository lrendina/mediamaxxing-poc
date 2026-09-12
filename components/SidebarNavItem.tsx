import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";

export type SidebarNavTone = "marketing" | "app" | "promoted";

/* One nav item, both surfaces. Active state is a white card lifted off the
   paper by a hairline — the same treatment everywhere, so the two sidebars
   are visibly one component. `promoted` is the Campaign White Label entry:
   a promotion wearing a nav item's clothes, tinted so it reads as such. */
const toneClasses: Record<
  SidebarNavTone,
  { base: string; active: string; idle: string }
> = {
  marketing: {
    base: "rounded-[var(--radius-control)]",
    active: "bg-surface text-ink border border-border shadow-[0_1px_2px_rgba(20,19,15,0.04)]",
    idle: "text-ink/75 border border-transparent hover:text-ink hover:bg-ink/[0.04]",
  },
  app: {
    base: "rounded-[var(--radius-control)]",
    active: "bg-surface text-ink border border-border shadow-[0_1px_2px_rgba(20,19,15,0.04)]",
    idle: "text-ink/75 border border-transparent hover:text-ink hover:bg-ink/[0.04]",
  },
  promoted: {
    base: "rounded-[var(--radius-control)] bg-gradient-to-r from-action-sunk to-money-sunk border",
    active: "text-ink border-action/30",
    idle: "text-ink border-transparent hover:brightness-[0.98]",
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
        text-[15px] font-medium tracking-[-0.005em] transition
        ${collapsed ? "justify-center" : "justify-start"}
        ${t.base} ${active ? t.active : t.idle}
      `}
    >
      <span className="relative shrink-0">
        <Icon aria-hidden width={20} height={20} strokeWidth={active ? 1.9 : 1.6} />
        {dot ? (
          <span
            aria-hidden
            className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-streak ring-2 ring-canvas"
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
