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

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  let globalIndex = 0;

  return (
    <div ref={containerRef} className="relative">
      {/* Static background line — left on mobile, center on desktop */}
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border" />

      {/* Animated progress line */}
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-5 md:left-1/2 top-0 w-px bg-gradient-to-b from-blue-400 via-indigo-500 via-60% to-purple-500/50 origin-top"
      />

      {years.map((year) => (
        <div key={year}>
          <TimelineYearMarker year={year} />
          {grouped[year].map((event) => {
            const side = globalIndex % 2 === 0 ? "left" : "right";
            globalIndex++;
            return (
              <TimelineCard key={event.id} event={event} side={side} />
            );
          })}
        </div>
      ))}
    </div>
  );
}
