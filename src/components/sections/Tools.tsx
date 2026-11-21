import type { CSSProperties } from "react";
import { TOOLS } from "../../data/content";
import { SectionAurora } from "../ui/SectionAurora";
import { SectionIndex } from "../ui/SectionIndex";
import { SectionOrnament } from "../ui/SectionOrnament";

export function Tools() {
  return (
    <section
      className="section tools"
      id="tools"
      aria-labelledby="tools-title"
      data-burst-section
    >
      <SectionAurora />
      <SectionOrnament kind="book" />
      <div className="container">
        <div className="section-head">
          <div>
            <SectionIndex index="03" label="Skill & Tools" />
            <h2 className="section-title" id="tools-title" data-reveal>
              Ide kreatif,
              <br />
              <em>tools pilihan.</em>
            </h2>
          </div>
          <p className="section-lead" data-reveal>
            Dari merancang visual sampai mengolah konten dan dokumen, ini tools
            yang aku gunakan untuk mewujudkan ide.
          </p>
        </div>

        <div className="tools-grid">
          {TOOLS.map((tool, index) => (
            <article
              key={tool.name}
              className={`tool-card tool-card--${tool.variant}`}
              data-reveal
              style={{ "--tool-index": index } as CSSProperties}
            >
              <div className="tool-card__logo" aria-hidden="true">
                {tool.image ? (
                  <img
                    src={tool.image}
                    alt=""
                    width="512"
                    height="512"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <svg viewBox="0 0 64 64" fill="none">
                    <path
                      d="M16 7h22l13 13v36H16a5 5 0 0 1-5-5V12a5 5 0 0 1 5-5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M38 7v14h13M19 29h25M19 37h25M19 45h25M27 27v21M36 27v21"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.4"
                    />
                  </svg>
                )}
              </div>
              <div className="tool-card__copy">
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
              </div>
              <span className="tool-card__number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
