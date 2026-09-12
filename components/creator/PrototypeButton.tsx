"use client";

import type { ReactNode } from "react";
import { SHELL } from "@/content/creator/ui";

/* Every control that would mutate state in the real app renders through
   this. It is a real, focusable button — so keyboard flows are honest —
   but it does nothing except announce that it does nothing. Tone follows
   the token roles: action (blue) for Submit / Apply / Explore, money
   (green) for the featured card CTA, discord for Join Discord. */
export type PrototypeTone = "action" | "money" | "discord" | "ghost" | "dark";

const toneClass: Record<PrototypeTone, string> = {
  action: "bg-action text-ink-inverse hover:brightness-95",
  money: "bg-money text-ink-inverse hover:brightness-95",
  discord: "bg-discord text-ink-inverse hover:brightness-95",
  ghost:
    "bg-surface text-ink border border-border hover:border-ink/40 hover:bg-ink/[0.03]",
  dark: "bg-ink text-ink-inverse hover:opacity-90",
};

const sizeClass = {
  md: "px-4 py-2.5 min-h-11 text-[15px]",
  sm: "px-3 py-2 min-h-9 text-[13px]",
} as const;

export function PrototypeButton({
  tone = "action",
  size = "md",
  children,
  className = "",
  ariaLabel,
}: {
  tone?: PrototypeTone;
  size?: keyof typeof sizeClass;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={SHELL.prototypeControl}
      onClick={(e) => e.preventDefault()}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-[var(--radius-control)] font-medium leading-none transition
        ${toneClass[tone]} ${sizeClass[size]} ${className}
      `}
    >
      {children}
    </button>
  );
}
