"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, FolderGit2, Film, FileText, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Timeline } from "@/components/timeline/Timeline";
import { timelineEvents } from "@/data/timeline";
import { siteConfig } from "@/lib/constants";

export default function TimelinePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress: pageProgress } = useScroll();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* Scroll progress indicator */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <div className="relative h-40 w-[2px] rounded-full bg-muted/20">
          <motion.div
            style={{ top: useTransform(pageProgress, [0, 1], [0, 136]) }}
            className="absolute left-1/2 -translate-x-1/2 h-6 w-[3px] rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6),0_0_4px_rgba(99,102,241,0.4)]"
          />
        </div>
      </div>

      {/* Fullscreen hero */}
      <div ref={heroRef} className="relative flex min-h-screen items-center justify-center px-6">
        {/* Nebula glow cluster */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-indigo-500/8 blur-[140px]" />
          <div className="absolute top-1/3 left-[60%] h-[500px] w-[500px] rounded-full bg-purple-600/6 blur-[130px]" />
          <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-500/4 blur-[120px]" />
          <div className="absolute top-[60%] left-[20%] h-[350px] w-[350px] rounded-full bg-blue-600/5 blur-[100px]" />
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted/80"
          >
            Born and raised in Vancouver. I love sports, music, piano, and gaming (peep the clips section) — and building things that make people&apos;s lives easier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <button
              onClick={() => {
                const el = document.getElementById("timeline");
                if (!el) return;
                const target = el.getBoundingClientRect().top + window.scrollY;
                const start = window.scrollY;
                const distance = target - start;
                const duration = 800;
                let startTime: number | null = null;

                function step(timestamp: number) {
                  if (!startTime) startTime = timestamp;
                  const elapsed = timestamp - startTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const ease = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                  window.scrollTo(0, start + distance * ease);
                  if (elapsed < duration) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
              }}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <span>Scroll to explore</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={16} />
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div id="timeline" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          My Story
        </h2>
        <p className="mt-2 mb-8 text-muted text-lg">The journey thus far</p>
        <Timeline events={timelineEvents} />
      </div>

      {/* Explore */}
      <div className="mx-auto max-w-4xl px-4 pb-24">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Explore
        </h2>
        <p className="mt-2 text-muted text-lg">Check out more of what I&apos;ve been up to.</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { href: "/projects", icon: FolderGit2, label: "Projects", desc: "Things I've built" },
            { href: "/clips", icon: Film, label: "Clips", desc: "Highlights & moments" },
            { href: "/blog", icon: FileText, label: "Blog", desc: "Thoughts & writing" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface/60 p-6 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <item.icon size={24} className="text-accent-light" />
              <div>
                <span className="font-display text-lg font-bold text-foreground">{item.label}</span>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="mx-auto max-w-4xl px-4 pb-24">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Contact Me
        </h2>
        <p className="mt-2 text-muted text-lg">Feel free to reach out — I&apos;d love to connect.</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-5 py-4 text-muted transition-colors hover:text-foreground hover:border-accent/40"
          >
            <Github size={20} />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-5 py-4 text-muted transition-colors hover:text-foreground hover:border-accent/40"
          >
            <Linkedin size={20} />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a
            href="mailto:richardechegaray@outlook.com"
            className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-5 py-4 text-muted transition-colors hover:text-foreground hover:border-accent/40"
          >
            <Mail size={20} />
            <span className="text-sm font-medium">Email</span>
          </a>
        </div>
      </div>
    </>
  );
}
