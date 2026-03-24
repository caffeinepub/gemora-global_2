import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

const defaultPosts = [
  {
    id: 1,
    title: "Top Imitation Jewellery Trends to Watch in 2026",
    category: "Trends",
    author: "Priya Sharma",
    date: "March 10, 2026",
    status: "Published",
  },
  {
    id: 2,
    title: "How to Start a Jewellery Wholesale Import Business",
    category: "Business Guide",
    author: "Rahul Mehta",
    date: "February 28, 2026",
    status: "Published",
  },
  {
    id: 3,
    title: "Why Indian Imitation Jewellery Dominates Global Markets",
    category: "Industry Insights",
    author: "Neha Gupta",
    date: "February 14, 2026",
    status: "Published",
  },
  {
    id: 4,
    title: "Bridal Jewellery Collections: What International Buyers Want",
    category: "Collections",
    author: "Ananya Patel",
    date: "January 30, 2026",
    status: "Published",
  },
  {
    id: 5,
    title: "MOQ Explained: What Wholesale Jewellery Buyers Need to Know",
    category: "Export Tips",
    author: "Vikram Singh",
    date: "January 15, 2026",
    status: "Published",
  },
  {
    id: 6,
    title: "Anti-Tarnish Technology in Modern Fashion Jewellery",
    category: "Product Care",
    author: "Deepika Rao",
    date: "December 20, 2025",
    status: "Published",
  },
];

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

export default function AdminBlog() {
  const [posts, setPosts] = useState(defaultPosts);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: categories[0],
    author: "",
    date: "",
    status: "Draft",
    excerpt: "",
    content: "",
  });

  const resetForm = () => {
    setForm({
      title: "",
      category: categories[0],
      author: "",
      date: "",
      status: "Draft",
      excerpt: "",
      content: "",
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (post: (typeof defaultPosts)[0]) => {
    setForm({
      title: post.title,
      category: post.category,
      author: post.author,
      date: post.date,
      status: post.status,
      excerpt: "",
      content: "",
    });
    setEditId(post.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this blog post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!form.title || !form.author) return;
    if (editId !== null) {
      setPosts((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, ...form } : p)),
      );
    } else {
      setPosts((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: form.title,
          category: form.category,
          author: form.author,
          date:
            form.date ||
            new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          status: form.status,
        },
      ]);
    }
    resetForm();
  };

  const statusColor = (s: string) =>
    s === "Published" ? "#22c55e" : s === "Draft" ? "#f59e0b" : "#6b7280";

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1000 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 style={{ color: "gold", fontWeight: 700, fontSize: 20 }}>
              Blog Management
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                marginTop: 2,
              }}
            >
              {posts.length} articles
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            style={{
              background: "gold",
              color: "#111",
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            + New Post
          </button>
        </div>

        {showForm && (
          <div
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 12,
              padding: 24,
              marginBottom: 24,
            }}
          >
            <h3 style={{ color: "gold", fontWeight: 600, marginBottom: 16 }}>
              {editId ? "Edit Post" : "New Blog Post"}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                marginBottom: 14,
              }}
            >
              <div>
                <label htmlFor="blog-title" style={labelStyle}>
                  Title *
                </label>
                <input
                  id="blog-title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Post title"
                  style={fieldStyle}
                />
              </div>
              <div>
                <label htmlFor="blog-category" style={labelStyle}>
                  Category
                </label>
                <select
                  id="blog-category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  style={fieldStyle}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="blog-author" style={labelStyle}>
                  Author *
                </label>
                <input
                  id="blog-author"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Author name"
                  style={fieldStyle}
                />
              </div>
              <div>
                <label htmlFor="blog-status" style={labelStyle}>
                  Status
                </label>
                <select
                  id="blog-status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  style={fieldStyle}
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label htmlFor="blog-excerpt" style={labelStyle}>
                Excerpt
              </label>
              <textarea
                id="blog-excerpt"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Short description for listing page..."
                rows={2}
                style={{ ...fieldStyle, resize: "vertical" }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="blog-content" style={labelStyle}>
                Content
              </label>
              <textarea
                id="blog-content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Full post content..."
                rows={6}
                style={{ ...fieldStyle, resize: "vertical" }}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                style={{
                  background: "gold",
                  color: "#111",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Save Post
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  background: "#222",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid #333",
                  borderRadius: 8,
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #222" }}>
                {[
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
                      padding: "12px 16px",
                      textAlign: "left",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
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
                  style={{
                    borderBottom:
                      i < posts.length - 1 ? "1px solid #1a1a1a" : "none",
                  }}
                >
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#fff",
                      fontSize: 14,
                      maxWidth: 280,
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{post.title}</span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13 }}>
                    <span
                      style={{
                        background: "rgba(218,165,32,0.15)",
                        color: "gold",
                        borderRadius: 6,
                        padding: "3px 10px",
                        fontSize: 12,
                      }}
                    >
                      {post.category}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 13,
                    }}
                  >
                    {post.author}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 12,
                    }}
                  >
                    {post.date}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        background: `${statusColor(post.status)}20`,
                        color: statusColor(post.status),
                        borderRadius: 6,
                        padding: "3px 10px",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(post)}
                        style={{
                          background: "gold",
                          color: "#111",
                          border: "none",
                          borderRadius: 6,
                          padding: "6px 14px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
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
                          padding: "6px 14px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
