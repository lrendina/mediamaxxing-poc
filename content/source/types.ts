/* MIGRATION.md Step 2 — copy extracted from the old build before teardown.

   Nothing in content/source/ is rewritten or improved. Strings are copied as
   they stood in the old build (HTML entities decoded), grouped by where they
   came from, and tagged with how much we know about their origin. Later
   phases build content/*.ts from here and should only quote "live-site" and
   "creator-app" copy as fact. Nothing imports this directory yet. */

export type Provenance =
  /* Taken from mediamaxxing.com by the old build — per its own comments, or
     per the old CLAUDE.md ("matched to the live site's content"). */
  | "live-site"
  /* Observed in the logged-in creator app screenshots (see CREATOR-APP.md). */
  | "creator-app"
  /* The old build labelled it a stand-in to be replaced. */
  | "placeholder"
  /* The old build made it up with no source. Never publish as fact. */
  | "invented"
  /* Our own prototype chrome: labels, disclaimers, stub explanations. */
  | "prototype"
  /* No origin recorded anywhere in the old build. */
  | "unknown";

export type SourceMeta = {
  provenance: Provenance;
  /* Old-build file(s) the strings were extracted from. */
  from: string[];
  note?: string;
};
