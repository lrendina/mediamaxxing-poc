import type { ReactNode } from "react";
import { IconTile } from "./IconTile";

/* Icon in a soft square, title, two-line description. Four of these on
   White Label. */
export function FeatureListCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-card)] bg-surface border border-border p-4">
      <IconTile tone="action" size="md">
        {icon}
      </IconTile>
      <div className="flex flex-col gap-0.5 min-w-0">
        <h2 className="text-[15px] font-medium leading-tight">{title}</h2>
        <p className="text-[13px] text-muted">{body}</p>
      </div>
    </div>
  );
}
