import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="font-serif text-lg text-primary font-bold mb-2">
            GEMORA GLOBAL
          </h3>
          <p className="text-muted-foreground text-sm">
            Global Jewellery. Indian Craftsmanship.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            India's leading imitation jewellery manufacturer &amp; global
            exporter — fashion jewellery manufacturer, wholesale jewellery
            supplier, and imitation jewellery exporter serving boutiques &amp;
            distributors worldwide.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 text-sm font-medium"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/gemoraglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary text-sm font-medium"
            >
              Instagram
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link to="/wholesale" className="hover:text-primary">
                Wholesale
              </Link>
            </li>
            <li>
              <Link to="/export" className="hover:text-primary">
                Export Markets
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-primary">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Rajkot, Gujarat, India</li>
            <li>info@gemoraglobal.com</li>
            <li>+91 99999 99999</li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Send Inquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-4 flex justify-between items-center text-xs text-muted-foreground">
          <span>© 2024 Gemora Global. All rights reserved.</span>
          <Link to="/admin" className="hover:text-primary">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
