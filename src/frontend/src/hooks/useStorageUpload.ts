import { HttpAgent } from "@icp-sdk/core/agent";
import { useState } from "react";
import { loadConfig } from "../config";
import { StorageClient } from "../utils/StorageClient";

export function useStorageUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file: File): Promise<string> => {
    setUploading(true);
    setProgress(0);
    try {
      const config = await loadConfig();
      const agent = new HttpAgent({ host: config.backend_host });
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await storageClient.putFile(bytes, (pct: number) =>
        setProgress(Math.round(pct * 100)),
      );
      const url = await storageClient.getDirectURL(hash);
      return url;
    } catch (err) {
      console.error("[useStorageUpload] Upload failed:", err);
      throw new Error("Upload failed — check your connection and try again");
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading, progress };
}
