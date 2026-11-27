export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "tools"
  | "work"
  | "certificates"
  | "services"
  | "testimonials"
  | "contact";

export interface NavItem {
  id: Exclude<SectionId, "home">;
  label: string;
}

export interface LinkItem {
  label: string;
  href: string;
  download?: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  year: string;
  tag: string;
  links: LinkItem[];
  parallax?: number;
}

export interface Tool {
  name: string;
  description: string;
  image?: string;
  icon?: "worksheet";
  variant: string;
}

export interface Service {
  title: string;
  description: string;
  tags: string[];
  icon: "image" | "chart" | "chat" | "star";
  accent?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface StatItem {
  value: number;
  label: string;
}

export interface ExperienceItem {
  category: string;
  title: string;
  detail: string;
  period: string;
  variant: "organization" | "scholarship";
}

export interface PreviewPayload {
  src: string;
  alt: string;
  title: string;
}
