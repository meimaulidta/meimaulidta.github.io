import { useEffect, useState } from "react";
import { NAV_ITEMS } from "../data/content";

export function useActiveNav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.42;
      let current: string | null = null;

      for (const sec of sections) {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (marker >= top && marker < bottom) {
          current = sec.id;
        }
      }

      setActiveId(current);
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return activeId;
}
