export function SkipToContent() {
  return (
    <a
      href="#main"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:z-50 focus:top-3 focus:left-3
        focus:px-4 focus:py-2 focus:rounded-full
        focus:bg-ink focus:text-ink-inverse focus:text-[15px]
      "
    >
      Skip to content
    </a>
  );
}
