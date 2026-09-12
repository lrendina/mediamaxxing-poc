import type { ReactNode } from "react";
import { Button } from "./Button";

export function Stub({
  eyebrow,
  title,
  children,
  extra,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[var(--content-max)] px-4 md:px-8">
      <div className="flex flex-col gap-12 pt-16 pb-24">
        <section className="flex flex-col gap-6 max-w-[900px]">
          {eyebrow ? (
            <p className="text-[12px] uppercase tracking-[0.12em] font-bold text-muted">{eyebrow}</p>
          ) : null}
          <h1 className="font-display text-[clamp(48px,9vw,120px)]">{title}</h1>
          <div className="text-[18px] text-muted flex flex-col gap-4 max-w-[56ch] leading-[1.5]">
            {children}
          </div>
          <div className="mt-2">
            <Button href="/" variant="ghost">
              <span aria-hidden>←</span> Back to homepage
            </Button>
          </div>
        </section>
        {extra}
      </div>
    </div>
  );
}
