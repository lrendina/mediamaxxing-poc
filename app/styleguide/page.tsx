import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Styleguide — MediaMaxxing",
  description:
    "Design tokens, type scale, and interactive states — the Phase 1 sign-off surface.",
};

/* Local tokens — kept inline until Phase 3 formalizes primitives. */
const swatches = [
  { name: "canvas",  hex: "#FFFFFF", role: "page background",                    text: "ink"    },
  { name: "panel",   hex: "#EDF1EC", role: "card surface, sidebar rail",         text: "ink"    },
  { name: "ink",     hex: "#0E1A12", role: "primary text",                       text: "canvas" },
  { name: "muted",   hex: "#5F6F63", role: "secondary text, metadata",           text: "canvas" },
  { name: "payout",  hex: "#16C95C", role: "money, counters, primary CTA only",  text: "canvas" },
  { name: "live",    hex: "#f6ff4dfe", role: "scarcity and status only",           text: "canvas" },
] as const;

const typeScale = [
  { label: "xs",  px: 13, use: "meta, captions, table figures" },
  { label: "sm",  px: 15, use: "body — the workhorse size"     },
  { label: "md",  px: 18, use: "lead paragraphs, card titles"  },
  { label: "lg",  px: 24, use: "section headings inside a card"},
  { label: "xl",  px: 40, use: "page-level headings"           },
  { label: "2xl", px: 64, use: "hero — one per page, at most"  },
] as const;

const btn = {
  base:
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 " +
    "text-[15px] font-medium leading-none transition disabled:opacity-40 disabled:cursor-not-allowed",
  primary:
    "bg-payout text-canvas hover:brightness-95 active:brightness-90",
  secondary:
    "bg-ink text-canvas hover:opacity-90 active:opacity-80",
  ghost:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/[0.03] active:bg-ink/[0.06]",
} as const;

/* Forced-state previews — apply the "would-be" style so a reviewer can see
   hover/focus/disabled without interacting. Interactive controls below still
   respond naturally. */
const stateCell = "flex flex-col items-start gap-2";
const stateLabel = "text-[13px] text-muted";

export default function Styleguide() {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-16">
      <header className="mb-16 flex flex-col gap-3">
        <h1 className="text-[40px] leading-[1.05] font-medium">
          Styleguide
        </h1>
        <p className="text-muted max-w-[60ch]">
          The Phase 1 sign-off surface — palette, type, and every interactive
          state, rendered in isolation. Every later phase inherits these
          decisions.
        </p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Palette                                                             */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Palette" note="Two chromatic colors, each with one job. Everything else is neutral.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {swatches.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl overflow-hidden border border-ink/10"
            >
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

      {/* ------------------------------------------------------------------ */}
      {/* Type scale                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section
        title="Type scale"
        note="Archivo, one family. Scale is 13 / 15 / 18 / 24 / 40 / 64. Body 15/1.6."
      >
        <div className="flex flex-col divide-y divide-ink/10">
          {typeScale.map((t) => (
            <div
              key={t.label}
              className="grid grid-cols-[80px_1fr] gap-4 py-4 items-baseline"
            >
              <div className="text-[13px] text-muted font-mono">
                {t.label} · {t.px}
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <div
                  style={{ fontSize: `${t.px}px`, lineHeight: 1.2 }}
                  className="truncate"
                >
                  The order is the product.
                </div>
                <div className="text-[13px] text-muted">{t.use}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Numerals                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section
        title="Numerals"
        note="Archivo's expanded width, reserved for dollar figures and counters. Tabular figures on every number so counters do not jitter."
      >
        <div className="rounded-2xl bg-panel px-6 py-8 flex flex-col gap-4">
          <div className="flex items-baseline gap-6">
            <span className="text-[13px] text-muted w-24">default</span>
            <span className="text-[40px] leading-none">$100,227</span>
          </div>
          <div className="flex items-baseline gap-6">
            <span className="text-[13px] text-muted w-24">expanded</span>
            <span className="text-[40px] leading-none font-expanded">
              $100,227
            </span>
          </div>
          <div className="flex items-baseline gap-6">
            <span className="text-[13px] text-muted w-24">expanded lg</span>
            <span className="text-[64px] leading-none font-expanded text-payout">
              $45,402
            </span>
          </div>
          <div className="flex items-baseline gap-6">
            <span className="text-[13px] text-muted w-24">counter</span>
            <span className="text-[24px] leading-none font-expanded">
              1,204,908
            </span>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Buttons                                                             */}
      {/* ------------------------------------------------------------------ */}
      <Section
        title="Buttons"
        note="Three variants. Primary is only ever green — if the action is not about earning, use secondary or ghost."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["primary", "secondary", "ghost"] as const).map((variant) => (
            <div
              key={variant}
              className="rounded-2xl border border-ink/10 p-5 flex flex-col gap-5"
            >
              <div className="text-[13px] text-muted">{variant}</div>

              <div className={stateCell}>
                <span className={stateLabel}>default</span>
                <button className={`${btn.base} ${btn[variant]}`}>
                  Get started
                </button>
              </div>

              <div className={stateCell}>
                <span className={stateLabel}>hover (forced)</span>
                <button
                  className={`${btn.base} ${btn[variant]}`}
                  data-force-hover
                  style={
                    variant === "primary"
                      ? { filter: "brightness(0.95)" }
                      : variant === "secondary"
                      ? { opacity: 0.9 }
                      : {
                          borderColor: "rgba(14,26,18,0.4)",
                          backgroundColor: "rgba(14,26,18,0.03)",
                        }
                  }
                >
                  Get started
                </button>
              </div>

              <div className={stateCell}>
                <span className={stateLabel}>focus (forced)</span>
                <button
                  className={`${btn.base} ${btn[variant]}`}
                  style={{
                    outline: "2px solid var(--ink)",
                    outlineOffset: 2,
                  }}
                >
                  Get started
                </button>
              </div>

              <div className={stateCell}>
                <span className={stateLabel}>disabled</span>
                <button className={`${btn.base} ${btn[variant]}`} disabled>
                  Get started
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Badges                                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section
        title="Badges"
        note="Tier badges use --live so they read as status, not decoration. Neutral badges for everything non-urgent."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className={stateLabel}>tier</span>
            <div className="flex flex-wrap gap-2">
              <Badge tone="neutral">Beginner</Badge>
              <Badge tone="neutral">Intermediate</Badge>
              <Badge tone="live">Advanced</Badge>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className={stateLabel}>status</span>
            <div className="flex flex-wrap gap-2">
              <Badge tone="payout">
                Payouts open
              </Badge>
              <Badge tone="live">
                Limited spots
              </Badge>
              <Badge tone="neutral">Waitlist</Badge>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Layout                                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section
        title="Layout"
        note="Left rail 240 · feed 600 max · right rail 300. Right rail drops below 1280, sidebar collapses to icons below 1024, becomes a bottom tab bar below 768."
      >
        <div className="hidden md:grid rounded-2xl border border-ink/10 overflow-hidden [grid-template-columns:240px_1fr_300px]">
          <div className="bg-panel h-40 flex items-center justify-center text-[13px] text-muted">
            sidebar · 240
          </div>
          <div className="bg-canvas h-40 flex items-center justify-center text-[13px] text-muted border-x border-ink/10">
            feed · max 600
          </div>
          <div className="bg-panel h-40 flex items-center justify-center text-[13px] text-muted">
            right rail · 300
          </div>
        </div>
        <p className="mt-3 text-[13px] text-muted md:hidden">
          (This diagram is a desktop preview — you&rsquo;re currently on a
          narrower viewport.)
        </p>
      </Section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Local rendering helpers — inline, not exported                             */
/* -------------------------------------------------------------------------- */

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-[24px] leading-tight font-medium">{title}</h2>
        {note ? (
          <p className="text-[15px] text-muted max-w-[60ch]">{note}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "neutral" | "payout" | "live";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "payout"
      ? "bg-payout/10 text-payout"
      : tone === "live"
      ? "bg-live/10 text-live"
      : "bg-ink/[0.06] text-ink";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium ${toneClass}`}
    >
      {children}
    </span>
  );
}
