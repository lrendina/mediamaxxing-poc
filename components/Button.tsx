import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "sm";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-payout text-canvas hover:brightness-95 active:brightness-90",
  secondary:
    "bg-ink text-canvas hover:opacity-90 active:opacity-80",
  ghost:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/[0.03] active:bg-ink/[0.06]",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-3 min-h-11 text-[15px]",
  sm: "px-4 py-2 min-h-9  text-[13px]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full " +
  "font-medium leading-none transition " +
  "disabled:opacity-40 disabled:cursor-not-allowed";

function classesFor(variant: ButtonVariant, size: ButtonSize, extra: string) {
  return `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${extra}`;
}

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = StyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof StyleProps | "href"> & {
    href: string;
  };

type NativeButtonProps = StyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof StyleProps> & {
    href?: undefined;
  };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
  } = props;
  const cls = classesFor(variant, size, className);

  if ("href" in props && props.href) {
    const {
      variant: _v, size: _s, className: _c, children: _ch,
      href, ...anchorRest
    } = props;
    void _v; void _s; void _c; void _ch;
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v, size: _s, className: _c, children: _ch,
    href: _href, ...buttonRest
  } = props as NativeButtonProps;
  void _v; void _s; void _c; void _ch; void _href;
  return (
    <button className={cls} {...buttonRest}>
      {children}
    </button>
  );
}
