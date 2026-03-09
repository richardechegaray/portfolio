import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";
import { BackLink } from "@/components/ui/BackLink";
import { Tag } from "@/components/ui/Tag";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Richard Echegaray`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <BackLink
        href="/blog"
        className="text-sm text-accent-light hover:text-accent transition-colors"
      >
        &larr; Back to blog
      </BackLink>

      <h1 className="mt-6 font-display text-3xl font-bold text-foreground">
        {post.title}
      </h1>

      <div className="mt-3 flex items-center gap-3 text-sm text-muted">
        <span>{post.date}</span>
        <span>&middot;</span>
        <span>{post.readingTime}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {/* Safe: content is static HTML from blog-posts.ts, not user input */}
      <div
        className="prose prose-invert prose-indigo mt-8 max-w-none prose-headings:font-display prose-a:text-accent-light"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
