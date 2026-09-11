import type { Metadata } from "next";
import { Stub } from "@/components/Stub";

export const metadata: Metadata = {
  title: "For agencies — MediaMaxxing",
  description:
    "Stub route in the proof-of-concept. The real /for-agencies would follow the same feed pattern as /for-brands with agency-specific copy.",
};

export default function ForAgencies() {
  return (
    <Stub eyebrow="Stub route" title="For agencies">
      <p>
        This surface isn&rsquo;t built out in the proof-of-concept. The
        design system reads without it.
      </p>
      <p>
        In the real product, /for-agencies would follow the same feed
        pattern as /for-brands — hero, how it works, a features section, and
        a footer CTA — swapped for agency-focused copy, pricing tiers, and
        multi-client management value props.
      </p>
    </Stub>
  );
}
