import { getLenis } from "./lenis";

export function smoothScrollTo(targetY: number) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(targetY, {
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }
}
