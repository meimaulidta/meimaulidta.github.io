import { CERTIFICATES } from "../../data/content";
import type { Project } from "../../types";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionAurora } from "../ui/SectionAurora";
import { SectionIndex } from "../ui/SectionIndex";
import { SectionOrnament } from "../ui/SectionOrnament";

interface CertificatesProps {
  onPreview: (project: Project) => void;
}

export function Certificates({ onPreview }: CertificatesProps) {
  return (
    <section
      className="section certificates"
      id="certificates"
      aria-labelledby="certificates-title"
      data-burst-section
    >
      <SectionAurora />
      <SectionOrnament kind="flower" />
      <div className="container">
        <div className="section-head">
          <div>
            <SectionIndex index="05" label="Sertifikasi" />
            <h2 className="section-title" id="certificates-title" data-reveal>
              Bekal untuk
              <br />
              <em>terus berkembang.</em>
            </h2>
          </div>
          <p className="section-lead" data-reveal>
            Sertifikat dan pelatihan yang menjadi bagian dari perjalanan
            belajarku.
          </p>
        </div>

        <div className="certificate-grid">
          {CERTIFICATES.map((certificate) => (
            <ProjectCard
              key={certificate.title}
              project={certificate}
              onPreview={onPreview}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
