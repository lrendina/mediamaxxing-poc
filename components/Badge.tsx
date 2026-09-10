import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "payout" | "live";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-ink/[0.06] text-ink",
  payout:  "bg-payout/10  text-payout",
  live:    "bg-live/15    text-live",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[13px] font-medium leading-none ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
