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
    <Card variant="default" pad="lg" className="flex flex-col gap-3">
      <p
        className={`text-[40px] leading-none font-expanded ${
          tone === "payout" ? "text-payout" : "text-ink"
        }`}
      >
        {value}
      </p>
      <p className="text-[15px] font-medium leading-tight">{label}</p>
      {children ? (
        <p className="text-[15px] text-muted">{children}</p>
      ) : null}
    </Card>
  );
}
