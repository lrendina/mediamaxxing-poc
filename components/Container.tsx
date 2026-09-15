import type { ReactNode } from "react";

export type ContainerWidth = "content" | "text";

const widthClasses: Record<ContainerWidth, string> = {
  content: "max-w-[var(--content-max)]",
  text: "max-w-[var(--text-max)]",
};

/* The centered column: the gutter outside, the max-width inside. 1120 for
   layouts, 720 for running prose — a paragraph never spans the full 1120.
   `className` lands on the inner column. */
export function Container({
  width = "content",
  className = "",
  children,
}: {
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="px-[var(--gutter)]">
      <div className={`mx-auto w-full ${widthClasses[width]} ${className}`}>{children}</div>
    </div>
  );
}
