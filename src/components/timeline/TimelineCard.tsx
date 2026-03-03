"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { TimelineEvent } from "@/lib/types";

interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
}

const typeIcons: Record<TimelineEvent["type"], string> = {
  career: "💼",
  education: "🎓",
  achievement: "🏆",
  personal: "⭐",
  project: "🛠️",
};

export function TimelineCard({ event, index }: TimelineCardProps) {
  return (
    <div className="relative mb-8 md:mb-12">
      {/* Node dot */}
      <div className="absolute -left-[calc(1rem+8px)] md:-left-[calc(1.25rem+10px)] top-6 z-10 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full border-[3px] border-background bg-accent" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
        className="ml-2 md:ml-4 rounded-xl border border-border bg-surface p-5 md:p-6 transition-colors hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
      >
        <div className="flex items-center gap-2">
          <span className="text-base" role="img" aria-label={event.type}>
            {typeIcons[event.type]}
          </span>
          <span className="text-xs font-medium text-accent-light">
            {event.date}
          </span>
        </div>

        <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
          {event.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          {event.description}
        </p>

        {event.tags && event.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}

        {event.link && (
          <a
            href={event.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm text-accent-light hover:text-accent transition-colors"
          >
            {event.link.label}
            <ExternalLink size={14} />
          </a>
        )}
      </motion.div>
    </div>
  );
}
