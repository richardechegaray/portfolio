export function smoothScrollTo(targetY: number) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number; easing?: (t: number) => number }) => void } }).__lenis;
  if (lenis) {
    lenis.scrollTo(targetY, {
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }
}