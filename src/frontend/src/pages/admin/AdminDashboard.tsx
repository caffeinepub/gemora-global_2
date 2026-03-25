import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import type { Inquiry, Product } from "../../backend";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";

const BOX = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: 12,
  padding: 20,
} as const;

const CARD = {
  background: "linear-gradient(145deg, #1a1a1a, #111)",
  border: "1px solid #222",
  borderRadius: 12,
  padding: 20,
} as const;

const monthlyData = [
  { month: "Jan", enquiries: 18 },
  { month: "Feb", enquiries: 24 },
  { month: "Mar", enquiries: 31 },
  { month: "Apr", enquiries: 27 },
  { month: "May", enquiries: 42 },
  { month: "Jun", enquiries: 38 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const qc = useQueryClient();

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => actor!.getDashboardStats(),
    enabled: !!actor,
  });

  const { data: inquiries } = useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: () => actor!.getInquiries(),
    enabled: !!actor,
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products", null],
    queryFn: () => actor!.getProducts(null),
    enabled: !!actor,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: bigint) => actor!.deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted");
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const statCards = [
    { label: "Total Orders", value: "1,245", link: "/admin/orders" },
    { label: "Export Countries", value: "25", link: "/admin/analytics" },
    {
      label: "Total Products",
      value: stats ? String(stats.totalProducts) : "—",
      link: "/admin/products",
    },
    {
      label: "New Enquiries",
      value: stats ? String(stats.newInquiries) : "—",
      link: "/admin/inquiries",
    },
  ];

  const recentInquiries = (inquiries ?? []).slice(0, 5);

  return (
    <AdminLayout>
      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 15,
          marginBottom: 20,
        }}
      >
        {statCards.map((card) => (
          <button
            key={card.label}
            type="button"
            style={{
              ...CARD,
              cursor: "pointer",
              transition: "border-color 0.2s",
              textAlign: "left",
              width: "100%",
            }}
            onClick={() => navigate(card.link)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "gold";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#222";
            }}
            data-ocid="admin.dashboard.card"
          >
            <p style={{ color: "#aaa", fontSize: 13, marginBottom: 8 }}>
              {card.label}
            </p>
            <p style={{ color: "gold", fontSize: 24, fontWeight: 700 }}>
              {card.value}
            </p>
          </button>
        ))}
      </div>

      {/* Analytics + Enquiries */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* Chart */}
        <div style={BOX}>
          <h3 style={{ color: "#fff", marginBottom: 16, fontWeight: 600 }}>
            Analytics — Monthly Enquiries
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis
                dataKey="month"
                stroke="#666"
                tick={{ fill: "#aaa", fontSize: 12 }}
              />
              <YAxis stroke="#666" tick={{ fill: "#aaa", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Bar dataKey="enquiries" fill="gold" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Enquiries */}
        <div style={BOX}>
          <h3 style={{ color: "#fff", marginBottom: 12, fontWeight: 600 }}>
            Recent Enquiries
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Name", "Country", "Status"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "6px 8px",
                      color: "#666",
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      borderBottom: "1px solid #222",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentInquiries.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    style={{ color: "#555", padding: "12px 8px", fontSize: 13 }}
                    data-ocid="admin.inquiries.empty_state"
                  >
                    No enquiries yet
                  </td>
                </tr>
              )}
              {recentInquiries.map((inq) => (
                <tr
                  key={String(inq.id)}
                  style={{ borderBottom: "1px solid #1a1a1a" }}
                >
                  <td style={{ padding: "8px", fontSize: 13, color: "#ddd" }}>
                    {inq.name}
                  </td>
                  <td style={{ padding: "8px", fontSize: 12, color: "#aaa" }}>
                    {inq.country}
                  </td>
                  <td style={{ padding: "8px" }}>
                    <span
                      style={{
                        background:
                          inq.status === "new"
                            ? "rgba(255,200,0,0.15)"
                            : "rgba(100,200,100,0.15)",
                        color: inq.status === "new" ? "gold" : "#6fcf97",
                        fontSize: 11,
                        padding: "2px 7px",
                        borderRadius: 20,
                        fontWeight: 600,
                      }}
                    >
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Products Table */}
      <div style={BOX}>
        <h3 style={{ color: "#fff", marginBottom: 16, fontWeight: 600 }}>
          Manage Products
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Name", "Category", "MOQ / Price", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "8px 10px",
                    color: "#666",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    borderBottom: "1px solid #222",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(products ?? []).length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{ color: "#555", padding: "16px 10px", fontSize: 13 }}
                  data-ocid="admin.products.empty_state"
                >
                  No products yet
                </td>
              </tr>
            )}
            {(products ?? []).map((p, i) => (
              <tr
                key={String(p.id)}
                style={{ borderBottom: "1px solid #1a1a1a" }}
                data-ocid={`admin.products.item.${i + 1}`}
              >
                <td
                  style={{
                    padding: "10px",
                    fontSize: 14,
                    color: "#ddd",
                    fontWeight: 500,
                  }}
                >
                  {p.name}
                </td>
                <td style={{ padding: "10px", fontSize: 13, color: "#888" }}>
                  {String(p.categoryId)}
                </td>
                <td style={{ padding: "10px", fontSize: 13, color: "#aaa" }}>
                  {p.moq}
                </td>
                <td style={{ padding: "10px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a
                      href="/admin/products"
                      style={{
                        background: "gold",
                        color: "#111",
                        border: "none",
                        borderRadius: 6,
                        padding: "4px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                      data-ocid={`admin.products.edit_button.${i + 1}`}
                    >
                      Edit
                    </a>
                    <button
                      type="button"
                      onClick={() => deleteMutation.mutate(p.id)}
                      style={{
                        background: "crimson",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "4px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      data-ocid={`admin.products.delete_button.${i + 1}`}
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
    </AdminLayout>
  );
}
