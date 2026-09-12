import type { Mission } from "@/content/creator/types";
import { CAMPAIGNS_PAGE } from "@/content/creator/ui";
import { formatUsd } from "@/lib/format";
import { ChevronRightIcon, GiftIcon, LightningIcon, TargetIcon } from "./app-icons";
import { Countdown } from "./Countdown";
import { IconTile } from "./IconTile";

/* Two observed variants, one component.
   Bonus: blue gift, "NEW CREATOR BONUS", orange "14d left" chip, title,
          dot-progress row, green dollar reward.
   Daily: orange target, "DAILY MISSION", title, orange XP + lightning, chevron. */
export function MissionCard({ mission }: { mission: Mission }) {
  const bonus = mission.kind === "newCreatorBonus";

  return (
    <article
      className="flex items-center gap-4 rounded-[var(--radius-card)] bg-surface border border-border px-4 py-3.5"
      aria-label={`${mission.eyebrow}: ${mission.title}`}
    >
      <IconTile tone={bonus ? "action" : "streak"} size="md">
        {bonus ? <GiftIcon width={20} height={20} /> : <TargetIcon width={20} height={20} />}
      </IconTile>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium tracking-wider text-muted">
            {mission.eyebrow}
          </span>
          {mission.expiresAt ? (
            <span className="inline-flex items-center rounded-full bg-streak-sunk text-streak px-2 py-0.5 text-[11px] font-medium">
              <Countdown deadline={mission.expiresAt} granularity="days" />
            </span>
          ) : null}
        </div>
        <p className="text-[15px] font-medium leading-tight truncate">{mission.title}</p>
        {bonus ? (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="flex items-center gap-1" aria-hidden>
              {Array.from({ length: mission.progress.total }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i < mission.progress.current ? "bg-money" : "bg-surface-sunk ring-1 ring-inset ring-border"}`}
                />
              ))}
            </span>
            <span className="text-[13px] text-muted">
              {CAMPAIGNS_PAGE.daysProgress(mission.progress.current, mission.progress.total)}
            </span>
          </div>
        ) : null}
      </div>

      {mission.reward.type === "cents" ? (
        <span className="shrink-0 text-[18px] font-expanded text-money">
          {formatUsd(mission.reward.amount, { cents: true })}
        </span>
      ) : (
        <span className="shrink-0 inline-flex items-center gap-1 text-[15px] font-expanded text-streak">
          <LightningIcon aria-hidden width={14} height={14} />
          {mission.reward.amount} XP
        </span>
      )}

      {!bonus ? (
        <ChevronRightIcon aria-hidden width={18} height={18} className="shrink-0 text-muted -ml-1" />
      ) : null}
    </article>
  );
}
