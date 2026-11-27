import { SOCIALS } from "../../data/content";
import { useClock } from "../../hooks/useClock";
import { Brand } from "../ui/Brand";
import { SectionAurora } from "../ui/SectionAurora";
import { SectionOrnament } from "../ui/SectionOrnament";
import { PrayerToast } from "./PrayerToast";

export function Footer() {
  const clock = useClock();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" data-burst-section>
      <SectionAurora />
      <SectionOrnament kind="spark" />
      <div className="container">
        <div className="footer__top" data-reveal>
          <div className="footer__brand">
            <Brand />
            <p>
              Content creator &amp; social media specialist
              <br />
              berbasis di Surabaya, Indonesia.
            </p>
          </div>
          <nav className="footer__nav" aria-label="Tautan sosial">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <span aria-hidden="true">↗</span>
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </nav>
          <div className="footer__meta">
            <p>{clock}</p>
            <p>Surabaya, Indonesia</p>
            <p>© {year} Mei Maulidta</p>
          </div>
        </div>

        <a
          className="footer__wordmark"
          href="#home"
          aria-label="mei — Kembali ke atas"
          data-reveal
        >
          mei
        </a>

        <div className="footer__bottom" data-reveal>
          <p className="footer__credit">
            Portfolio made with passion and prayers
            <PrayerToast />
            <span className="footer__credit-year">
              <span aria-hidden="true">·</span> {year}.
            </span>
          </p>
          <a className="back-to-top" href="#home">
            Kembali ke atas
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="M12 20V4M6 10l6-6 6 6"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
