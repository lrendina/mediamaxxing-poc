import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "lime" | "inverse";
export type ButtonSize = "md" | "sm" | "lg" | "xl";

/* primary  — ink pill, the default press.
   lime     — the brand pill: lime with black text. One per viewport.
   inverse  — paper pill for dark sections.
   ghost    — hairline.
   secondary — kept for API compatibility; same as lime. */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-ink-inverse hover:bg-ink/85 active:bg-ink/75",
  secondary:
    "bg-lime text-surface-dark hover:brightness-95 active:brightness-90",
  lime:
    "bg-lime text-surface-dark hover:brightness-95 active:brightness-90",
  inverse:
    "bg-ink-inverse text-surface-dark hover:bg-ink-inverse/90",
  ghost:
    "bg-transparent text-ink border border-border-strong hover:border-ink hover:bg-ink/[0.04] active:bg-ink/[0.08]",
};

const sizeClasses: Record<ButtonSize, string> = {
  xl: "px-8 py-4 min-h-14 text-[18px]",
  lg: "px-6 py-3.5 min-h-12 text-[16px]",
  md: "px-5 py-3 min-h-11 text-[15px]",
  sm: "px-4 py-2 min-h-9  text-[13px]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full " +
  "font-semibold leading-none tracking-[-0.01em] transition " +
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
