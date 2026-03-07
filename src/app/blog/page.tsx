import { PageHeader } from "@/components/ui/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { BackLink } from "@/components/ui/BackLink";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <BackLink
        href="/#explore"
        className="mb-6 inline-block text-sm text-muted hover:text-accent-light transition-colors"
      >
        &larr; Back to main
      </BackLink>
      <PageHeader title="Blog" description="More posts to come soon.. stay tuned" />
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {blogPosts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.1}>
            <BlogCard post={post} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
