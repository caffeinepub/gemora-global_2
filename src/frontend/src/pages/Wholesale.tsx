import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const EXPORT_FEATURES = [
  {
    icon: "📦",
    title: "Minimum Order Quantity (MOQ)",
    desc: "We accommodate small and large businesses. MOQ starts from just 50 pieces per design, with discounts kicking in at higher volumes. Mixed category orders are welcome.",
  },
  {
    icon: "🏭",
    title: "Bulk Artificial Jewellery Manufacturer India",
    desc: "Our factory is equipped to fulfil bulk orders of thousands of pieces per month. We maintain a ready-stock inventory for fastest dispatch on popular designs.",
  },
  {
    icon: "🎨",
    title: "Private Label Jewellery Manufacturer India",
    desc: "Launch your own jewellery brand with our OEM/ODM services. We create custom designs, apply your branding, and deliver retail-ready products under your label.",
  },
  {
    icon: "✈️",
    title: "Worldwide Shipping",
    desc: "We ship to 50+ countries via reliable freight partners. Air, sea, and courier options available. Full export documentation, customs clearance assistance included.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Inquiry",
    desc: "Share your requirements via WhatsApp or email",
  },
  {
    step: "02",
    title: "Catalogue & Samples",
    desc: "Receive our latest catalogue. Request samples if needed",
  },
  {
    step: "03",
    title: "Order Confirmation",
    desc: "Confirm designs, quantities, and delivery timeline",
  },
  {
    step: "04",
    title: "Production",
    desc: "Your order goes into production with regular updates",
  },
  {
    step: "05",
    title: "Quality Check",
    desc: "Every piece inspected before packing",
  },
  {
    step: "06",
    title: "Dispatch",
    desc: "Packed and shipped with tracking details shared",
  },
];

export default function Wholesale() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <div
          className="py-20 text-center relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.10 0.015 285) 0%, oklch(0.18 0.02 285) 50%, oklch(0.12 0.01 285) 100%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, oklch(0.78 0.12 75 / 0.07) 0%, transparent 60%)",
            }}
          />
          <div className="container relative z-10">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Best Imitation Jewellery Exporter in India
            </h1>
            <h2 className="font-serif text-xl md:text-2xl font-medium text-primary mb-4">
              Global Jewellery Wholesale Distributor — Wholesale &amp; Export
              Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Partner with India's most trusted{" "}
              <strong className="text-foreground">
                premium imitation jewellery supplier for export
              </strong>
              . Flexible MOQs, private label options, and worldwide delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              >
                <Link to="/contact">Start Wholesale Inquiry</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8"
              >
                <Link to="/gallery">View Catalogue</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Export Features */}
        <section className="container py-16">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Wholesale Fashion Jewellery Suppliers for Boutiques
            </h2>
            <p className="text-muted-foreground">
              Everything you need to build a successful jewellery business —
              from MOQ orders to private label branding
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPORT_FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-serif text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Order Process */}
        <section className="bg-card border-y border-border py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
                How to Order from India's Best Artificial Jewellery Exporter
              </h2>
              <p className="text-muted-foreground">
                Simple 6-step process from inquiry to delivery
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {PROCESS_STEPS.map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold text-sm">
                      {s.step}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{s.title}</h4>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Indian costume jewellery for USA market section */}
        <section className="container py-12">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Indian Costume Jewellery Exporters for USA Market
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Are you sourcing{" "}
              <strong>
                Indian costume jewellery for the USA, UK or European market
              </strong>
              ? Gemora Global is a leading{" "}
              <strong>global jewellery wholesale distributor India</strong>,
              supplying boutiques, department stores, and online retailers
              across North America, Europe, and the Middle East.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Our <strong>export quality artificial jewellery wholesale</strong>{" "}
              catalogue includes 500+ designs in necklaces, earrings, bracelets,
              rings, and bridal sets — all available for{" "}
              <strong>private label jewellery manufacturing</strong> under your
              brand.
            </p>
            <Button asChild className="bg-primary text-primary-foreground">
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
          </div>
        </section>

        {/* Global Reach */}
        <section className="container py-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold mb-3">
              We Ship Worldwide
            </h2>
            <p className="text-muted-foreground">
              Trusted by buyers in 50+ countries
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { flag: "🇫🇷", country: "France" },
              { flag: "🇦🇪", country: "UAE" },
              { flag: "🇺🇸", country: "USA" },
              { flag: "🇬🇧", country: "UK" },
              { flag: "🇩🇪", country: "Germany" },
              { flag: "🇳🇱", country: "Netherlands" },
              { flag: "🇨🇦", country: "Canada" },
              { flag: "🇦🇺", country: "Australia" },
              { flag: "🇸🇬", country: "Singapore" },
              { flag: "🌍", country: "More" },
            ].map((m) => (
              <div
                key={m.country}
                className="flex flex-col items-center gap-2 bg-card border border-border rounded-lg p-4 min-w-[80px]"
              >
                <span className="text-3xl">{m.flag}</span>
                <span className="text-xs font-medium text-muted-foreground">
                  {m.country}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Why Wholesale With Us */}
        <section className="bg-primary/10 border-y border-primary/20 py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold mb-3">
                Why Choose Gemora as Your Jewellery Export Partner?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "💰",
                  title: "Competitive Pricing",
                  desc: "Factory-direct prices, no middlemen. Best margins for your business.",
                },
                {
                  icon: "✨",
                  title: "Premium Finishing",
                  desc: "Anti-tarnish, gold-plated, rhodium-finished jewellery that lasts.",
                },
                {
                  icon: "🤝",
                  title: "Reliable Partner",
                  desc: "10+ years of export experience. On-time delivery guaranteed.",
                },
                {
                  icon: "🌟",
                  title: "Trendy Designs",
                  desc: "500+ fresh designs updated seasonally. Stay ahead of trends.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="text-center p-6 bg-background rounded-xl border border-border"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container py-16 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Ready to Place a Wholesale Order?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Contact us today. Our export team responds within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10"
            >
              <Link to="/contact">Send Wholesale Inquiry</Link>
            </Button>
            <a
              href="https://wa.me/917976341419?text=Hi%2C%20I%20want%20wholesale%20jewellery%20from%20Gemora%20Global"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-white"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
