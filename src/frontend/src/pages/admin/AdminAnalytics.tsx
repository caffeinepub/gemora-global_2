import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AdminLayout from "../../components/AdminLayout";

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

const countryData = [
  { country: "France", visits: 1240 },
  { country: "UAE", visits: 980 },
  { country: "USA", visits: 760 },
  { country: "UK", visits: 640 },
  { country: "Europe", visits: 520 },
];

const monthlyData = [
  { month: "Jan", inquiries: 18 },
  { month: "Feb", inquiries: 24 },
  { month: "Mar", inquiries: 31 },
  { month: "Apr", inquiries: 27 },
  { month: "May", inquiries: 42 },
  { month: "Jun", inquiries: 38 },
];

const statCards = [
  {
    label: "Country-wise Traffic",
    value: "5 Markets",
    sub: "France leads at 29%",
  },
  { label: "Product Views", value: "12,450", sub: "+18% this month" },
  { label: "Conversion Rate", value: "3.2%", sub: "Inquiries / Visits" },
  { label: "Top Product", value: "Bridal Set", sub: "480 views this month" },
];

const TOOLTIP_STYLE = {
  contentStyle: {
    background: "#fff",
    border: "1px solid #c5cae9",
    borderRadius: 8,
    color: "#1A237E",
  },
};

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 15,
          marginBottom: 20,
        }}
      >
        {statCards.map((card) => (
          <div key={card.label} style={CARD}>
            <p style={{ color: "#666", fontSize: 12, marginBottom: 6 }}>
              {card.label}
            </p>
            <p
              style={{
                color: "#1A237E",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              {card.value}
            </p>
            <p style={{ color: "#999", fontSize: 11 }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={BOX}>
          <h3 style={{ color: "#1A237E", marginBottom: 16, fontWeight: 600 }}>
            Traffic by Country
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={countryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="country"
                stroke="#999"
                tick={{ fill: "#666", fontSize: 11 }}
              />
              <YAxis stroke="#999" tick={{ fill: "#666", fontSize: 11 }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Bar dataKey="visits" fill="#42A5F5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={BOX}>
          <h3 style={{ color: "#1A237E", marginBottom: 16, fontWeight: 600 }}>
            Monthly Inquiries
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="month"
                stroke="#999"
                tick={{ fill: "#666", fontSize: 11 }}
              />
              <YAxis stroke="#999" tick={{ fill: "#666", fontSize: 11 }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Line
                type="monotone"
                dataKey="inquiries"
                stroke="#42A5F5"
                strokeWidth={2}
                dot={{ fill: "#42A5F5", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
