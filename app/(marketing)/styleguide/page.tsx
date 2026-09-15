import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { TokenReadout } from "@/components/TokenReadout";
import {
  BUTTONS,
  NUMERALS,
  PALETTE_GROUPS,
  PILLS,
  RADIUS_SPECIMENS,
  ROLES,
  SECTIONS,
  SHADOW_SPECIMENS,
  SPACING_STEPS,
  STYLEGUIDE_INTRO,
  STYLEGUIDE_META,
  SURFACES,
  TEXT,
  TYPE_FRAMES,
  TYPE_LEVELS,
  TYPE_TABLE,
  type RoleSwatch,
  type SectionId,
  type ShadowId,
  type Swatch,
  type TypeLevelId,
} from "@/content/styleguide";

export const metadata: Metadata = STYLEGUIDE_META;

/* Phase 1 sign-off surface: tokens, type, geometry, buttons and pills.
   Page primitives join in Phase 3, once they're adapted. */

const TYPE_CLASS: Record<TypeLevelId, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  body: "text-body",
  small: "text-small text-muted",
};

const SHADOW_CLASS: Record<ShadowId, string> = {
  flat: "border border-border",
  "shadow-1": "shadow-1",
  "shadow-2": "shadow-2",
  hover:
    "shadow-1 transition-[box-shadow,transform] duration-150 ease-out hover:shadow-2 motion-safe:hover:-translate-y-0.5",
};

export default function Styleguide() {
  return (
    <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--gutter)] py-[var(--section-pad)]">
      <header className="flex max-w-[var(--text-max)] flex-col gap-4">
        <h1 className="text-h2">{STYLEGUIDE_INTRO.heading}</h1>
        <p className="text-body text-muted">{STYLEGUIDE_INTRO.body}</p>
      </header>

      <div className="mt-16 flex flex-col gap-16 md:mt-24 md:gap-24">
        <Section id="palette">
          <div className="flex flex-col gap-8">
            <SwatchGroup title={PALETTE_GROUPS.surfaces} swatches={SURFACES} />
            <SwatchGroup title={PALETTE_GROUPS.text} swatches={TEXT} />
            <Group title={PALETTE_GROUPS.roles}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {ROLES.map((role) => (
                  <RoleCard key={role.token} role={role} />
                ))}
              </div>
            </Group>
          </div>
        </Section>

        <Section id="type">
          <div className="flex flex-col gap-8">
            <div className="overflow-x-auto rounded border border-border bg-surface">
              <table className="w-full text-left text-small">
                <thead className="text-muted">
                  <tr className="border-b border-border">
                    {[TYPE_TABLE.level, TYPE_TABLE.desktop, TYPE_TABLE.mobile, TYPE_TABLE.use].map((heading) => (
                      <th key={heading} scope="col" className="whitespace-nowrap px-4 py-2 font-medium">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TYPE_LEVELS.map((level) => (
                    <tr key={level.id} className="border-b border-border last:border-0">
                      <th scope="row" className="whitespace-nowrap px-4 py-2 font-medium">{level.label}</th>
                      <td className="whitespace-nowrap px-4 py-2">{level.desktop}</td>
                      <td className="whitespace-nowrap px-4 py-2">{level.mobile}</td>
                      <td className="px-4 py-2 text-muted">{level.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Frame label={TYPE_FRAMES.desktop}>
              <TypeStack size="desktop" />
            </Frame>
            <Frame label={TYPE_FRAMES.mobile} mobile>
              <TypeStack size="mobile" />
            </Frame>
          </div>
        </Section>

        <Section id="numerals">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-8 rounded border border-border bg-surface p-6 md:p-8">
              {NUMERALS.rows.map((row) => {
                const face = row.expanded ? "font-expanded" : "";
                return (
                  <div key={row.label} className="flex flex-col gap-2">
                    <span className="text-small text-muted">{row.label}</span>
                    <span className={`text-h2 font-medium ${face}`}>{NUMERALS.specimen}</span>
                    <span className={`text-h3 font-medium ${face}`}>{NUMERALS.digits}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-4 rounded border border-border bg-surface p-6 md:p-8">
              <span className="text-small text-muted">{NUMERALS.columnLabel}</span>
              <ul className="flex flex-col gap-2 text-right">
                {NUMERALS.column.map((figure) => (
                  <li key={figure} className="text-h3 font-expanded">
                    {figure}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="radius">
          <div className="flex flex-wrap items-end gap-8">
            <Specimen label={RADIUS_SPECIMENS.radius}>
              <div className="size-32 rounded border border-border bg-surface" />
            </Specimen>
            <Specimen label={RADIUS_SPECIMENS.pill}>
              <div className="h-8 w-32 rounded-full bg-surface-sunk" />
            </Specimen>
          </div>
        </Section>

        <Section id="shadows">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SHADOW_SPECIMENS.map((specimen) => (
              <div
                key={specimen.id}
                className={`flex min-h-32 flex-col gap-2 rounded bg-surface p-6 ${SHADOW_CLASS[specimen.id]}`}
              >
                <code className="text-small font-medium">{specimen.label}</code>
                <p className="text-small text-muted">{specimen.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="spacing">
          <ul className="flex flex-col gap-4">
            {SPACING_STEPS.map((px) => (
              <li key={px} className="flex items-center gap-4">
                <span className="w-12 shrink-0 text-right text-small text-muted">{px}</span>
                <span className="h-4 bg-surface-dark" style={{ width: px }} />
              </li>
            ))}
          </ul>
        </Section>

        <Section id="buttons">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {BUTTONS.variants.map((variant) => (
              <div key={variant.id} className="flex flex-col gap-6 rounded border border-border bg-surface p-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-h3">{variant.label}</h3>
                  <p className="text-small text-muted">{variant.note}</p>
                </div>
                {BUTTONS.sizes.map((size) => (
                  <StateRow key={size.id} label={size.label}>
                    <Button variant={variant.id} size={size.id}>
                      {BUTTONS.sample}
                    </Button>
                  </StateRow>
                ))}
                <StateRow label={BUTTONS.states.disabled}>
                  <Button variant={variant.id} disabled>
                    {BUTTONS.sample}
                  </Button>
                </StateRow>
                <StateRow label={BUTTONS.states.link}>
                  <Button variant={variant.id} href="#buttons">
                    {BUTTONS.sample}
                  </Button>
                </StateRow>
                <StateRow label={BUTTONS.states.dark} dark>
                  <Button variant={variant.id}>{BUTTONS.sample}</Button>
                </StateRow>
              </div>
            ))}
          </div>
        </Section>

        <Section id="pills">
          <div className="flex flex-wrap gap-6 rounded border border-border bg-surface p-6 md:p-8">
            {PILLS.map((pill) => (
              <div key={pill.tone} className="flex flex-col items-start gap-2">
                <Badge tone={pill.tone}>{pill.label}</Badge>
                <code className="text-small text-muted">{pill.tone}</code>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* Local rendering helpers — inline, not exported                         */
/* ────────────────────────────────────────────────────────────────────── */

function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  const copy = SECTIONS[id];
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="flex scroll-mt-24 flex-col gap-8">
      <div className="flex max-w-[var(--text-max)] flex-col gap-4">
        <h2 id={`${id}-heading`} className="text-h3">
          {copy.title}
        </h2>
        <p className="text-body text-muted">{copy.note}</p>
      </div>
      {children}
    </section>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-small font-medium text-muted">{title}</h3>
      {children}
    </div>
  );
}

function SwatchGroup({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <Group title={title}>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {swatches.map((swatch) => (
          <div key={swatch.token} className="overflow-hidden rounded border border-border bg-surface">
            <div className="h-24 border-b border-border" style={{ background: `var(--${swatch.token})` }} />
            <div className="flex flex-col gap-2 p-4">
              <code className="break-all text-small font-medium">--{swatch.token}</code>
              <TokenReadout token={swatch.token} className="text-small text-muted" />
              <p className="text-small text-muted">{swatch.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Group>
  );
}

function RoleCard({ role }: { role: RoleSwatch }) {
  return (
    <div className="flex flex-col overflow-hidden rounded border border-border bg-surface">
      <div className="flex h-24 border-b border-border">
        <div className="flex-1" style={{ background: `var(--${role.token})` }} />
        {role.sunk ? <div className="flex-1" style={{ background: `var(--${role.sunk})` }} /> : null}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <code className="text-small font-medium">--{role.token}</code>
            <TokenReadout token={role.token} className="text-small text-muted" />
          </div>
          <p className="text-body font-medium">{role.meaning}</p>
          <p className="text-small text-muted">{role.where}</p>
        </div>
        <dl className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-small">
          {role.contrast.map((pair) => (
            <div key={pair.label} className="flex justify-between gap-4">
              <dt className="text-muted">{pair.label}</dt>
              <dd>
                <TokenReadout token={pair.fg} against={pair.bg} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function Frame({ label, mobile = false, children }: { label: string; mobile?: boolean; children: ReactNode }) {
  return (
    <figure className={`flex w-full flex-col gap-2 ${mobile ? "max-w-[375px]" : ""}`}>
      <figcaption className="text-small text-muted">{label}</figcaption>
      <div className={`rounded border border-border bg-surface ${mobile ? "px-6 py-8" : "p-6 md:p-8"}`}>
        {children}
      </div>
    </figure>
  );
}

function TypeStack({ size }: { size: "desktop" | "mobile" }) {
  return (
    <div className="flex flex-col gap-4 break-words">
      {TYPE_LEVELS.map((level) => (
        <p key={level.id} className={TYPE_CLASS[level.id]} style={{ fontSize: `var(--type-${level.id}-${size})` }}>
          {level.sample}
        </p>
      ))}
    </div>
  );
}

function Specimen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure className="flex flex-col items-start gap-4">
      {children}
      <figcaption className="text-small text-muted">{label}</figcaption>
    </figure>
  );
}

function StateRow({ label, dark = false, children }: { label: string; dark?: boolean; children: ReactNode }) {
  return (
    <div className={`flex flex-col items-start gap-2 ${dark ? "self-stretch rounded bg-surface-dark p-4" : ""}`}>
      <span className={`text-small ${dark ? "text-ink-inverse" : "text-muted"}`}>{label}</span>
      {children}
    </div>
  );
}
