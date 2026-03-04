"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { TimelineEvent } from "@/lib/types";

interface TimelineCardProps {
  event: TimelineEvent;
}

const typeColors: Record<TimelineEvent["type"], string> = {
  career: "from-indigo-500/20 to-transparent",
  education: "from-emerald-500/20 to-transparent",
  achievement: "from-amber-500/20 to-transparent",
  personal: "from-rose-500/20 to-transparent",
  project: "from-cyan-500/20 to-transparent",
};

const typeIcons: Record<TimelineEvent["type"], string> = {
  career: "💼",
  education: "🎓",
  achievement: "🏆",
  personal: "⭐",
  project: "🛠️",
};

export function TimelineCard({ event }: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.5]);

  const dotScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [1, 1.5, 1.5, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0.4, 1, 1, 0.4]);

  return (
    <div ref={cardRef} className="relative mb-10 md:mb-14">
      {/* Node dot */}
      <motion.div
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="absolute left-[-5rem] md:left-[-6rem] -translate-x-1/2 top-8 z-10 h-3.5 w-3.5 md:h-4 md:w-4 rounded-full border-[3px] border-background bg-accent shadow-[0_0_12px_rgba(99,102,241,0.4)]"
      />

      {/* Card */}
      <motion.div
        style={{ y, scale, opacity }}
        className="group relative overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
      >
        {/* Top gradient accent bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${typeColors[event.type]}`} />

        <div className="p-6 md:p-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-lg" role="img" aria-label={event.type}>
                {event.icon || typeIcons[event.type]}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-light">
                {event.date}
              </span>
            </div>
          </div>

          <h3 className="mt-3 font-display text-xl font-bold text-foreground md:text-2xl">
            {event.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            {event.description}
          </p>

          {event.tags && event.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
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
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-light hover:text-accent transition-colors"
            >
              {event.link.label}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
