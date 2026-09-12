import { InfoIcon } from "./app-icons";

/* Blue info callout ("New to the Platform?"). Informational, so it takes
   the action-sunk surface rather than warn. */
export function InfoCallout({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex gap-3 rounded-[var(--radius-card)] bg-action-sunk px-4 py-3.5">
      <InfoIcon aria-hidden width={20} height={20} className="shrink-0 text-action mt-0.5" />
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-[15px] font-medium text-ink">{title}</p>
        <p className="text-[13px] text-muted">{body}</p>
      </div>
    </div>
  );
}
