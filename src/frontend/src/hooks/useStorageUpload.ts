import { useState } from "react";
import { convertToWebP } from "../utils/webpConverter";

const STORAGE_GATEWAY_URL = "https://blob.caffeine.ai";

export type UploadResult = {
  url: string;
  originalKB: number;
  webpKB: number;
  savedPercent: number;
  wasConverted: boolean;
};

export function useStorageUpload() {
  const [uploading, setUploading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string> => {
    setUploading(true);
    setConverting(false);
    setProgress(0);
    setUploadError(null);

    try {
      let fileToUpload = file;

      // Auto-convert images to WebP before upload
      if (file.type.startsWith("image/") && file.type !== "image/webp") {
        setConverting(true);
        fileToUpload = await convertToWebP(file);
        setConverting(false);
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);

      const response = await fetch(`${STORAGE_GATEWAY_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => response.statusText);
        throw new Error(`Upload failed (${response.status}): ${errText}`);
      }

      const data = (await response.json()) as {
        url?: string;
        directURL?: string;
      };
      const url = data.url ?? data.directURL ?? "";

      if (!url) {
        throw new Error("Upload succeeded but no URL returned");
      }

      setProgress(100);
      return url;
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Upload failed — please check your internet connection and try again";
      setUploadError(msg);
      console.error("[useStorageUpload] Upload failed:", err);
      throw new Error(msg);
    } finally {
      setUploading(false);
      setConverting(false);
    }
  };

  /** Upload with detailed result including WebP conversion info */
  const uploadFileDetailed = async (file: File): Promise<UploadResult> => {
    setUploading(true);
    setConverting(false);
    setProgress(0);
    setUploadError(null);

    try {
      const originalKB = file.size / 1024;
      let fileToUpload = file;
      let wasConverted = false;

      if (file.type.startsWith("image/") && file.type !== "image/webp") {
        setConverting(true);
        fileToUpload = await convertToWebP(file);
        setConverting(false);
        wasConverted = fileToUpload !== file;
      }

      const webpKB = fileToUpload.size / 1024;
      const savedPercent =
        originalKB > 0
          ? Math.max(0, ((originalKB - webpKB) / originalKB) * 100)
          : 0;

      const formData = new FormData();
      formData.append("file", fileToUpload);

      const response = await fetch(`${STORAGE_GATEWAY_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => response.statusText);
        throw new Error(`Upload failed (${response.status}): ${errText}`);
      }

      const data = (await response.json()) as {
        url?: string;
        directURL?: string;
      };
      const url = data.url ?? data.directURL ?? "";

      if (!url) throw new Error("Upload succeeded but no URL returned");

      setProgress(100);
      return { url, originalKB, webpKB, savedPercent, wasConverted };
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Upload failed — please check your internet connection and try again";
      setUploadError(msg);
      console.error("[useStorageUpload] Upload failed:", err);
      throw new Error(msg);
    } finally {
      setUploading(false);
      setConverting(false);
    }
  };

  return {
    uploadFile,
    uploadFileDetailed,
    uploading,
    converting,
    progress,
    uploadError,
  };
}
