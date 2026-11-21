import { PROJECTS } from "../../data/content";
import type { Project } from "../../types";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionAurora } from "../ui/SectionAurora";
import { SectionIndex } from "../ui/SectionIndex";
import { SectionOrnament } from "../ui/SectionOrnament";

interface WorkProps {
  onPreview: (project: Project) => void;
}

export function Work({ onPreview }: WorkProps) {
  return (
    <section
      className="section work"
      id="work"
      aria-labelledby="work-title"
      data-burst-section
    >
      <SectionAurora />
      <SectionOrnament kind="rocket" />
      <div className="container">
        <div className="section-head">
          <div>
            <SectionIndex index="04" label="Karya" />
            <h2 className="section-title" id="work-title" data-reveal>
              Cerita yang
              <br />
              <em>jadi hasil.</em>
            </h2>
          </div>
        </div>

        <div className="work-grid work-grid--projects">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onPreview={onPreview}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
