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

    items.forEach((item, index) => {
      const siblings = item.parentElement
        ? Array.from(item.parentElement.querySelectorAll<HTMLElement>("[data-reveal]"))
        : [];
      const siblingIndex = Math.max(0, siblings.indexOf(item));
      const direction = index % 3 === 0 ? -56 : index % 3 === 1 ? 56 : 0;
      const scale = item.classList.contains("contact-card") ? 0.96 : 1;

      item.style.setProperty("--reveal-x", `${direction}px`);
      item.style.setProperty("--reveal-y", direction === 0 ? "34px" : "18px");
      item.style.setProperty("--reveal-scale", `${scale}`);
      item.style.setProperty("--reveal-delay", `${Math.min(siblingIndex % 4, 3) * 85}ms`);
    });

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
            const x = el.style.getPropertyValue("--reveal-x") || "0px";
            const y = el.style.getPropertyValue("--reveal-y") || "34px";
            const scale = el.style.getPropertyValue("--reveal-scale") || "1";
            const delay = el.style.getPropertyValue("--reveal-delay") || "0ms";
            const animation = el.animate(
              [
                {
                  opacity: 0,
                  transform: `translate3d(${x}, ${y}, 0) scale(${scale})`,
                },
                {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0) scale(1)",
                },
              ],
              {
                duration: 860,
                delay: Number.parseFloat(delay) || 0,
                easing: EASE,
                fill: "backwards",
              },
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
