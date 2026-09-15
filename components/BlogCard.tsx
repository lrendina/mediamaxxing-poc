import Image from "next/image";
import Link from "next/link";
import { Card } from "./Card";

export type BlogCardData = {
  href: string;
  title: string;
  excerpt: string;
  cover: string;
  readMinutes: number;
};

export function BlogCard({ data }: { data: BlogCardData }) {
  return (
    <Card variant="default" pad="none" hover={false} className="overflow-hidden group">
      <Link href={data.href} className="flex flex-col h-full">
        <div className="relative aspect-[16/10] bg-surface-sunk overflow-hidden">
          <Image
            src={data.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="font-display text-[22px] leading-[1.15] group-hover:underline underline-offset-4 decoration-ink/30">
            {data.title}
          </h3>
          <p className="text-[14px] text-muted line-clamp-2">
            {data.excerpt}
          </p>
          <p className="text-[12px] text-muted mt-auto pt-2">{data.readMinutes} min read</p>
        </div>
      </Link>
    </Card>
  );
}
