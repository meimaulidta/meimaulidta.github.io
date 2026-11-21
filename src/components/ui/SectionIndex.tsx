interface SectionIndexProps {
  index: string;
  label: string;
}

export function SectionIndex({ index, label }: SectionIndexProps) {
  return (
    <p className="section-index" data-reveal>
      <span>{index}</span> {label}
    </p>
  );
}
