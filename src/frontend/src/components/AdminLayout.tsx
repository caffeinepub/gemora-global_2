import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: "🏠" },
  { label: "Products", to: "/admin/products", icon: "💎" },
  { label: "Categories", to: "/admin/categories", icon: "📂" },
  { label: "Media", to: "/admin/gallery", icon: "🖼️" },
  { label: "Catalogue", to: "/admin/content", icon: "📋" },
  { label: "Enquiries", to: "/admin/inquiries", icon: "✉️" },
  { label: "Testimonials", to: "/admin/testimonials", icon: "⭐" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminSession");
    navigate("/admin/login");
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        background:
          "radial-gradient(ellipse at 15% 50%, #1e1004 0%, #0a0602 60%, #000000 100%)",
      }}
    >
      {/* Sidebar */}
      <aside
        className="w-64 flex flex-col flex-shrink-0"
        style={{
          background: "linear-gradient(180deg, #1a0e04 0%, #0d0804 100%)",
          borderRight: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        {/* Logo */}
        <div
          className="p-5 flex items-center gap-3"
          style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}
        >
          <img
            src="/assets/uploads/logo-1.png"
            alt="Gemora Global"
            className="h-10 object-contain"
          />
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all"
                style={{
                  background: active
                    ? "linear-gradient(135deg, rgba(201,168,76,0.25) 0%, rgba(160,120,48,0.15) 100%)"
                    : "transparent",
                  color: active ? "#c9a84c" : "rgba(255,255,255,0.55)",
                  borderLeft: active
                    ? "3px solid #c9a84c"
                    : "3px solid transparent",
                }}
              >
                <span>{item.icon}</span>
                <span className={active ? "font-semibold" : ""}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          className="p-4"
          style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}
        >
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 h-16"
          style={{
            background: "rgba(10,6,2,0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          <h1 className="text-white font-semibold text-lg">
            {navItems.find((n) => n.to === location.pathname)?.label ?? "Admin"}
          </h1>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              <span className="text-amber-400/40 text-sm">🔍</span>
              <input
                placeholder="Search..."
                className="bg-transparent text-white/70 text-sm outline-none w-40 placeholder:text-white/25"
              />
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, #c9a84c 0%, #a07830 100%)",
                color: "#0d0804",
              }}
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
