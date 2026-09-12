import type { ReactNode } from "react";

/* Display h1 + one-line subtitle, optional right-aligned action slot
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
    <div className="flex flex-wrap items-end justify-between gap-3 pt-2">
      <div className="flex flex-col gap-1 min-w-0">
        <h1 className="font-display text-[clamp(40px,6vw,88px)]">{title}</h1>
        {subtitle ? <p className="text-[16px] text-muted max-w-[48ch]">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
