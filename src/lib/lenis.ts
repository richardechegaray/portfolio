export interface LenisInstance {
  scrollTo: (
    target: number | HTMLElement,
    opts?: { duration?: number; easing?: (t: number) => number; immediate?: boolean },
  ) => void;
  stop: () => void;
  start: () => void;
}

export function getLenis(): LenisInstance | undefined {
  return (window as unknown as { __lenis?: LenisInstance }).__lenis;
}
