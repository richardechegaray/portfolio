"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Continuous parallax: card shifts up slightly as it scrolls through viewport
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  // Subtle rotation for depth
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0, -0.5]);
  // Scale up slightly as it enters center of viewport
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.97]);
  // Opacity fade in/out at edges
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.6]);

  // Dot glows when card is in center of viewport
  const dotScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [1, 1.4, 1.4, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0.5, 1, 1, 0.5]);

  return (
    <div ref={cardRef} className="relative mb-8 md:mb-12">
      {/* Node dot — pulses as card enters viewport center */}
      <motion.div
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="absolute left-[-5rem] md:left-[-6rem] ml-[-6px] md:ml-[-7px] top-6 z-10 flex h-3.5 w-3.5 md:h-4 md:w-4 items-center justify-center rounded-full border-[3px] border-background bg-accent"
      />

      {/* Card with scroll-linked parallax */}
      <motion.div
        style={{ y, rotate, scale, opacity }}
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
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
