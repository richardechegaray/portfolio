import { User, FileText, Film, FolderGit2 } from "lucide-react";
import type { NavItem } from "./types";

export const siteConfig = {
  name: "Richard Echegaray",
  title: "Software Engineer",
  tagline:
    "I build the systems behind the products you use every day. Previously at Reality Labs, working on Audio for Meta Wearables.",
  github: "https://github.com/richardechegaray",
  linkedin: "https://www.linkedin.com/in/richardechegaray/",
};

export const navItems: NavItem[] = [
  { label: "Overview", href: "/", icon: User },
  { label: "Projects", href: "/projects", icon: FolderGit2 },
  { label: "Blog", href: "/blog", icon: FileText },
  { label: "Clips", href: "/clips", icon: Film },
];
