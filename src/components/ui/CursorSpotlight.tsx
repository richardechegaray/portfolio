"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile, useSpotlightSize } from "@/lib/hooks";

export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const spotlightSize = useSpotlightSize();
  const visibleRef = useRef(false);

  useEffect(() => {
    if (isMobile) return;

    function handleMouseMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    }

    function handleMouseLeave() {
      visibleRef.current = false;
      setVisible(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

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
          width: spotlightSize,
          height: spotlightSize,
          left: position.x - spotlightSize / 2,
          top: position.y - spotlightSize / 2,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 15%, transparent) 0%, color-mix(in srgb, var(--color-accent) 6%, transparent) 30%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}