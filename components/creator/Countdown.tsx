"use client";

import { useEffect, useState } from "react";
import { formatDaysLeft, formatRemaining, msUntil } from "@/lib/time";

/* Live countdown from an ISO deadline. Renders nothing meaningful until
   mounted — the fixture deadline is relative to module load, and the
   server's and client's loads differ by a few seconds, so an SSR value
   would mismatch on hydration. A non-breaking space keeps the line height
   so the layout does not jump when the number appears. */
export function Countdown({
  deadline,
  granularity = "minutes",
  className = "",
}: {
  deadline: string;
  /* "minutes" → 23h 38m; "days" → 14d left */
  granularity?: "minutes" | "days";
  className?: string;
}) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const fmt = granularity === "days" ? formatDaysLeft : formatRemaining;
    const tick = () => setText(fmt(msUntil(deadline)));
    tick();
    /* Minute-level ticks are enough for h/m; day-level for the chip. */
    const every = granularity === "days" ? 60 * 60_000 : 30_000;
    const id = window.setInterval(tick, every);
    return () => window.clearInterval(id);
  }, [deadline, granularity]);

  return (
    <span className={className} aria-live="off">
      {text ?? " "}
    </span>
  );
}
