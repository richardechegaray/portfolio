import type { BlogPost } from "@/lib/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "coming-soon",
    title: "More Soon!",
    date: "March 2026",
    excerpt: "Stay tuned — new posts are on the way.",
    content: `
      <h2>More coming soon!</h2>
      <p>I'm working on some posts. Check back later.</p>
    `,
    tags: ["Update"],
    readingTime: "1 min read",
  },
  {
    slug: "coming-soon-2",
    title: "Another One Brewing",
    date: "March 2026",
    excerpt: "Got some ideas in the works. Stay tuned.",
    content: `
      <h2>In progress</h2>
      <p>This one's still cooking. Check back soon.</p>
    `,
    tags: ["Update"],
    readingTime: "1 min read",
  },
];
