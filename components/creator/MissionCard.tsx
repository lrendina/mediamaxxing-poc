import type { Mission } from "@/content/creator/types";
import { CAMPAIGNS_PAGE } from "@/content/creator/ui";
import { formatUsd } from "@/lib/format";
import { ChevronRightIcon, GiftIcon, LightningIcon, TargetIcon } from "./app-icons";
import { Countdown } from "./Countdown";

/* Two observed variants, one component. The reward is the headline. */
export function MissionCard({ mission }: { mission: Mission }) {
  const bonus = mission.kind === "newCreatorBonus";

  return (
    <article
      className={`relative flex items-center gap-4 rounded-[var(--radius-card)] border-2 px-5 py-4 ${
        bonus ? "bg-surface border-lime" : "bg-surface border-border"
      }`}
      aria-label={`${mission.eyebrow}: ${mission.title}`}
    >
      <span
        aria-hidden
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] ${
          bonus ? "bg-lime text-surface-dark" : "bg-streak text-ink-inverse"
        }`}
      >
        {bonus ? <GiftIcon width={22} height={22} /> : <TargetIcon width={22} height={22} />}
      </span>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted">
            {mission.eyebrow}
          </span>
          {mission.expiresAt ? (
            <span className="inline-flex items-center rounded-[6px] bg-streak text-ink-inverse px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.04em]">
              <Countdown deadline={mission.expiresAt} granularity="days" />
            </span>
          ) : null}
        </div>
        <p className="font-display-sm text-[20px] md:text-[22px] truncate">{mission.title}</p>
        {bonus ? (
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1" aria-hidden>
              {Array.from({ length: mission.progress.total }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-6 rounded-[3px] ${i < mission.progress.current ? "bg-lime" : "bg-surface-sunk"}`}
                />
              ))}
            </span>
            <span className="text-[12px] uppercase tracking-[0.06em] font-bold text-muted">
              {CAMPAIGNS_PAGE.daysProgress(mission.progress.current, mission.progress.total)}
            </span>
          </div>
        ) : null}
      </div>

      {mission.reward.type === "cents" ? (
        <span className="shrink-0 font-display text-[32px] md:text-[40px] text-lime">
          {formatUsd(mission.reward.amount)}
        </span>
      ) : (
        <span className="shrink-0 inline-flex items-center gap-1 font-display text-[26px] md:text-[32px] text-streak">
          <LightningIcon aria-hidden width={18} height={18} />
          {mission.reward.amount}
          <span className="text-[14px] tracking-normal">XP</span>
        </span>
      )}

      {!bonus ? (
        <ChevronRightIcon aria-hidden width={20} height={20} className="shrink-0 text-muted -ml-1" />
      ) : null}
    </article>
  );
}
