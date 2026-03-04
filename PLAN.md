# Portfolio Website — Richard Echegaray

A personality-driven portfolio site built with a modern stack. The signature feature is a **scrolling vertical timeline** as the landing page, showing life milestones. A **floating collapsible nav** provides access to other sections (blog, clips, projects, socials).

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **Framer Motion** (scroll-linked parallax, page transitions, scroll reveals)
- **Lenis** (smooth scroll with lerp interpolation)
- **Lucide React** (icons)
- Dark theme, indigo accent (`#6366f1`), Inter + Space Grotesk fonts

## Layout

- **No persistent nav bars** — clean, full-width content
- **Floating menu button** (top-left) opens a slide-out panel with page links and socials
- **Scroll-linked animations** throughout — parallax cards, growing timeline line, hero drift
- **Lenis smooth scroll** for buttery momentum feel

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Timeline | Scrolling vertical timeline with parallax cards |
| `/blog` | Blog listing | Grid of blog post cards |
| `/blog/[slug]` | Blog post | Individual post with prose styling |
| `/clips` | Clips | Volleyball highlights (video thumbnails) |
| `/projects` | Projects | Dev project showcase cards |

## File Structure

```
src/
  app/
    layout.tsx              # Root shell: fonts, dark theme, FloatingNav
    template.tsx            # Page transition animation (Framer Motion fade-up)
    page.tsx                # Timeline page (home) with hero parallax
    globals.css             # Tailwind v4 theme, scrollbar, wave animation
    blog/
      page.tsx              # Blog listing
      [slug]/page.tsx       # Individual blog post
    clips/page.tsx          # Volleyball clips
    projects/page.tsx       # Projects showcase

  components/
    layout/
      FloatingNav.tsx       # Floating menu button + slide-out panel
    timeline/
      Timeline.tsx          # Container: scroll-progress line + year groups
      TimelineCard.tsx      # Event card with scroll-linked parallax
      TimelineYearMarker.tsx# Year badge to the left of the vertical line
    blog/BlogCard.tsx       # Blog post preview card
    clips/ClipCard.tsx      # Video thumbnail card with play overlay
    projects/ProjectCard.tsx# Project card with tech tags + links
    ui/
      SmoothScroll.tsx      # Lenis smooth scroll provider
      ScrollReveal.tsx      # Reusable scroll-triggered animation wrapper
      Tag.tsx               # Small pill/badge for tags
      PageHeader.tsx        # Consistent page title + subtitle

  data/
    timeline.ts             # Real life events (Meta, UBC, internships, ARCT, etc.)
    projects.ts             # Project placeholders
    blog-posts.ts           # Blog post stubs
    clips.ts                # Clip stubs

  lib/
    types.ts                # TypeScript interfaces
    constants.ts            # Nav items, site metadata, social links
```

---

## Implementation Progress

### Step 1: Project Setup — DONE
- Initialized Next.js 16 with TypeScript, Tailwind CSS v4, ESLint
- Installed framer-motion, lucide-react, lenis, @tailwindcss/typography
- Configured globals.css with Tailwind v4 theme (custom colors, fonts, scrollbar, wave animation)
- Set up layout.tsx with Inter + Space Grotesk fonts and dark theme

### Step 2: Types & Data — DONE
- Created all TypeScript interfaces (TimelineEvent, Project, BlogPost, Clip, NavItem)
- Created constants.ts with nav items and site config (name, title, socials)
- Populated timeline.ts with real events (Meta, UBC, Daanaa, RecycleSmart, RST Instruments, ARCT, high school)
- Created placeholder data for projects, blog posts, and clips

### Step 3: App Shell — DONE
- Built layout with floating nav (replaced original sidebar + bottom tabs approach)
- FloatingNav: floating menu button (top-left) with slide-out panel, page links, and social icons
- template.tsx for page transition animations
- Lenis smooth scroll provider for buttery scrolling

### Step 4: Timeline — DONE
- Vertical line with scroll-progress animation (grows as you scroll)
- TimelineCard with scroll-linked parallax (continuous y-shift, scale, rotation, opacity)
- TimelineYearMarker badges positioned to the left of the vertical line
- Dot nodes that pulse when cards enter viewport center
- Hero section with parallax text drift and background blobs

### Step 5: Navigation — DONE (revised from original plan)
- Original sidebar + bottom tabs approach replaced with floating collapsible nav
- Slide-out panel with AnimatePresence, staggered link animations, social icons
- Menu/X icon toggle with rotation animation

### Step 6: Remaining Pages — DONE
- Projects page with featured/regular card grid and ScrollReveal animations
- Blog listing page with card grid
- Blog post detail page with prose styling and back navigation
- Clips page with video thumbnail cards and play overlay

### Step 7: Final Polish — IN PROGRESS
- [x] Build passes with zero errors
- [x] All routes generate correctly
- [x] Simplified FloatingNav (removed profile, socials, border)
- [x] Added cursor spotlight effect
- [x] Scroll to top on page refresh
- [x] Trimmed placeholder data to minimal stubs
- [x] Deleted unused Sidebar and BottomTabs components
- [ ] Link timeline project events to project detail pages
- [ ] Add real project/blog/clip content
- [ ] Responsive testing across breakpoints
- [ ] Deploy to production
