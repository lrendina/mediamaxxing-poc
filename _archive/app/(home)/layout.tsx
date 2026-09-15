import type { Metadata } from "next";
import { Sidebar } from "@/components/original/Sidebar";
import { RightRail } from "@/components/original/RightRail";
import { MarketingTabBar } from "@/components/original/MarketingTabBar";
import { DemoVariantToggle } from "@/components/DemoVariantToggle";

export const metadata: Metadata = {
  title: "MediaMaxxing",
  description:
    "A proof-of-concept reskin of mediamaxxing.com — a three-column app shell built for a design interview.",
};

/* The default homepage (`/`) — the pre-loud-redesign marketing shell
   (sidebar, centered feed, right rail), scoped under .original-surface so
   its paper-and-signal tokens don't leak onto the rest of the site. A
   route group (no path segment of its own) so it can own `/` with its own
   shell instead of TopNav, the same way app/(marketing) owns its routes.
   The loud direction moved to /(marketing)/loud so it stays reachable via
   DemoVariantToggle; see components/original/Sidebar.tsx for the
   restoration note this shell itself carries forward. */
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="original-surface min-h-svh">
      <div
        className="
          min-h-svh
          grid grid-cols-1
          md:grid-cols-[72px_1fr]
          lg:grid-cols-[240px_1fr]
          xl:grid-cols-[240px_1fr_300px]
        "
      >
        <Sidebar />

        <main
          id="main"
          tabIndex={-1}
          className="
            min-w-0
            pb-[calc(var(--mobile-tabs)+env(safe-area-inset-bottom))]
            md:pb-0
          "
        >
          {children}
        </main>

        <RightRail />
      </div>

      <MarketingTabBar />
      <DemoVariantToggle active="original" />
    </div>
  );
}
