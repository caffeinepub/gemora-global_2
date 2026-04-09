/**
 * Converts any image file to WebP format using Canvas API.
 * Falls back to the original file if conversion fails.
 */
export async function convertToWebP(file: File): Promise<File> {
  // Only process image files
  if (!file.type.startsWith("image/")) return file;
  // Already WebP — return as is
  if (file.type === "image/webp") return file;

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.warn(
            "[webpConverter] Canvas 2D context unavailable — using original",
          );
          resolve(file);
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              console.warn(
                "[webpConverter] Blob conversion failed — using original",
              );
              resolve(file);
              return;
            }
            const originalKB = (file.size / 1024).toFixed(1);
            const webpKB = (blob.size / 1024).toFixed(1);
            const saved = (((file.size - blob.size) / file.size) * 100).toFixed(
              1,
            );
            console.info(
              `[webpConverter] ${file.name}: ${originalKB}KB → ${webpKB}KB (${saved}% saved)`,
            );
            const webpName = `${file.name.replace(/\.[^.]+$/, "")}.webp`;
            const webpFile = new File([blob], webpName, {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(webpFile);
          },
          "image/webp",
          0.8,
        );
      } catch (err) {
        console.warn(
          "[webpConverter] Error during conversion — using original:",
          err,
        );
        resolve(file);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      console.warn("[webpConverter] Image load failed — using original");
      resolve(file);
    };

    img.src = objectUrl;
  });
}
