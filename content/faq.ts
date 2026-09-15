import { FAQ_ITEMS } from "@/content/source/faq";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  heading: string;
  items: readonly FaqItem[];
}

/* LANDING-PAGE.md, Section 5. Only questions with real answer copy ship: the
   live-site answers in content/source/faq.ts. Questions without a sourced
   answer, and the spec's gap topics, were cut on request (2026-09-15) rather
   than filled with guesses. If more live answers are recovered into the
   source, they appear here without further changes. */
export const FAQ: FaqSection = {
  heading: "FAQ",
  items: FAQ_ITEMS.filter((item) => item.provenance === "live-site").map(
    ({ question, answer }) => ({ question, answer }),
  ),
};
