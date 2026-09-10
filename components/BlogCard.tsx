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
    <Card variant="default" pad="none" className="overflow-hidden">
      <Link href={data.href} className="flex flex-col group">
        <div className="relative aspect-[16/9] bg-panel">
          <Image
            src={data.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-5 flex flex-col gap-2">
          <h3 className="text-[18px] leading-snug font-medium group-hover:underline underline-offset-4 decoration-ink/30">
            {data.title}
          </h3>
          <p className="text-[15px] text-muted line-clamp-2">
            {data.excerpt}
          </p>
          <p className="text-[13px] text-muted">{data.readMinutes} min read</p>
        </div>
      </Link>
    </Card>
  );
}
