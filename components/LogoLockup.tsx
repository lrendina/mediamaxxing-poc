import Image from "next/image";

export type LogoLockupSize = "sm" | "md" | "lg";

const size: Record<
  LogoLockupSize,
  { icon: number; text: string; gap: string }
> = {
  sm: { icon: 24, text: "text-[15px]", gap: "gap-1.5" },
  md: { icon: 28, text: "text-[18px]", gap: "gap-2"   },
  lg: { icon: 40, text: "text-[24px]", gap: "gap-2.5" },
};

export function LogoLockup({
  size: sz = "md",
  showWordmark = true,
  className = "",
}: {
  size?: LogoLockupSize;
  showWordmark?: boolean;
  className?: string;
}) {
  const s = size[sz];
  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <Image
        src="/proof/brand/logo.png"
        alt=""
        width={s.icon}
        height={s.icon}
        className="rounded shrink-0"
        priority
      />
      {showWordmark ? (
        <span className={`${s.text} font-medium tracking-tight`}>
          MediaMaxxing
        </span>
      ) : (
        <span className="sr-only">MediaMaxxing</span>
      )}
    </span>
  );
}
