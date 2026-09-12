"use client";

import { RANK_LABEL } from "@/content/creator/profiles";
import { SHELL } from "@/content/creator/ui";
import { ChevronRightIcon, MedalIcon } from "./app-icons";
import { useCreator } from "./CreatorStateProvider";

const SEGMENTS = 12;

/* Observed: pill card under the banner — rank avatar, rank name, long
   progress track, "500 to Copper", "0 XP", medallion, chevron. The track
   is segmented so progress reads as a count you can see at a glance,
   not a slider. XP is momentum, so it is streak-orange. */
export function RankBar() {
  const { fixtures } = useCreator();
  const { profile } = fixtures;
  const total = profile.xp + profile.xpToNextRank;
  const filled = total > 0 ? Math.round((profile.xp / total) * SEGMENTS) : 0;
  const next = RANK_LABEL[profile.nextRank];

  return (
    <button
      type="button"
      title={SHELL.prototypeControl}
      aria-label={`${RANK_LABEL[profile.rank]}, ${SHELL.rank.xp(profile.xp)}, ${SHELL.rank.toNext(profile.xpToNextRank, next)}. ${SHELL.rank.open}`}
      className="
        w-full flex items-center gap-3 md:gap-4
        rounded-full bg-surface border border-border
        pl-1.5 pr-3 py-1.5 min-h-14 text-left
        hover:border-border-strong transition
      "
    >
      <span
        aria-hidden
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-streak-sunk text-streak"
      >
        <MedalIcon width={20} height={20} />
      </span>

      <span className="flex flex-col leading-tight shrink-0 min-w-[5rem]">
        <span className="text-[15px] font-medium">{RANK_LABEL[profile.rank]}</span>
        <span className="text-[12px] text-muted whitespace-nowrap">
          {SHELL.rank.toNext(profile.xpToNextRank, next)}
        </span>
      </span>

      <span
        role="progressbar"
        aria-label="Progress to next rank"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={profile.xp}
        className="flex-1 min-w-0 hidden sm:grid gap-1"
        style={{ gridTemplateColumns: `repeat(${SEGMENTS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full ${i < filled ? "bg-streak" : "bg-surface-sunk"}`}
          />
        ))}
      </span>

      <span className="shrink-0 text-[14px] font-expanded text-streak whitespace-nowrap">
        {SHELL.rank.xp(profile.xp)}
      </span>
      <ChevronRightIcon aria-hidden width={18} height={18} className="shrink-0 text-muted" />
    </button>
  );
}
