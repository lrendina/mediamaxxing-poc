"use client";

import { useState } from "react";
import { SUBMISSIONS_PAGE } from "@/content/creator/ui";
import { GridIcon, LightningIcon, TableIcon, VideoIcon } from "./app-icons";
import { useCreator } from "./CreatorStateProvider";
import { EmptyState } from "./EmptyState";
import { FilterChipBar } from "./FilterChipBar";
import { InfoCallout } from "./InfoCallout";
import { MetricToggle } from "./MetricToggle";
import { PageHeader } from "./PageHeader";
import { PrototypeButton } from "./PrototypeButton";
import { SubmissionCards, SubmissionTable } from "./SubmissionRows";

/* /creator/submissions — Auto Submit (with red dot) in the header, info
   callout, filter chips + Table/Cards toggle, then the table or the
   observed empty state. */
export function SubmissionsScreen() {
  const { fixtures } = useCreator();
  const { submissions, campaigns } = fixtures;
  const [view, setView] = useState<"table" | "cards">("table");

  return (
    <div className="flex flex-col gap-5 max-w-[var(--app-content-max)]">
      <PageHeader
        title={SUBMISSIONS_PAGE.title}
        subtitle={SUBMISSIONS_PAGE.subtitle}
        action={
          <span className="relative inline-flex">
            <PrototypeButton tone="ghost" size="sm">
              <LightningIcon aria-hidden width={14} height={14} className="text-streak" />
              {SUBMISSIONS_PAGE.autoSubmit}
            </PrototypeButton>
            <span aria-hidden className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-streak ring-2 ring-surface" />
          </span>
        }
      />

      <InfoCallout title={SUBMISSIONS_PAGE.info.title} body={SUBMISSIONS_PAGE.info.body} />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-0">
          <FilterChipBar chips={SUBMISSIONS_PAGE.filters} />
        </div>
        <MetricToggle
          label="View"
          value={view}
          onChange={setView}
          options={[
            { value: "table", label: SUBMISSIONS_PAGE.view.table, icon: <TableIcon aria-hidden width={14} height={14} /> },
            { value: "cards", label: SUBMISSIONS_PAGE.view.cards, icon: <GridIcon aria-hidden width={14} height={14} /> },
          ]}
        />
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-[var(--radius-card)] bg-surface border-2 border-border">
          <EmptyState
            icon={<VideoIcon width={24} height={24} />}
            title={SUBMISSIONS_PAGE.empty.title}
            body={SUBMISSIONS_PAGE.empty.body}
          />
        </div>
      ) : view === "table" ? (
        <SubmissionTable rows={submissions} campaigns={campaigns} />
      ) : (
        <SubmissionCards rows={submissions} campaigns={campaigns} />
      )}
    </div>
  );
}
