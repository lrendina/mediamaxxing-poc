import { TopNav } from "@/components/TopNav";

/* Marketing surface: sticky black top bar, full-bleed sections below.
   Each page owns its own footer so the CTA band can sit directly above it. */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <main id="main" tabIndex={-1} className="min-w-0">
        {children}
      </main>
    </>
  );
}
