import type { ReactNode } from "react";
import { Card } from "./Card";

export type StepCardProps = {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  /* Ordered markers are allowed only in the MCP flow. Off by default. */
  marker?: string;
  className?: string;
};

/* A step is something you do, not something you buy, so the tile wears the
   action role — never money. 48px tile, matching the grid gap rhythm. */
export function StepCard({
  icon,
  title,
  children,
  marker,
  className = "",
}: StepCardProps) {
  return (
    <Card
      variant="default"
      pad="lg"
      hover={false}
      className={`flex gap-4 ${className}`}
    >
      {icon ? (
        <span
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-action-sunk text-action"
        >
          {icon}
        </span>
      ) : null}

      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex min-w-0 flex-wrap items-baseline gap-2">
          {marker ? (
            <span className="text-small text-muted font-expanded tabular-nums">
              {marker}
            </span>
          ) : null}
          <h3 className="text-h3">{title}</h3>
        </div>
        <div className="text-body text-muted">{children}</div>
      </div>
    </Card>
  );
}
