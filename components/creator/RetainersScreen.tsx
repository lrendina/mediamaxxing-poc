"use client";

import { RETAINERS_PAGE } from "@/content/creator/ui";
import { CheckIcon, LockIcon, RetainersIcon } from "./app-icons";
import { useCreator } from "./CreatorStateProvider";
import { EmptyState } from "./EmptyState";
import { PageHeader } from "./PageHeader";
import { PrototypeButton } from "./PrototypeButton";
import { StreakMeter } from "./StreakMeter";

/* /creator/retainers — observed locked: orange lock, "Complete a 14-Day
   Posting Streak", streak meter, muted note. The unlocked state was not
   observed and is assumed. */
export function RetainersScreen() {
  const { fixtures } = useCreator();
  const { retainer } = fixtures;

  return (
    <div className="flex flex-col gap-5 max-w-[880px]">
      <PageHeader title={RETAINERS_PAGE.title} subtitle={RETAINERS_PAGE.subtitle} />

      <div className="rounded-[var(--radius-card)] bg-surface border-2 border-border">
        {retainer.unlocked ? (
          <EmptyState
            icon={<CheckIcon width={24} height={24} />}
            tone="money"
            title={RETAINERS_PAGE.unlocked.title}
            body={RETAINERS_PAGE.unlocked.body}
          >
            <PrototypeButton tone="action" className="mt-2">
              <RetainersIcon aria-hidden width={16} height={16} />
              {RETAINERS_PAGE.unlocked.cta}
            </PrototypeButton>
          </EmptyState>
        ) : (
          <EmptyState
            icon={<LockIcon width={24} height={24} />}
            tone="streak"
            title={RETAINERS_PAGE.locked.title}
            body={RETAINERS_PAGE.locked.body}
          />
        )}
      </div>

      <StreakMeter streakDays={retainer.streakDays} requiredDays={retainer.requiredDays} />

      <p className="rounded-[8px] bg-surface-sunk px-4 py-3 text-[14px] text-muted">
        {RETAINERS_PAGE.note}
      </p>
    </div>
  );
}
