"use client";

import Link from "next/link";
import { WELCOME_MODAL } from "@/content/creator/ui";
import type { CreatorProfile } from "@/content/creator/types";
import { ChevronRightIcon, CloseIcon, GiftIcon, LinkIcon } from "./app-icons";
import { useCreator } from "./CreatorStateProvider";
import { IconTile, type TileTone } from "./IconTile";
import { XpFillBar } from "./XpFillBar";
import type { RefObject } from "react";

const STEP_ICON = [GiftIcon, LinkIcon];
const STEP_TONE: TileTone[] = ["money", "streak"];

/* Opened from CampaignsScreen when it's reached via ?welcome=1 (the "Get
   started" button's destination — see content/nav.ts). Was its own page at
   /creator/welcome; moved to a modal over /creator/campaigns per explicit
   request so the "get started" moment doesn't leave the feed the way it's
   about to send you back to. Native <dialog>, same open/close convention as
   RankLadderModal. */
export function WelcomeModal({
  dialogRef,
  profile,
  onClose,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
  profile: CreatorProfile;
  onClose: () => void;
}) {
  const { href } = useCreator();

  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  /* Escape fires `cancel`. Route it through onClose like the buttons and the
     backdrop, so it also drops ?welcome=1 instead of leaving the modal to
     reopen on reload. */
  const onDialogCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={onDialogClick}
      onCancel={onDialogCancel}
      aria-labelledby="welcome-modal-title"
      className="
        m-auto w-[min(480px,92vw)] max-h-[88vh]
        rounded-[var(--radius-card)] p-0 bg-surface text-ink
        border border-border shadow-pop backdrop:bg-ink/40
      "
    >
      <div className="flex flex-col max-h-[88vh]">
        <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-2">
          <div className="flex flex-col leading-tight min-w-0">
            <h2 id="welcome-modal-title" className="text-[18px] font-medium truncate">
              {WELCOME_MODAL.title}
            </h2>
            <p className="text-[13px] text-muted">{WELCOME_MODAL.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={WELCOME_MODAL.close}
            className="shrink-0 inline-flex h-11 w-11 -m-1.5 items-center justify-center rounded-full text-muted hover:bg-surface-sunk hover:text-ink transition"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 pb-5 flex flex-col gap-5">
          <XpFillBar profile={profile} />

          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-medium">{WELCOME_MODAL.stepsHeading}</h3>
            <ol className="flex flex-col gap-2.5">
              {WELCOME_MODAL.steps.map((step, i) => {
                const Icon = STEP_ICON[i];
                return (
                  <li key={step.title}>
                    <Link
                      href={href(step.href)}
                      className="group flex items-center gap-3 rounded-[var(--radius-card)] bg-surface border border-border px-4 py-3.5 hover:border-border-strong transition"
                    >
                      <IconTile tone={STEP_TONE[i]}>
                        <Icon width={18} height={18} />
                      </IconTile>
                      <span className="flex-1 min-w-0 flex flex-col leading-tight">
                        <span className="text-[15px] font-medium">{step.title}</span>
                        <span className="text-[13px] text-muted">{step.body}</span>
                      </span>
                      <ChevronRightIcon
                        aria-hidden
                        width={18}
                        height={18}
                        className="shrink-0 text-muted group-hover:text-ink transition"
                      />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="self-start text-[13px] text-muted hover:text-ink underline underline-offset-2 min-h-11 inline-flex items-center"
          >
            {WELCOME_MODAL.skip}
          </button>
        </div>
      </div>
    </dialog>
  );
}
