import { Cursor } from "./components/Cursor";
import { Header } from "./components/Header";
import { ImagePreview } from "./components/ImagePreview";
import { MobileMenu } from "./components/MobileMenu";
import { Preloader } from "./components/Preloader";
import { ScrollProgress } from "./components/ScrollProgress";
import { About } from "./components/sections/About";
import { Certificates } from "./components/sections/Certificates";
import { Contact } from "./components/sections/Contact";
import { Experience } from "./components/sections/Experience";
import { Footer } from "./components/sections/Footer";
import { Hero } from "./components/sections/Hero";
import { Marquee } from "./components/sections/Marquee";
import { Services } from "./components/sections/Services";
import { Testimonials } from "./components/sections/Testimonials";
import { Tools } from "./components/sections/Tools";
import { Work } from "./components/sections/Work";
import { useActiveNav } from "./hooks/useActiveNav";
import { useClock } from "./hooks/useClock";
import { useHeaderScroll } from "./hooks/useHeaderScroll";
import { useImagePreview } from "./hooks/useImagePreview";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { usePreloader } from "./hooks/usePreloader";
import { useReveal } from "./hooks/useReveal";
import { useScrollEffects } from "./hooks/useScrollEffects";
import { useSectionMotion } from "./hooks/useSectionMotion";
import { useMagnetic, useTilt } from "./hooks/usePointerEffects";
import { useTheme } from "./hooks/useTheme";
import type { Project } from "./types";

export default function App() {
  const progress = usePreloader();
  const { theme, toggle } = useTheme();
  const clock = useClock();
  const menu = useMobileMenu();
  const { scrolled, hidden, progress: scrollProgress } =
    useHeaderScroll(menu.open);
  const activeId = useActiveNav();
  const { preview, openPreview, closePreview, dialogRef } = useImagePreview();

  useReveal();
  useSectionMotion();
  useScrollEffects();
  useMagnetic();
  useTilt();

  const handlePreview = (project: Project) =>
    openPreview({
      src: project.image,
      alt: project.alt,
      title: project.title,
    });

  return (
    <>
      <a className="skip-link" href="#main">
        Langsung ke konten
      </a>

      <ScrollProgress progress={scrollProgress} />
      <Cursor />
      <Preloader progress={progress} />

      <Header
        scrolled={scrolled}
        hidden={hidden}
        menuOpen={menu.open}
        onMenuToggle={menu.toggle}
        theme={theme}
        onThemeToggle={toggle}
        clock={clock}
        activeId={activeId}
        ref={menu.toggleRef}
      />

      <MobileMenu
        open={menu.open}
        close={menu.close}
        menuRef={menu.menuRef}
      />

      <main id="main" tabIndex={-1}>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Tools />
        <Work onPreview={handlePreview} />
        <Certificates onPreview={handlePreview} />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <ImagePreview
        preview={preview}
        onClose={closePreview}
        dialogRef={dialogRef}
      />
    </>
  );
}
