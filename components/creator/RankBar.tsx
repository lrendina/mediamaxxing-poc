"use client";

import { useRef } from "react";
import { RANK_LABEL } from "@/content/creator/profiles";
import { SHELL } from "@/content/creator/ui";
import { ChevronRightIcon, MedalIcon } from "./app-icons";
import { useCreator } from "./CreatorStateProvider";
import { RankLadderModal } from "./RankLadderModal";

const SEGMENTS = 12;

/* Deliberate deviation from the observed placement (see CREATOR-APP.md):
   moved from a full-width pill under the banner into the sidebar, directly
   above the profile row, per reviewer request. Two layouts share the same
   fixtures — a stacked card at full sidebar width, and an icon-only
   version for the collapsed rail, mirroring SidebarNavItem's pattern.

   Unlike the rest of the app shell this control is real: clicking it opens
   the Rank Ladder modal (see RankLadderModal.tsx). */
export function RankBar({ collapsed = false }: { collapsed?: boolean }) {
  const { fixtures } = useCreator();
  const { profile, milestones } = fixtures;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  const total = profile.xp + profile.xpToNextRank;
  const filled = total > 0 ? Math.round((profile.xp / total) * SEGMENTS) : 0;
  const next = RANK_LABEL[profile.nextRank];
  const label = `${RANK_LABEL[profile.rank]}, ${SHELL.rank.xp(profile.xp)}, ${SHELL.rank.toNext(profile.xpToNextRank, next)}. ${SHELL.rank.open}`;

  return (
    <>
      {collapsed ? (
        <button
          type="button"
          onClick={open}
          aria-label={label}
          className="
            mx-auto inline-flex h-11 w-11 shrink-0 items-center justify-center
            rounded-full bg-streak-sunk text-streak
            hover:brightness-95 transition
          "
        >
          <MedalIcon width={18} height={18} />
        </button>
      ) : (
        <button
          type="button"
          onClick={open}
          aria-label={label}
          className="
            w-full flex flex-col gap-2 text-left
            rounded-[var(--radius-card)] bg-surface border border-border
            px-3 py-3 hover:border-border-strong transition
          "
        >
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-streak-sunk text-streak"
            >
              <MedalIcon width={16} height={16} />
            </span>
            <span className="flex-1 min-w-0 flex flex-col leading-tight">
              <span className="text-[13px] font-medium truncate">{RANK_LABEL[profile.rank]}</span>
              <span className="text-[11px] text-muted truncate">
                {SHELL.rank.toNext(profile.xpToNextRank, next)}
              </span>
            </span>
            <ChevronRightIcon aria-hidden width={16} height={16} className="shrink-0 text-muted" />
          </span>

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
                className={`h-1.5 rounded-full ${i < filled ? "bg-streak" : "bg-surface-sunk"}`}
              />
            ))}
          </span>

          <span className="text-[11px] font-expanded text-streak">{SHELL.rank.xp(profile.xp)}</span>
        </button>
      )}

      <RankLadderModal
        dialogRef={dialogRef}
        profile={profile}
        milestones={milestones}
        onClose={close}
      />
    </>
  );
}
