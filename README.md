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
  images/rocket-cursor.svg # Custom cursor
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

### Done
- [x] **Sidebar overlay** — bottom tab bar on mobile, hamburger on desktop.
- [x] **Performance / lag** — disabled Lenis on touch devices, reduced starfield star counts, disabled CursorSpotlight on mobile.
- [x] **Hero layout on mobile** — skip parallax animations on small screens, smaller nebula blurs.
- [x] **Timeline image loading** — added `loading="lazy"` to all images.
- [x] **Embedded PDF on mobile** — hidden iframe on mobile, added download link fallback.
- [x] **Video initial render speed** — added `preload="metadata"` and poster frames to all videos.
- [x] **UBC start date** — fixed to 2017.
- [x] **RecycleSmart picture** — replaced with pelloInstalled.jpg, added full detail page with gallery.
- [x] **Timeline ordering** — Meta now appears first.
- [x] **Image compression** — compressed images from ~110MB to ~26MB.
- [x] **Hero animations** — staggered fade-in with delays, profile photo mask gradient.
- [x] **Responsive nav** — hamburger and nav items scale with viewport via clamp().
- [x] **Read more affordance** — clickable timeline cards show "Read more >" hint.
- [x] **Removed Meta blog post** — keeping only the portfolio blog post for now.

### Remaining
- [ ] **BackLink navigation** — BackLink lands in the middle of the timeline instead of the explore section. `/#explore` doesn't scroll correctly.
- [x] **Homepage flow** — rethink the flow so it feels more like a living portfolio.
- [x] **Image extensions** — normalized all image filenames to lowercase extensions (.jpg, .png, .gif).
- [x] **Resume in Contact** — added resume/CV link to the Contact Me section.
- [x] **Project thumbnails & formatting** — fix 353 thumbnail, audit all project/event thumbnails, check image formatting and captions.
- [ ] **Concert clips** — add concert clips to the clips section.
- [x] **Website icon** — update the favicon/site icon.
- [x] **Responsive UI audit** — verify UI on different screen sizes, especially the hero page.
- [x] **Spotlight size** — configure CursorSpotlight size to scale with screen size.
- [x] **Mobile hero text** — hero text now uses viewport-relative clamp() values, no longer covers face on different screen sizes.
- [x] **Horizontal scroll on mobile** — fixed nebula blobs overflowing viewport, added overflow-hidden to hero and overflow-x: hidden to html/body.
- [x] **Hero animation performance on mobile** — switched to GPU-composited opacity+scale animations instead of y-transforms, shorter durations.
- [x] **Image compression (round 2)** — compressed graduation.jpg (1.7M→95K), ubcPic.jpg (558K→123K), marathon.jpg (4.2M→173K), cone test images (1.4M→~65K each).
- [ ] **Clips naming** — "Clips" is ambiguous, make it clearer that it's for-fun content (gaming, music, etc.).
- [x] **Firefox mobile nav bug** — bottom tab bar is floating/misaligned on Firefox mobile.
- [x] **Double scrollbar** — remove duplicate scrollbar on the main page.
- [x] **Marathon on timeline** — add marathon event to the timeline.
- [x] **Hide Explore on mobile** — mobile already has the bottom tab bar with nav links, so the Explore section is redundant on small screens.

## License

MIT
