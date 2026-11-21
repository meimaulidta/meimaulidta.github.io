import { useEffect } from "react";
import { useReducedMotion } from "./useMedia";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function useReveal() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    document.body.classList.add("reveal-ready");

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return () => document.body.classList.remove("reveal-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");

          if (typeof el.animate === "function") {
            const animation = el.animate(
              [
                { opacity: 0, transform: "translate3d(0, 18px, 0)" },
                { opacity: 1, transform: "translate3d(0, 0, 0)" },
              ],
              { duration: 760, easing: EASE, fill: "backwards" },
            );
            animation.onfinish = () => animation.cancel();
          }

          observer.unobserve(el);
        });
      },
      { rootMargin: "18% 0px 12% 0px", threshold: 0.01 },
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      document.body.classList.remove("reveal-ready");
    };
  }, [reduced]);
}
