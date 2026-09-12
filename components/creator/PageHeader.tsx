import type { ReactNode } from "react";

/* h1 + one-line subtitle, optional right-aligned action slot
   (Withdraw, Auto Submit). */
export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex flex-col gap-1 min-w-0">
        <h1 className="text-[24px] leading-tight font-medium">{title}</h1>
        {subtitle ? <p className="text-[15px] text-muted">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
