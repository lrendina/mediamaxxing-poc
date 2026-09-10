import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Accordion } from "@/components/Accordion";
import { Badge } from "@/components/Badge";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Counter } from "@/components/Counter";
import { CTABand } from "@/components/CTABand";
import { FeatureStatCard } from "@/components/FeatureStatCard";
import { LogoLockup } from "@/components/LogoLockup";
import { ProofCard } from "@/components/ProofCard";
import { StatGrid } from "@/components/StatGrid";
import { StepCard } from "@/components/StepCard";
import { HomeIcon, BrandsIcon, AgenciesIcon } from "@/components/icons";
import { CREATORS } from "@/content/creators";
import { STEPS } from "@/content/steps";
import { FAQ } from "@/content/faq";
import { BLOG_POSTS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Styleguide — MediaMaxxing",
  description:
    "Design tokens and every primitive with every state — the design-system review surface.",
};

const swatches = [
  { name: "canvas",  hex: "#FFFFFF",   role: "page background",                    text: "ink"    },
  { name: "panel",   hex: "#EDF1EC",   role: "card surface, sidebar rail",         text: "ink"    },
  { name: "ink",     hex: "#0E1A12",   role: "primary text",                       text: "canvas" },
  { name: "muted",   hex: "#5F6F63",   role: "secondary text, metadata",           text: "canvas" },
  { name: "payout",  hex: "#16C95C",   role: "money, counters, primary CTA only",  text: "canvas" },
  { name: "live",    hex: "#944dfffe", role: "scarcity and status only",           text: "canvas" },
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
        <h1 className="text-[40px] leading-[1.05] font-medium">Styleguide</h1>
        <p className="text-muted max-w-[60ch]">
          Every primitive, every state — the design-system review surface. Any
          change to the palette, typeface, or type scale after this page is
          signed off requires stopping and asking.
        </p>
      </header>

      {/* ── Palette ────────────────────────────────────────────────────── */}
      <Section title="Palette" note="Two chromatic colors, each with one job. Everything else is neutral.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {swatches.map((s) => (
            <div key={s.name} className="rounded-2xl overflow-hidden border border-ink/10">
              <div
                className="h-24 flex items-end px-4 py-3"
                style={{ backgroundColor: s.hex, color: `var(--${s.text})` }}
              >
                <span className="font-mono text-[13px]">{s.hex}</span>
              </div>
              <div className="bg-canvas px-4 py-3 flex flex-col gap-1">
                <code className="text-[13px]">--{s.name}</code>
                <p className="text-[13px] text-muted">{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Type scale ─────────────────────────────────────────────────── */}
      <Section title="Type scale" note="Archivo, one family. Scale is 13 / 15 / 18 / 24 / 40 / 64. Body 15/1.6.">
        <div className="flex flex-col divide-y divide-ink/10">
          {typeScale.map((t) => (
            <div key={t.label} className="grid grid-cols-[80px_1fr] gap-4 py-4 items-baseline">
              <div className="text-[13px] text-muted font-mono">{t.label} · {t.px}</div>
              <div className="flex flex-col gap-1 min-w-0">
                <div style={{ fontSize: `${t.px}px`, lineHeight: 1.2 }} className="truncate">
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
        <div className="rounded-2xl bg-panel px-6 py-8 flex flex-col gap-4">
          <NumeralRow label="default">
            <span className="text-[40px] leading-none">$100,227</span>
          </NumeralRow>
          <NumeralRow label="expanded">
            <span className="text-[40px] leading-none font-expanded">$100,227</span>
          </NumeralRow>
          <NumeralRow label="expanded lg">
            <span className="text-[64px] leading-none font-expanded text-payout">$45,402</span>
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
        note="Three variants. Primary is only ever payout-green — if the action is not about earning, use secondary or ghost."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["primary", "secondary", "ghost"] as const).map((variant) => (
            <div key={variant} className="rounded-2xl border border-ink/10 p-5 flex flex-col gap-5">
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
        note="Tier badges use --live so they read as status, not decoration. Neutral for everything non-urgent."
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

      {/* ── Counter ───────────────────────────────────────────────────── */}
      <Section
        title="Counter"
        note="Count-up on first view only. Respects prefers-reduced-motion — reduced-motion users see the final value immediately."
      >
        <Card variant="panel" className="flex items-baseline gap-3">
          <span className="text-[13px] text-muted w-24">Paid this month</span>
          <Counter value={1204908} prefix="$" className="text-[40px] leading-none font-expanded text-payout" />
        </Card>
      </Section>

      {/* ── StepCard ──────────────────────────────────────────────────── */}
      <Section title="StepCard" note="Icon + title + body. No numeric markers, except in the MCP flow.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((step, i) => {
            const Icon = [HomeIcon, BrandsIcon, AgenciesIcon][i] ?? HomeIcon;
            return (
              <StepCard key={step.title} icon={<Icon width={20} height={20} />} title={step.title}>
                {step.description}
              </StepCard>
            );
          })}
        </div>
      </Section>

      {/* ── FeatureStatCard ───────────────────────────────────────────── */}
      <Section title="FeatureStatCard" note="Anchors a section with a single expanded numeral.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureStatCard value="$1.2M" label="Paid to creators this month" tone="payout">
            The number keeps climbing — updated as payouts land.
          </FeatureStatCard>
          <FeatureStatCard value="342" label="Creators earning right now">
            Median payout is up 41% year over year.
          </FeatureStatCard>
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
      <Section title="CTABand" note="Ink-toned band that ends a section or a page. Inverted button reads as CTA even in the dark box.">
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
        note="Left rail 240 · feed 600 max · right rail 300. Right rail drops below 1280, sidebar collapses to icons below 1024, becomes a bottom tab bar below 768."
      >
        <div className="hidden md:grid rounded-2xl border border-ink/10 overflow-hidden [grid-template-columns:240px_1fr_300px]">
          <div className="bg-panel h-40 flex items-center justify-center text-[13px] text-muted">sidebar · 240</div>
          <div className="bg-canvas h-40 flex items-center justify-center text-[13px] text-muted border-x border-ink/10">feed · max 600</div>
          <div className="bg-panel h-40 flex items-center justify-center text-[13px] text-muted">right rail · 300</div>
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
