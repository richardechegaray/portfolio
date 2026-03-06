"use client";

import { useRouter } from "next/navigation";

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function BackLink({ href, children, className }: BackLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const hashIndex = href.indexOf("#");
    const hash = hashIndex !== -1 ? href.slice(hashIndex + 1) : null;

    router.push(href);

    if (hash) {
      // Stop Lenis so it can't fight our scroll
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void; scrollTo: (target: HTMLElement, opts?: { immediate: boolean }) => void } }).__lenis;
      if (lenis) lenis.stop();

      const scrollToHash = (retries = 0) => {
        const el = document.getElementById(hash);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { immediate: true });
            lenis.start();
          } else {
            el.scrollIntoView({ behavior: "instant" });
          }
        } else if (retries < 30) {
          requestAnimationFrame(() => scrollToHash(retries + 1));
        } else if (lenis) {
          lenis.start(); // Ensure Lenis restarts even if element not found
        }
      };
      requestAnimationFrame(scrollToHash);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}