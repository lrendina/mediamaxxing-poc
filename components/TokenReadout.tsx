"use client";

import { useEffect, useRef } from "react";

/* Prints a token's computed value, read in the browser, so /styleguide can
   never drift from app/globals.css. With `against`, prints the WCAG
   contrast ratio of `token` as text on `against` instead. */
export function TokenReadout({
  token,
  against,
  className = "",
}: {
  token: string;
  against?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const style = getComputedStyle(el);
    const value = style.getPropertyValue(`--${token}`).trim();
    if (!against) {
      el.textContent = value;
      return;
    }
    const ratio = contrast(value, style.getPropertyValue(`--${against}`).trim());
    el.textContent = ratio === null ? "" : `${ratio.toFixed(2)}:1`;
  }, [token, against]);

  return <span ref={ref} className={className} />;
}

function luminance(hex: string): number | null {
  const full = hex.replace(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i, "#$1$1$2$2$3$3");
  const match = full.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!match) return null;
  const [r, g, b] = match.slice(1).map((part) => {
    const c = parseInt(part, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number | null {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}
