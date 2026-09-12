"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STATE_PARAM } from "@/content/creator";
import { STATE_SWITCH } from "@/content/creator/ui";
import { useCreator } from "./CreatorStateProvider";

/* Prototype control: flips ?state= between the observed new-creator
   fixtures and the populated set. Dashed border marks it as not part of
   the app, same treatment as SurfaceSwitch. */
export function StateSwitch({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const { state } = useCreator();
  const populated = state === "populated";
  const target = populated ? pathname : `${pathname}?${STATE_PARAM}=populated`;
  const label = populated ? STATE_SWITCH.new : STATE_SWITCH.populated;

  return (
    <Link
      href={target}
      title={`${STATE_SWITCH.label}: ${label}`}
      className={`
        flex items-center gap-2 min-h-11 px-3 py-2
        rounded-[var(--radius-control)]
        border border-dashed border-ink/25 text-[13px] text-muted
        hover:border-ink/50 hover:text-ink transition
        ${collapsed ? "justify-center" : ""}
      `}
    >
      <span
        aria-hidden
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${populated ? "bg-money" : "bg-ink/30"}`}
      />
      <span className={collapsed ? "sr-only" : "truncate"}>
        {STATE_SWITCH.label}: {populated ? STATE_SWITCH.populated : STATE_SWITCH.new}
      </span>
    </Link>
  );
}
