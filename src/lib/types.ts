export interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: {
    label: string;
    url: string;
  };
  type: "career" | "education" | "achievement" | "personal" | "project";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: string;
}

export interface Clip {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  date: string;
  tags?: string[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
