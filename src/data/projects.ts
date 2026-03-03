import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description:
      "This site! A timeline-driven personal portfolio built with Next.js, Tailwind CSS, and Framer Motion. Features a collapsible sidebar, scroll-reveal animations, and a mobile-first design.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/richardechegaray/portfolio",
    featured: true,
  },
  {
    id: "2",
    title: "Project Two",
    description:
      "Placeholder for a featured project. Replace this with a real project — describe what it does, why you built it, and what you learned.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/richardechegaray",
    featured: true,
  },
  {
    id: "3",
    title: "Project Three",
    description:
      "Placeholder for another project. Swap in your own work — side projects, hackathon builds, open source contributions, anything you're proud of.",
    techStack: ["Python", "FastAPI", "AWS"],
    githubUrl: "https://github.com/richardechegaray",
    featured: false,
  },
  {
    id: "4",
    title: "Project Four",
    description:
      "One more placeholder. You can add or remove projects anytime by editing src/data/projects.ts.",
    techStack: ["C", "STM32", "Embedded"],
    githubUrl: "https://github.com/richardechegaray",
    featured: false,
  },
];
