import type { Metadata } from "next";
import { Stub } from "@/components/Stub";

export const metadata: Metadata = {
  title: "MCP — MediaMaxxing",
  description:
    "Stub route. The live /mcp is a complex interactive tool intentionally deferred in the POC scope.",
};

export default function Mcp() {
  return (
    <Stub eyebrow="Deliberately deferred" title="MCP">
      <p>
        The live site&rsquo;s /mcp is the most complex page in the product —
        tabs, a client selector, clipboard interactions, a simulated chat
        thread.
      </p>
      <p>
        Rebuilding it well for a proof-of-concept costs more than it
        proves. Building it badly is worse than not building it. It&rsquo;s
        deliberately out of scope; see the writeup for the scope
        rationale.
      </p>
    </Stub>
  );
}
