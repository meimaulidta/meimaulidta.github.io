import { TESTIMONIALS } from "../../data/content";
import { SectionAurora } from "../ui/SectionAurora";
import { SectionIndex } from "../ui/SectionIndex";
import { SectionOrnament } from "../ui/SectionOrnament";

export function Testimonials() {
  return (
    <section
      className="section testimonials"
      id="testimonials"
      aria-labelledby="testimonials-title"
      data-burst-section
    >
      <SectionAurora />
      <SectionOrnament kind="quote" />
      <div className="container">
        <div className="section-head">
          <div>
            <SectionIndex index="07" label="Testimoni" />
            <h2 className="section-title" id="testimonials-title" data-reveal>
              Kata
              <br />
              <em>orang terdekat.</em>
            </h2>
          </div>
          <p className="section-lead" data-reveal>
            Sedikit cerita dari orang-orang terdekat.
          </p>
        </div>

        <div className="testimonial-grid">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              className="testimonial"
              data-reveal
              key={testimonial.name}
            >
              <div
                className="testimonial__stars"
                aria-label="Rating 5 dari 5"
              >
                <span aria-hidden="true">★★★★★</span>
              </div>
              <blockquote>
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <figcaption>
                <span className="testimonial__avatar" aria-hidden="true">
                  {testimonial.initials}
                </span>
                <div>
                  <cite>{testimonial.name}</cite>
                  <span> {testimonial.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
