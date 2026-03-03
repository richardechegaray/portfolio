"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Timeline } from "@/components/timeline/Timeline";
import { timelineEvents } from "@/data/timeline";
import { siteConfig } from "@/lib/constants";

export default function TimelinePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      {/* Hero with parallax */}
      <div ref={heroRef} className="relative mb-16 min-h-[30vh] flex items-end overflow-hidden">
        {/* Background blobs */}
        <motion.div
          style={{ y: blob1Y }}
          className="pointer-events-none absolute -top-20 -left-32 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        />
        <motion.div
          style={{ y: blob2Y }}
          className="pointer-events-none absolute -top-10 right-[-6rem] h-56 w-56 rounded-full bg-accent/5 blur-3xl"
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl"
          >
            Hey, I&apos;m {siteConfig.name.split(" ")[0]}{" "}
            <span className="wave">👋</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-4 text-lg text-muted md:text-xl"
          >
            {siteConfig.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-6 flex items-center gap-4"
          >
            <a
              href="#timeline"
              className="inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-lg hover:shadow-accent/25"
            >
              Scroll my journey
            </a>
            <span className="text-sm text-muted">
              {siteConfig.title}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div id="timeline">
        <Timeline events={timelineEvents} />
      </div>
    </div>
  );
}
