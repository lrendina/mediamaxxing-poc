import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "sm" | "lg";

/* Primary is the action role and the only variant the page CTA uses.
   Secondary is a neutral surface for an action beside a primary; ghost is
   action-coloured text. Money never colours a button — green means a
   dollar figure. Every size clears the 44px tap target. */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-action text-ink-inverse hover:bg-action/90 active:bg-action/80",
  secondary:
    "bg-surface text-ink border border-border hover:bg-surface-sunk active:bg-surface-sunk",
  ghost:
    "bg-transparent text-action hover:bg-action-sunk active:bg-action-sunk",
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: "px-8 min-h-14 text-body",
  md: "px-6 min-h-12 text-body",
  sm: "px-4 min-h-11 text-small",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded " +
  "font-medium leading-none transition-colors " +
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
