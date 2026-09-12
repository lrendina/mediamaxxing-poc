"use client";

import { RANK_LABEL } from "@/content/creator/profiles";
import { SHELL } from "@/content/creator/ui";
import { ChevronRightIcon, MedalIcon } from "./app-icons";
import { useCreator } from "./CreatorStateProvider";
import { ProgressBar } from "./ProgressBar";

/* Observed: pill card under the banner — circular rank avatar, rank name,
   long progress track, "500 to Copper", "0 XP", small medallion, chevron.
   XP is momentum, so the track is streak-orange. */
export function RankBar() {
  const { fixtures } = useCreator();
  const { profile } = fixtures;
  const total = profile.xp + profile.xpToNextRank;

  return (
    <button
      type="button"
      title={SHELL.prototypeControl}
      aria-label={`${RANK_LABEL[profile.rank]}, ${SHELL.rank.xp(profile.xp)}, ${SHELL.rank.toNext(profile.xpToNextRank, RANK_LABEL[profile.nextRank])}. ${SHELL.rank.open}`}
      className="
        w-full flex items-center gap-3 md:gap-4
        rounded-full bg-surface border border-border
        pl-2 pr-3 py-2 min-h-14 text-left
        hover:border-ink/30 transition
      "
    >
      <span
        aria-hidden
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-sunk text-muted"
      >
        <MedalIcon width={20} height={20} />
      </span>

      <span className="shrink-0 text-[15px] font-medium w-[5.5rem] truncate">
        {RANK_LABEL[profile.rank]}
      </span>

      <span className="flex-1 min-w-0 hidden sm:block">
        <ProgressBar
          value={profile.xp}
          max={total}
          tone="streak"
          label="Progress to next rank"
        />
      </span>

      <span className="shrink-0 text-[13px] text-muted whitespace-nowrap">
        {SHELL.rank.toNext(profile.xpToNextRank, RANK_LABEL[profile.nextRank])}
      </span>
      <span className="shrink-0 text-[13px] font-expanded text-streak whitespace-nowrap hidden sm:inline">
        {SHELL.rank.xp(profile.xp)}
      </span>
      <span
        aria-hidden
        className="hidden sm:inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-streak-sunk text-streak"
      >
        <MedalIcon width={14} height={14} />
      </span>
      <ChevronRightIcon aria-hidden width={18} height={18} className="shrink-0 text-muted" />
    </button>
  );
}
