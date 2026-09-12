"use client";

import Link from "next/link";
import { useState } from "react";
import type { EarningsSummary } from "@/content/creator/types";
import { EARNINGS_PAGE } from "@/content/creator/ui";
import { formatDate, formatUsd } from "@/lib/format";
import { ArrowRightIcon, CalendarIcon, ChartIcon, LockIcon } from "./app-icons";
import { useCreator } from "./CreatorStateProvider";
import { IconTile } from "./IconTile";
import { MetricToggle } from "./MetricToggle";

/* "REVENUE" eyebrow, $0.00 at display size, chart, two view toggles.
   Zero state: chart blurred under a lock prompt with an Explore CTA.
   The chart is a hand-rolled SVG line — no charting dependency. */
export function RevenueCard({ earnings }: { earnings: EarningsSummary }) {
  const { href } = useCreator();
  const [view, setView] = useState<"line" | "calendar">("line");
  const locked = earnings.series.length === 0;

  return (
    <section
      aria-labelledby="revenue-heading"
      className="rounded-[var(--radius-card)] bg-surface border border-border p-4 md:p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 id="revenue-heading" className="text-[11px] font-medium tracking-wider text-muted">
            {EARNINGS_PAGE.revenue}
          </h2>
          <p className={`text-[40px] leading-none font-expanded ${locked ? "text-ink" : "text-money"}`}>
            {formatUsd(earnings.totalCents, { cents: true })}
          </p>
        </div>
        <MetricToggle
          label="Chart view"
          value={view}
          onChange={setView}
          options={[
            { value: "line", label: "", icon: <ChartIcon aria-label={EARNINGS_PAGE.chartView.line} width={16} height={16} /> },
            { value: "calendar", label: "", icon: <CalendarIcon aria-label={EARNINGS_PAGE.chartView.calendar} width={16} height={16} /> },
          ]}
        />
      </div>

      <div className="relative">
        <div className={locked ? "blur-[6px] select-none pointer-events-none" : ""} aria-hidden={locked}>
          {view === "line" ? (
            <LineChart series={locked ? PLACEHOLDER_SERIES : earnings.series} muted={locked} />
          ) : (
            <CalendarGrid series={locked ? PLACEHOLDER_SERIES : earnings.series} muted={locked} />
          )}
        </div>

        {locked ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-2 px-4">
            <IconTile tone="action" size="md">
              <LockIcon width={18} height={18} />
            </IconTile>
            <p className="text-[18px] font-medium leading-tight">{EARNINGS_PAGE.locked.title}</p>
            <p className="text-[13px] text-muted max-w-[40ch]">{EARNINGS_PAGE.locked.body}</p>
            <Link
              href={href("/creator/campaigns")}
              className="mt-1 inline-flex items-center gap-2 min-h-11 px-4 rounded-[var(--radius-control)] bg-action text-ink-inverse text-[15px] font-medium hover:brightness-95"
            >
              {EARNINGS_PAGE.locked.cta}
              <ArrowRightIcon aria-hidden width={16} height={16} />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* A flat, plausible shape to blur behind the lock — never shown sharp. */
const PLACEHOLDER_SERIES = [3, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15].map((v, i) => ({
  date: `2026-08-${String(10 + i * 2).padStart(2, "0")}`,
  amountCents: v * 400,
}));

function LineChart({
  series,
  muted,
}: {
  series: EarningsSummary["series"];
  muted: boolean;
}) {
  const w = 600;
  const h = 180;
  const pad = 8;
  const max = Math.max(1, ...series.map((s) => s.amountCents));
  const step = series.length > 1 ? (w - pad * 2) / (series.length - 1) : 0;
  const pts = series.map((s, i) => [pad + i * step, h - pad - (s.amountCents / max) * (h - pad * 2)] as const);
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${d} L${pts[pts.length - 1][0].toFixed(1)},${h - pad} L${pad},${h - pad} Z`;
  const first = series[0]?.date;
  const last = series[series.length - 1]?.date;

  return (
    <figure className="flex flex-col gap-2">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label={`Revenue over the last ${series.length} data points`}
        className={`w-full h-auto ${muted ? "text-ink/30" : "text-money"}`}
        preserveAspectRatio="none"
      >
        <path d={area} fill="currentColor" opacity="0.12" />
        <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      {first && last ? (
        <figcaption className="flex justify-between text-[13px] text-muted">
          <span>{formatDate(first)}</span>
          <span>{formatDate(last)}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

function CalendarGrid({
  series,
  muted,
}: {
  series: EarningsSummary["series"];
  muted: boolean;
}) {
  const max = Math.max(1, ...series.map((s) => s.amountCents));
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))] gap-1.5 py-2" aria-label="Revenue by day">
      {series.map((s) => (
        <li
          key={s.date}
          title={`${formatDate(s.date)}: ${formatUsd(s.amountCents, { cents: true })}`}
          className={`aspect-square rounded-[6px] ${muted ? "bg-ink/20" : "bg-money"}`}
          style={{ opacity: 0.15 + (s.amountCents / max) * 0.85 }}
        >
          <span className="sr-only">
            {formatDate(s.date)}: {formatUsd(s.amountCents, { cents: true })}
          </span>
        </li>
      ))}
    </ul>
  );
}
