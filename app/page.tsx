import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/icons";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-start justify-center gap-6 max-w-[600px] mx-auto px-6 py-24">
      <p className="text-[13px] text-muted">
        Phase 3 — primitives extracted, styleguide extended.
      </p>
      <h1 className="text-[40px] leading-[1.1] font-medium">
        MediaMaxxing reskin
      </h1>
      <p className="text-muted max-w-[52ch]">
        Proof-of-concept for a design interview. The feed of real content
        arrives in Phase 5. For now, the design system and every primitive are
        reviewable in isolation.
      </p>
      <Button href="/styleguide" variant="primary">
        Open styleguide
        <ArrowRightIcon aria-hidden />
      </Button>
    </main>
  );
}
