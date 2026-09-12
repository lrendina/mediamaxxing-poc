import type { ReactNode } from "react";
import { IconTile, type TileTone } from "./IconTile";

/* Centered glyph, title, two-line body. Doubles as the LockedState on
   Retainers (orange lock in a soft square) via `tone`. */
export function EmptyState({
  icon,
  tone = "neutral",
  title,
  body,
  children,
}: {
  icon: ReactNode;
  tone?: TileTone;
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-3 px-4 py-12">
      <IconTile tone={tone} size="lg">
        {icon}
      </IconTile>
      <p className="text-[18px] font-medium leading-tight">{title}</p>
      <p className="text-[15px] text-muted max-w-[44ch]">{body}</p>
      {children}
    </div>
  );
}
