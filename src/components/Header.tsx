import { forwardRef } from "react";
import { NAV_ITEMS } from "../data/content";
import type { Theme } from "../hooks/useTheme";
import { Brand } from "./ui/Brand";

interface HeaderProps {
  scrolled: boolean;
  hidden: boolean;
  menuOpen: boolean;
  onMenuToggle: () => void;
  theme: Theme;
  onThemeToggle: () => void;
  clock: string;
  activeId: string | null;
}

export const Header = forwardRef<HTMLButtonElement, HeaderProps>(
  function Header(
    {
      scrolled,
      hidden,
      menuOpen,
      onMenuToggle,
      theme,
      onThemeToggle,
      clock,
      activeId,
    },
    menuButtonRef,
  ) {
    const className = [
      "site-header",
      scrolled ? "is-scrolled" : "",
      hidden ? "is-hidden" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <header className={className} id="site-header">
        <Brand />

        <p className="header-status">
          <span className="header-status__dot" aria-hidden="true"></span>
          <span>Open for hire</span>
        </p>

        <nav className="desktop-nav" aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-nav={item.id}
              className={activeId === item.id ? "is-active" : undefined}
              aria-current={
                activeId === item.id ? "location" : undefined
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <span className="header-clock">{clock}</span>
          <button
            className="theme-toggle"
            type="button"
            onClick={onThemeToggle}
            aria-label={
              theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap"
            }
            title={theme === "dark" ? "Mode terang" : "Mode gelap"}
          >
            <svg
              className="icon-sun"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path>
            </svg>
            <svg
              className="icon-moon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>
            </svg>
          </button>
          <a className="btn-pill header-cta" href="#contact" data-magnetic>
            <span>Mari kolaborasi</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M8 7h9v9"></path>
            </svg>
          </a>
          <button
            className="menu-toggle"
            type="button"
            ref={menuButtonRef}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            onClick={onMenuToggle}
          >
            <span className="menu-toggle__label">
              {menuOpen ? "Tutup" : "Menu"}
            </span>
            <span className="menu-toggle__icon" aria-hidden="true">
              <i></i>
              <i></i>
            </span>
          </button>
        </div>
      </header>
    );
  },
);
