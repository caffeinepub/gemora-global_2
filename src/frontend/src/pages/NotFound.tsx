import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function NotFound() {
  useEffect(() => {
    // Tell search engines not to index 404 pages
    let robotsMeta = document.querySelector(
      'meta[name="robots"]',
    ) as HTMLMetaElement | null;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    const prevContent = robotsMeta.getAttribute("content");
    robotsMeta.setAttribute("content", "noindex, nofollow");
    document.title = "404 — Page Not Found | Gemora Global";
    return () => {
      if (prevContent) {
        robotsMeta?.setAttribute("content", prevContent);
      } else {
        robotsMeta?.setAttribute("content", "index, follow");
      }
      document.title =
        "Imitation Jewellery Exporter & Manufacturer in India | Gemora Global";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-16 pb-16">
        <div className="container text-center max-w-xl">
          <p className="text-8xl font-serif font-bold text-primary mb-4">404</p>
          <h1 className="text-3xl font-serif font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you were looking for. It may have
            been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg text-sm font-medium transition-colors"
              data-ocid="notfound.primary_button"
            >
              Back to Homepage
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg text-sm font-medium transition-colors"
              data-ocid="notfound.secondary_button"
            >
              Contact Us
            </Link>
          </div>

          <div className="text-left bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold text-sm mb-4">Explore our pages</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/wholesale"
                  className="hover:text-primary transition-colors"
                >
                  Wholesale &amp; Export
                </Link>
              </li>
              <li>
                <Link
                  to="/why-choose-us"
                  className="hover:text-primary transition-colors"
                >
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link
                  to="/global-markets"
                  className="hover:text-primary transition-colors"
                >
                  Global Markets
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-primary transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
