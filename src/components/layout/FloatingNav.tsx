"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/constants";

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["timeline", "contact"];

    const handleScroll = () => {
      let current = "/";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY + window.innerHeight / 2 >= top) {
          current = `/#${id}`;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  function isActive(href: string) {
    if (pathname !== "/") return pathname.startsWith(href);
    return href === activeSection;
  }

  function smoothScrollTo(targetY: number) {
    const start = window.scrollY;
    const distance = targetY - start;
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
  }

  return (
    <>
      {/* Toggle button — fixed top-left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-[60] flex items-center justify-center text-muted transition-colors hover:text-foreground"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Menu size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Nav links — inline, no overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-5 z-[58] flex flex-col gap-1"
          >
            {navItems.map((item, i) => {
              const active = isActive(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (item.href === "/" && pathname === "/") {
                        e.preventDefault();
                        smoothScrollTo(0);
                      } else if (item.href.startsWith("/#") && pathname === "/") {
                        e.preventDefault();
                        const el = document.querySelector(item.href.replace("/", ""));
                        if (el) {
                          const top = el.getBoundingClientRect().top + window.scrollY;
                          smoothScrollTo(top);
                        }
                      }
                    }}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "text-accent-light"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
