"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-xl border border-border bg-surface overflow-hidden transition-colors hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 cursor-pointer"
      >
        {project.image && (
          <div className="w-full bg-black/20 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                }}
                className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
              >
                <Github size={16} />
                <span>Code</span>
              </button>
            )}
            {project.liveUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                }}
                className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
              >
                <ExternalLink size={16} />
                <span>Link</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
