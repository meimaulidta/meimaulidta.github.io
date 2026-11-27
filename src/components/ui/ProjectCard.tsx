import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  onPreview: (project: Project) => void;
}

export function ProjectCard({ project, onPreview }: ProjectCardProps) {
  return (
    <article className="work-card" data-reveal data-tilt>
      <div className="work-card__media">
        <button
          className="work-card__preview"
          type="button"
          data-image-preview
          data-cursor="Preview"
          aria-label={`Preview ${project.title}`}
          onClick={() => onPreview(project)}
        >
          <img
            src={project.image}
            alt={project.alt}
            width={project.width}
            height={project.height}
            loading="lazy"
            decoding="async"
            data-parallax={project.parallax}
          />
        </button>
        <span className="work-card__tag">{project.tag}</span>
      </div>
      <div className="work-card__body">
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="work-card__actions">
          {project.links.map((link) => (
            <a
              key={link.label + link.href}
              className="work-card__download"
              href={link.href}
              download={link.download}
              target={link.download ? undefined : "_blank"}
              rel={link.download ? undefined : "noopener noreferrer"}
            >
              {link.label}
            </a>
          ))}
          <span className="work-card__year">{project.year}</span>
        </div>
      </div>
    </article>
  );
}
