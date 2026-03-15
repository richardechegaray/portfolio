"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, FolderGit2, Film, FileText, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Timeline } from "@/components/timeline/Timeline";
import { timelineEvents } from "@/data/timeline";
import { siteConfig } from "@/lib/constants";
import { useIsMobile } from "@/lib/hooks";
import { smoothScrollTo } from "@/lib/utils";

const contactLinks = [
  { href: siteConfig.github, icon: Github, label: "GitHub", external: true },
  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn", external: true },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email", external: false },
  { href: siteConfig.resumeUrl, icon: FileText, label: "Resume", external: true },
];

export default function TimelinePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

  const { scrollYProgress: pageProgress } = useScroll();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scrollThumbTop = useTransform(pageProgress, [0, 1], [0, 136]);

  const isMobile = useIsMobile();

  return (
    <>
      {/* Scroll progress indicator */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block" aria-hidden="true">
        <div className="relative h-40 w-[2px] rounded-full bg-muted/20">
          <motion.div
            style={{ top: scrollThumbTop }}
            className="absolute left-1/2 -translate-x-1/2 h-6 w-[3px] rounded-full bg-accent shadow-[0_0_12px_var(--color-accent),0_0_4px_var(--color-accent)]"
          />
        </div>
      </div>

      {/* Hero */}
      <section id="hero" ref={heroRef} aria-label="Introduction" className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden">
        {/* Profile photo background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/profile.jpg"
            alt=""
            className="h-[100vh] w-auto object-cover opacity-45 mask-[linear-gradient(to_bottom,transparent_10%,black_40%,black_60%,transparent_90%)]"
          />
        </div>

        {/* Nebula glow cluster */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[clamp(250px,50vw,700px)] w-[clamp(250px,50vw,700px)] rounded-full bg-indigo-500/8 blur-[clamp(60px,10vw,140px)]" />
          <div className="absolute top-1/3 left-[60%] h-[clamp(180px,35vw,500px)] w-[clamp(180px,35vw,500px)] rounded-full bg-purple-600/6 blur-[clamp(50px,9vw,130px)]" />
          <div className="absolute bottom-1/4 left-1/3 h-[clamp(150px,28vw,400px)] w-[clamp(150px,28vw,400px)] rounded-full bg-fuchsia-500/4 blur-[clamp(40px,8vw,120px)]" />
          <div className="absolute top-[60%] left-[20%] h-[clamp(130px,25vw,350px)] w-[clamp(130px,25vw,350px)] rounded-full bg-blue-600/5 blur-[clamp(35px,7vw,100px)]" />
        </div>

        <motion.div
          style={isMobile ? undefined : { y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-[clamp(20rem,60vw,42rem)] -mt-[clamp(4rem,8vh,9rem)]"
        >
          <motion.p
            initial={{ opacity: 0, scale: isMobile ? 0.95 : 1, y: isMobile ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[clamp(0.7rem,1.2vw,0.875rem)] font-medium uppercase tracking-widest text-accent-light"
          >
            {siteConfig.title}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: isMobile ? 0.95 : 1, y: isMobile ? 0 : 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-[clamp(1rem,2vh,1.5rem)] font-display font-bold leading-tight text-foreground text-[clamp(2.25rem,7vw,8rem)]"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: isMobile ? 0.95 : 1, y: isMobile ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mx-auto mt-[clamp(1rem,2vh,1.5rem)] max-w-[clamp(18rem,40vw,32rem)] text-[clamp(1rem,1.5vw,1.25rem)] text-text-secondary"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, scale: isMobile ? 0.95 : 1, y: isMobile ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mx-auto mt-[clamp(0.75rem,1.5vh,1rem)] max-w-[clamp(18rem,40vw,32rem)] text-[clamp(0.8rem,1.2vw,0.875rem)] leading-relaxed text-text-secondary"
          >
            {siteConfig.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="mt-[clamp(2rem,4vh,3rem)]"
          >
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("timeline");
                if (!el) return;
                const target = el.getBoundingClientRect().top + window.scrollY - 80;
                smoothScrollTo(target);
              }}
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-foreground"
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
      </section>

      {/* Timeline */}
      <section id="timeline" aria-labelledby="timeline-heading" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 id="timeline-heading" className="font-display text-3xl font-bold text-foreground md:text-4xl">
          My Story
        </h2>
        <p className="mt-2 mb-8 text-muted text-lg">The journey thus far..</p>
        <Timeline events={timelineEvents} />
      </section>

      {/* Explore — hidden on mobile since bottom tab bar covers the same links */}
      <section id="explore" aria-labelledby="explore-heading" className="hidden md:block mx-auto max-w-4xl px-4 pb-24">
        <h2 id="explore-heading" className="font-display text-3xl font-bold text-foreground md:text-4xl">
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
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-4xl px-4 pb-24">
        <h2 id="contact-heading" className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Contact Me
        </h2>
        <p className="mt-2 text-muted text-lg">Feel free to reach out — I&apos;d love to connect!</p>

        <div className="mt-8 flex flex-wrap gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-5 py-4 text-muted transition-colors hover:text-foreground hover:border-accent/40"
            >
              <link.icon size={20} />
              <span className="text-sm font-medium">{link.label}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}