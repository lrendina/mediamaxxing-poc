import type { ReactNode } from "react";
import { IconTile, type TileTone } from "./IconTile";

/* Centered glyph, poster title, body. Doubles as the LockedState. */
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
    <div className="flex flex-col items-center text-center gap-4 px-4 py-14 md:py-20">
      <IconTile tone={tone} size="lg">
        {icon}
      </IconTile>
      <p className="font-display text-[clamp(32px,5vw,64px)] max-w-[14ch]">{title}</p>
      <p className="text-[16px] text-muted max-w-[44ch]">{body}</p>
      {children}
    </div>
  );
}
