import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Wholesale", to: "/wholesale" },
  { label: "Markets", to: "/export" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/uploads/logo-removebg-preview-1-1.png"
            alt="Gemora Global"
            style={{ height: "56px", width: "auto", objectFit: "contain" }}
          />
        </Link>
        <div className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-ocid="nav.link"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === l.to
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/contact" data-ocid="nav.primary_button">
              Get Quote
            </Link>
          </Button>
        </div>
        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 py-3 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-ocid="nav.link"
              className="text-sm py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground w-fit"
          >
            <Link to="/contact" onClick={() => setOpen(false)}>
              Get Quote
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
