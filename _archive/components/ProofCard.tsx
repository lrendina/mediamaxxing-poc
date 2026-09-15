"use client";

import Image from "next/image";
import { useRef } from "react";
import { Badge } from "./Badge";
import { StatGrid } from "./StatGrid";
import type { Creator } from "@/content/creators";

/* A receipt. White card with a hard black border and offset shadow, the
   number at poster size in the corner, the evidence below. */
export function ProofCard({
  data,
  priority = false,
}: {
  data: Creator;
  priority?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();
  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  return (
    <>
      <article
        className="
          flex flex-col rounded-[var(--radius-card)] overflow-hidden
          bg-surface text-ink border-2 border-ink
          shadow-[8px_8px_0_var(--lime)]
        "
      >
        <header className="flex items-center gap-3 px-5 pt-5">
          <span
            aria-hidden
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-ink-inverse text-[13px] font-bold"
          >
            {data.name[0]}
          </span>
          <div className="flex flex-col leading-tight min-w-0">
            <p className="text-[15px] font-semibold truncate">{data.name}</p>
            <p className="text-[13px] text-muted truncate">@{data.handle}</p>
          </div>
          <Badge tone={data.tier === "Advanced" ? "live" : "neutral"} className="ml-auto">
            {data.tier}
          </Badge>
        </header>

        <div className="px-5 pt-6 pb-4">
          <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-muted">Total earned</p>
          <p className="font-display text-[56px] md:text-[64px] leading-[0.85] mt-2">
            {data.earnings}
          </p>
        </div>

        <button
          type="button"
          onClick={open}
          aria-label={`Open ${data.name}'s dashboard`}
          className="group relative block w-full text-left px-5"
        >
          <div className="relative aspect-[2/1] rounded-[8px] overflow-hidden bg-surface-sunk border-2 border-ink transition group-hover:brightness-[0.97]">
            <Image
              src={data.dashboardSrc}
              alt=""
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
              priority={priority}
            />
          </div>
          <div
            className="
              absolute bottom-3 right-8 h-[88%] aspect-[900/1955]
              rounded-[14px] overflow-hidden bg-surface-sunk border-2 border-ink
              shadow-pop transition-transform group-hover:-translate-y-1
            "
          >
            <Image src={data.phoneSrc} alt="" fill sizes="140px" className="object-cover" />
          </div>
        </button>

        <div className="px-5 pt-5">
          <StatGrid stats={data.stats} />
        </div>

        <blockquote className="mx-5 my-5 text-[15px] leading-[1.5] font-medium">
          &ldquo;{data.blurb}&rdquo;
        </blockquote>
      </article>

      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        className="
          m-auto w-[min(920px,92vw)] max-h-[92vh]
          rounded-[var(--radius-card)] p-0 bg-surface text-ink border-2 border-ink
          shadow-pop backdrop:bg-surface-dark/80
        "
      >
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-ink">
          <div className="flex flex-col leading-tight">
            <p className="text-[18px] font-semibold">{data.name}</p>
            <p className="text-[13px] text-muted">
              @{data.handle} · <span className="font-expanded text-ink">{data.earnings}</span> earned
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-ink-inverse hover:bg-ink/85 transition text-[20px] leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-[2fr_1fr] overflow-auto max-h-[calc(92vh-73px)] bg-canvas">
          <div className="relative rounded-[8px] overflow-hidden bg-surface aspect-[16/9] border-2 border-ink">
            <Image
              src={data.dashboardSrc}
              alt={`${data.name}'s earnings dashboard`}
              fill
              sizes="(min-width: 768px) 600px, 92vw"
              className="object-contain"
            />
          </div>
          <div className="relative rounded-[8px] overflow-hidden bg-surface aspect-[9/16] md:aspect-auto md:min-h-[400px] border-2 border-ink">
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
