"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { TimelineEvent } from "@/lib/types";
import { TimelineYearMarker } from "./TimelineYearMarker";
import { TimelineCard } from "./TimelineCard";

interface TimelineProps {
  events: TimelineEvent[];
}

function groupEventsByYear(events: TimelineEvent[]) {
  const grouped: Record<number, TimelineEvent[]> = {};
  for (const event of events) {
    if (!grouped[event.year]) {
      grouped[event.year] = [];
    }
    grouped[event.year].push(event);
  }
  return grouped;
}

export function Timeline({ events }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const grouped = groupEventsByYear(events);
  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  // The line grows from 0% to 100% height as you scroll through the timeline
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative pl-20 md:pl-24">
      {/* Static background line (faint) */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

      {/* Animated progress line (grows as you scroll) */}
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent via-accent to-accent/50 origin-top"
      />

      {years.map((year) => (
        <div key={year}>
          <TimelineYearMarker year={year} />
          {grouped[year].map((event) => (
            <TimelineCard key={event.id} event={event} />
          ))}
        </div>
      ))}
    </div>
  );
}
