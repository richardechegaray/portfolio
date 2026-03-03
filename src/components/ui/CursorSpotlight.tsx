"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
  }, [visible]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          left: position.x - 200,
          top: position.y - 200,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
