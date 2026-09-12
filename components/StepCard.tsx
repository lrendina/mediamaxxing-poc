import type { ReactNode } from "react";

/* Giant numeral, then the words. On the dark band it reads like a poster. */
export function StepCard({
  icon,
  title,
  children,
  marker,
  index,
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  marker?: string;
  index?: number;
}) {
  void icon;
  const numeral = marker ?? (index !== undefined ? String(index + 1).padStart(2, "0") : undefined);
  return (
    <div className="flex flex-col gap-5 border-t-2 border-ink-inverse/20 pt-5">
      {numeral ? (
        <span className="font-display text-[88px] md:text-[120px] leading-[0.8] text-lime">
          {numeral}
        </span>
      ) : null}
      <h3 className="font-display-sm text-[26px] md:text-[30px] text-ink-inverse">{title}</h3>
      <div className="text-[16px] text-ink-inverse/70 leading-[1.5] max-w-[36ch]">{children}</div>
    </div>
  );
}
