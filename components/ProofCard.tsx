"use client";

import Image from "next/image";
import { useRef } from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { StatGrid } from "./StatGrid";
import type { Creator } from "@/content/creators";

/* The feed's center of gravity. Layout leads with the number: earnings at
   display size, then the evidence (dashboard + phone), then the small
   table of what it took, then the creator's own words. */
export function ProofCard({
  data,
  priority = false,
}: {
  data: Creator;
  /* Set true on the first card in a feed so its dashboard image loads
     eagerly and Next.js emits a preload hint — matters for LCP. */
  priority?: boolean;
}) {
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
        pad="none"
        className="flex flex-col overflow-hidden"
      >
        <header className="flex items-center gap-3 px-5 pt-5">
          <span
            aria-hidden
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-sunk text-[13px] font-medium"
          >
            {data.name[0]}
          </span>
          <div className="flex flex-col leading-tight min-w-0">
            <p className="text-[15px] font-medium truncate">{data.name}</p>
            <p className="text-[13px] text-muted truncate">@{data.handle}</p>
          </div>
          <Badge
            tone={data.tier === "Advanced" ? "live" : "neutral"}
            className="ml-auto"
          >
            {data.tier}
          </Badge>
        </header>

        <div className="flex flex-col px-5 pt-5 pb-4">
          <p className="text-[12px] text-muted">Total earned</p>
          <p className="text-[44px] leading-none font-expanded text-money mt-1">
            {data.earnings}
          </p>
        </div>

        <button
          type="button"
          onClick={open}
          aria-label={`Open ${data.name}'s dashboard`}
          className="group relative block w-full text-left px-5"
        >
          {/* Dashboard — card matches the graph's native 2:1 so the whole
              chart is visible, never cropped. */}
          <div
            className="
              relative aspect-[2/1] rounded-[14px] overflow-hidden
              bg-surface-sunk ring-1 ring-border
              transition group-hover:brightness-[0.98]
            "
          >
            <Image
              src={data.dashboardSrc}
              alt=""
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
              priority={priority}
            />
          </div>

          {/* Phone — hovers over the dashboard, lifted by shadow.
              Positioned as a sibling of the clipped dashboard so the shadow
              is not clipped by overflow-hidden. */}
          <div
            className="
              absolute bottom-3 right-8
              h-[88%] aspect-[900/1955]
              rounded-[18px] overflow-hidden
              bg-surface-sunk ring-1 ring-ink/10
              shadow-pop
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

        <div className="px-5 pt-5">
          <StatGrid stats={data.stats} />
        </div>

        <blockquote className="mx-5 my-5 rounded-[var(--radius-control)] bg-surface-sunk/60 px-4 py-3 text-[14px] leading-[1.55] text-ink/85">
          &ldquo;{data.blurb}&rdquo;
        </blockquote>
      </Card>

      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        className="
          m-auto w-[min(920px,92vw)] max-h-[92vh]
          rounded-[var(--radius-card)] p-0 bg-surface text-ink
          shadow-pop backdrop:bg-surface-dark/70 backdrop:backdrop-blur-sm
        "
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex flex-col leading-tight">
            <p className="text-[18px] font-medium">{data.name}</p>
            <p className="text-[13px] text-muted">
              @{data.handle} · <span className="font-expanded text-money">{data.earnings}</span> earned
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="
              inline-flex h-11 w-11 items-center justify-center rounded-full
              bg-surface-sunk text-ink hover:bg-ink/[0.08] transition
              text-[20px] leading-none
            "
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-[2fr_1fr] overflow-auto max-h-[calc(92vh-73px)] bg-canvas">
          <div className="relative rounded-[14px] overflow-hidden bg-surface aspect-[16/9] ring-1 ring-border">
            <Image
              src={data.dashboardSrc}
              alt={`${data.name}'s earnings dashboard`}
              fill
              sizes="(min-width: 768px) 600px, 92vw"
              className="object-contain"
            />
          </div>
          <div className="relative rounded-[14px] overflow-hidden bg-surface aspect-[9/16] md:aspect-auto md:min-h-[400px] ring-1 ring-border">
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
