"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItems } from "@/lib/constants";

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function BottomTabs() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50">
      <div className="bg-surface/90 backdrop-blur-xl border-t border-border">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
          {navItems.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center gap-0.5 py-1 px-3"
              >
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 h-0.5 w-8 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon
                  size={22}
                  className={
                    active ? "text-accent-light" : "text-muted"
                  }
                />
                <span
                  className={`text-[10px] font-medium ${
                    active ? "text-accent-light" : "text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div
        className="bg-surface/90"
        style={{ height: "env(safe-area-inset-bottom)" }}
      />
    </nav>
  );
}
