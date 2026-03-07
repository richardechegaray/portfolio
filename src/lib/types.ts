export interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  images?: string[];
  videos?: string[];
  videoPoster?: string;
  tags?: string[];
  link?: {
    label: string;
    url: string;
  };
  projectId?: string;
  icon?: string;
  type: "career" | "education" | "achievement" | "personal" | "project";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  images?: string[];
  imageCaption?: string;
  videos?: string[];
  videoPoster?: string;
  videoCaption?: string;
  date?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  pdfUrl?: string;
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
  startTime?: number;
  endTime?: number;
  date: string;
  tags?: string[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
