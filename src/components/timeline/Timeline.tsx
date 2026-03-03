"use client";

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
  const grouped = groupEventsByYear(events);
  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="relative pl-8 md:pl-10">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/30 to-transparent" />

      {years.map((year) => (
        <div key={year}>
          <TimelineYearMarker year={year} />
          {grouped[year].map((event, index) => (
            <TimelineCard key={event.id} event={event} index={index} />
          ))}
        </div>
      ))}
    </div>
  );
}
