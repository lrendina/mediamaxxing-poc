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
   dollar figure, not "press me". */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-action text-ink-inverse hover:bg-action/90 active:bg-action/80",
  secondary:
    "bg-surface text-ink border border-border hover:bg-surface-sunk active:bg-surface-sunk",
  ghost:
    "bg-transparent text-action hover:bg-action-sunk active:bg-action-sunk",
};

/* min-heights are hit targets and nothing else: 56 / 48 / 44. Horizontal
   padding stays on the 8px scale; the vertical padding is what lets a long
   CTA wrap onto a second line without the text touching the edge. */
const sizeClasses: Record<ButtonSize, string> = {
  lg: "px-8 py-2 min-h-14 text-body",
  md: "px-6 py-2 min-h-12 text-body",
  sm: "px-4 py-2 min-h-11 text-small",
};

const base =
  "inline-flex min-w-0 max-w-full items-center justify-center gap-2 " +
  "rounded text-center font-medium leading-snug cursor-pointer " +
  "transition-colors motion-reduce:transition-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 " +
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

export type ButtonLinkProps = StyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof StyleProps | "href"> & {
    href: string;
  };

export type ButtonNativeProps = StyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof StyleProps> & {
    href?: undefined;
  };

export type ButtonProps = ButtonLinkProps | ButtonNativeProps;

/* href is the discriminator, not its truthiness: an empty string is still a
   link and must render through next/link so every anchored CTA behaves the
   same way. */
function isLinkProps(props: ButtonProps): props is ButtonLinkProps {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const cls = classesFor(variant, size, className);

  if (isLinkProps(props)) {
    const {
      variant: _variant,
      size: _size,
      className: _className,
      children: _children,
      ...anchorProps
    } = props;
    void _variant;
    void _size;
    void _className;
    void _children;

    return (
      <Link {...anchorProps} className={cls}>
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    href: _href,
    ...buttonProps
  } = props;
  void _variant;
  void _size;
  void _className;
  void _children;
  void _href;

  /* type="button" sits before the spread so an explicit type still wins. */
  return (
    <button type="button" {...buttonProps} className={cls}>
      {children}
    </button>
  );
}
