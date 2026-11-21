import { EXPERIENCE_ITEMS } from "../../data/content";
import { SectionAurora } from "../ui/SectionAurora";
import { SectionIndex } from "../ui/SectionIndex";
import { SectionOrnament } from "../ui/SectionOrnament";

const GALLERY = [
  {
    src: "assets/experience/experience1.jpeg",
    alt: "Mei menikmati pemandangan alam saat perjalanan",
    width: 960,
    height: 1280,
  },
  {
    src: "assets/experience/experience2.jpeg",
    alt: "Dokumentasi kegiatan bersama teman-teman",
    width: 1280,
    height: 960,
  },
  {
    src: "assets/experience/experience3.jpeg",
    alt: "Foto bersama setelah menyelesaikan sebuah kegiatan",
    width: 1280,
    height: 720,
  },
];

export function Experience() {
  return (
    <section
      className="section experience"
      id="experience"
      aria-labelledby="experience-title"
      data-burst-section
    >
      <SectionAurora />
      <SectionOrnament kind="butterfly" />
      <div className="container">
        <div className="experience__layout">
          <div className="experience__content">
            <div className="experience__heading">
              <SectionIndex index="02" label="Experience" />
              <h2 className="section-title" id="experience-title" data-reveal>
                Cerita di balik
                <br />
                <em>setiap langkah.</em>
              </h2>
            </div>
            <p className="section-lead experience__story" data-reveal>
              <span className="experience__eyebrow">
                Journey That Started With a Challenge
              </span>
              <span className="experience__copy">
                Perjalanan ini dimulai dari sebuah kesempatan yang mengajarkan
                saya bahwa pengalaman tidak selalu datang dalam kondisi yang
                sempurna. Saya belajar untuk beradaptasi, berani mencoba hal
                baru, dan bertanggung jawab atas setiap proses yang saya jalani.
              </span>
            </p>
          </div>

          <figure className="experience-gallery" data-reveal>
            <div className="experience-gallery__images">
              {GALLERY.map((image) => (
                <a
                  key={image.src}
                  className="experience-gallery__image"
                  href={image.src}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Buka foto ukuran penuh: ${image.alt}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </div>
          </figure>
        </div>

        <div className="experience-highlights">
          <div className="experience-highlights__heading" data-reveal>
            <p className="experience-highlights__eyebrow">
              Perjalanan &amp; apresiasi
            </p>
            <h3>
              Ruang untuk <em>bertumbuh.</em>
            </h3>
          </div>
          <div className="experience-card-grid">
            {EXPERIENCE_ITEMS.map((item) => (
              <article
                key={item.title}
                className={`experience-card experience-card--${item.variant}`}
                data-reveal
              >
                <div className="experience-card__top">
                  <span className="experience-card__icon" aria-hidden="true">
                    {item.variant === "organization" ? (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m16-11a4 4 0 0 1 0 8m4 3v-2a4 4 0 0 0-3-3.87M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="m12 3 2.8 5.67L21 9.57l-4.5 4.39 1.06 6.2L12 17.23l-5.56 2.93 1.06-6.2L3 9.57l6.2-.9L12 3Z" />
                        <path d="M8.5 13.5h7" />
                      </svg>
                    )}
                  </span>
                  <span className="experience-card__period">{item.period}</span>
                </div>
                <p className="experience-card__category">{item.category}</p>
                <h4>{item.title}</h4>
                <p className="experience-card__detail">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
