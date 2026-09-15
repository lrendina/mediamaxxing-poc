import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Accordion } from "@/components/Accordion";
import { Badge } from "@/components/Badge";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CTABand } from "@/components/CTABand";
import { LogoLockup } from "@/components/LogoLockup";
import { ProofCard } from "@/components/ProofCard";
import { StatGrid } from "@/components/StatGrid";
import { StepCard } from "@/components/StepCard";
import { CREATORS } from "@/content/creators";
import { STEPS } from "@/content/steps";
import { FAQ } from "@/content/faq";
import { BLOG_POSTS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Styleguide — MediaMaxxing",
  description:
    "Design tokens and every primitive with every state — the design-system review surface.",
};

/* Hex values are documentation only — every component reads the CSS
   variable. Keep this list in sync with app/globals.css. */
const swatches = [
  { name: "lime",         hex: "#D4FF3A", role: "the brand. Money, hero, CTA band",  text: "ink"         },
  { name: "surface-dark", hex: "#0A0A0A", role: "black bands, top bar, footer",     text: "ink-inverse" },
  { name: "canvas",       hex: "#F2F1EA", role: "paper — reading sections",          text: "ink"         },
  { name: "surface",      hex: "#FFFFFF", role: "cards",                             text: "ink"         },
  { name: "surface-sunk", hex: "#E6E5DC", role: "inset rows, chips, tiles",          text: "ink"         },
  { name: "ink",          hex: "#0A0A0A", role: "text, primary button",              text: "ink-inverse" },
  { name: "muted",        hex: "#5C5B54", role: "secondary text",                    text: "ink-inverse" },
  { name: "money-ink",    hex: "#3F6B00", role: "lime as text on light surfaces",    text: "ink-inverse" },
  { name: "streak",       hex: "#FF5A1F", role: "progress, XP, urgency, focus ring", text: "ink-inverse" },
  { name: "warn",         hex: "#B57F00", role: "attention, scarcity, bounty",       text: "ink-inverse" },
  { name: "status",       hex: "#FF3DAE", role: "tier badges",                       text: "ink-inverse" },
  { name: "discord",      hex: "#5865F2", role: "Join Discord only",                 text: "ink-inverse" },
] as const;

const typeScale = [
  { label: "xs",  px: 13, use: "meta, captions, table figures" },
  { label: "sm",  px: 15, use: "body — the workhorse size"     },
  { label: "md",  px: 18, use: "lead paragraphs, card titles"  },
  { label: "lg",  px: 24, use: "section headings inside a card"},
  { label: "xl",  px: 40, use: "page-level headings"           },
  { label: "2xl", px: 64, use: "hero — one per page, at most"  },
] as const;

const sampleProof = CREATORS[0];
const samplePost = BLOG_POSTS[0];
const sampleBlogCardData = {
  href: `/blog/${samplePost.slug}`,
  title: samplePost.title,
  excerpt: samplePost.excerpt,
  cover: samplePost.cover,
  readMinutes: samplePost.readMinutes,
};

export default function Styleguide() {
  return (
    <div className="mx-auto max-w-[900px] px-6 py-16">
      <header className="mb-16 flex flex-col gap-3">
        <h1 className="font-display text-[clamp(48px,9vw,120px)]">Styleguide</h1>
        <p className="text-muted max-w-[60ch]">
          Every primitive, every state — the design-system review surface. Any
          change to the palette, typeface, or type scale after this page is
          signed off requires stopping and asking.
        </p>
      </header>

      {/* ── Palette ────────────────────────────────────────────────────── */}
      <Section title="Palette" note="Black and acid lime. Lime is the brand and is allowed to fill a section. The creator app inverts the same roles onto black.">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {swatches.map((s) => (
            <div key={s.name} className="rounded-[var(--radius-card)] overflow-hidden border border-border">
              <div
                className="h-20 flex items-end px-4 py-3"
                style={{ backgroundColor: `var(--${s.name})`, color: `var(--${s.text})` }}
              >
                <span className="font-mono text-[12px]">{s.hex}</span>
              </div>
              <div className="bg-surface px-4 py-3 flex flex-col gap-1">
                <code className="text-[13px]">--{s.name}</code>
                <p className="text-[13px] text-muted">{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Type scale ─────────────────────────────────────────────────── */}
      <Section title="Type scale" note="One family. Archivo Expanded 800 uppercase is the poster voice (24 and up); Archivo 400–500 is UI and body; Archivo Expanded 500 is every number.">
        <div className="flex flex-col divide-y divide-border">
          {typeScale.map((t) => (
            <div key={t.label} className="grid grid-cols-[80px_1fr] gap-4 py-4 items-baseline">
              <div className="text-[13px] text-muted font-mono">{t.label} · {t.px}</div>
              <div className="flex flex-col gap-1 min-w-0">
                <div
                  style={{ fontSize: `${t.px}px`, lineHeight: 1.1 }}
                  className={`truncate ${t.px >= 24 ? "font-display" : ""}`}
                >
                  The order is the product.
                </div>
                <div className="text-[13px] text-muted">{t.use}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Numerals ──────────────────────────────────────────────────── */}
      <Section
        title="Numerals"
        note="Archivo's expanded width, reserved for dollar figures and counters. Tabular figures on every number so counters do not jitter."
      >
        <div className="rounded-[var(--radius-card)] bg-surface border border-border px-6 py-8 flex flex-col gap-4">
          <NumeralRow label="default">
            <span className="text-[40px] leading-none">$100,227</span>
          </NumeralRow>
          <NumeralRow label="expanded">
            <span className="text-[40px] leading-none font-expanded">$100,227</span>
          </NumeralRow>
          <NumeralRow label="expanded lg">
            <span className="text-[64px] leading-none font-expanded text-money">$45,402</span>
          </NumeralRow>
          <NumeralRow label="counter">
            <span className="text-[24px] leading-none font-expanded">1,204,908</span>
          </NumeralRow>
        </div>
      </Section>

      {/* ── LogoLockup ────────────────────────────────────────────────── */}
      <Section title="LogoLockup" note="Icon + wordmark. Wordmark hides when the sidebar collapses to its icon rail.">
        <div className="flex flex-col gap-5">
          <StateRow label="sm">           <LogoLockup size="sm" /></StateRow>
          <StateRow label="md (default)"> <LogoLockup size="md" /></StateRow>
          <StateRow label="lg">           <LogoLockup size="lg" /></StateRow>
          <StateRow label="icon-only">    <LogoLockup size="md" showWordmark={false} /></StateRow>
        </div>
      </Section>

      {/* ── Button ────────────────────────────────────────────────────── */}
      <Section
        title="Button"
        note="Primary is ink. Secondary is money, for the one CTA that is literally about getting paid. Ghost is a hairline."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["primary", "secondary", "ghost"] as const).map((variant) => (
            <div key={variant} className="rounded-[var(--radius-card)] border border-border p-5 flex flex-col gap-5">
              <div className="text-[13px] text-muted">{variant}</div>
              <StateRow label="default">
                <Button variant={variant}>Get started</Button>
              </StateRow>
              <StateRow label="disabled">
                <Button variant={variant} disabled>Get started</Button>
              </StateRow>
              <StateRow label="small">
                <Button variant={variant} size="sm">Get started</Button>
              </StateRow>
              <StateRow label="as link">
                <Button variant={variant} href="#">Get started</Button>
              </StateRow>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Badge ─────────────────────────────────────────────────────── */}
      <Section
        title="Badge"
        note="Tier badges use --status so they read as status, not decoration. Payout badges use --money. Neutral for everything non-urgent."
      >
        <div className="flex flex-col gap-6">
          <StateRow label="tier">
            <div className="flex flex-wrap gap-2">
              <Badge tone="neutral">Beginner</Badge>
              <Badge tone="neutral">Intermediate</Badge>
              <Badge tone="live">Advanced</Badge>
            </div>
          </StateRow>
          <StateRow label="status">
            <div className="flex flex-wrap gap-2">
              <Badge tone="payout">Payouts open</Badge>
              <Badge tone="live">Limited spots</Badge>
              <Badge tone="neutral">Waitlist</Badge>
            </div>
          </StateRow>
        </div>
      </Section>

      {/* ── Card ──────────────────────────────────────────────────────── */}
      <Section
        title="Card"
        note="Variants exist so hierarchy is visible in the feed. Never render every card with the same radius and shadow."
      >
        <div className="grid grid-cols-1 gap-4">
          {(["default", "panel", "spotlight"] as const).map((variant) => (
            <Card key={variant} variant={variant} className="flex flex-col gap-1">
              <p className="text-[13px] text-muted">variant: {variant}</p>
              <p className="text-[18px]">The container for one item in the feed.</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── StatGrid ──────────────────────────────────────────────────── */}
      <Section title="StatGrid" note="Replaces the middle-dot stat strings from the kill list.">
        <div className="flex flex-col gap-6">
          <Card variant="panel"><StatGrid stats={[
            { label: "Accounts", value: "17" },
            { label: "Posts",    value: "5,900" },
          ]} /></Card>
          <Card variant="panel"><StatGrid stats={[
            { label: "Accounts", value: "17"    },
            { label: "Posts",    value: "5,900" },
            { label: "Per day",  value: "50"    },
          ]} /></Card>
          <Card variant="panel"><StatGrid stats={[
            { label: "Accounts", value: "17"      },
            { label: "Posts",    value: "5,900"   },
            { label: "Per day",  value: "50"      },
            { label: "Earned",   value: "$100,227", expanded: true },
          ]} /></Card>
        </div>
      </Section>

      {/* ── StepCard ──────────────────────────────────────────────────── */}
      <Section title="StepCard" note="Icon + title + body. No numeric markers, except in the MCP flow.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-[var(--radius-card)] bg-surface-dark p-6">
          {STEPS.map((step) => (
            <StepCard key={step.title} title={step.title}>
              {step.description}
            </StepCard>
          ))}
        </div>
      </Section>

      {/* ── Accordion ─────────────────────────────────────────────────── */}
      <Section
        title="Accordion"
        note="Wraps native <details>/<summary> — keyboard nav and ARIA come for free. No JS state, no animation library."
      >
        <Card variant="panel" pad="lg">
          <Accordion items={FAQ} />
        </Card>
      </Section>

      {/* ── BlogCard ──────────────────────────────────────────────────── */}
      <Section title="BlogCard" note="Cover image + title + excerpt + read-time meta.">
        <div className="max-w-[520px]">
          <BlogCard data={sampleBlogCardData} />
        </div>
      </Section>

      {/* ── CTABand ───────────────────────────────────────────────────── */}
      <Section title="CTABand" note="Full-bleed lime band that ends a page. Headline at viewport scale, ink button.">
        <CTABand
          eyebrow="For creators"
          headline="Turn your feed into a paycheck."
          ctaLabel="Get started"
          ctaHref="#"
        >
          Free to join. Weekly payouts. No résumé, no follower count. It works the way a real creator economy should.
        </CTABand>
      </Section>

      {/* ── ProofCard ─────────────────────────────────────────────────── */}
      <Section
        title="ProofCard"
        note="The center of gravity of the feed. Click the dashboard to open the full screenshot + phone shot in a native modal."
      >
        <ProofCard data={sampleProof} />
      </Section>

      {/* ── Layout ────────────────────────────────────────────────────── */}
      <Section
        title="Layout"
        note="Marketing: sticky black top bar, full-bleed colour sections, 1440 content max. Creator app: 248px sidebar (56 collapsed), content 1160 max, 380 right rail below 1280 stacks."
      >
        <div className="hidden md:grid rounded-[var(--radius-card)] border border-border overflow-hidden [grid-template-columns:240px_1fr_300px]">
          <div className="bg-surface-sunk h-40 flex items-center justify-center text-[13px] text-muted">sidebar · 240</div>
          <div className="bg-canvas h-40 flex items-center justify-center text-[13px] text-muted border-x border-border">feed · max 600</div>
          <div className="bg-surface-sunk h-40 flex items-center justify-center text-[13px] text-muted">right rail · 300</div>
        </div>
        <p className="mt-3 text-[13px] text-muted md:hidden">
          (Diagram is a desktop preview — you&rsquo;re currently on a narrower viewport.)
        </p>
      </Section>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* Local rendering helpers — inline, not exported                         */
/* ────────────────────────────────────────────────────────────────────── */

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-16">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-[24px] leading-tight font-medium">{title}</h2>
        {note ? <p className="text-[15px] text-muted max-w-[60ch]">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

function StateRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-[13px] text-muted">{label}</span>
      {children}
    </div>
  );
}

function NumeralRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-6">
      <span className="text-[13px] text-muted w-24">{label}</span>
      {children}
    </div>
  );
}
