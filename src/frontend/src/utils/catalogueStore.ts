const STORAGE_KEY = "gemora_catalogues";

export interface Catalogue {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
}

export function getCatalogues(): Catalogue[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCatalogues(catalogues: Catalogue[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogues));
}
