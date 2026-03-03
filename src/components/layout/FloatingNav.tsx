"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/constants";

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Toggle button — fixed top-left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 backdrop-blur-md text-foreground transition-colors hover:bg-surface hover:border-accent/50"
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

      {/* Overlay + panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-out panel */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-[58] h-full w-72 bg-background"
            >
              <div className="flex h-full flex-col px-6 pt-20 pb-8">
                {/* Nav links */}
                <nav className="flex-1 space-y-1">
                  {navItems.map((item, i) => {
                    const active = isActive(item.href, pathname);
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-accent/10 text-accent-light"
                              : "text-muted hover:bg-white/5 hover:text-foreground"
                          }`}
                        >
                          <item.icon size={18} />
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
