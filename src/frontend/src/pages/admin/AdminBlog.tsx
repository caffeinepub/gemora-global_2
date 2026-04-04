import { useRef, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import { useStorageUpload } from "../../hooks/useStorageUpload";
import {
  type BlogPost,
  generateSlug,
  getBlogPosts,
  saveBlogPosts,
} from "../../utils/blogStore";

const categories = [
  "Trends",
  "Business Guide",
  "Industry Insights",
  "Collections",
  "Export Tips",
  "Product Care",
];

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

const EMPTY_FORM = {
  title: "",
  category: categories[0],
  author: "",
  date: "",
  status: "Draft",
  excerpt: "",
  content: "",
  image: "",
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(() => getBlogPosts());
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const { uploadFile, uploading } = useStorageUpload();
  const imageFileRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      category: post.category,
      author: post.author,
      date: post.date,
      status: post.status,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
    });
    setEditId(post.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this blog post?")) return;
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    saveBlogPosts(updated);
    toast.success("Post deleted");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile(file);
      setForm((f) => ({ ...f, image: url }));
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed");
    }
    if (imageFileRef.current) imageFileRef.current.value = "";
  };

  const handleSave = () => {
    if (!form.title || !form.author) {
      toast.error("Title and author are required");
      return;
    }
    const now = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let updated: BlogPost[];
    if (editId !== null) {
      updated = posts.map((p) =>
        p.id === editId
          ? {
              ...p,
              ...form,
              slug: generateSlug(form.title),
              readTime: `${Math.max(1, Math.ceil(form.content.split(" ").length / 200))} min read`,
            }
          : p,
      );
    } else {
      const newPost: BlogPost = {
        id: Date.now(),
        slug: generateSlug(form.title),
        title: form.title,
        category: form.category,
        author: form.author,
        date: form.date || now,
        readTime: `${Math.max(1, Math.ceil(form.content.split(" ").length / 200))} min read`,
        status: form.status,
        excerpt: form.excerpt,
        content: form.content,
        image: form.image,
      };
      updated = [newPost, ...posts];
    }
    setPosts(updated);
    saveBlogPosts(updated);
    toast.success(editId !== null ? "Post updated" : "Post published");
    resetForm();
  };

  const statusColor = (s: string) =>
    s === "Published" ? "#22c55e" : s === "Draft" ? "#f59e0b" : "#6b7280";

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1000 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 style={{ color: "#1A237E", fontWeight: 700, fontSize: 20 }}>
              Blog Management
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: 13,
                marginTop: 2,
              }}
            >
              {posts.filter((p) => p.status === "Published").length} published •{" "}
              {posts.filter((p) => p.status === "Draft").length} drafts
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
                padding: "8px 18px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
              data-ocid="admin.blog.open_modal_button"
            >
              + New Post
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
              marginBottom: 24,
            }}
          >
            <h3
              style={{
                color: "#1A237E",
                fontWeight: 600,
                fontSize: 16,
                marginBottom: 20,
              }}
            >
              {editId !== null ? "Edit Post" : "New Blog Post"}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <p style={labelStyle}>Title *</p>
                <input
                  style={fieldStyle}
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Enter blog title"
                  data-ocid="admin.blog.input"
                />
              </div>
              <div>
                <p style={labelStyle}>Category</p>
                <select
                  style={fieldStyle}
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p style={labelStyle}>Author *</p>
                <input
                  style={fieldStyle}
                  value={form.author}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, author: e.target.value }))
                  }
                  placeholder="Author name"
                />
              </div>
              <div>
                <p style={labelStyle}>Date</p>
                <input
                  style={fieldStyle}
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  placeholder="e.g. March 10, 2026"
                />
              </div>
              <div>
                <p style={labelStyle}>Status</p>
                <select
                  style={fieldStyle}
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value }))
                  }
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div>
                <p style={labelStyle}>Featured Image</p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => imageFileRef.current?.click()}
                    disabled={uploading}
                    style={{
                      background: uploading ? "#e8eaf6" : "#f5f7ff",
                      border: "1px dashed #7986cb",
                      borderRadius: 8,
                      padding: "8px 14px",
                      color: uploading ? "#42A5F5" : "#666",
                      fontSize: 13,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                    data-ocid="admin.blog.upload_button"
                  >
                    {uploading ? "Uploading..." : "📷 Upload Image"}
                  </button>
                  <input
                    ref={imageFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {form.image && (
                    <img
                      src={form.image}
                      alt="preview"
                      style={{
                        height: 40,
                        width: 60,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <p style={labelStyle}>Excerpt</p>
              <textarea
                style={{ ...fieldStyle, minHeight: 60, resize: "vertical" }}
                value={form.excerpt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, excerpt: e.target.value }))
                }
                placeholder="Short summary of the post"
                data-ocid="admin.blog.textarea"
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <p style={labelStyle}>Content</p>
              <textarea
                style={{ ...fieldStyle, minHeight: 160, resize: "vertical" }}
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                placeholder="Full blog post content..."
              />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                type="button"
                onClick={handleSave}
                style={{
                  background: "#1A237E",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 24px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
                data-ocid="admin.blog.save_button"
              >
                {editId !== null ? "Update Post" : "Publish Post"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  background: "transparent",
                  color: "#666",
                  border: "1px solid #c5cae9",
                  borderRadius: 8,
                  padding: "9px 18px",
                  fontSize: 14,
                  cursor: "pointer",
                }}
                data-ocid="admin.blog.cancel_button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            background: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <table
            style={{ width: "100%", borderCollapse: "collapse" }}
            data-ocid="admin.blog.table"
          >
            <thead>
              <tr>
                {[
                  "Image",
                  "Title",
                  "Category",
                  "Author",
                  "Date",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "12px 14px",
                      color: "#999",
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      borderBottom: "1px solid #e0e0e0",
                      background: "#f5f7ff",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr
                  key={post.id}
                  style={{ borderBottom: "1px solid #f5f5f5" }}
                  data-ocid={`admin.blog.item.${i + 1}`}
                >
                  <td style={{ padding: "10px 14px" }}>
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          width: 60,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 60,
                          height: 40,
                          background: "#e8eaf6",
                          borderRadius: 6,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                        }}
                      >
                        📷
                      </div>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      fontSize: 13,
                      color: "#333",
                      maxWidth: 200,
                    }}
                  >
                    {post.title}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      fontSize: 12,
                      color: "#666",
                    }}
                  >
                    {post.category}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      fontSize: 12,
                      color: "#666",
                    }}
                  >
                    {post.author}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      fontSize: 12,
                      color: "#666",
                    }}
                  >
                    {post.date}
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <span
                      style={{
                        color: statusColor(post.status),
                        background: `${statusColor(post.status)}22`,
                        fontSize: 11,
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontWeight: 600,
                      }}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => handleEdit(post)}
                        style={{
                          background: "#1A237E",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "5px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        data-ocid={`admin.blog.edit_button.${i + 1}`}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        style={{
                          background: "crimson",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "5px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        data-ocid={`admin.blog.delete_button.${i + 1}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
            <div
              style={{
                padding: 40,
                textAlign: "center",
                color: "#aaa",
                fontSize: 14,
              }}
              data-ocid="admin.blog.empty_state"
            >
              No blog posts yet. Click "+ New Post" to create one.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
