import type { ReactNode } from "react";
import { Card } from "./Card";

export type BadgeTileProps = {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
};

/* A trust tile: one quiet fact, one quiet icon, shared card treatment. It
   never renders an invented seal, certificate or award — if the copy does
   not say it, the tile does not show it. Neutral, not money: trust is not a
   dollar figure. Uses the same restrained hover lift as feature cards. */
export function BadgeTile({
  icon,
  title,
  children,
  className = "",
}: BadgeTileProps) {
  return (
    <Card
      variant="default"
      pad="md"
      hover
      className={`flex items-start gap-4 ${className}`}
    >
      {icon ? (
        <span
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-surface-sunk text-ink"
        >
          {icon}
        </span>
      ) : null}

      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="text-h3">{title}</h3>
        <div className="text-body text-muted">{children}</div>
      </div>
    </Card>
  );
}
