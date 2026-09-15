import { SHELL } from "@/content/creator/ui";
import { MoonIcon } from "./app-icons";

/* Observed: floating circular moon button, fixed bottom-right, on every
   screen. DESIGN-TOKENS.md: ship the toggle disabled with a tooltip
   rather than a half-finished dark palette. Sits above the mobile tab
   bar so it never covers a tab. */
export function DarkModeToggle() {
  return (
    <button
      type="button"
      disabled
      aria-label={SHELL.darkMode}
      title={SHELL.darkModeDisabledNote}
      className="
        fixed right-4 z-30
        bottom-[calc(var(--mobile-tabs)+env(safe-area-inset-bottom)+1rem)] md:bottom-4
        inline-flex h-11 w-11 items-center justify-center rounded-full
        bg-surface border border-border text-muted
        shadow-2
        disabled:cursor-not-allowed disabled:opacity-60
      "
    >
      <MoonIcon aria-hidden width={20} height={20} />
    </button>
  );
}
