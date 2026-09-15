import type { Metadata } from "next";
import { Stub } from "@/components/Stub";
import { BlogCard } from "@/components/BlogCard";
import { BLOG_POSTS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog — MediaMaxxing",
  description:
    "Blog card grid. Article routes aren't rendered in the proof-of-concept.",
};

export default function Blog() {
  return (
    <Stub
      eyebrow="Blog stub"
      title="From the blog"
      extra={
        <section aria-label="Blog posts" className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BLOG_POSTS.map((post) => (
              <BlogCard
                key={post.slug}
                data={{
                  href: `/blog/${post.slug}`,
                  title: post.title,
                  excerpt: post.excerpt,
                  cover: post.cover,
                  readMinutes: post.readMinutes,
                }}
              />
            ))}
          </div>
          <p className="text-[13px] text-muted">
            Individual article pages aren&rsquo;t rendered — clicking a card
            goes nowhere.
          </p>
        </section>
      }
    >
      <p>
        The BlogCard primitive rendered against the three real posts on the
        live site. Titles, excerpts, cover images, and dates are all real —
        just the article bodies are missing.
      </p>
    </Stub>
  );
}
