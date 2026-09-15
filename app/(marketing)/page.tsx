import { Section } from "@/components/Section";
import { HOME_PLACEHOLDER_SECTIONS } from "@/content/home-placeholder";

/* Phase 2 shell preview — see content/home-placeholder.ts. Phase 5
   replaces this with the landing page. */
export default function Home() {
  return (
    <>
      {HOME_PLACEHOLDER_SECTIONS.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          aria-label={section.label}
          tone={section.tone}
          hidesStickyHeader={section.hidesStickyHeader}
        >
          <div
            className={`flex min-h-[480px] items-center justify-center rounded border border-dashed p-6 text-center ${
              section.tone === "dark"
                ? "border-ink-inverse/30 bg-ink-inverse/5 text-ink-inverse"
                : "border-border bg-surface-sunk text-muted"
            }`}
          >
            <p className="text-small">{section.label}</p>
          </div>
        </Section>
      ))}
    </>
  );
}
