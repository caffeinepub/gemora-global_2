import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: "🏠" },
  { label: "Products", to: "/admin/products", icon: "📦" },
  { label: "Categories", to: "/admin/categories", icon: "📁" },
  { label: "Media", to: "/admin/gallery", icon: "🖼" },
  { label: "Catalogue", to: "/admin/content", icon: "📑" },
  { label: "Blog", to: "/admin/blog", icon: "✍️" },
  { label: "Orders", to: "/admin/orders", icon: "🌍" },
  { label: "Customers", to: "/admin/customers", icon: "👥" },
  { label: "Enquiries", to: "/admin/inquiries", icon: "📨" },
  { label: "WhatsApp Leads", to: "/admin/whatsapp-leads", icon: "💬" },
  { label: "Analytics", to: "/admin/analytics", icon: "📊" },
  { label: "Website Settings", to: "/admin/website-settings", icon: "🌐" },
  { label: "Settings", to: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminSession");
    navigate("/admin/login");
  };

  const currentLabel =
    navItems.find((n) =>
      n.to === "/admin"
        ? location.pathname === "/admin"
        : location.pathname.startsWith(n.to),
    )?.label ?? "Admin";

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#0b0b0d", color: "#fff" }}
    >
      {/* Sidebar */}
      <aside
        className="flex flex-col flex-shrink-0"
        style={{
          width: 240,
          background: "#111",
          borderRight: "1px solid #222",
          minHeight: "100vh",
        }}
      >
        {/* Logo */}
        <div
          className="p-5 flex items-center gap-3"
          style={{ borderBottom: "1px solid #222" }}
        >
          <img
            src="/assets/uploads/logo-removebg-preview-1-1.png"
            alt="Gemora Global"
            className="h-8 object-contain"
          />
          <span style={{ color: "gold", fontWeight: 600, fontSize: 18 }}>
            GEMORA
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const active =
              item.to === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  background: active ? "#1a1a1a" : "transparent",
                  color: active ? "gold" : "rgba(255,255,255,0.6)",
                  borderLeft: active
                    ? "3px solid gold"
                    : "3px solid transparent",
                  fontWeight: active ? 600 : 400,
                }}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3" style={{ borderTop: "1px solid #222" }}>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#1a1a1a";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.4)";
            }}
            data-ocid="admin.logout_button"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto" style={{ background: "#0b0b0d" }}>
        {/* Top bar */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6"
          style={{
            height: 60,
            background: "rgba(17,17,17,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #222",
          }}
        >
          <h1 style={{ color: "#fff", fontWeight: 600, fontSize: 18 }}>
            {currentLabel}
          </h1>
          <div className="flex items-center gap-4">
            <input
              placeholder="Search..."
              className="px-3 py-1.5 rounded-lg text-sm outline-none"
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                color: "rgba(255,255,255,0.7)",
                width: 160,
              }}
            />
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "gold", color: "#111" }}
            >
              A
            </div>
          </div>
        </div>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
