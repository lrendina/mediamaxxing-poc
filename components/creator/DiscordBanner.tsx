"use client";

import { useState } from "react";
import { SHELL } from "@/content/creator/ui";
import { CloseIcon, WarningIcon } from "./app-icons";

/* Observed on every route while Discord is disconnected: amber callout,
   warning triangle, underlined link. Dismissal is assumed — the
   screenshot shows no close affordance, so it is kept subtle and resets
   on navigation (no persistence). */
export function DiscordBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-[var(--radius-card)] bg-warn-sunk text-warn px-4 py-3 text-[15px]"
    >
      <WarningIcon aria-hidden width={20} height={20} className="shrink-0" />
      <p className="flex-1 min-w-0">
        {SHELL.discordBanner.body}{" "}
        <button
          type="button"
          title={SHELL.prototypeControl}
          className="underline underline-offset-2 font-medium hover:opacity-80"
        >
          {SHELL.discordBanner.link}
        </button>
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={SHELL.discordBanner.dismiss}
        className="inline-flex h-11 w-11 -mr-2 shrink-0 items-center justify-center rounded-full hover:bg-warn/10"
      >
        <CloseIcon aria-hidden width={18} height={18} />
      </button>
    </div>
  );
}
