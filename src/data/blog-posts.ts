import type { BlogPost } from "@/lib/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "building-this-site",
    title: "How I Built This Portfolio",
    date: "March 2026",
    excerpt:
      "A quick look at the tech stack and design decisions behind this site.",
    content: `
      <p>I wanted a portfolio that felt like <em>me</em> — not a template, not a wall of text, just something fun to scroll through. So I built this from scratch with Next.js, Tailwind, and Framer Motion.</p>

      <h2>The Stack</h2>
      <p>Next.js 16 with App Router handles routing and static generation. Tailwind v4 keeps styling fast and consistent. Framer Motion powers the scroll-linked animations — the parallax hero, the growing timeline line, and the card fade-ins. Lenis gives everything that smooth, buttery scroll feel.</p>

      <h2>The Timeline</h2>
      <p>The homepage timeline is the centerpiece. Each card animates in as you scroll, with a progress line that grows down the center. I went with a zigzag layout on desktop (cards alternate left and right) and a single column on mobile. Each event type — career, education, personal — gets its own color accent so you can scan quickly.</p>

      <h2>The Space Theme</h2>
      <p>I've always loved space aesthetics. The background has multiple star layers with different parallax speeds, plus random shooting stars. A custom rocket SVG cursor replaces the default pointer, and a spotlight glow follows your mouse around the page. It's all CSS and JS — no heavy libraries.</p>

      <h2>What's Next</h2>
      <p>I'll keep adding clips and blog posts as I go. The whole thing is open source on <a href="https://github.com/richardechegaray/portfolio" target="_blank" rel="noopener noreferrer">GitHub</a> if you want to poke around.</p>
    `,
    tags: ["Next.js", "Web Dev", "Design"],
    readingTime: "2 min read",
  },
];