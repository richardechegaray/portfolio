"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";

function getSpotlightSize() {
  if (typeof window === "undefined") return 500;
  return Math.min(window.innerWidth, window.innerHeight) * 0.35;
}

export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const [spotlightSize, setSpotlightSize] = useState(500);
  // Use a ref for `visible` so the mousemove effect doesn't re-subscribe on every toggle.
  // Bug: having `visible` in the deps array tore down & re-added listeners every time
  // the cursor entered/left, causing unnecessary overhead.
  const visibleRef = useRef(false);

  useEffect(() => {
    setSpotlightSize(getSpotlightSize());
    const onResize = () => setSpotlightSize(getSpotlightSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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