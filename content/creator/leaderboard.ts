import type { Leaderboard } from "./types";

/* Observed on /creator/earnings, "Top Earners · All Time". Handles and
   dollar figures are real and public in the app. Post counts were not
   shown (assumed). Three entries rendered as initials rather than a
   photo — kept as null avatars. We have none of the photos, so the rest
   render as a neutral placeholder disc. */
export const TOP_EARNERS: Leaderboard = {
  scope: "allTime",
  metric: "earned",
  entries: [
    { position: 1, handle: "steven",          avatarUrl: "placeholder", earnedCents: 15_382_300, posts: 2_140 },
    { position: 2, handle: "clay",            avatarUrl: "placeholder", earnedCents: 6_537_600,  posts: 1_312 },
    { position: 3, handle: "jennifer-leeh",   avatarUrl: "placeholder", earnedCents: 5_613_200,  posts: 980   },
    { position: 4, handle: "acnestudiosboss", avatarUrl: null,          earnedCents: 5_086_100,  posts: 1_045 },
    { position: 5, handle: "brayspencer",     avatarUrl: "placeholder", earnedCents: 4_615_100,  posts: 760   },
    { position: 6, handle: "cjsprinting",     avatarUrl: null,          earnedCents: 4_508_700,  posts: 1_190 },
    { position: 7, handle: "ericaaaa",        avatarUrl: "placeholder", earnedCents: 4_265_600,  posts: 640   },
    { position: 8, handle: "nattylab",        avatarUrl: null,          earnedCents: 4_075_500,  posts: 811   },
  ],
};

/* Campaign-scoped rail for Director Advanced. The screenshot showed the
   layout (medals, avatar, handle, flame + streak, dollars) but the values
   were not legible — every row here is assumed. */
export const DIRECTOR_ADVANCED_CREATORS: Leaderboard = {
  scope: "campaign",
  metric: "earned",
  entries: [
    { position: 1, handle: "mika.films",   avatarUrl: "placeholder", streakDays: 31, earnedCents: 184_250, posts: 62 },
    { position: 2, handle: "tobi",         avatarUrl: null,          streakDays: 24, earnedCents: 141_900, posts: 48 },
    { position: 3, handle: "renderqueen",  avatarUrl: "placeholder", streakDays: 19, earnedCents: 120_400, posts: 41 },
    { position: 4, handle: "aj.cuts",      avatarUrl: null,          streakDays: 12, earnedCents: 96_300,  posts: 33 },
    { position: 5, handle: "sol_ryan",     avatarUrl: "placeholder", streakDays: 9,  earnedCents: 71_150,  posts: 27 },
    { position: 6, handle: "delphine",     avatarUrl: "placeholder", streakDays: 7,  earnedCents: 58_800,  posts: 22 },
    { position: 7, handle: "cam.x",        avatarUrl: null,          streakDays: 5,  earnedCents: 44_200,  posts: 18 },
    { position: 8, handle: "noor",         avatarUrl: "placeholder", streakDays: 3,  earnedCents: 31_600,  posts: 12 },
  ],
};
