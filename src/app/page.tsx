"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Timeline } from "@/components/timeline/Timeline";
import { timelineEvents } from "@/data/timeline";
import { siteConfig } from "@/lib/constants";

export default function TimelinePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* Fullscreen hero */}
      <div ref={heroRef} className="relative flex min-h-screen items-center justify-center px-6">
        {/* Background glow — no overflow-hidden, bleeds naturally */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/8 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-widest text-accent-light"
          >
            {siteConfig.title}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-6xl font-bold leading-tight text-foreground md:text-8xl lg:text-9xl"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-lg text-lg text-muted md:text-xl"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <a
              href="#timeline"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <span>Scroll to explore</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={16} />
              </motion.span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div id="timeline" className="mx-auto max-w-3xl px-4 pb-24">
        <Timeline events={timelineEvents} />
      </div>
    </>
  );
}
