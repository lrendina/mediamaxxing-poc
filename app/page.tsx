import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-start justify-center gap-6 max-w-[600px] mx-auto px-6 py-24">
      <p className="text-[13px] text-muted">
        Phase 1 — design system in progress.
      </p>
      <h1 className="text-[40px] leading-[1.1] font-medium">
        MediaMaxxing reskin
      </h1>
      <p className="text-muted max-w-[52ch]">
        Proof-of-concept for a design interview. The three-column app shell,
        feed, and content pages arrive in later phases. For now, the design
        system is reviewable in isolation.
      </p>
      <Link
        href="/styleguide"
        className="inline-flex items-center gap-2 rounded-full bg-payout px-5 py-3 text-canvas font-medium hover:brightness-95 transition"
      >
        Open styleguide
        <span aria-hidden>→</span>
      </Link>
    </main>
  );
}
