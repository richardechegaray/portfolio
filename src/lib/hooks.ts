import { useEffect, useState } from "react";

/**
 * Shared mobile detection hook. Uses `pointer: coarse` as the source of truth
 * (matches touch devices regardless of viewport width).
 *
 * Returns `false` during SSR to avoid hydration mismatch — the first client
 * render matches the server, then flips on the next tick if needed.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}
