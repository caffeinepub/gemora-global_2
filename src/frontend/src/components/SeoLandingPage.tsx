import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageSEO } from "../hooks/usePageSEO";
import Footer from "./Footer";
import Navbar from "./Navbar";

export interface HreflangEntry {
  lang: string;
  url: string;
}

export interface SeoLandingPageProps {
  title: string;
  metaDescription: string;
  canonical: string;
  h1: string;
  targetKeyword: string;
  heroSubtitle: string;
  bodyContent: React.ReactNode;
  faqs: { q: string; a: string }[];
  schema?: object;
  hreflangs?: HreflangEntry[];
}

const CATEGORIES = [
  {
    name: "Necklace Sets",
    desc: "Chokers, haars, layered chains wholesale",
    icon: "💎",
  },
  {
    name: "Earrings",
    desc: "Jhumkas, chandbalis, studs, hoops bulk",
    icon: "✨",
  },
  {
    name: "Bridal Sets",
    desc: "Complete bridal jewellery sets export",
    icon: "👑",
  },
  {
    name: "Bangles & Bracelets",
    desc: "Traditional & modern bangles wholesale",
    icon: "🌟",
  },
  { name: "Rings", desc: "Statement & minimal rings bulk supply", icon: "💍" },
  {
    name: "Minimal Fashion",
    desc: "Contemporary everyday jewellery export",
    icon: "⚡",
  },
];

const TRUST_POINTS = [
  {
    title: "10+ Years Export Experience",
    desc: "Thousands of export shipments to 15+ countries since 2013. We handle all customs, documentation, and freight on your behalf.",
  },
  {
    title: "Anti-Tarnish Finish Guarantee",
    desc: "Multi-layer anti-tarnish coating on every piece — dramatically extends wearable life and reduces customer returns for your boutique.",
  },
  {
    title: "Factory-Direct Pricing",
    desc: "No middlemen, no agents. You buy directly from our manufacturing facility in Jaipur, India — 15–30% cost advantage over agent-sourced alternatives.",
  },
  {
    title: "Low MOQ — Start from 50 Units",
    desc: "MOQ-friendly wholesale model designed for boutiques and small distributors as well as large wholesalers. Scale at your own pace.",
  },
];

const EXPORT_COUNTRIES = [
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇸🇬", name: "Singapore" },
];

export default function SeoLandingPage({
  title,
  metaDescription,
  canonical,
  h1,
  targetKeyword,
  heroSubtitle,
  bodyContent,
  faqs,
  schema,
  hreflangs,
}: SeoLandingPageProps) {
  usePageSEO({
    title,
    description: metaDescription,
    canonical,
    ogTitle: title,
    ogDescription: metaDescription,
    ogImage:
      "https://gemoraglobal-tje.caffeine.xyz/assets/uploads/logo-removebg-preview-1.png",
    hreflangs,
    schema: schema ?? {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description: metaDescription,
      url: canonical,
      publisher: {
        "@type": "Organization",
        name: "Gemora Global",
        url: "https://gemoraglobal-tje.caffeine.xyz",
      },
    },
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.country ? `Country: ${form.country}` : null,
      `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/917976341419?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-b from-blue-50 to-background border-b border-blue-700/20">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-sky-500 mb-4 font-semibold">
            Gemora Global — India&apos;s Trusted Jewellery Exporter
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-tight mb-6">
            {h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <strong>{heroSubtitle.split(".")[0]}.</strong>{" "}
            {heroSubtitle.split(".").slice(1).join(".").trim()}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold"
              data-ocid="seo.primary_button"
            >
              <a
                href={`https://wa.me/917976341419?text=Hi, I am interested in ${encodeURIComponent(targetKeyword)}. Please share your catalogue and pricing.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Get Catalogue on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-700/50 hover:border-blue-500"
              data-ocid="seo.secondary_button"
            >
              <Link to="/contact">Send Inquiry</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Body Content */}
      <section className="py-14 px-4">
        <div className="container max-w-4xl mx-auto prose max-w-none">
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {bodyContent}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 px-4 bg-card border-y border-border">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary text-center mb-10">
            Benefits of Choosing Gemora Global
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRUST_POINTS.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-xl border border-blue-700/20 bg-background/50"
              >
                <h3 className="font-semibold text-primary mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-14 px-4">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary text-center mb-4">
            Our Product Categories
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            500+ designs across all categories — refreshed every season.{" "}
            <Link to="/products" className="text-sky-500 hover:underline">
              View all products →
            </Link>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to="/products"
                title={`Buy ${cat.name} Wholesale from India`}
                className="p-5 rounded-xl border border-blue-700/20 bg-card hover:border-blue-500/50 transition-colors group"
                data-ocid="seo.link"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary text-sm mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 px-4 bg-card border-y border-border">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary text-center mb-10">
            Why Choose Gemora Global as Your Jewellery Supplier
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-sky-500">500+</div>
              <div className="text-sm text-muted-foreground">
                Active Designs
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-sky-500">15+</div>
              <div className="text-sm text-muted-foreground">
                Export Countries
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-sky-500">10+</div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              Gemora Global is a factory-direct imitation jewellery manufacturer
              and exporter based in Jaipur, India. We supply wholesale jewellery
              to boutiques, distributors, and resellers across UAE, USA, UK,
              France, Canada, Australia, and Singapore. With 10+ years of export
              experience, anti-tarnish finishing, and 500+ seasonal designs, we
              are the preferred supplier for international wholesale buyers.{" "}
              <Link
                to="/why-choose-us"
                className="text-sky-500 hover:underline"
              >
                Learn more →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Export Countries */}
      <section className="py-14 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary text-center mb-4">
            Export Countries We Serve
          </h2>
          <p className="text-center text-muted-foreground mb-10 text-sm">
            Reliable global shipping with full export documentation.{" "}
            <Link to="/global-markets" className="text-sky-500 hover:underline">
              View all markets →
            </Link>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {EXPORT_COUNTRIES.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-700/30 bg-card text-sm font-medium"
              >
                <span className="text-xl">{c.flag}</span>
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Catalog CTA */}
      <section className="py-14 px-4 bg-gradient-to-r from-blue-900/20 to-blue-700/10 border-y border-blue-700/20">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">
            Get Our Wholesale Catalogue
          </h2>
          <p className="text-muted-foreground mb-8">
            Request our latest 500+ design catalogue with wholesale pricing, MOQ
            details, and seasonal lookbook — delivered via WhatsApp within a few
            hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold"
              data-ocid="seo.open_modal_button"
            >
              <a
                href="https://wa.me/917976341419?text=Please%20share%20your%20wholesale%20jewellery%20catalogue%20and%20pricing."
                target="_blank"
                rel="noopener noreferrer"
              >
                📚 Get Catalog via WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-700/50"
              data-ocid="seo.secondary_button"
            >
              <Link to="/gallery">View Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-14 px-4">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary text-center mb-4">
            Send a Wholesale Inquiry
          </h2>
          <p className="text-center text-muted-foreground mb-10 text-sm">
            We respond to all wholesale enquiries within one business day.
          </p>
          {submitted ? (
            <div
              className="text-center py-12 border border-blue-700/30 rounded-xl bg-card"
              data-ocid="seo.success_state"
            >
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Inquiry Received!
              </h3>
              <p className="text-muted-foreground">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 border border-blue-700/20 rounded-xl p-8 bg-card"
              data-ocid="seo.dialog"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seo-name">Your Name *</Label>
                  <Input
                    id="seo-name"
                    required
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    data-ocid="seo.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo-email">Email Address *</Label>
                  <Input
                    id="seo-email"
                    type="email"
                    required
                    placeholder="jane@boutique.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    data-ocid="seo.input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-country">Country / Market</Label>
                <Input
                  id="seo-country"
                  placeholder="e.g. United Kingdom, UAE, USA"
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                  data-ocid="seo.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-message">Your Message *</Label>
                <Textarea
                  id="seo-message"
                  required
                  rows={4}
                  placeholder="Tell us about your requirements — product categories, quantities, destination..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  data-ocid="seo.textarea"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold"
                data-ocid="seo.submit_button"
              >
                Send Inquiry
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4 bg-card border-t border-border">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border border-blue-700/20 rounded-xl bg-background overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.q}
                  <span className="text-sky-500 ml-4 shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-10 px-4 border-t border-border">
        <div className="container max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground text-center">
            Explore:{" "}
            <Link to="/products" className="text-sky-500 hover:underline mx-2">
              Imitation Jewellery Products
            </Link>{" "}
            ·
            <Link to="/wholesale" className="text-sky-500 hover:underline mx-2">
              Wholesale Bulk Export Pricing
            </Link>{" "}
            ·
            <Link
              to="/why-choose-us"
              className="text-sky-500 hover:underline mx-2"
            >
              Why Choose Gemora Global
            </Link>{" "}
            ·
            <Link
              to="/global-markets"
              className="text-sky-500 hover:underline mx-2"
            >
              Global Export Markets
            </Link>{" "}
            ·
            <Link to="/contact" className="text-sky-500 hover:underline mx-2">
              Send Wholesale Inquiry
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
