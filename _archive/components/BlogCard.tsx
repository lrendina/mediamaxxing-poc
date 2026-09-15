import Image from "next/image";
import Link from "next/link";

export type BlogCardData = {
  href: string;
  title: string;
  excerpt: string;
  cover: string;
  readMinutes: number;
};

export function BlogCard({ data }: { data: BlogCardData }) {
  return (
    <Link
      href={data.href}
      className="group flex flex-col gap-4 rounded-[var(--radius-card)] border-2 border-ink bg-surface overflow-hidden transition hover:shadow-[6px_6px_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] bg-surface-sunk overflow-hidden border-b-2 border-ink">
        <Image
          src={data.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 480px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="px-5 pb-5 flex flex-col gap-2 flex-1">
        <h3 className="font-display-sm text-[24px]">{data.title}</h3>
        <p className="text-[14px] text-muted line-clamp-2">{data.excerpt}</p>
        <p className="text-[11px] uppercase tracking-[0.06em] font-semibold text-muted mt-auto pt-2">
          {data.readMinutes} min read
        </p>
      </div>
    </Link>
  );
}
