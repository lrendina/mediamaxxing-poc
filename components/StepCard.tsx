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
    <Card variant="default" pad="lg" className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {icon ? (
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-panel text-ink"
          >
            {icon}
          </span>
        ) : null}
        {marker ? (
          <span className="text-[13px] text-muted font-mono">{marker}</span>
        ) : null}
        <h3 className="text-[18px] leading-tight font-medium">{title}</h3>
      </div>
      <div className="text-[15px] text-muted">{children}</div>
    </Card>
  );
}
