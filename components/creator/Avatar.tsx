import { avatarColor, initials } from "@/lib/brand-art";

/* Creator avatar. We have no photos, so a non-null avatarUrl renders as a
   labelled neutral disc (the "missing asset" rule from CLAUDE.md) and a
   null one renders initials — the two states the live app shows. */
export function Avatar({
  handle,
  avatarUrl,
  size = 32,
  className = "",
}: {
  handle: string;
  avatarUrl: string | null;
  size?: number;
  className?: string;
}) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.38) };
  if (avatarUrl === null) {
    return (
      <span
        role="img"
        aria-label={`@${handle}`}
        className={`inline-flex shrink-0 items-center justify-center rounded-full font-medium text-on-pastel ${className}`}
        style={{ ...style, background: avatarColor(handle) }}
      >
        {initials(handle)}
      </span>
    );
  }
  return (
    <span
      role="img"
      aria-label={`@${handle} avatar`}
      title="Avatar not available in prototype"
      className={`inline-block shrink-0 rounded-full bg-surface-sunk ring-1 ring-inset ring-border ${className}`}
      style={style}
    />
  );
}
