import type { Brand } from "./types";

/* Five brands were observed on the campaigns index; the disclosure header
   read "Brands · 12", so seven are padded in. Padded entries are marked
   assumed — they exist to make the grid the observed length, nothing
   about them is real. Rates and counts on the observed five are real. */
export const BRANDS: Brand[] = [
  {
    id: "openart",
    name: "OpenArt",
    slug: "openart",
    wordmark: "OpenArt",
    campaignCount: 6,
    headlineRateCentsPerThousand: 600,
    badges: [{ kind: "accepted" }, { kind: "bounty", amountCents: 100_000 }],
    joined: true,
  },
  {
    id: "pumpfun",
    name: "Pump.fun",
    slug: "pump-fun",
    wordmark: "pump.fun",
    campaignCount: 4,
    headlineRateCentsPerThousand: 700,
    badges: [],
    joined: false,
  },
  {
    id: "speed",
    name: "Speed",
    slug: "speed",
    wordmark: "SPEED",
    campaignCount: 2,
    headlineRateCentsPerThousand: 600,
    badges: [{ kind: "xpMultiplier", multiplier: 2 }],
    joined: false,
  },
  {
    id: "eleven",
    name: "11Eleven Creative",
    slug: "11eleven-creative",
    wordmark: "11:11",
    campaignCount: 1,
    headlineRateCentsPerThousand: 400, // assumed
    badges: [],
    joined: false,
  },
  {
    id: "lovable",
    name: "Lovable",
    slug: "lovable",
    wordmark: "Lovable",
    campaignCount: 2, // assumed
    headlineRateCentsPerThousand: 500, // assumed
    badges: [{ kind: "bounty", amountCents: 50_000 }],
    joined: false,
  },
  // ---- padding to the observed count of 12 — all assumed ----
  {
    id: "nova",
    name: "Nova Labs",
    slug: "nova-labs",
    wordmark: "nova",
    campaignCount: 3,
    headlineRateCentsPerThousand: 450,
    badges: [],
    joined: false,
  },
  {
    id: "clipverse",
    name: "Clipverse",
    slug: "clipverse",
    wordmark: "clipverse",
    campaignCount: 1,
    headlineRateCentsPerThousand: 300,
    badges: [{ kind: "live" }],
    joined: false,
  },
  {
    id: "flowstate",
    name: "Flowstate",
    slug: "flowstate",
    wordmark: "Flowstate",
    campaignCount: 2,
    headlineRateCentsPerThousand: 550,
    badges: [],
    joined: false,
  },
  {
    id: "rune",
    name: "Rune Audio",
    slug: "rune-audio",
    wordmark: "RUNE",
    campaignCount: 1,
    headlineRateCentsPerThousand: 250,
    badges: [],
    joined: false,
  },
  {
    id: "arcadia",
    name: "Arcadia Games",
    slug: "arcadia-games",
    wordmark: "ARCADIA",
    campaignCount: 5,
    headlineRateCentsPerThousand: 800,
    badges: [{ kind: "xpMultiplier", multiplier: 2 }],
    joined: false,
  },
  {
    id: "sprout",
    name: "Sprout",
    slug: "sprout",
    wordmark: "sprout",
    campaignCount: 1,
    headlineRateCentsPerThousand: 350,
    badges: [],
    joined: false,
  },
  {
    id: "tally",
    name: "Tally",
    slug: "tally",
    wordmark: "Tally",
    campaignCount: 2,
    headlineRateCentsPerThousand: 400,
    badges: [{ kind: "bounty", amountCents: 25_000 }],
    joined: false,
  },
];

export function brandBySlug(slug: string) {
  return BRANDS.find((b) => b.slug === slug);
}

export function brandById(id: string) {
  return BRANDS.find((b) => b.id === id);
}
