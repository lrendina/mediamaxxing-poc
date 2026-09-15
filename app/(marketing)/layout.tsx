import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyHeader } from "@/components/StickyHeader";

/* Marketing shell: the page-top header, the sticky header that takes over
   once it scrolls away, a column of sections, one footer. No sidebar, no
   rails. Widths live in Section and Container rather than here, so the
   final CTA can run full-bleed. The creator app mounts its own shell in
   app/creator/layout.tsx. */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <StickyHeader />
      <main id="main" tabIndex={-1} className="min-w-0 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
