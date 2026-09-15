import Image from "next/image";
import { SITE } from "@/content/site";

export type LogoLockupSize = "sm" | "md" | "lg";

const size: Record<LogoLockupSize, { icon: number; text: string }> = {
  sm: { icon: 24, text: "text-[15px]" },
  md: { icon: 28, text: "text-[18px]" },
  lg: { icon: 40, text: "text-[24px]" },
};

/* `showWordmark="sm"` shows the wordmark from 640px up and keeps it for
   screen readers below, so a header fits the icon and the CTA at 375. */
export function LogoLockup({
  size: sz = "md",
  showWordmark = true,
  className = "",
}: {
  size?: LogoLockupSize;
  showWordmark?: boolean | "sm";
  className?: string;
}) {
  const s = size[sz];
  const wordmark =
    showWordmark === true ? "" : showWordmark === "sm" ? "sr-only sm:not-sr-only" : "sr-only";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/proof/brand/logo.png"
        alt=""
        width={s.icon}
        height={s.icon}
        className="rounded shrink-0"
        priority
      />
      <span className={`${s.text} font-medium tracking-tight ${wordmark}`}>{SITE.wordmark}</span>
    </span>
  );
}
