import { useEffect, useState } from "react";
import { useReducedMotion } from "./useMedia";

export function usePreloader() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let timer = 0;
    let started = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setProgress(100);
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-loaded", "intro-ready");
    };

    if (reduced) {
      finish();
      return;
    }

    const tick = (timestamp: number) => {
      if (!started) started = timestamp;
      const ratio = Math.min((timestamp - started) / 1500, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));
      if (ratio < 1) raf = requestAnimationFrame(tick);
      else timer = window.setTimeout(finish, 40);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [reduced]);

  return progress;
}
