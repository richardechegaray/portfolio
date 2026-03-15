import { useMemo, useSyncExternalStore } from "react";

const subscribeMobile = (callback: () => void) => {
  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getIsMobile = () => window.matchMedia("(pointer: coarse)").matches;

export function useIsMobile() {
  return useSyncExternalStore(subscribeMobile, getIsMobile, () => false);
}

const emptySubscribe = () => () => {};

export function useHasMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

const subscribeResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

export function useSpotlightSize() {
  return useSyncExternalStore(
    subscribeResize,
    () => Math.min(window.innerWidth, window.innerHeight) * 0.35,
    () => 500
  );
}

export function useStarLayers(
  generateFn: (isMobile: boolean) => unknown[][],
) {
  const isMobile = useIsMobile();
  const mounted = useHasMounted();
  return useMemo(
    () => (mounted ? generateFn(isMobile) : []),
    [mounted, isMobile, generateFn],
  );
}