import type { ReactNode } from "react";
import { Card } from "./Card";

export function FeatureStatCard({
  value,
  label,
  children,
  tone = "ink",
}: {
  value: string;
  label: string;
  children?: ReactNode;
  tone?: "ink" | "payout";
}) {
  return (
    <Card variant={tone === "payout" ? "lime" : "default"} pad="lg" className="flex flex-col gap-2">
      <p className="font-display text-[56px] md:text-[72px] leading-[0.85]">{value}</p>
      <p className="text-[15px] font-semibold leading-tight mt-3">{label}</p>
      {children ? (
        <p className={`text-[14px] ${tone === "payout" ? "text-surface-dark/70" : "text-muted"}`}>{children}</p>
      ) : null}
    </Card>
  );
}
