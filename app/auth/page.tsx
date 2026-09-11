import type { Metadata } from "next";
import { Stub } from "@/components/Stub";

export const metadata: Metadata = {
  title: "Sign in — MediaMaxxing",
  description:
    "Stub route. Authentication is out of scope for the proof-of-concept.",
};

export default function Auth() {
  return (
    <Stub eyebrow="Stub route" title="Sign in">
      <p>
        Authentication is out of scope for the proof-of-concept. The
        homepage&rsquo;s sign-in card and this route both link here so the
        surface exists, but there&rsquo;s no functioning flow behind it.
      </p>
      <p>
        In the real product, this route would host the sign-in and sign-up
        flows and gate the creator dashboard behind them.
      </p>
    </Stub>
  );
}
