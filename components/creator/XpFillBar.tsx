"use client";

import { RANK_LABEL, RANK_SWATCH, RANK_THRESHOLDS } from "@/content/creator/profiles";
import type { CreatorProfile } from "@/content/creator/types";
import { RANK_LADDER, SHELL, WELCOME_MODAL } from "@/content/creator/ui";
import { useCountUp } from "@/lib/useCountUp";
import { MedalIcon } from "./app-icons";
import { ProgressBar } from "./ProgressBar";

/* The welcome-screen moment: the rank track fills from 0 to the signup
   bonus rather than rendering the final value straight away. Reuses the
   same rank metadata as RankBar/RankLadderModal so the numbers agree. */
export function XpFillBar({ profile }: { profile: CreatorProfile }) {
  const xp = useCountUp(profile.xp);
  const swatch = RANK_SWATCH[profile.rank];
  const next = RANK_LABEL[profile.nextRank];
  const nextUnlockXp = RANK_THRESHOLDS[profile.nextRank];

  return (
    <div className="rounded-[var(--radius-card)] bg-surface border border-border px-4 py-3.5 flex flex-col gap-2.5">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${swatch.tile}`}
        >
          <MedalIcon width={16} height={16} />
        </span>
        <div className="flex-1 min-w-0 flex flex-col leading-tight">
          <span className="text-[11px] font-medium tracking-wider text-muted">
            {WELCOME_MODAL.xpEyebrow}
          </span>
          <span className="text-[15px] font-medium">{RANK_LABEL[profile.rank]}</span>
        </div>
        <span className="text-[18px] font-expanded text-streak">{SHELL.rank.xp(xp)}</span>
      </div>

      <ProgressBar
        value={xp}
        max={nextUnlockXp}
        tone="streak"
        label={`Progress toward ${next}`}
      />

      <span className="text-[12px] text-muted">
        {RANK_LADDER.toNext(profile.xpToNextRank, next)}
      </span>
    </div>
  );
}
