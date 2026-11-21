import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "./useMedia";

export function useMagnetic() {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();

  useEffect(() => {
    if (reduced || !finePointer) return;
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]"),
    );

    const cleanups: Array<() => void> = [];

    items.forEach((item) => {
      const onEnter = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        item.style.transition = "transform 0.18s linear";
      };

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = item.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const strength = item.classList.contains("brand") ? 0.3 : 0.22;
        item.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      };

      const onLeave = () => {
        item.style.transition =
          "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
        item.style.transform = "translate3d(0, 0, 0)";
      };

      item.addEventListener("pointerenter", onEnter);
      item.addEventListener("pointermove", onMove);
      item.addEventListener("pointerleave", onLeave);

      cleanups.push(() => {
        item.removeEventListener("pointerenter", onEnter);
        item.removeEventListener("pointermove", onMove);
        item.removeEventListener("pointerleave", onLeave);
        item.style.transform = "";
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reduced, finePointer]);
}

export function useTilt() {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();

  useEffect(() => {
    if (reduced || !finePointer) return;
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tilt]"),
    );

    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const media = card.querySelector<HTMLElement>(".work-card__media");

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        if (
          card.hasAttribute("data-reveal") &&
          !card.classList.contains("is-visible")
        ) {
          return;
        }
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transition = "transform 0.18s linear";
        card.style.transform = `perspective(1100px) rotateX(${-y * 2.4}deg) rotateY(${x * 2.8}deg) translate3d(0, -4px, 0)`;
        if (media) {
          const mRect = media.getBoundingClientRect();
          media.style.setProperty(
            "--gx",
            `${((event.clientX - mRect.left) / mRect.width) * 100}%`,
          );
          media.style.setProperty(
            "--gy",
            `${((event.clientY - mRect.top) / mRect.height) * 100}%`,
          );
        }
      };

      const onLeave = () => {
        card.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
        card.style.transform = "";
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);

      cleanups.push(() => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reduced, finePointer]);
}

export function useHeroGlow() {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || reduced || !finePointer) return;

    const onMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mx", `${x}%`);
      hero.style.setProperty("--my", `${y}%`);
    };

    hero.addEventListener("pointermove", onMove, { passive: true });
    return () => hero.removeEventListener("pointermove", onMove);
  }, [reduced, finePointer]);

  return heroRef;
}

export function useCursor() {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!cursor || !dot || !ring || reduced || !finePointer) return;

    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      ringX: window.innerWidth / 2,
      ringY: window.innerHeight / 2,
      visible: false,
    };

    let framePending = false;

    const render = () => {
      framePending = false;
      state.ringX += (state.x - state.ringX) * 0.16;
      state.ringY += (state.y - state.ringY) * 0.16;
      dot.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${state.ringX}px, ${state.ringY}px, 0) translate(-50%, -50%)`;
      if (
        Math.abs(state.x - state.ringX) > 0.4 ||
        Math.abs(state.y - state.ringY) > 0.4
      ) {
        requestRender();
      }
    };

    const requestRender = () => {
      if (framePending) return;
      framePending = true;
      requestAnimationFrame(render);
    };

    const updateTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;
      const interactive = target.closest("a, button, [data-cursor]");
      const labelTarget = target.closest<HTMLElement>("[data-cursor]");
      cursor.classList.toggle("is-active", Boolean(interactive));
      cursor.classList.toggle("has-label", Boolean(labelTarget));
      if (label) {
        label.textContent = labelTarget?.dataset.cursor ?? "";
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      state.x = event.clientX;
      state.y = event.clientY;
      if (!state.visible) {
        state.ringX = state.x;
        state.ringY = state.y;
        state.visible = true;
        document.documentElement.classList.add("has-cursor");
        cursor.classList.remove("is-out");
      }
      updateTarget(event.target);
      requestRender();
    };

    const onLeave = () => cursor.classList.add("is-out");
    const onEnter = () => cursor.classList.remove("is-out");
    const onDown = () => cursor.classList.add("is-pressed");
    const onUp = () => cursor.classList.remove("is-pressed");
    const onBlur = () => cursor.classList.add("is-out");

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onBlur);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [reduced, finePointer]);

  return { cursorRef, dotRef, ringRef, labelRef };
}
