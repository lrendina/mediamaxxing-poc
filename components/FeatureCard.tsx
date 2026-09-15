import type { ReactNode } from "react";
import { Card } from "./Card";

export type FeatureCardProps = {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
};

/* The card's heading is the benefit; the children are the support under it.
   Feature cards lift on hover like every other raised card. */
export function FeatureCard({
  icon,
  title,
  children,
  className = "",
}: FeatureCardProps) {
  return (
    <Card
      variant="default"
      pad="lg"
      className={`flex flex-col gap-4 ${className}`}
    >
      {icon ? (
        <span
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-action-sunk text-action"
        >
          {icon}
        </span>
      ) : null}

      <div className="flex min-w-0 flex-col gap-4">
        <h3 className="text-h3">{title}</h3>
        <div className="text-body text-muted">{children}</div>
      </div>
    </Card>
  );
}
