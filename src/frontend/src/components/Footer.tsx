import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const CATEGORIES = [
  { label: "Kundan Jewellery", to: "/kundan-jewellery-wholesale" },
  { label: "Temple Jewellery", to: "/temple-jewellery-manufacturer" },
  { label: "Antique Jewellery", to: "/products?category=antique" },
  { label: "Oxidised Jewellery", to: "/oxidised-jewellery-wholesale" },
  { label: "Bridal Jewellery", to: "/bridal-jewellery-wholesale" },
  { label: "Fashion Jewellery", to: "/fashion-jewellery-exporter" },
  { label: "Meenakari Jewellery", to: "/products?category=meenakari" },
  { label: "Bulk Jewellery", to: "/bulk-jewellery-supplier" },
];

const COMPANY_LINKS = [
  { label: "About Gemora Global", to: "/about" },
  { label: "Why Choose Us", to: "/why-choose-us" },
  { label: "Our Products", to: "/products" },
  { label: "Gallery", to: "/gallery" },
  { label: "Wholesale & Export", to: "/wholesale" },
  { label: "Global Markets", to: "/export" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

const RESOURCES = [
  {
    label: "Imitation Jewellery Supplier USA",
    to: "/imitation-jewellery-supplier-usa",
  },
  { label: "Jewellery Exporter UAE", to: "/jewellery-exporter-uae" },
  { label: "Jewellery Supplier UK", to: "/jewellery-supplier-uk" },
  {
    label: "Custom Jewellery Manufacturer",
    to: "/custom-jewellery-manufacturer",
  },
  {
    label: "Private Label Jewellery India",
    to: "/private-label-jewellery-india",
  },
  {
    label: "Jewellery Exporter India",
    to: "/imitation-jewellery-exporter-india",
  },
  {
    label: "Wholesale Imitation Jewellery",
    to: "/wholesale-imitation-jewellery",
  },
  {
    label: "Artificial Jewellery Exporter",
    to: "/artificial-jewellery-exporter",
  },
];

function FooterLink({ label, to }: { label: string; to: string }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm transition-colors"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        <span className="hover:text-[#D4AF37]">{label}</span>
      </Link>
    </li>
  );
}

function FooterColTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="font-semibold text-sm uppercase tracking-wider mb-4"
      style={{ color: "#D4AF37" }}
    >
      {children}
    </h4>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer style={{ background: "#0d1b6e", color: "#fff" }}>
      {/* Main footer grid */}
      <div className="container py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand column */}
        <div>
          <div className="mb-4">
            <img
              src="/assets/uploads/logo-removebg-preview-1-1.png"
              alt="Gemora Global"
              className="h-12 w-auto object-contain"
            />
          </div>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            India&apos;s leading imitation jewellery manufacturer &amp; global
            exporter based in Jaipur, Rajasthan. Serving boutiques, retailers
            &amp; wholesalers worldwide.
          </p>
          <div
            className="space-y-2 text-sm"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <div className="flex items-start gap-2">
              <MapPin
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ color: "#D4AF37" }}
              />
              <span>B 66 MAA Hinglaj Nagar, Vaishali Nagar, Jaipur 302021</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone
                className="w-4 h-4 flex-shrink-0"
                style={{ color: "#D4AF37" }}
              />
              <a
                href="tel:+917976341419"
                className="hover:text-[#D4AF37] transition-colors"
              >
                +91 7976341419
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail
                className="w-4 h-4 flex-shrink-0"
                style={{ color: "#D4AF37" }}
              />
              <a
                href="mailto:globalgemora@gmail.com"
                className="hover:text-[#D4AF37] transition-colors"
              >
                globalgemora@gmail.com
              </a>
            </div>
          </div>
          {/* Social */}
          <div className="flex gap-3 mt-5">
            <a
              href="https://wa.me/917976341419"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: "rgba(37,211,102,0.15)", color: "#25d366" }}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a
              href="https://instagram.com/gemoraglobal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: "rgba(225,48,108,0.15)", color: "#e1306c" }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <FooterColTitle>Categories</FooterColTitle>
          <ul className="space-y-2">
            {CATEGORIES.map((c) => (
              <FooterLink key={c.to} label={c.label} to={c.to} />
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <FooterColTitle>Company</FooterColTitle>
          <ul className="space-y-2">
            {COMPANY_LINKS.map((c) => (
              <FooterLink key={c.to} label={c.label} to={c.to} />
            ))}
          </ul>
        </div>

        {/* Export Services */}
        <div>
          <FooterColTitle>Export Services</FooterColTitle>
          <ul className="space-y-2">
            {RESOURCES.map((r) => (
              <FooterLink key={r.to} label={r.label} to={r.to} />
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          className="container py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <span>
            &copy; {year} Gemora Global — Imitation Jewellery Manufacturer,
            Jaipur, India. All rights reserved.
          </span>
          <span>
            Built with <span aria-hidden="true">&#10084;</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
