import Image from "next/image";
import { formatUsd } from "@/lib/format";

export type LeaderboardRowEntry = {
  position: number;
  handle: string;
  avatarUrl?: string | null;
  earnedCents: number;
};

/* The old build used the string "placeholder" as a sentinel for "we do not
   have a photo". Treat it as missing so we never emit an invalid src. */
const PLACEHOLDER_AVATAR = "placeholder";

function hasAvatar(url: string | null | undefined): url is string {
  return typeof url === "string" && url.startsWith("/") && !url.startsWith("//") && url !== PLACEHOLDER_AVATAR;
}

function initialsFor(handle: string) {
  const parts = handle.split(/[^a-zA-Z0-9]+/).filter((part) => part.length > 0);
  const first = parts[0]?.charAt(0) ?? handle.charAt(0);
  const second = parts.length > 1 ? parts[1]?.charAt(0) ?? "" : "";
  const initials = `${first}${second}`.toUpperCase();
  return initials.length > 0 ? initials : "?";
}

/* Renders an <li> for a parent <ol>. Narrow-safe: the handle is the only
   flexible cell, the avatar and the money refuse to shrink, and the money
   never truncates or wraps mid-figure. */
export function LeaderboardRow({
  entry,
  className = "",
}: {
  entry: LeaderboardRowEntry;
  className?: string;
}) {
  const { position, handle, avatarUrl, earnedCents } = entry;
  const showPhoto = hasAvatar(avatarUrl);

  return (
    <li className={`flex min-w-0 items-center gap-2 py-4 sm:gap-4 ${className}`}>
      <span className="min-w-6 shrink-0 text-small tabular-nums text-muted">{position}</span>

      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-sunk">
        {showPhoto ? (
          <Image
            src={avatarUrl}
            alt=""
            width={48}
            height={48}
            unoptimized
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <span aria-hidden className="text-small font-medium tabular-nums text-muted">
            {initialsFor(handle)}
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1 break-words text-body font-medium text-ink">{handle}</span>

      <span className="shrink-0 text-right text-small font-expanded tabular-nums text-money sm:text-h3">
        {formatUsd(earnedCents)}
      </span>
    </li>
  );
}
