import { useCallback, useEffect, useRef, useState } from "react";
import type { PreviewPayload } from "../types";

export function useImagePreview() {
  const [preview, setPreview] = useState<PreviewPayload | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openPreview = useCallback((payload: PreviewPayload) => {
    setPreview(payload);
  }, []);

  const closePreview = useCallback(() => {
    setPreview(null);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (preview) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [preview]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setPreview(null);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  return { preview, openPreview, closePreview, dialogRef };
}
