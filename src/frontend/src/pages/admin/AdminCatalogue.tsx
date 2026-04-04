import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";
import { useStorageUpload } from "../../hooks/useStorageUpload";

const fieldStyle = {
  width: "100%",
  background: "#f5f7ff",
  border: "1px solid #c5cae9",
  borderRadius: 8,
  padding: "10px 12px",
  color: "#1A237E",
  fontSize: 14,
  outline: "none",
} as React.CSSProperties;

const labelStyle = {
  color: "#555",
  fontSize: 12,
  display: "block",
  marginBottom: 6,
} as React.CSSProperties;

export default function AdminCatalogue() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    fileUrl: "",
    fileName: "",
  });
  const {
    uploadFile,
    uploading: storageUploading,
    progress,
  } = useStorageUpload();
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: catalogues = [] } = useQuery({
    queryKey: ["catalogues"],
    queryFn: () => actor!.getCatalogues(),
    enabled: !!actor,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["catalogues"] });

  const createMutation = useMutation({
    mutationFn: () => {
      const uploadedAt = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return actor!.createCatalogue(
        form.title.trim(),
        form.description.trim(),
        form.fileUrl,
        form.fileName,
        uploadedAt,
      );
    },
    onSuccess: () => {
      toast.success("Catalogue saved");
      resetForm();
      invalidate();
    },
    onError: () => toast.error("Failed to save catalogue"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: bigint) => actor!.deleteCatalogue(id),
    onSuccess: () => {
      toast.success("Catalogue deleted");
      invalidate();
    },
    onError: () => toast.error("Failed to delete catalogue"),
  });

  const resetForm = () => {
    setForm({ title: "", description: "", fileUrl: "", fileName: "" });
    setShowForm(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile(file);
      setForm((f) => ({ ...f, fileUrl: url, fileName: file.name }));
      toast.success("File uploaded successfully");
    } catch {
      toast.error("Upload failed");
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
    createMutation.mutate();
  };

  const handleDelete = (id: bigint) => {
    if (!confirm("Delete this catalogue?")) return;
    deleteMutation.mutate(id);
  };

  const isSaving = createMutation.isPending || storageUploading;

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
                color: "#1A237E",
                fontSize: 22,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Catalogue Manager
            </h2>
            <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>
              Upload multiple catalogues. Buyers can download them from the
              website.
            </p>
          </div>
          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              style={{
                background: "#1A237E",
                color: "#fff",
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
              background: "#fff",
              border: "1px solid #c5cae9",
              borderRadius: 12,
              padding: 24,
              marginBottom: 28,
            }}
          >
            <h3 style={{ color: "#1A237E", marginBottom: 20, fontSize: 16 }}>
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
                    border: "2px dashed #c5cae9",
                    borderRadius: 8,
                    padding: "20px 16px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "#f5f7ff",
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
                    <div style={{ color: "#2e7d32", fontSize: 14 }}>
                      ✓ {form.fileName}
                    </div>
                  ) : storageUploading ? (
                    <div style={{ color: "#42A5F5", fontSize: 14 }}>
                      Uploading... {progress > 0 ? `${progress}%` : ""}
                    </div>
                  ) : (
                    <div style={{ color: "#888", fontSize: 14 }}>
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
                disabled={isSaving}
                style={{
                  background: isSaving ? "#c5cae9" : "#1A237E",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontWeight: 600,
                  cursor: isSaving ? "not-allowed" : "pointer",
                  fontSize: 14,
                }}
              >
                {isSaving ? "Saving..." : "Save Catalogue"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  background: "transparent",
                  color: "#666",
                  border: "1px solid #c5cae9",
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
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 12,
              padding: "48px 24px",
              textAlign: "center",
              color: "#aaa",
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
                key={String(cat.id)}
                style={{
                  background: "#fff",
                  border: "1px solid #e0e0e0",
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
                    background: "rgba(66,165,245,0.1)",
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
                  <div
                    style={{ fontWeight: 600, color: "#1A237E", fontSize: 15 }}
                  >
                    {cat.title}
                  </div>
                  {cat.description && (
                    <div style={{ color: "#666", fontSize: 13, marginTop: 2 }}>
                      {cat.description}
                    </div>
                  )}
                  <div style={{ color: "#aaa", fontSize: 12, marginTop: 4 }}>
                    Uploaded {cat.uploadedAt} · {cat.fileName}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <a
                    href={cat.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "rgba(66,165,245,0.15)",
                      color: "#1A237E",
                      border: "1px solid rgba(66,165,245,0.3)",
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
                      color: "#c62828",
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
