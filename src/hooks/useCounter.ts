import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useMedia";

export function useCounter(target: number) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (reduced || !("IntersectionObserver" in window)) {
      setValue(target);
      return;
    }

    let raf = 0;

    const animate = () => {
      const start = performance.now();
      const duration = 1500;

      const step = (now: number) => {
        const ratio = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - ratio, 3);
        setValue(Math.round(target * eased));
        if (ratio < 1) raf = requestAnimationFrame(step);
        else setValue(target);
      };

      raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate();
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, reduced]);

  return { ref, value };
}
