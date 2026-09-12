import type { Metadata } from "next";
import { Suspense } from "react";
import { AppShell } from "@/components/creator/AppShell";
import { CreatorStateProvider } from "@/components/creator/CreatorStateProvider";

export const metadata: Metadata = {
  title: "Creator app — MediaMaxxing",
  description:
    "Prototype of the MediaMaxxing creator dashboard, rebuilt in the redesign's token system. Fixtures only — no auth, no backend.",
};

/* The creator app surface. Page background is the app canvas (flat,
   hairline borders, no dark bands) — the marketing surface's
   BackdropController never runs here. */
export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="creator-surface min-h-svh">
      {/* useSearchParams inside the provider needs a Suspense boundary
          so the static shell can stream before the query is known. */}
      <Suspense fallback={null}>
        <CreatorStateProvider>
          <AppShell>{children}</AppShell>
        </CreatorStateProvider>
      </Suspense>
    </div>
  );
}
