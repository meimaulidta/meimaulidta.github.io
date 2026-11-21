import { useEffect } from "react";
import { useFinePointer, useReducedMotion } from "./useMedia";

interface ParallaxState {
  element: HTMLElement;
  holder: HTMLElement | null;
  speed: number;
  current: number;
}

interface BurstState {
  element: HTMLElement;
  current: number;
}

export function useScrollEffects() {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();

  useEffect(() => {
    const parallaxStates: ParallaxState[] = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    ).map((element) => ({
      element,
      holder: element.parentElement,
      speed: Number.parseFloat(element.dataset.parallax ?? "") || 5,
      current: 0,
    }));

    const burstStates: BurstState[] = Array.from(
      document.querySelectorAll<HTMLElement>("[data-burst-section]"),
    ).map((element) => ({ element, current: 0 }));

    if (!parallaxStates.length && !burstStates.length) return;

    if (reduced) {
      parallaxStates.forEach((state) => {
        state.element.style.transform = "scale(1.06)";
      });
      burstStates.forEach((state) =>
        state.element.style.setProperty("--burst", "0.65"),
      );
      return;
    }

    if (!finePointer) return;

    let framePending = false;

    const update = () => {
      framePending = false;
      const viewport = window.innerHeight;
      let settling = false;

      const parallaxReads = parallaxStates.map((state) => ({
        state,
        rect: state.holder ? state.holder.getBoundingClientRect() : null,
      }));
      const burstReads = burstStates.map((state) => ({
        state,
        rect: state.element.getBoundingClientRect(),
      }));

      parallaxReads.forEach(({ state, rect }) => {
        if (!rect || rect.bottom < -220 || rect.top > viewport + 220) return;
        const offset = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        const target = offset * state.speed;
        state.current += (target - state.current) * 0.14;
        state.element.style.transform = `translate3d(0, ${state.current.toFixed(2)}%, 0) scale(1.14)`;
        if (Math.abs(target - state.current) > 0.02) settling = true;
      });

      burstReads.forEach(({ state, rect }) => {
        if (rect.bottom < -viewport || rect.top > viewport * 2) return;
        const total = rect.height + viewport;
        const target = Math.min(Math.max((viewport - rect.top) / total, 0), 1);
        state.current += (target - state.current) * 0.12;
        state.element.style.setProperty(
          "--burst",
          state.current.toFixed(3),
        );
        const shift = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        state.element.style.setProperty(
          "--parallax",
          `${(shift * -90).toFixed(2)}px`,
        );
        if (Math.abs(target - state.current) > 0.002) settling = true;
      });

      if (settling) requestUpdate();
    };

    const requestUpdate = () => {
      if (framePending) return;
      framePending = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    requestUpdate();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [reduced, finePointer]);
}
