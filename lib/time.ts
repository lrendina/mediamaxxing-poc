/* Countdown helpers. Fixtures store ISO timestamps; components compute the
   remaining time at render (and re-render on an interval) so the observed
   "23h 38m" and "14d left" actually tick rather than being frozen strings. */

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export function msUntil(iso: string, now = Date.now()) {
  return new Date(iso).getTime() - now;
}

/* "23h 38m" below a day, "3d 4h" above it, "Ended" when past. */
export function formatRemaining(ms: number) {
  if (ms <= 0) return "Ended";
  const days = Math.floor(ms / DAY);
  const hours = Math.floor((ms % DAY) / HOUR);
  const mins = Math.floor((ms % HOUR) / MIN);
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h ${mins}m`;
}

/* "14d left" — the coarser chip form used on mission cards. */
export function formatDaysLeft(ms: number) {
  if (ms <= 0) return "Ended";
  const days = Math.ceil(ms / DAY);
  return `${days}d left`;
}

/* Fixture helpers: deadlines are relative to module load so the prototype
   never ships an expired countdown. The server and client evaluate this a
   few seconds apart, which is why countdown components only render after
   mount instead of during SSR. */
export function fromNow(ms: number) {
  return new Date(Date.now() + ms).toISOString();
}

export const HOURS = HOUR;
export const DAYS = DAY;
export const MINUTES = MIN;
