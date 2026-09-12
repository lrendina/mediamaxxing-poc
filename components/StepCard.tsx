import type { ReactNode } from "react";
import { Card } from "./Card";

export function StepCard({
  icon,
  title,
  children,
  /* MCP flow is the only place ordered markers are allowed. Off by default. */
  marker,
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  marker?: string;
}) {
  return (
    <Card variant="default" pad="lg" className="flex gap-4">
      {icon ? (
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-tile)] bg-money-sunk text-money"
        >
          {icon}
        </span>
      ) : null}
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-baseline gap-2">
          {marker ? (
            <span className="text-[12px] text-muted font-mono">{marker}</span>
          ) : null}
          <h3 className="text-[19px] leading-tight font-medium tracking-[-0.01em]">{title}</h3>
        </div>
        <div className="text-[15px] text-muted leading-[1.55]">{children}</div>
      </div>
    </Card>
  );
}
