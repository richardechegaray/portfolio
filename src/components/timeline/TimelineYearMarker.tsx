"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineYearMarkerProps {
  year: number;
}

export function TimelineYearMarker({ year }: TimelineYearMarkerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1.05, 1.05, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  return (
    <div ref={ref} className="relative mb-8 mt-14 first:mt-0 h-8 flex items-center">
      {/* Dot on the line — left-5 on mobile, center on desktop */}
      <div className="absolute left-5 md:left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-accent border-2 border-background z-10" />

      {/* Year badge — right of line on mobile, centered on desktop */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute left-12 md:left-1/2 md:-translate-x-1/2 z-20 whitespace-nowrap rounded-full border border-accent/50 bg-background px-4 py-1.5 shadow-sm shadow-accent/10"
      >
        <span className="font-display text-sm font-bold text-accent-light">
          {year}
        </span>
      </motion.div>
    </div>
  );
}
