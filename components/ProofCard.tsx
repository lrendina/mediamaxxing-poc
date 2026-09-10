"use client";

import Image from "next/image";
import { useRef } from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { StatGrid, type Stat } from "./StatGrid";

export type Tier = "Beginner" | "Intermediate" | "Advanced";

export type ProofCardData = {
  name: string;
  handle: string;
  tier: Tier;
  earnings: string;
  dashboardSrc: string;
  phoneSrc: string;
  stats: Stat[];
  blurb: string;
};

export function ProofCard({ data }: { data: ProofCardData }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    /* Click on the backdrop (the dialog element itself, outside its inner
       content) closes. Native <dialog> gives us ESC-to-close automatically. */
    if (e.target === dialogRef.current) close();
  };

  return (
    <>
      <Card
        as="article"
        variant="spotlight"
        pad="lg"
        className="flex flex-col gap-5"
      >
        <header className="flex items-start justify-between gap-3">
          <div className="flex flex-col leading-tight">
            <p className="text-[18px] font-medium">{data.name}</p>
            <p className="text-[13px] text-muted">@{data.handle}</p>
          </div>
          <Badge tone={data.tier === "Advanced" ? "live" : "neutral"}>
            {data.tier}
          </Badge>
        </header>

        <div className="flex flex-col gap-1">
          <p className="text-[13px] text-muted">Total earned</p>
          <p className="text-[40px] leading-none font-expanded text-payout">
            {data.earnings}
          </p>
        </div>

        <button
          type="button"
          onClick={open}
          aria-label={`Open ${data.name}'s dashboard`}
          className="
            group relative block w-full text-left rounded-2xl
            focus:outline-none
          "
        >
          {/* Dashboard — card matches the graph's native 2:1 so the whole
              chart is visible, never cropped. */}
          <div
            className="
              relative aspect-[2/1] rounded-2xl overflow-hidden bg-panel
              transition group-hover:brightness-[0.98]
            "
          >
            <Image
              src={data.dashboardSrc}
              alt=""
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Phone — hovers over the dashboard, lifted by shadow.
              Positioned as a sibling of the clipped dashboard so the shadow
              is not clipped by overflow-hidden. */}
          <div
            className="
              absolute bottom-3 right-3
              h-[86%] aspect-[900/1955]
              rounded-[22px] overflow-hidden
              bg-panel ring-1 ring-ink/10
              shadow-[0_20px_45px_-12px_rgba(14,26,18,0.45)]
              transition-transform group-hover:-translate-y-1
            "
          >
            <Image
              src={data.phoneSrc}
              alt=""
              fill
              sizes="140px"
              className="object-cover"
            />
          </div>
        </button>

        <StatGrid stats={data.stats} />

        <blockquote className="text-[15px] text-ink border-l-2 border-ink/15 pl-4">
          &ldquo;{data.blurb}&rdquo;
        </blockquote>
      </Card>

      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        className="
          m-auto w-[min(920px,92vw)] max-h-[92vh]
          rounded-3xl p-0 bg-canvas text-ink
          backdrop:bg-ink/60
        "
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10">
          <div className="flex flex-col leading-tight">
            <p className="text-[18px] font-medium">{data.name}</p>
            <p className="text-[13px] text-muted">
              @{data.handle} · {data.earnings} earned
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="
              inline-flex h-9 w-9 items-center justify-center rounded-full
              bg-panel text-ink hover:bg-ink/[0.08] transition
            "
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-[2fr_1fr] overflow-auto max-h-[calc(92vh-73px)]">
          <div className="relative rounded-2xl overflow-hidden bg-panel aspect-[16/9]">
            <Image
              src={data.dashboardSrc}
              alt={`${data.name}'s earnings dashboard`}
              fill
              sizes="(min-width: 768px) 600px, 92vw"
              className="object-contain"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-panel aspect-[9/16] md:aspect-auto md:min-h-[400px]">
            <Image
              src={data.phoneSrc}
              alt={`${data.name}'s content on mobile`}
              fill
              sizes="(min-width: 768px) 300px, 92vw"
              className="object-contain"
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
