import type { RefObject } from "react";
import type { PreviewPayload } from "../types";

interface ImagePreviewProps {
  preview: PreviewPayload | null;
  onClose: () => void;
  dialogRef: RefObject<HTMLDialogElement | null>;
}

export function ImagePreview({
  preview,
  onClose,
  dialogRef,
}: ImagePreviewProps) {
  return (
    <dialog
      className="image-preview"
      id="image-preview"
      aria-labelledby="image-preview-title"
      ref={dialogRef}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="image-preview__header">
        <h2 id="image-preview-title">{preview?.title}</h2>
        <button
          className="image-preview__close"
          type="button"
          aria-label="Tutup preview gambar"
          onClick={onClose}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M18 6 6 18"></path>
          </svg>
        </button>
      </div>
      <img
        className="image-preview__image"
        src={preview?.src}
        alt={preview?.alt ?? ""}
      />
    </dialog>
  );
}
