"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

export type LightboxProps = {
  /** Accessible heading for the dialog, linked with aria-labelledby. */
  title: string;
  /** Accessible name for the trigger button. */
  triggerLabel: string;
  /** Accessible name for the close button. */
  closeLabel: string;
  /** The trigger button's contents. Nothing interactive goes in here. */
  trigger: ReactNode;
  /** Dialog body. Mounted on first open, kept mounted afterwards. */
  children: ReactNode;
  /** Layout classes for the trigger button. */
  className?: string;
};

/* A native <dialog> lightbox: ESC, backdrop click and the close button all
   route through the browser's own close steps, which is what restores focus
   to the trigger without any hand-rolled focus trap. */
export function Lightbox({
  title,
  triggerLabel,
  closeLabel,
  trigger,
  children,
  className = "",
}: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const scrollLock = useRef<{ overflow: string; paddingRight: string } | null>(
    null,
  );
  const [bodyMounted, setBodyMounted] = useState(false);
  const titleId = useId();

  const lockScroll = useCallback(() => {
    if (scrollLock.current) return;
    const body = document.body;
    /* Compensate for the disappearing scrollbar so locking the page does not
       shift the layout underneath the dialog. */
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    scrollLock.current = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  }, []);

  const unlockScroll = useCallback(() => {
    const previous = scrollLock.current;
    if (!previous) return;
    const body = document.body;
    body.style.overflow = previous.overflow;
    body.style.paddingRight = previous.paddingRight;
    scrollLock.current = null;
  }, []);

  /* Restore on unmount too, so navigating away with a dialog open cannot
     leave the page frozen. */
  useEffect(() => unlockScroll, [unlockScroll]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      unlockScroll();
      triggerRef.current?.focus({ preventScroll: true });
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [unlockScroll]);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    /* The dialog element is always in the DOM; only its body waits for the
       first open, so an unopened card costs nothing. */
    setBodyMounted(true);
    dialog.showModal();
    lockScroll();
  }, [lockScroll]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  }, []);

  /* The dialog keeps p-0, so its own box is entirely covered by content: a
     click that reaches the dialog element itself landed on the backdrop and
     never on padding inside the panel. */
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) close();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-label={triggerLabel}
        className={`group min-h-12 w-full rounded cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action ${className}`.trim()}
      >
        {trigger}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={onDialogClick}
        className="m-auto max-h-[92vh] w-[min(920px,92vw)] overflow-hidden rounded bg-surface p-0 text-ink shadow-2 backdrop:bg-surface-dark/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[92vh] flex-col">
          {/* The close button comes first in the DOM because a modal dialog
              focuses the first focusable descendant in tree order — that is
              what makes it the autofocus target. flex-row-reverse puts it
              back on the right where it reads. */}
          <header className="flex shrink-0 flex-row-reverse items-center justify-between gap-4 border-b border-border px-6 py-4 md:px-8">
            <button
              type="button"
              onClick={close}
              aria-label={closeLabel}
              className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded bg-surface-sunk text-h3 leading-none text-ink transition hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
            >
              <span aria-hidden>&times;</span>
            </button>
            <h2 id={titleId} className="min-w-0 text-h3 break-words">
              {title}
            </h2>
          </header>

          <div className="min-h-0 flex-1 overflow-auto bg-canvas p-6 md:p-8">
            {bodyMounted ? children : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
