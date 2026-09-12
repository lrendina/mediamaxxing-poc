import Link from "next/link";
import { SURFACE_SWITCH } from "@/content/nav";
import { SURFACE_SWITCHER } from "@/lib/features";
import { SwapIcon } from "./icons";

/* Dev-only toggle between the marketing surface and the creator app
   (PLAN.md Phase 9). Renders nothing in production unless the flag is
   set to "always". Not a nav item — it is visibly a prototype control. */
export function SurfaceSwitch({
  direction,
  collapsed = false,
}: {
  direction: "toCreator" | "toMarketing";
  collapsed?: boolean;
}) {
  const visible =
    SURFACE_SWITCHER === "always" ||
    (SURFACE_SWITCHER === "dev" && process.env.NODE_ENV === "development");
  if (!visible) return null;

  const target = SURFACE_SWITCH[direction];
  return (
    <Link
      href={target.href}
      title={`${SURFACE_SWITCH.note}: ${target.label}`}
      className={`
        flex items-center gap-2 min-h-10 px-3 py-1.5
        rounded-[var(--radius-control)]
        border border-dashed border-border-strong text-[12px] text-muted
        hover:border-ink hover:text-ink transition
        ${collapsed ? "justify-center px-0" : ""}
      `}
    >
      <SwapIcon aria-hidden width={16} height={16} className="shrink-0" />
      <span className={collapsed ? "sr-only" : "truncate"}>
        {target.label}
      </span>
      <span className="sr-only"> ({SURFACE_SWITCH.note})</span>
    </Link>
  );
}
