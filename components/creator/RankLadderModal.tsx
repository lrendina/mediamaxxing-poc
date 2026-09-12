"use client";

import { useState, type RefObject } from "react";
import {
  RANK_LABEL,
  RANK_ORDER,
  RANK_SWATCH,
  RANK_THRESHOLDS,
} from "@/content/creator/profiles";
import type { CreatorProfile, Milestone } from "@/content/creator/types";
import { RANK_LADDER, SHELL } from "@/content/creator/ui";
import {
  CheckIcon,
  CloseIcon,
  LightningIcon,
  LockIcon,
  SparkleIcon,
  TrophyIcon,
} from "./app-icons";
import { MetricToggle } from "./MetricToggle";
import { ProgressBar } from "./ProgressBar";

type Tab = "ladder" | "missions";

/* Opened from RankBar. Structure/copy for the ladder itself (title, perks
   banner, "FOUNDATION" section, per-tier progress) is reproduced from a
   screenshot of the live modal. The Ladder/Missions tab split is a
   deviation — see the comment on RANK_LADDER in content/creator/ui.ts. */
export function RankLadderModal({
  dialogRef,
  profile,
  milestones,
  onClose,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
  profile: CreatorProfile;
  milestones: Milestone[];
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("ladder");
  const currentIndex = RANK_ORDER.indexOf(profile.rank);

  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={onDialogClick}
      aria-labelledby="rank-ladder-title"
      className="
        m-auto w-[min(480px,92vw)] max-h-[88vh]
        rounded-[var(--radius-card)] p-0 bg-surface text-ink
        border border-border shadow-pop backdrop:bg-ink/40
      "
    >
      <div className="flex flex-col max-h-[88vh]">
        <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-2">
          <div className="flex items-start gap-3 min-w-0">
            <span
              aria-hidden
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-streak-sunk text-streak"
            >
              <TrophyIcon width={20} height={20} />
            </span>
            <div className="flex flex-col leading-tight pt-1 min-w-0">
              <h2 id="rank-ladder-title" className="text-[18px] font-medium truncate">
                {RANK_LADDER.title}
              </h2>
              <p className="text-[13px] text-muted">{RANK_LADDER.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="inline-flex items-center rounded-full bg-streak-sunk text-streak px-2.5 py-1 text-[12px] font-expanded whitespace-nowrap">
              {SHELL.rank.xp(profile.xp)}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label={RANK_LADDER.close}
              className="inline-flex h-11 w-11 -m-1.5 items-center justify-center rounded-full text-muted hover:bg-surface-sunk hover:text-ink transition"
            >
              <CloseIcon width={16} height={16} />
            </button>
          </div>
        </header>

        <div className="px-5 pb-3">
          <div className="flex items-center gap-2 rounded-[var(--radius-control)] bg-surface-sunk px-3 py-2.5 text-[13px] text-muted">
            <SparkleIcon aria-hidden width={14} height={14} className="shrink-0 text-streak" />
            {RANK_LADDER.perksSoon}
          </div>
        </div>

        <div className="px-5 pb-3">
          <MetricToggle
            label="Rank Ladder sections"
            value={tab}
            onChange={setTab}
            options={[
              { value: "ladder", label: RANK_LADDER.tabs.ladder },
              { value: "missions", label: RANK_LADDER.tabs.missions },
            ]}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {tab === "ladder" ? (
            <>
              <div className="flex items-baseline justify-between gap-2 mb-2 mt-1">
                <span className="text-[11px] font-medium tracking-wider text-muted">
                  {RANK_LADDER.foundationEyebrow}
                </span>
              </div>
              <p className="text-[13px] text-muted mb-3">{RANK_LADDER.foundationSubtitle}</p>

              <ol className="flex flex-col gap-2.5">
                {RANK_ORDER.map((rank, i) => {
                  const swatch = RANK_SWATCH[rank];
                  const unlockXp = RANK_THRESHOLDS[rank];
                  const isCurrent = i === currentIndex;
                  const isAchieved = i < currentIndex;
                  const isLocked = i > currentIndex;
                  const nextRank = RANK_ORDER[i + 1];
                  const nextUnlockXp = nextRank ? RANK_THRESHOLDS[nextRank] : null;

                  return (
                    <li
                      key={rank}
                      className={`
                        rounded-[var(--radius-card)] px-4 py-3.5 border
                        ${isCurrent ? "border-ink bg-surface" : "border-border bg-surface"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className={`relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${swatch.tile}`}
                        >
                          <TrophyIcon width={16} height={16} />
                          {isLocked ? (
                            <span
                              aria-hidden
                              className="absolute -bottom-0.5 -right-0.5 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-surface border border-border text-muted"
                            >
                              <LockIcon width={9} height={9} />
                            </span>
                          ) : null}
                        </span>
                        <div className="flex-1 min-w-0 flex flex-col leading-tight">
                          <span className="flex items-center gap-2">
                            <span className="text-[15px] font-medium">{RANK_LABEL[rank]}</span>
                            {isCurrent ? (
                              <span className="inline-flex items-center rounded-full bg-action-sunk text-action px-2 py-0.5 text-[11px] font-medium">
                                {RANK_LADDER.current}
                              </span>
                            ) : null}
                          </span>
                          {isCurrent ? (
                            <span className="text-[13px] text-streak font-expanded">
                              {SHELL.rank.xp(profile.xp)}
                            </span>
                          ) : isLocked ? (
                            <span className="text-[13px] text-muted">
                              {RANK_LADDER.unlockAt(unlockXp)}
                            </span>
                          ) : isAchieved ? (
                            <span className="text-[13px] text-muted">{RANK_LADDER.reached}</span>
                          ) : null}
                        </div>
                      </div>

                      {isCurrent && nextRank && nextUnlockXp !== null ? (
                        <div className="flex flex-col gap-1.5 mt-3">
                          <ProgressBar
                            value={profile.xp}
                            max={nextUnlockXp}
                            tone="streak"
                            label={`Progress toward ${RANK_LABEL[nextRank]}`}
                          />
                          <div className="flex items-center justify-between gap-2 text-[12px] text-muted">
                            <span>{RANK_LADDER.xpProgress(profile.xp, nextUnlockXp)}</span>
                            <span>
                              {RANK_LADDER.toNext(profile.xpToNextRank, RANK_LABEL[nextRank])} ↑
                            </span>
                          </div>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </>
          ) : (
            <>
              <p className="text-[13px] text-muted mb-3 mt-1">{RANK_LADDER.missionsSubtitle}</p>
              <ol className="flex flex-col gap-1">
                {milestones.map((m) => {
                  const complete = m.progress.current >= m.progress.total;
                  const showCount = !complete && m.progress.total > 1;
                  return (
                    <li
                      key={m.id}
                      className="flex items-center gap-3 rounded-[var(--radius-control)] px-2 py-2.5 border-b border-border last:border-b-0"
                    >
                      <span
                        aria-hidden
                        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          complete ? "bg-money border-money text-ink-inverse" : "border-border-strong"
                        }`}
                      >
                        {complete ? <CheckIcon width={12} height={12} /> : null}
                      </span>
                      <span
                        className={`flex-1 min-w-0 text-[14px] ${complete ? "text-muted line-through decoration-ink/30" : "text-ink"}`}
                      >
                        {m.title}
                        <span className="sr-only">{complete ? ", complete" : ", incomplete"}</span>
                      </span>
                      {showCount ? (
                        <span className="shrink-0 text-[12px] text-muted whitespace-nowrap">
                          {m.progress.current.toLocaleString("en-US")}/{m.progress.total.toLocaleString("en-US")}
                        </span>
                      ) : null}
                      <span className="shrink-0 inline-flex items-center gap-1 text-[13px] font-expanded text-streak whitespace-nowrap">
                        <LightningIcon aria-hidden width={12} height={12} />
                        {RANK_LADDER.missionReward(m.rewardXp)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
