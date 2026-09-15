import { TestimonialCard } from "./TestimonialCard";
import type { SourceTestimonial } from "@/content/source/creators";

export type ProofCardProps = {
  data: SourceTestimonial;
  priority?: boolean;
};

/* Compatibility wrapper. The feed used to import `ProofCard` with a `Creator`
   from `@/content/creators`; `SourceTestimonial` is the same shape, so those
   call sites keep compiling against the rebuilt card. */
export function ProofCard({ data, priority = false }: ProofCardProps) {
  return <TestimonialCard data={data} priority={priority} />;
}
