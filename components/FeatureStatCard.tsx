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
    <Card variant="default" pad="lg" className="flex flex-col gap-2">
      <p
        className={`text-[44px] leading-none font-expanded ${
          tone === "payout" ? "text-money" : "text-ink"
        }`}
      >
        {value}
      </p>
      <p className="text-[15px] font-medium leading-tight mt-1">{label}</p>
      {children ? (
        <p className="text-[14px] text-muted">{children}</p>
      ) : null}
    </Card>
  );
}
