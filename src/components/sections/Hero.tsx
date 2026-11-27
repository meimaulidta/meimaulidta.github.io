import { useHeroGlow } from "../../hooks/usePointerEffects";

export function Hero() {
  const heroRef = useHeroGlow();

  return (
    <section
      className="hero"
      id="home"
      aria-labelledby="hero-title"
      data-burst-section
      ref={heroRef}
    >
      <div className="hero__wash" aria-hidden="true"></div>
      <div className="hero__grain" aria-hidden="true"></div>
      <div className="section-aurora" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero-anim">
            <span className="eyebrow__dot" aria-hidden="true"></span>
            Content Creator &amp; Social Media Specialist
          </p>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__line">
              <span className="hero__line-inner">Halo, aku Mei.</span>
            </span>
            <span className="hero__line">
              <span className="hero__line-inner">Let’s work</span>
            </span>
            <span className="hero__line">
              <span className="hero__line-inner">
                <em>together.</em>
              </span>
            </span>
          </h1>

          <p className="hero__lead hero-anim">
            <strong>Mei Maulidta Tri Ambarwati</strong> — creating content and
            social media strategies that feel clear, relevant, and human.
          </p>

          <div className="hero__actions hero-anim">
            <a className="btn btn--primary" href="#work" data-magnetic>
              Explore my work
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M8 7h9v9"></path>
              </svg>
            </a>
            <a
              className="btn btn--ghost"
              href="assets/files/CV%20MEI%20MAULIDTA%20TRI%20A.%20new.pdf"
              download="CV Mei Maulidta Tri Ambarwati.pdf"
              data-magnetic
            >
              Download my CV
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v4h14v-4"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="hero__visual hero-anim">
          <div className="portrait-card" data-tilt>
            <img
              src="assets/hero-image.jpg"
              alt="Potret Mei Maulidta Tri Ambarwati"
              width="964"
              height="1400"
              fetchPriority="high"
              decoding="async"
              data-parallax="4"
            />
            <span className="portrait-card__badge">
              <span className="header-status__dot" aria-hidden="true"></span>
              Open for hire
            </span>
            <span className="portrait-card__caption">
              <span>Mei Maulidta</span>
              <span>Surabaya, ID</span>
            </span>
          </div>

          <div className="float-card float-card--reach">
            <span className="float-card__icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M3 17l5-6 4 3 5-7 4 4"></path>
              </svg>
            </span>
            <p className="float-card__num">3 Social Media</p>
            <p className="float-card__label">Platforms</p>
          </div>

          <div className="float-card float-card--engage">
            <span className="float-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 3.5C19 16.65 12 21 12 21Z"></path>
              </svg>
            </span>
            <p className="float-card__num">20%</p>
            <p className="float-card__label">Engagement rate</p>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#services" aria-label="Scroll ke bawah">
        <span>Scroll</span>
        <span className="hero__scroll-line" aria-hidden="true"></span>
      </a>
    </section>
  );
}
