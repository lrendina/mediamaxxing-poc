import { SITE } from "@/content/site";

export function SkipToContent() {
  return (
    <a
      href="#main"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:z-50 focus:top-4 focus:left-4
        focus:px-4 focus:py-2 focus:rounded
        focus:bg-ink focus:text-ink-inverse focus:text-small
      "
    >
      {SITE.skipToContent}
    </a>
  );
}
