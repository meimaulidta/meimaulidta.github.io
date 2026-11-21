import { useCursor } from "../hooks/usePointerEffects";

export function Cursor() {
  const { cursorRef, dotRef, ringRef, labelRef } = useCursor();

  return (
    <div className="cursor" aria-hidden="true" ref={cursorRef}>
      <span className="cursor__dot" ref={dotRef}></span>
      <span className="cursor__ring" ref={ringRef}>
        <span className="cursor__label" ref={labelRef}></span>
      </span>
    </div>
  );
}
