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
  background: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  padding: 20,
} as const;

const CARD = {
  background: "linear-gradient(145deg, #e8eaf6, #fff)",
  border: "1px solid #c5cae9",
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
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#42A5F5";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#c5cae9";
            }}
            data-ocid="admin.dashboard.card"
          >
            <p style={{ color: "#666", fontSize: 13, marginBottom: 8 }}>
              {card.label}
            </p>
            <p style={{ color: "#1A237E", fontSize: 24, fontWeight: 700 }}>
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
          <h3 style={{ color: "#1A237E", marginBottom: 16, fontWeight: 600 }}>
            Analytics — Monthly Enquiries
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="month"
                stroke="#999"
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis stroke="#999" tick={{ fill: "#666", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #c5cae9",
                  borderRadius: 8,
                  color: "#1A237E",
                }}
              />
              <Bar dataKey="enquiries" fill="#42A5F5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Enquiries */}
        <div style={BOX}>
          <h3 style={{ color: "#1A237E", marginBottom: 12, fontWeight: 600 }}>
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
                      color: "#999",
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      borderBottom: "1px solid #e0e0e0",
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
                    style={{ color: "#aaa", padding: "12px 8px", fontSize: 13 }}
                    data-ocid="admin.inquiries.empty_state"
                  >
                    No enquiries yet
                  </td>
                </tr>
              )}
              {recentInquiries.map((inq) => (
                <tr
                  key={String(inq.id)}
                  style={{ borderBottom: "1px solid #f5f5f5" }}
                >
                  <td style={{ padding: "8px", fontSize: 13, color: "#333" }}>
                    {inq.name}
                  </td>
                  <td style={{ padding: "8px", fontSize: 12, color: "#666" }}>
                    {inq.country}
                  </td>
                  <td style={{ padding: "8px" }}>
                    <span
                      style={{
                        background:
                          inq.status === "new"
                            ? "rgba(66,165,245,0.15)"
                            : "rgba(100,200,100,0.15)",
                        color: inq.status === "new" ? "#1A237E" : "#2e7d32",
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
        <h3 style={{ color: "#1A237E", marginBottom: 16, fontWeight: 600 }}>
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
                    color: "#999",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    borderBottom: "1px solid #e0e0e0",
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
                  style={{ color: "#aaa", padding: "16px 10px", fontSize: 13 }}
                  data-ocid="admin.products.empty_state"
                >
                  No products yet
                </td>
              </tr>
            )}
            {(products ?? []).map((p, i) => (
              <tr
                key={String(p.id)}
                style={{ borderBottom: "1px solid #f5f5f5" }}
                data-ocid={`admin.products.item.${i + 1}`}
              >
                <td
                  style={{
                    padding: "10px",
                    fontSize: 14,
                    color: "#222",
                    fontWeight: 500,
                  }}
                >
                  {p.name}
                </td>
                <td style={{ padding: "10px", fontSize: 13, color: "#666" }}>
                  {String(p.categoryId)}
                </td>
                <td style={{ padding: "10px", fontSize: 13, color: "#888" }}>
                  {p.moq}
                </td>
                <td style={{ padding: "10px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a
                      href="/admin/products"
                      style={{
                        background: "#1A237E",
                        color: "#fff",
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
