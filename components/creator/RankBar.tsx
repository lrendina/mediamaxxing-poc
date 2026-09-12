"use client";

import { RANK_LABEL } from "@/content/creator/profiles";
import { SHELL } from "@/content/creator/ui";
import { ChevronRightIcon } from "./app-icons";
import { useCreator } from "./CreatorStateProvider";

const SEGMENTS = 16;

/* The rank ribbon. Lime, black text, poster-sized rank name, a segmented
   black track. It is the loudest thing above the fold on every screen,
   which is what a gamified product wants. */
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
        w-full grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6
        rounded-[var(--radius-card)] bg-lime text-surface-dark
        px-5 py-4 text-left hover:brightness-[0.97] transition
      "
    >
      <span className="flex flex-col leading-none min-w-0">
        <span className="text-[11px] uppercase tracking-[0.12em] font-bold opacity-70">Rank</span>
        <span className="font-display text-[32px] md:text-[44px] mt-1">{RANK_LABEL[profile.rank]}</span>
      </span>

      <span className="flex flex-col gap-2 min-w-0">
        <span
          role="progressbar"
          aria-label="Progress to next rank"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={profile.xp}
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${SEGMENTS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span
              key={i}
              className={`h-3 rounded-[3px] ${i < filled ? "bg-surface-dark" : "bg-surface-dark/15"}`}
            />
          ))}
        </span>
        <span className="hidden sm:flex justify-between text-[12px] uppercase tracking-[0.08em] font-bold">
          <span>{SHELL.rank.xp(profile.xp)}</span>
          <span>{SHELL.rank.toNext(profile.xpToNextRank, next)}</span>
        </span>
      </span>

      <ChevronRightIcon aria-hidden width={24} height={24} strokeWidth={2.2} className="shrink-0" />
    </button>
  );
}
