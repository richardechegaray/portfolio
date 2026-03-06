import { User, FileText, Film, FolderGit2, Clock, Mail } from "lucide-react";
import type { NavItem } from "./types";

export const siteConfig = {
  name: "Richard Echegaray",
  title: "Software Engineer",
  tagline:
    "I build the systems behind the products you use every day. Previously at Reality Labs, working on Audio for Meta Wearables.",
  email: "richardechegaray@outlook.com",
  github: "https://github.com/richardechegaray",
  linkedin: "https://www.linkedin.com/in/richardechegaray/",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: User },
  { label: "My Story", href: "/#timeline", icon: Clock },
  { label: "Projects", href: "/projects", icon: FolderGit2 },
  { label: "Clips", href: "/clips", icon: Film },
  { label: "Blog", href: "/blog", icon: FileText },
  { label: "Contact", href: "/#contact", icon: Mail },
];
