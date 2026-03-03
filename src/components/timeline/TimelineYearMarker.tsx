"use client";

import { motion } from "framer-motion";

interface TimelineYearMarkerProps {
  year: number;
}

export function TimelineYearMarker({ year }: TimelineYearMarkerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative mb-6 mt-10 first:mt-0"
    >
      <div className="absolute -left-[calc(1rem+12px)] md:-left-[calc(1.25rem+12px)] rounded-full border border-accent/50 bg-background px-3 py-1">
        <span className="font-display text-sm font-bold text-accent-light">
          {year}
        </span>
      </div>
    </motion.div>
  );
}
