import { SERVICES } from "../../data/content";
import type { Service } from "../../types";
import { SectionAurora } from "../ui/SectionAurora";
import { SectionIndex } from "../ui/SectionIndex";
import { SectionOrnament } from "../ui/SectionOrnament";

function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  if (icon === "image") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="3" y="5" width="18" height="14" rx="3"></rect>
        <circle cx="9" cy="10" r="1.6"></circle>
        <path d="M3 16l5-4 4 3 4-4 5 5"></path>
      </svg>
    );
  }

  if (icon === "chart") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2"></path>
      </svg>
    );
  }

  if (icon === "chat") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z"></path>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M12 3l2.5 5.3 5.8.8-4.2 4 1 5.8L12 16.2 6.9 18.9l1-5.8-4.2-4 5.8-.8L12 3Z"></path>
    </svg>
  );
}

export function Services() {
  return (
    <section
      className="section services"
      id="services"
      aria-labelledby="services-title"
      data-burst-section
    >
      <SectionAurora />
      <SectionOrnament kind="typewriter" />
      <div className="container">
        <div className="section-head">
          <div>
            <SectionIndex index="06" label="Layanan" />
            <h2 className="section-title" id="services-title" data-reveal>
              Yang bisa
              <br />
              aku <em>bantu.</em>
            </h2>
          </div>
          <p className="section-lead" data-reveal>
            Dari ide sampai posting, dan bantu brand punya cerita yang
            konsisten.
          </p>
        </div>

        <div className="service-grid">
          {SERVICES.map((service, index) => (
            <article
              key={service.title}
              className={`service-card${service.accent ? " service-card--accent" : ""}`}
              data-reveal
            >
              <div className="service-card__top">
                <span className="service-card__icon" aria-hidden="true">
                  <ServiceIcon icon={service.icon} />
                </span>
                <span className="service-card__num">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="tag-list">
                {service.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {service.accent && (
                <a className="service-card__link" href="#contact">
                  Mulai campaign
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
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
