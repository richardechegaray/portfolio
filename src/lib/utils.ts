export function smoothScrollTo(targetY: number, duration = 800) {
  const start = window.scrollY;
  const distance = targetY - start;
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    window.scrollTo(0, start + distance * ease);
    if (elapsed < duration) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}