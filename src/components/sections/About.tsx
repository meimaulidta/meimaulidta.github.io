import { STATS } from "../../data/content";
import { useCounter } from "../../hooks/useCounter";
import { SectionAurora } from "../ui/SectionAurora";
import { SectionIndex } from "../ui/SectionIndex";

function Stat({ value, label }: { value: number; label: string }) {
  const { ref, value: display } = useCounter(value);

  return (
    <div className="stat stat--card" data-reveal>
      <p className="stat__num">
        <span ref={ref}>{display}</span>
      </p>
      <p className="stat__label">{label}</p>
    </div>
  );
}

export function About() {
  return (
    <section
      className="section about"
      id="about"
      aria-labelledby="about-title"
      data-burst-section
    >
      <SectionAurora />
      <div className="container about__grid">
        <aside className="about__aside">
          <figure className="about__portrait" data-reveal>
            <img
              src="assets/about-image.jpeg"
              alt="Potret Mei Maulidta di studio"
              width="1000"
              height="1333"
              loading="lazy"
              data-parallax="5"
            />
            <figcaption>
              <span>Mei Maulidta</span>
              <span>Content creator</span>
            </figcaption>
          </figure>

          <div className="about__facts" data-reveal>
            <p className="about__facts-title">Quick facts</p>
            <ul>
              <li>
                <span>Base</span>Surabaya, Indonesia
              </li>
              <li>
                <span>Fokus</span>Content, social &amp; growth
              </li>
              <li>
                <span>Kerja</span>Onsite / Remote
              </li>
            </ul>
          </div>
        </aside>

        <div className="about__content">
          <SectionIndex index="01" label="Tentang" />
          <h2 className="section-title" id="about-title" data-reveal>
            The story behind
            <br />
            <em>Mei.</em>
          </h2>

          <p className="about__note" data-reveal>
            Dibalik setiap ide ada sisi kreatif mei yang selalu ingin mencoba
            hal baru dan melihat sesuai dari sudut pandang yang berbeda. Mei
            senang mengeksplorasi dunia visual merangkai ide menjadi cerita
            serta menciptakan konten yang tidak hanya mearik secara visual
            tetapi juga punya cerita didalamnya.
          </p>

          <div className="stats">
            {STATS.map((stat) => (
              <Stat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          <a className="text-link" href="#contact" data-reveal>
            Kenalan lebih jauh
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
        </div>
      </div>
    </section>
  );
}
