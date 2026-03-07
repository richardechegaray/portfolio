"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SPOTLIGHT_SIZE = 500;

export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    function handleMouseMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    }

    function handleMouseLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [visible, isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: SPOTLIGHT_SIZE,
          height: SPOTLIGHT_SIZE,
          left: position.x - SPOTLIGHT_SIZE / 2,
          top: position.y - SPOTLIGHT_SIZE / 2,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.06) 30%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}