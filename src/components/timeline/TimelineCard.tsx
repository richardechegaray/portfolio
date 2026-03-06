"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { TimelineEvent } from "@/lib/types";

interface TimelineCardProps {
  event: TimelineEvent;
  side: "left" | "right";
}

const typeIcons: Record<TimelineEvent["type"], string> = {
  career: "💼",
  education: "🎓",
  achievement: "🏆",
  personal: "⭐",
  project: "🛠️",
};

function CardContent({ event }: { event: TimelineEvent }) {
  return (
    <>
      {event.image && (
        <div className="w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.image}
            alt={event.title}
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="p-6 md:p-7">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent-light">
          {event.date}
        </span>

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
    </>
  );
}

export function TimelineCard({ event, side }: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6]);

  const isLeft = side === "left";

  return (
    <div
      id={event.id}
      ref={cardRef}
      className={`relative mb-10 md:mb-14 pl-12 md:pl-0 ${
        isLeft ? "md:pr-[53%]" : "md:pl-[53%]"
      }`}
    >
      {/* Emoji marker — left-5 on mobile, center on desktop */}
      <div
        className="absolute left-5 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-background shadow-[0_0_12px_rgba(99,102,241,0.3)]"
      >
        <span className="text-xl" role="img" aria-label={event.type}>
          {event.icon || typeIcons[event.type]}
        </span>
      </div>

      {/* Card */}
      <motion.div
        style={{ opacity }}
        className={`group relative overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 ${event.longDescription ? "cursor-pointer" : ""}`}
      >
        {event.longDescription ? (
          <Link href={`/timeline/${event.id}`} className="block">
            <CardContent event={event} />
          </Link>
        ) : (
          <CardContent event={event} />
        )}
      </motion.div>
    </div>
  );
}