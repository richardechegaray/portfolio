import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="flex items-center gap-3 text-xs text-muted">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold text-foreground group-hover:text-accent-light transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}
