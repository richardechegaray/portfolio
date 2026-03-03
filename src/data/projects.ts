import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description:
      "This site! A timeline-driven personal portfolio with scroll-linked parallax animations, smooth scrolling, a floating nav, and a cursor spotlight effect. Built from scratch.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"],
    githubUrl: "https://github.com/richardechegaray/portfolio",
    liveUrl: "/",
    featured: true,
  },
  {
    id: "2",
    title: "Coming Soon",
    description: "More projects on the way. Stay tuned!",
    techStack: [],
    featured: true,
  },
];