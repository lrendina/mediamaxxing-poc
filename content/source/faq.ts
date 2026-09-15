import type { Provenance, SourceMeta } from "./types";

export type SourceFaqItem = {
  question: string;
  answer: string;
  provenance: Provenance;
};

export const FAQ_META: SourceMeta = {
  provenance: "live-site",
  from: ["content/faq.ts"],
  note:
    "All five questions are from the live site. Only the first answer was extractable " +
    "verbatim; the old build marked answers 2–5 as placeholders to replace, and they still " +
    "carry that marker. Answer 3's \"within 48 hours\" conflicts with LANDING-PAGE.md's " +
    "\"Reviewed in 7 days\".",
};

export const FAQ_HEADING = { text: "Questions", provenance: "unknown" as Provenance };

export const FAQ_ITEMS: SourceFaqItem[] = [
  {
    question: "What exactly is MediaMaxxing?",
    answer:
      "MediaMaxxing is a creator-first platform that connects you directly with brands running paid UGC campaigns. You pick a campaign, film your videos, submit them for review, and get paid automatically once approved. It's the easiest way to turn short-form content into income. No outreach, no clients, no middlemen.",
    provenance: "live-site",
  },
  {
    question: "Do I need experience or followers?",
    answer:
      "No. Templates walk you through what to film, and payouts are per-view — not per-follower. Natalie hit $30,361 on under 2,000 followers using the same playbook. (Placeholder answer — replace during copy pass.)",
    provenance: "placeholder",
  },
  {
    question: "How fast can I start earning?",
    answer:
      "Sign-up is instant. Most creators submit their first campaign the same day and see approvals within 48 hours. Payouts are automatic once your work clears review. (Placeholder answer — replace during copy pass.)",
    provenance: "placeholder",
  },
  {
    question: "What kinds of campaigns are available?",
    answer:
      "Brand campaigns across consumer products, apps, and services — each with a template that has already gone viral. New campaigns land weekly. (Placeholder answer — replace during copy pass.)",
    provenance: "placeholder",
  },
  {
    question: "Is this available worldwide?",
    answer:
      "Creators from most countries are eligible — payouts land via standard international rails. (Placeholder answer — replace during copy pass.)",
    provenance: "placeholder",
  },
];
