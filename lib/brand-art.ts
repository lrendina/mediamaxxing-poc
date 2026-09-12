/* Deterministic brand artwork. We have no brand art, and PLAN.md forbids
   stock or generated imagery, so every brand gets a flat two-stop gradient
   derived from its id. The same id always yields the same gradient, so
   the index card, the sidebar thumbnail, and the featured card agree.

   Hues come from a hash, not from tokens — this is data-derived colour
   (like a user's avatar colour), not a design decision, and it is the one
   sanctioned place a non-token colour appears in a component. */

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function brandGradient(id: string) {
  const h = hash(id);
  const hue1 = h % 360;
  const hue2 = (hue1 + 40 + ((h >> 8) % 60)) % 360;
  const angle = 120 + ((h >> 16) % 60);
  return `linear-gradient(${angle}deg, hsl(${hue1} 55% 38%), hsl(${hue2} 60% 22%))`;
}

/* Avatar disc colour for creators without an image. */
export function avatarColor(seed: string) {
  const hue = hash(seed) % 360;
  return `hsl(${hue} 45% 82%)`;
}

export function initials(handle: string) {
  const parts = handle.replace(/^@/, "").split(/[-_.\s]+/).filter(Boolean);
  const chars = parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0]?.slice(0, 2) ?? "?";
  return chars.toUpperCase();
}
