import Link from "next/link";
import type { Campaign, Submission } from "@/content/creator/types";
import { PLATFORM_LABEL, STATUS_LABEL } from "@/content/creator/submissions";
import { SUBMISSIONS_PAGE } from "@/content/creator/ui";
import { formatCount, formatDate, formatUsd } from "@/lib/format";
import { ExternalLinkIcon } from "./app-icons";

/* Status → role. Paid and approved are money; pending is neutral;
   rejected is warn (attention, not alarm). */
const statusClass: Record<Submission["status"], string> = {
  paid: "bg-lime text-surface-dark",
  approved: "bg-money-sunk text-lime",
  pending: "bg-surface-sunk text-muted",
  rejected: "bg-streak text-ink-inverse",
};

function StatusPill({ status }: { status: Submission["status"] }) {
  return (
    <span className={`inline-flex items-center rounded-[6px] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.06em] ${statusClass[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

function campaignName(campaigns: Campaign[], id: string) {
  return campaigns.find((c) => c.id === id)?.name ?? id;
}

/* Neither the table nor the card was observed populated; both are built
   from the filter dimensions the empty state exposed. */
export function SubmissionTable({
  rows,
  campaigns,
}: {
  rows: Submission[];
  campaigns: Campaign[];
}) {
  const c = SUBMISSIONS_PAGE.columns;
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] bg-surface border-2 border-border">
      <table className="w-full min-w-[640px] text-[15px]">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-[0.1em] font-bold text-muted">
            <th scope="col" className="px-4 py-3 font-normal">{c.post}</th>
            <th scope="col" className="px-4 py-3 font-normal">{c.campaign}</th>
            <th scope="col" className="px-4 py-3 font-normal">{c.platform}</th>
            <th scope="col" className="px-4 py-3 font-normal">{c.status}</th>
            <th scope="col" className="px-4 py-3 font-normal text-right">{c.views}</th>
            <th scope="col" className="px-4 py-3 font-normal text-right">{c.earnings}</th>
            <th scope="col" className="px-4 py-3 font-normal text-right">{c.date}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.id} className="border-t border-border">
              <td className="px-4 py-3">
                <Link href={s.postUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-action hover:underline">
                  {s.id.toUpperCase()}
                  <ExternalLinkIcon aria-hidden width={12} height={12} />
                </Link>
              </td>
              <td className="px-4 py-3">{campaignName(campaigns, s.campaignId)}</td>
              <td className="px-4 py-3 text-muted">{PLATFORM_LABEL[s.platform]}</td>
              <td className="px-4 py-3">
                <StatusPill status={s.status} />
                {s.rejectionReason ? (
                  <span className="block text-[13px] text-muted mt-1">{s.rejectionReason}</span>
                ) : null}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">{formatCount(s.views)}</td>
              <td className={`px-4 py-3 text-right font-expanded text-[17px] ${s.earningsCents > 0 ? "text-lime" : "text-muted"}`}>
                {formatUsd(s.earningsCents, { cents: true })}
              </td>
              <td className="px-4 py-3 text-right text-muted">{formatDate(s.submittedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SubmissionCards({
  rows,
  campaigns,
}: {
  rows: Submission[];
  campaigns: Campaign[];
}) {
  const c = SUBMISSIONS_PAGE.columns;
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {rows.map((s) => (
        <li key={s.id} className="rounded-[var(--radius-card)] bg-surface border-2 border-border p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display-sm text-[20px]">{campaignName(campaigns, s.campaignId)}</span>
            <StatusPill status={s.status} />
          </div>
          <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px]">
            <dt className="text-muted">{c.platform}</dt>
            <dd className="text-right">{PLATFORM_LABEL[s.platform]}</dd>
            <dt className="text-muted">{c.views}</dt>
            <dd className="text-right tabular-nums">{formatCount(s.views)}</dd>
            <dt className="text-muted">{c.earnings}</dt>
            <dd className={`text-right font-expanded ${s.earningsCents > 0 ? "text-money" : "text-muted"}`}>
              {formatUsd(s.earningsCents, { cents: true })}
            </dd>
            <dt className="text-muted">{c.date}</dt>
            <dd className="text-right">{formatDate(s.submittedAt)}</dd>
          </dl>
          {s.rejectionReason ? (
            <p className="text-[13px] text-warn">{s.rejectionReason}</p>
          ) : null}
          <Link href={s.postUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[13px] text-action hover:underline">
            {c.post}
            <ExternalLinkIcon aria-hidden width={12} height={12} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
