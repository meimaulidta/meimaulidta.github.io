import type { RefObject } from "react";
import { CONTACT_EMAIL, NAV_ITEMS, SOCIALS } from "../data/content";

interface MobileMenuProps {
  open: boolean;
  close: (restoreFocus?: boolean) => void;
  menuRef: RefObject<HTMLElement | null>;
}

export function MobileMenu({ open, close, menuRef }: MobileMenuProps) {
  return (
    <nav
      className="mobile-menu"
      id="mobile-menu"
      aria-label="Menu seluler"
      aria-hidden={!open}
      inert={!open}
      ref={menuRef}
    >
      <div className="mobile-menu__inner">
        <p className="mobile-menu__label">Navigasi</p>
        <ul className="mobile-menu__nav">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-menu-link
                onClick={() => close(false)}
              >
                <span>{item.label}</span>
                <sup>{String(index + 1).padStart(2, "0")}</sup>
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__footer">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <div className="mobile-menu__socials">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href={SOCIALS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
