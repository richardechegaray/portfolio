# Richard Echegaray — Portfolio

Personal portfolio site built from scratch. Timeline-driven layout with scroll-linked animations, a space theme, and a custom rocket cursor.

**Live:** [rechegaray.xyz](https://rechegaray.xyz)

## Tech Stack

- **Next.js 16** (App Router) — routing, static generation
- **TypeScript** — type safety
- **Tailwind CSS v4** — styling with custom theme variables
- **Framer Motion** — scroll-linked animations, parallax hero, card fade-ins
- **Lenis** — smooth scrolling
- **Lucide React** — icons

## Features

- **Timeline** — zigzag layout of career, education, and personal milestones with a scroll-linked progress line. Clickable cards open detail pages.
- **Space theme** — multi-layer starfield with parallax, randomized twinkling, shooting stars, custom rocket SVG cursor, and a spotlight glow that follows the mouse.
- **Projects** — statically generated project pages with tech tags, GitHub/live links, embedded PDFs, and YouTube/local video support.
- **Clips** — gaming and music clips with YouTube embeds and local video playback.
- **Blog** — blog posts rendered from TypeScript data files.
- **Explore section** — quick links to Projects, Clips, and Blog.
- **Contact section** — GitHub, LinkedIn, and email links.
- **Floating nav** — collapsible sidebar with section-aware active highlighting.
- **BackLink** — custom component that stops/starts Lenis for reliable hash-based scroll navigation.

## Project Structure

```
src/
  app/              # Next.js App Router pages
    blog/           # Blog listing and [slug] detail
    clips/          # Clips gallery
    projects/       # Projects listing and [id] detail
    timeline/       # Timeline event [id] detail
  components/
    blog/           # BlogCard
    clips/          # ClipCard
    layout/         # FloatingNav
    projects/       # ProjectCard
    timeline/       # Timeline, TimelineCard
    ui/             # BackLink, CursorSpotlight, PageHeader, ScrollReveal, SmoothScroll, Starfield, Tag
  data/             # Static data (blog-posts, clips, projects, timeline)
  lib/              # Types, constants, utils
public/
  images/           # Static images
  videos/           # Local video files (LFS)
  files/            # PDFs
  rocket-cursor.svg # Custom cursor
```

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deployed on [Vercel](https://vercel.com). Auto-deploys on push to `main`.

```bash
vercel --prod --yes
```

## TODO

### Mobile Bugs
- [ ] **Sidebar overlay** — floating nav overlays main content on mobile. Find a better mobile nav pattern (e.g., bottom tab bar, hamburger drawer that pushes content, or inline nav).
- [ ] **Performance / lag** — site feels laggy on mobile. Investigate: Lenis on touch devices, Framer Motion scroll animations, starfield rendering, excessive re-renders.
- [ ] **Hero layout on mobile** — hero section renders poorly on small screens. Consider loading all hero content immediately (skip scroll-triggered animations on mobile).
- [ ] **Timeline image loading** — images load too slowly relative to scroll speed. Look into lazy loading strategy, placeholder blurs, or preloading visible images.
- [ ] **Embedded PDF on mobile** — PDF iframe doesn't display well on small screens. Consider a download link fallback or responsive PDF viewer.

### Navigation Bugs
- [ ] **Back to main from Projects/Clips/Blog** — BackLink lands in the middle of the timeline instead of the explore section. Projects consistently fails; Clips and Blog initially land wrong then jump to mid-timeline. Penny back button works correctly. Likely a timing or element-finding issue specific to `/#explore`.
- [ ] **Video initial render speed** — videos (e.g., Penny section) feel slow to appear on first load. Investigate preloading, poster frames, or placeholder thumbnails.

## License

MIT
