"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  twinkleDelay: number;
}

function generateStars(
  count: number,
  sizeRange: [number, number],
  opacityRange: [number, number],
  twinkleRange: [number, number],
): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
    opacity: opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]),
    twinkleDuration: twinkleRange[0] + Math.random() * (twinkleRange[1] - twinkleRange[0]),
    twinkleDelay: Math.random() * twinkleRange[1],
  }));
}

const LAYERS = [
  { count: 70, size: [1, 2] as [number, number], opacity: [0.4, 0.7] as [number, number], twinkle: [3, 6] as [number, number], speed: 0.02 },
  { count: 50, size: [2, 3] as [number, number], opacity: [0.6, 0.9] as [number, number], twinkle: [2, 4] as [number, number], speed: 0.05 },
  { count: 25, size: [2.5, 4] as [number, number], opacity: [0.8, 1] as [number, number], twinkle: [1, 2.5] as [number, number], speed: 0.1 },
];

const MOBILE_COUNTS = [30, 20, 10];

export function Starfield() {
  const [layers, setLayers] = useState<Star[][]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setLayers(LAYERS.map((l, i) => generateStars(
      isMobile ? MOBILE_COUNTS[i] : l.count,
      l.size, l.opacity, l.twinkle
    )));
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (layers.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Star layers */}
      {layers.map((stars, layerIndex) => (
        <div
          key={layerIndex}
          className="absolute inset-0"
          style={{ transform: isMobile ? undefined : `translateY(${scrollY * -LAYERS[layerIndex].speed}px)` }}
        >
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                animationDuration: `${star.twinkleDuration}s`,
                animationDelay: `${star.twinkleDelay}s`,
                boxShadow: star.size >= 2.5 ? `0 0 ${star.size * 2}px ${star.size * 0.5}px rgba(255,255,255,0.4)` : undefined,
              }}
            />
          ))}
        </div>
      ))}

      {/* Shooting stars — hidden on mobile */}
      {!isMobile && (
        <>
          <div className="shooting-star shooting-star-1" />
          <div className="shooting-star shooting-star-2" />
          <div className="shooting-star shooting-star-3" />
        </>
      )}
    </div>
  );
}