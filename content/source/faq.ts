import type { Provenance, SourceMeta } from "./types";

export type SourceFaqItem = {
  question: string;
  answer: string;
  provenance: Provenance;
};

export const FAQ_META: SourceMeta = {
  provenance: "live-site",
  from: ["content/faq.ts", "screenshot of the live FAQ, supplied 2026-09-15"],
  note:
    "All five questions and answers are from the live site. Answer 1 was extracted verbatim by " +
    "the old build; answers 2–5 were transcribed verbatim from a screenshot of the live FAQ " +
    "supplied on 2026-09-15, replacing the old build's placeholders.",
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
      "No followers, no fancy setup. All you need is a phone, decent lighting, and effort. We care about video quality and creativity, not audience size. Most creators who start with zero experience earn their first payouts within days.",
    provenance: "live-site",
  },
  {
    question: "How fast can I start earning?",
    answer:
      "Immediately. From creating your account to your first post takes less than 60 seconds. From there, you can start posting right away using the viral formats provided inside your dashboard, or get creative and participate in our exclusive bounties. Once your videos are approved, payouts are processed automatically through Stripe.",
    provenance: "live-site",
  },
  {
    question: "What kinds of campaigns are available?",
    answer:
      "Everything from app demos and SaaS walkthroughs to product reviews, lifestyle ads, and voiceover UGC. Campaigns update weekly, with clear briefs, payout caps, and performance-based bonuses.",
    provenance: "live-site",
  },
  {
    question: "Is this available worldwide?",
    answer:
      "Yes. Creators from any country can apply. As long as you can receive Stripe payouts, you can earn from anywhere.",
    provenance: "live-site",
  },
];
