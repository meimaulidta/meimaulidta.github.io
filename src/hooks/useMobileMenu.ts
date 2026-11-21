import { useCallback, useEffect, useRef, useState } from "react";

export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    if (!menu) return;

    const getFocusables = () =>
      Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      ).filter((el) => !el.hasAttribute("hidden"));

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusables();
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeydown);
    const timer = window.setTimeout(() => {
      const items = getFocusables();
      if (items.length) items[0].focus({ preventScroll: true });
    }, 420);

    return () => {
      document.removeEventListener("keydown", onKeydown);
      window.clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) {
      toggleRef.current?.focus({ preventScroll: true });
    }
  }, []);

  return { open, toggle, close, menuRef, toggleRef };
}
