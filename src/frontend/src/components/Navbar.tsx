import { Button } from "@/components/ui/button";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MAIN_LINKS = [
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
  {
    label: "Imitation Jewellery Manufacturer Jaipur",
    to: "/imitation-jewellery-manufacturer-jaipur",
  },
  {
    label: "Wholesale Jewellery Rajasthan",
    to: "/wholesale-jewellery-rajasthan",
  },
  {
    label: "Meenakari Jewellery Wholesale",
    to: "/meenakari-jewellery-wholesale",
  },
  {
    label: "Wholesale Jewellery UK",
    to: "/wholesale-jewellery-uk",
  },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolid = scrolled || mobileOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isSolid
          ? "bg-primary shadow-elevated border-b border-primary/60"
          : "bg-transparent border-b border-transparent"
      }`}
      data-ocid="nav.bar"
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/assets/uploads/logo-removebg-preview-1-1.png"
            alt="Gemora Global"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-4">
          {MAIN_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-ocid="nav.link"
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                location.pathname === l.to
                  ? "text-accent"
                  : "text-white/90 hover:text-accent"
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
              data-ocid="nav.services_toggle"
              className={`flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap ${
                servicesHover
                  ? "text-accent"
                  : "text-white/90 hover:text-accent"
              }`}
            >
              Our Services
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesHover ? "rotate-180" : ""
                }`}
              />
            </button>
            {servicesHover && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] bg-primary border border-primary/70 rounded-lg shadow-elevated z-50 py-3">
                <div className="grid grid-cols-2">
                  {SERVICE_LINKS.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-accent transition-colors"
                      onClick={() => setServicesHover(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/917976341419?text=Hi%20Gemora%20Global%2C%20I%20am%20interested%20in%20wholesale%20jewellery"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.whatsapp_cta"
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>

          <Button
            asChild
            size="sm"
            className="bg-accent hover:bg-accent/90 text-primary font-bold"
          >
            <Link to="/contact" data-ocid="nav.quote_cta">
              Get Quote
            </Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="lg:hidden p-2 text-white/90"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.mobile_toggle"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileOpen ? (
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-primary/60 px-4 py-3 flex flex-col gap-2">
          {MAIN_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-ocid="nav.link"
              className={`text-sm py-2 px-2 rounded transition-colors ${
                location.pathname === l.to
                  ? "text-accent bg-white/5"
                  : "text-white/90 hover:text-accent hover:bg-white/5"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          {/* Mobile Services collapsible */}
          <div>
            <button
              type="button"
              className="flex items-center justify-between gap-1 text-sm py-2 px-2 w-full text-left text-white/90 hover:text-accent rounded transition-colors"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              data-ocid="nav.services_mobile_toggle"
            >
              Our Services
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="grid grid-cols-2 gap-x-2 mt-1 pl-2">
                {SERVICE_LINKS.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="text-xs text-white/70 hover:text-accent py-1.5 transition-colors"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileServicesOpen(false);
                    }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <a
              href="https://wa.me/917976341419?text=Hi%20Gemora%20Global%2C%20I%20am%20interested%20in%20wholesale%20jewellery"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-500 text-white text-sm font-semibold px-3 py-2 rounded-lg flex-1 justify-center"
              onClick={() => setMobileOpen(false)}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <Button
              asChild
              size="sm"
              className="bg-accent hover:bg-accent/90 text-primary font-bold flex-1"
            >
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                Get Quote
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
