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
          <h1 className="text-[40px] leading-[1.05] font-medium max-w-[18ch]">
            {title}
          </h1>
          <div className="text-[18px] text-muted flex flex-col gap-4 max-w-[60ch]">
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
