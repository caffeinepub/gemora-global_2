import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Products", to: "/admin/products" },
  { label: "Categories", to: "/admin/categories" },
  { label: "Inquiries", to: "/admin/inquiries" },
  { label: "Gallery", to: "/admin/gallery" },
  { label: "Testimonials", to: "/admin/testimonials" },
  { label: "Content", to: "/admin/content" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { clear } = useInternetIdentity();

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-56 bg-sidebar border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <span className="font-serif text-sm font-bold text-primary">
            GEMORA ADMIN
          </span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                location.pathname === item.to
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            type="button"
            onClick={() => clear()}
            className="w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded hover:bg-sidebar-accent transition-colors text-left"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
