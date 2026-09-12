import type { Badge } from "@/content/creator/types";
import { CAMPAIGNS_PAGE } from "@/content/creator/ui";
import { formatUsdCompact } from "@/lib/format";
import { CheckIcon, LightningIcon, TrophyIcon } from "./app-icons";

/* Status pills overlaid on brand art and featured cards. Four observed
   kinds, each mapped to its token role: accepted → money, bounty → warn,
   xp multiplier → streak, live → money (a live thing is an open door). */
const kindClasses: Record<Badge["kind"], string> = {
  accepted: "bg-money text-ink-inverse",
  bounty: "bg-warn-sunk text-warn",
  xpMultiplier: "bg-streak-sunk text-streak",
  live: "bg-money-sunk text-money",
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
        inline-flex items-center gap-1 rounded-full px-2 py-1
        text-[11px] font-medium leading-none tracking-wide uppercase
        whitespace-nowrap
        ${kindClasses[badge.kind]} ${className}
      `}
    >
      {Icon ? <Icon aria-hidden width={12} height={12} /> : null}
      {label}
    </span>
  );
}
