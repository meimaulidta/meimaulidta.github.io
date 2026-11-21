import { CONTACT_EMAIL, SOCIALS } from "../../data/content";
import { SectionAurora } from "../ui/SectionAurora";
import { SectionOrnament } from "../ui/SectionOrnament";

export function Contact() {
  return (
    <section
      className="contact"
      id="contact"
      aria-labelledby="contact-title"
      data-burst-section
    >
      <SectionAurora />
      <SectionOrnament kind="spark" />
      <div className="container">
        <div className="contact-card" data-reveal>
          <div className="contact-card__top">
            <p className="section-index">
              <span>08</span> Kontak
            </p>
            <p className="contact-card__status">
              <span className="header-status__dot" aria-hidden="true"></span>
              Open for 1—2 projects
            </p>
          </div>

          <svg
            className="contact-card__rocket"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="contact-card__rocket-flame"
              d="m9.2 20.5 2.8 2.3-2.8 5-1.6-1.2 1.6-6.1Zm5.6 0L12 22.8l2.8 5 1.6-1.2-1.6-6.1Z"
              fill="#67e8f9"
            />
            <path
              d="M12 2.5c-3.1 3.2-5 7.3-5 12.2v3.2l5 4 5-4v-3.2c0-4.9-1.9-9-5-12.2Z"
              fill="currentColor"
            />
            <path
              d="m7 15.5-3 3.2v4.1l5-3.8m8-3.5 3 3.2v4.1l-5-3.8"
              fill="currentColor"
            />
            <circle cx="12" cy="12" r="2" fill="#111a38" />
          </svg>

          <h2 className="contact-card__title" id="contact-title">
            Mau cari tahu tentang <br />
            <em>aku?</em>
          </h2>

          <p className="contact-card__lead">
            Ceritakan idemu di platform yang sudah aku sediakan dibawah.
          </p>

          <div className="contact-card__actions">
            <a
              className="btn btn--primary"
              href={`mailto:${CONTACT_EMAIL}`}
              data-magnetic
            >
              {CONTACT_EMAIL}
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
            <div className="contact-card__socials">
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
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
      </div>
    </section>
  );
}
