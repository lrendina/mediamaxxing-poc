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

/* "REVENUE" eyebrow, the figure at display size, chart, two view toggles.
   Zero state: chart blurred under a lock prompt with an Explore CTA.
   The chart is a hand-rolled SVG — gridlines, gradient area, endpoint
   marker with the last value — no charting dependency. */
export function RevenueCard({ earnings }: { earnings: EarningsSummary }) {
  const { href } = useCreator();
  const [view, setView] = useState<"line" | "calendar">("line");
  const locked = earnings.series.length === 0;

  return (
    <section
      aria-labelledby="revenue-heading"
      className="rounded-[var(--radius-card)] bg-surface border border-border p-5 md:p-6 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h2 id="revenue-heading" className="text-[12px] font-medium tracking-[0.08em] text-muted">
            {EARNINGS_PAGE.revenue}
          </h2>
          <p className={`text-[44px] md:text-[52px] leading-none font-expanded ${locked ? "text-ink" : "text-money"}`}>
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
        <div className={locked ? "blur-[6px] select-none pointer-events-none opacity-70" : ""} aria-hidden={locked}>
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
            <p className="font-display text-[26px] leading-tight">{EARNINGS_PAGE.locked.title}</p>
            <p className="text-[13px] text-muted max-w-[40ch]">{EARNINGS_PAGE.locked.body}</p>
            <Link
              href={href("/creator/campaigns")}
              className="mt-2 inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-action text-ink-inverse text-[15px] font-medium hover:brightness-95"
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
  const h = 200;
  const padX = 4;
  const padTop = 16;
  const padBottom = 8;
  const max = Math.max(1, ...series.map((s) => s.amountCents));
  const niceMax = niceCeil(max);
  const step = series.length > 1 ? (w - padX * 2) / (series.length - 1) : 0;
  const y = (v: number) => h - padBottom - (v / niceMax) * (h - padTop - padBottom);
  const pts = series.map((s, i) => [padX + i * step, y(s.amountCents)] as const);
  const d = pts.map(([x, yy], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${yy.toFixed(1)}`).join(" ");
  const area = `${d} L${pts[pts.length - 1][0].toFixed(1)},${h - padBottom} L${padX},${h - padBottom} Z`;
  const last = pts[pts.length - 1];
  const lastValue = series[series.length - 1]?.amountCents ?? 0;
  const gridlines = [0.25, 0.5, 0.75, 1];

  return (
    <figure className="flex flex-col gap-2">
      <div className="relative">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={`Revenue over the last ${series.length} data points`}
          className={`w-full h-auto ${muted ? "text-ink/30" : "text-money"}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          {gridlines.map((g) => (
            <line
              key={g}
              x1={padX}
              x2={w - padX}
              y1={y(niceMax * g)}
              y2={y(niceMax * g)}
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              strokeDasharray={g === 1 ? undefined : "2 4"}
            />
          ))}
          <path d={area} fill="url(#rev-fill)" />
          <path
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {/* Endpoint marker in HTML so it stays round under preserveAspectRatio="none". */}
        <span
          aria-hidden
          className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-surface ${muted ? "bg-ink/30" : "bg-money"}`}
          style={{ left: `${(last[0] / w) * 100}%`, top: `${(last[1] / h) * 100}%` }}
        />
        {!muted ? (
          <span
            aria-hidden
            className="absolute -translate-x-full -translate-y-[calc(100%+10px)] rounded-full bg-ink text-ink-inverse text-[11px] font-expanded px-2 py-0.5 whitespace-nowrap"
            style={{ left: `${(last[0] / w) * 100}%`, top: `${(last[1] / h) * 100}%` }}
          >
            {formatUsd(lastValue, { cents: true })}
          </span>
        ) : null}
        <span className="absolute left-0 top-0 text-[11px] text-muted font-expanded">
          {formatUsd(niceMax)}
        </span>
      </div>
      {series.length ? (
        <figcaption className="flex justify-between text-[12px] text-muted">
          <span>{formatDate(series[0].date)}</span>
          <span>{formatDate(series[series.length - 1].date)}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

function niceCeil(cents: number) {
  const dollars = cents / 100;
  const mag = Math.pow(10, Math.floor(Math.log10(Math.max(1, dollars))));
  const n = Math.ceil(dollars / mag);
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return nice * mag * 100;
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
          className={`aspect-square rounded ${muted ? "bg-ink/20" : "bg-money"}`}
          style={{ opacity: 0.12 + (s.amountCents / max) * 0.88 }}
        >
          <span className="sr-only">
            {formatDate(s.date)}: {formatUsd(s.amountCents, { cents: true })}
          </span>
        </li>
      ))}
    </ul>
  );
}
