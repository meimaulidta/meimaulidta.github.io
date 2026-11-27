import { useEffect } from "react";
import { useReducedMotion } from "./useMedia";

const SELECTOR =
  ".hero, .marquee, .about, .experience, .tools, .work, .certificates, .services, .testimonials, .contact, .footer";

export function useSectionMotion() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(SELECTOR),
    );

    if (reduced || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "is-in-view",
            entry.isIntersecting,
          );
        });
      },
      { rootMargin: "120px 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [reduced]);
}
