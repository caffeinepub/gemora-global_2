import { useRef, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import { useStorageUpload } from "../../hooks/useStorageUpload";
import {
  type Catalogue,
  getCatalogues,
  saveCatalogues,
} from "../../utils/catalogueStore";

const fieldStyle = {
  width: "100%",
  background: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: 8,
  padding: "10px 12px",
  color: "#fff",
  fontSize: 14,
  outline: "none",
} as React.CSSProperties;

const labelStyle = {
  color: "rgba(255,255,255,0.6)",
  fontSize: 12,
  display: "block",
  marginBottom: 6,
} as React.CSSProperties;

export default function AdminCatalogue() {
  const [catalogues, setCatalogues] = useState<Catalogue[]>(() =>
    getCatalogues(),
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    fileUrl: "",
    fileName: "",
  });
  const [uploading, setUploading] = useState(false);
  const {
    uploadFile,
    uploading: storageUploading,
    progress,
  } = useStorageUpload();
  const fileRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ title: "", description: "", fileUrl: "", fileName: "" });
    setShowForm(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setForm((f) => ({ ...f, fileUrl: url, fileName: file.name }));
      toast.success("File uploaded successfully");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!form.fileUrl) {
      toast.error("Please upload a PDF file");
      return;
    }
    const updated = [
      ...catalogues,
      {
        id: Date.now(),
        title: form.title.trim(),
        description: form.description.trim(),
        fileUrl: form.fileUrl,
        fileName: form.fileName,
        uploadedAt: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      },
    ];
    saveCatalogues(updated);
    setCatalogues(updated);
    toast.success("Catalogue saved");
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this catalogue?")) return;
    const updated = catalogues.filter((c) => c.id !== id);
    saveCatalogues(updated);
    setCatalogues(updated);
    toast.success("Catalogue deleted");
  };

  const isUploading = uploading || storageUploading;

  return (
    <AdminLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div>
            <h2
              style={{
                color: "gold",
                fontSize: 22,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Catalogue Manager
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                marginTop: 4,
              }}
            >
              Upload multiple catalogues. Buyers can download them from the
              website.
            </p>
          </div>
          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              style={{
                background: "gold",
                color: "#000",
                border: "none",
                borderRadius: 8,
                padding: "10px 20px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              + Add Catalogue
            </button>
          )}
        </div>

        {showForm && (
          <div
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 12,
              padding: 24,
              marginBottom: 28,
            }}
          >
            <h3 style={{ color: "gold", marginBottom: 20, fontSize: 16 }}>
              Upload New Catalogue
            </h3>
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <label htmlFor="cat-title" style={labelStyle}>
                  Catalogue Title *
                </label>
                <input
                  id="cat-title"
                  style={fieldStyle}
                  placeholder="e.g. Summer Collection 2026"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="cat-desc" style={labelStyle}>
                  Description (optional)
                </label>
                <textarea
                  id="cat-desc"
                  style={{ ...fieldStyle, minHeight: 72, resize: "vertical" }}
                  placeholder="Brief description of this catalogue..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="cat-file" style={labelStyle}>
                  Upload PDF File *
                </label>
                <button
                  type="button"
                  style={{
                    border: "2px dashed #444",
                    borderRadius: 8,
                    padding: "20px 16px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "#0b0b0d",
                    width: "100%",
                  }}
                  onClick={() => fileRef.current?.click()}
                  aria-label="Upload PDF file"
                >
                  <input
                    ref={fileRef}
                    id="cat-file"
                    type="file"
                    accept="application/pdf,.pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {form.fileUrl ? (
                    <div style={{ color: "#4ade80", fontSize: 14 }}>
                      ✓ {form.fileName}
                    </div>
                  ) : isUploading ? (
                    <div style={{ color: "gold", fontSize: 14 }}>
                      Uploading... {progress > 0 ? `${progress}%` : ""}
                    </div>
                  ) : (
                    <div
                      style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}
                    >
                      <div style={{ fontSize: 28, marginBottom: 6 }}>📄</div>
                      Click to upload PDF file
                    </div>
                  )}
                </button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                type="button"
                onClick={handleSave}
                disabled={isUploading}
                style={{
                  background: isUploading ? "#555" : "gold",
                  color: "#000",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontWeight: 600,
                  cursor: isUploading ? "not-allowed" : "pointer",
                  fontSize: 14,
                }}
              >
                {isUploading ? "Uploading..." : "Save Catalogue"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid #444",
                  borderRadius: 8,
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {catalogues.length === 0 ? (
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: 12,
              padding: "48px 24px",
              textAlign: "center",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
            <p>No catalogues uploaded yet.</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>
              Click "Add Catalogue" to upload your first PDF.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {catalogues.map((cat) => (
              <div
                key={cat.id}
                style={{
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: 12,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "rgba(255,215,0,0.1)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  📄
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}>
                    {cat.title}
                  </div>
                  {cat.description && (
                    <div
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: 13,
                        marginTop: 2,
                      }}
                    >
                      {cat.description}
                    </div>
                  )}
                  <div
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 12,
                      marginTop: 4,
                    }}
                  >
                    Uploaded {cat.uploadedAt} · {cat.fileName}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <a
                    href={cat.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "rgba(255,215,0,0.15)",
                      color: "gold",
                      border: "1px solid rgba(255,215,0,0.3)",
                      borderRadius: 6,
                      padding: "6px 12px",
                      fontSize: 13,
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Preview
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(cat.id)}
                    style={{
                      background: "rgba(220,38,38,0.15)",
                      color: "#f87171",
                      border: "1px solid rgba(220,38,38,0.3)",
                      borderRadius: 6,
                      padding: "6px 12px",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
