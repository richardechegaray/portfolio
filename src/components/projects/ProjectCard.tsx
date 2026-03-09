"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/projects/${project.id}`)}
      onKeyDown={(e) => { if (e.key === "Enter") router.push(`/projects/${project.id}`); }}
      className="rounded-xl border border-border bg-surface overflow-hidden transition-colors hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 cursor-pointer"
    >
      {project.image && (
        <div className="w-full bg-black/20 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="max-w-full h-auto"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Github size={16} />
              <span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink size={16} />
              <span>Link</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
