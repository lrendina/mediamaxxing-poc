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
  /* Optional slot below the body — /blog uses it for the real BlogCard grid. */
  extra?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[640px] md:max-w-[880px]">
      <div className="flex flex-col gap-10 px-4 md:px-6 pt-12 pb-16">
        <section className="flex flex-col gap-5 max-w-[640px]">
          {eyebrow ? (
            <p className="text-[13px] text-muted">{eyebrow}</p>
          ) : null}
          <h1 className="font-display text-[48px] sm:text-[56px] leading-[1.0] max-w-[16ch]">
            {title}
          </h1>
          <div className="text-[17px] text-muted flex flex-col gap-4 max-w-[58ch] leading-[1.55]">
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
