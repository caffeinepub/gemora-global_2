import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
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

const SERVICE_LINKS = [
  { label: "Kundan Jewellery Wholesale", to: "/kundan-jewellery-wholesale" },
  {
    label: "Temple Jewellery Manufacturer",
    to: "/temple-jewellery-manufacturer",
  },
  {
    label: "Artificial Jewellery Exporter",
    to: "/artificial-jewellery-exporter",
  },
  { label: "Bridal Imitation Jewellery", to: "/bridal-imitation-jewellery" },
  {
    label: "Oxidised Jewellery Wholesale",
    to: "/oxidised-jewellery-wholesale",
  },
  {
    label: "Imitation Jewellery Manufacturer India",
    to: "/imitation-jewellery-manufacturer-india",
  },
  {
    label: "Artificial Jewellery Wholesaler India",
    to: "/artificial-jewellery-wholesaler-india",
  },
  {
    label: "Fashion Jewellery Exporter India",
    to: "/fashion-jewellery-exporter-india",
  },
  { label: "Oxidised Jewellery Supplier", to: "/oxidised-jewellery-supplier" },
  {
    label: "Imitation Jewellery Supplier USA",
    to: "/imitation-jewellery-supplier-usa",
  },
  {
    label: "Imitation Jewellery Exporter India",
    to: "/imitation-jewellery-exporter-india",
  },
  {
    label: "Wholesale Imitation Jewellery",
    to: "/wholesale-imitation-jewellery",
  },
  { label: "Bridal Jewellery Wholesale", to: "/bridal-jewellery-wholesale" },
  { label: "Fashion Jewellery Exporter", to: "/fashion-jewellery-exporter" },
  {
    label: "Custom Jewellery Manufacturer",
    to: "/custom-jewellery-manufacturer",
  },
  {
    label: "Wholesale Imitation Jewellery India",
    to: "/wholesale-imitation-jewellery-india",
  },
  {
    label: "Fashion Jewellery Manufacturer India",
    to: "/fashion-jewellery-manufacturer-india",
  },
  {
    label: "Bridal Imitation Jewellery Wholesale",
    to: "/bridal-imitation-jewellery-wholesale",
  },
  { label: "Bulk Jewellery Supplier", to: "/bulk-jewellery-supplier" },
  { label: "Jewellery Exporter to USA", to: "/jewellery-exporter-to-usa" },
  { label: "Jewellery Supplier UK", to: "/jewellery-supplier-uk" },
  { label: "Jewellery Exporter UAE", to: "/jewellery-exporter-uae" },
  {
    label: "Private Label Jewellery India",
    to: "/private-label-jewellery-india",
  },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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

          {/* Our Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesHover(true)}
            onMouseLeave={() => setServicesHover(false)}
          >
            <button
              type="button"
              data-ocid="nav.link"
              className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              Our Services
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesHover ? "rotate-180" : ""
                }`}
              />
            </button>
            {servicesHover && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[520px] bg-background border border-border rounded-md shadow-lg z-50 py-2">
                <div className="grid grid-cols-2">
                  {SERVICE_LINKS.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                      onClick={() => setServicesHover(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

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

          {/* Mobile Our Services collapsible */}
          <div>
            <button
              type="button"
              className="flex items-center gap-1 text-sm py-1 w-full text-left"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              Our Services
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 grid grid-cols-2 gap-x-2 mt-1">
                {SERVICE_LINKS.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="text-sm text-muted-foreground hover:text-primary py-1"
                    onClick={() => {
                      setOpen(false);
                      setMobileServicesOpen(false);
                    }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
