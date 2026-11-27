interface PreloaderProps {
  progress: number;
}

export function Preloader({ progress }: PreloaderProps) {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader__top">
        <span>Portfolio / 2026</span>
        <span>Surabaya, ID</span>
      </div>
      <div className="preloader__center">
        <span className="preloader__word">
          mei<em>.</em>
        </span>
      </div>
      <div className="preloader__bottom">
        <span>Menyiapkan konten</span>
        <span className="preloader__counter">
          <span>{String(progress).padStart(2, "0")}</span>
          <sup>%</sup>
        </span>
      </div>
      <div className="preloader__bar">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </div>
  );
}
