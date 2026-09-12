import { Sidebar } from "@/components/Sidebar";
import { RightRail } from "@/components/RightRail";
import { MarketingTabBar } from "@/components/MarketingTabBar";

/* Marketing surface shell — the Phase 2 three-column layout. Route group
   so every public page inherits it while /creator mounts its own shell. */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
    </>
  );
}
