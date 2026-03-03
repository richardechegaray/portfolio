# Portfolio Website — Implementation Plan

## Context

Building a personality-driven portfolio for Richard Echegaray. The site's signature feature is a **scrolling vertical timeline** as the landing page, showing life milestones (jobs, graduation, achievements). A **collapsible sidebar** lets users navigate to other content sections (blog, volleyball clips, projects). On mobile, navigation switches to a **bottom tab bar**.

## Personal Details

- **Name**: Richard Echegaray
- **Title**: Software Engineer
- **GitHub**: https://github.com/richardechegaray
- **LinkedIn**: https://www.linkedin.com/in/richardechegaray/

## Tech Stack

- **Next.js 14+** (App Router, TypeScript)
- **Tailwind CSS** + `@tailwindcss/typography` (blog prose styling)
- **Framer Motion** (scroll reveals, sidebar animation, page transitions)
- **Lucide React** (icons for sidebar, tabs, timeline)
- Dark theme, indigo accent (`#6366f1`), Inter + Space Grotesk fonts

---

## Layout Architecture

```
DESKTOP (lg+):                          MOBILE (<lg):
┌──────────┬────────────────────┐       ┌──────────────────────┐
│          │                    │       │                      │
│  Richard │   MAIN CONTENT    │       │   MAIN CONTENT       │
│          │   (scrollable)    │       │   (scrollable)       │
│ ● Timeline│                  │       │                      │
│ ○ Blog   │   Currently:     │       │                      │
│ ○ Clips  │   TIMELINE       │       │   Currently:         │
│ ○ Projects│                  │       │   TIMELINE           │
│          │                    │       │                      │
│  ◀ Collapse                  │       ├──────────────────────┤
└──────────┴────────────────────┘       │ ● ○ ○ ○  Bottom Tabs│
                                        └──────────────────────┘
Sidebar collapses to icon-only (w-16)
```

---

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Timeline | Scrolling vertical timeline (default landing page) |
| `/blog` | Blog listing | Grid of blog post cards |
| `/blog/[slug]` | Blog post | Individual blog post with prose styling |
| `/clips` | Clips | Volleyball highlights (video thumbnails) |
| `/projects` | Projects | Dev project showcase cards |

---

## File Structure (~25 files)

```
src/
  app/
    layout.tsx              # Root shell: fonts, dark theme, sidebar + bottom tabs
    template.tsx            # Page transition animation (Framer Motion fade-up)
    page.tsx                # Timeline page (home)
    globals.css             # Tailwind directives, scrollbar, wave animation
    blog/
      page.tsx              # Blog listing
      [slug]/page.tsx       # Individual blog post
    clips/page.tsx          # Volleyball clips
    projects/page.tsx       # Projects showcase

  components/
    layout/
      Sidebar.tsx           # Collapsible desktop sidebar (expanded ↔ icon-only)
      BottomTabs.tsx        # Mobile bottom tab bar with sliding active indicator
    timeline/
      Timeline.tsx          # Container: vertical line + groups events by year
      TimelineCard.tsx      # Event card with scroll-reveal animation + dot/connector
      TimelineYearMarker.tsx# Year label badge on the vertical line
    blog/BlogCard.tsx       # Blog post preview card
    clips/ClipCard.tsx      # Video thumbnail card with play overlay
    projects/ProjectCard.tsx# Project card with tech tags + links
    ui/
      ScrollReveal.tsx      # Reusable scroll-triggered animation wrapper
      Tag.tsx               # Small pill/badge for tags
      PageHeader.tsx        # Consistent page title + subtitle

  data/
    timeline.ts             # TimelineEvent[] — 8-10 placeholder life events
    projects.ts             # Project[] — 4-5 placeholder projects
    blog-posts.ts           # BlogPost[] — 3 placeholder posts
    clips.ts                # Clip[] — 3-4 placeholder clips

  lib/
    types.ts                # TypeScript interfaces (TimelineEvent, Project, BlogPost, Clip, NavItem)
    constants.ts            # Nav items array, site metadata, social links
```

---

## Implementation Steps

### Step 1: Project Setup
- `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- `npm install framer-motion lucide-react`
- `npm install -D @tailwindcss/typography`
- Configure `tailwind.config.ts` (font families, typography plugin)
- Set up `globals.css` (scrollbar, wave animation keyframes)
- Configure `layout.tsx` (Inter + Space Grotesk fonts, dark theme)

### Step 2: Types & Data
- `src/lib/types.ts` — all interfaces
- `src/lib/constants.ts` — nav items (Timeline/Blog/Clips/Projects with lucide icons), social links
- All 4 data files with placeholder content

### Step 3: App Shell
- `layout.tsx` — flex container with `<Sidebar />` (hidden below lg) + `<main>` + `<BottomTabs />` (hidden above lg)
- `Sidebar.tsx` — expanded state first (name, avatar, nav links, social icons, collapse button)
- `BottomTabs.tsx` — fixed bottom bar with 4 icon+label tabs, `layoutId` sliding active indicator
- `template.tsx` — fade-up page transition wrapper
- Verify: dark page with working sidebar and bottom tabs

### Step 4: Timeline (Star Feature)
- `TimelineYearMarker.tsx` — year badge positioned on the vertical line
- `TimelineCard.tsx` — card with `whileInView` slide-in animation, dot node, horizontal connector
- `Timeline.tsx` — vertical gradient line + events grouped by year
- `page.tsx` — hero greeting ("Hey, I'm Richard") + `<Timeline />`
- Polish: hover glow on cards, gradient line fading to bottom, staggered delays

### Step 5: Sidebar Polish
- Add collapsed state toggle (`useState`, animated width via `motion.aside`)
- `AnimatePresence` for text labels fading in/out
- Tooltip on hover when collapsed (icon-only mode)
- Active route highlighting with `usePathname()`

### Step 6: Remaining Pages
- Shared UI: `ScrollReveal.tsx`, `Tag.tsx`, `PageHeader.tsx`
- `ProjectCard.tsx` + `/projects/page.tsx` — responsive grid, tech tags, GitHub/live links
- `BlogCard.tsx` + `/blog/page.tsx` — 2-col grid of post previews
- `/blog/[slug]/page.tsx` — full post with `prose prose-invert` styling
- `ClipCard.tsx` + `/clips/page.tsx` — video thumbnails with play overlay

### Step 7: Final Polish
- Test responsive breakpoints (mobile tabs ↔ desktop sidebar)
- Verify all navigation links and page transitions
- `npm run build` to confirm no errors

---

## Key Design Details

**Timeline vertical line**: CSS `absolute` positioning with indigo gradient fading to transparent at the bottom

**Timeline card animation**: `initial={{ opacity: 0, x: -30 }}` → `whileInView={{ opacity: 1, x: 0 }}` with `viewport={{ once: true }}`

**Sidebar collapse**: `motion.aside` animating between `w-64` (expanded) and `w-16` (collapsed) with spring transition

**Bottom tabs active indicator**: Framer Motion `layoutId="activeTab"` for smooth sliding between tabs

**Mobile padding**: All pages use `pb-24 lg:pb-12` to clear the bottom tab bar

**Page transitions**: `template.tsx` with enter-only fade-up (exit animations are fragile in App Router)

---

## Verification

1. `npm run dev` — site loads at localhost:3000
2. Timeline page renders with scroll-reveal card animations
3. Sidebar expands/collapses with smooth animation
4. Sidebar nav links route to correct pages
5. Mobile: bottom tab bar appears, sidebar hides
6. All 4 pages render with cards and scroll animations
7. Blog post detail page (`/blog/[slug]`) renders correctly
8. `npm run build` passes with no errors
