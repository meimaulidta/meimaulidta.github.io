interface SectionOrnamentProps {
  kind: "butterfly" | "book" | "rocket" | "flower" | "typewriter" | "quote" | "spark";
}

export function SectionOrnament({ kind }: SectionOrnamentProps) {
  return (
    <div
      className={`section-ornament section-ornament--${kind}`}
      aria-hidden="true"
    >
      {kind === "butterfly" && (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M31 31C22 14 9 10 8 20c-1 8 8 14 20 15-12 1-17 8-12 13 6 6 14-1 17-11m0-6c9-17 22-21 23-11 1 8-8 14-20 15 12 1 17 8 12 13-6 6-14-1-17-11" />
          <path d="M32 28v18m0-13c-5-8-10-10-13-10m13 11c5-8 10-10 13-10M29 23l-5-5m11 5 5-5" />
        </svg>
      )}
      {kind === "book" && (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M32 19c-7-6-15-7-23-4v31c9-3 17-2 23 4m0-31c7-6 15-7 23-4v31c-9-3-17-2-23 4m0-31v35" />
          <path d="M14 23c5-1 9 0 12 2m-12 6c5-1 9 0 12 2m24-10c-5-1-9 0-12 2m12 6c-5-1-9 0-12 2" />
        </svg>
      )}
      {kind === "rocket" && (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M38 10c-11 3-19 11-22 23l15 15c12-3 20-11 23-22l-16-16Z" />
          <path d="m23 29-9 1-6 8 14 1m16 0-1 9-8 6-1-14" />
          <circle cx="39" cy="25" r="5" />
          <path d="M16 48c-1 5-5 8-10 9 1-5 4-9 9-10m5-4-7 2" />
        </svg>
      )}
      {kind === "flower" && (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M32 28c-9-12-2-18 2-16 5 2 4 9-2 16Zm4 2c12-9 18-2 16 2-2 5-9 4-16-2Zm-1 5c9 12 2 18-2 16-5-2-4-9 2-16Zm-5-1c-12 9-18 2-16-2 2-5 9-4 16 2Z" />
          <circle cx="32" cy="32" r="5" />
          <path d="M32 38v14m0-6c-4-5-8-5-11-3m11 2c4-5 8-5 11-3" />
        </svg>
      )}
      {kind === "typewriter" && (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M18 10h28v18H18zM12 30h40l4 8v12H8V38l4-8Z" />
          <path d="M15 38h34m-29 7h3m5 0h3m5 0h3m5 0h3m-22-29h18m-18 6h12" />
          <path className="section-ornament__cursor" d="M43 14v4" />
          <circle cx="48" cy="23" r="1" />
        </svg>
      )}
      {kind === "quote" && (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M27 18H14v15h11v13H13V33c0-9 5-15 14-15Zm24 0H38v15h11v13H37V33c0-9 5-15 14-15Z" />
        </svg>
      )}
      {kind === "spark" && (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M32 7 36 26l17 6-17 6-4 19-4-19-17-6 17-6 4-19Z" />
          <path d="m51 9 2 7 6 2-6 2-2 7-2-7-6-2 6-2 2-7Z" />
        </svg>
      )}
    </div>
  );
}
