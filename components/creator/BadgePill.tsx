import type { Badge } from "@/content/creator/types";
import { CAMPAIGNS_PAGE } from "@/content/creator/ui";
import { formatUsdCompact } from "@/lib/format";
import { CheckIcon, LightningIcon, TrophyIcon } from "./app-icons";

/* Status pills overlaid on brand art and featured cards. Four observed
   kinds, each mapped to its token role: accepted → money, bounty → warn,
   xp multiplier → streak, live → money (a live thing is an open door). */
const kindClasses: Record<Badge["kind"], string> = {
  accepted: "bg-lime text-surface-dark",
  bounty: "bg-warn text-surface-dark",
  xpMultiplier: "bg-streak text-ink-inverse",
  live: "bg-status text-ink-inverse",
};

export function BadgePill({
  badge,
  className = "",
}: {
  badge: Badge;
  className?: string;
}) {
  const label =
    badge.kind === "accepted"
      ? CAMPAIGNS_PAGE.badges.accepted
      : badge.kind === "bounty"
      ? badge.amountCents
        ? formatUsdCompact(badge.amountCents)
        : CAMPAIGNS_PAGE.badges.bounty
      : badge.kind === "xpMultiplier"
      ? CAMPAIGNS_PAGE.badges.xp(badge.multiplier ?? 2)
      : CAMPAIGNS_PAGE.badges.live;

  const Icon =
    badge.kind === "accepted"
      ? CheckIcon
      : badge.kind === "bounty"
      ? TrophyIcon
      : badge.kind === "xpMultiplier"
      ? LightningIcon
      : null;

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-[6px] px-2 py-1
        text-[11px] font-bold leading-none tracking-[0.06em] uppercase
        whitespace-nowrap
        ${kindClasses[badge.kind]} ${className}
      `}
    >
      {Icon ? <Icon aria-hidden width={12} height={12} /> : null}
      {label}
    </span>
  );
}
