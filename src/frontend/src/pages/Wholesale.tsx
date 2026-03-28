import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { usePageSEO } from "../hooks/usePageSEO";

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
  usePageSEO({
    title:
      "Imitation Jewellery Wholesale & Export from India — MOQ, Pricing & Shipping | Gemora Global",
    description:
      "Wholesale imitation jewellery direct from India. Gemora Global offers factory-direct pricing, flexible MOQs from 50 units, custom packaging, and global shipping to UAE, France, USA, UK, Europe and more.",
    canonical: "https://gemoraglobal-tje.caffeine.xyz/wholesale",
    ogTitle:
      "Imitation Jewellery Wholesale & Export from India — MOQ & Pricing | Gemora Global",
    ogImage: "https://gemoraglobal-tje.caffeine.xyz/images/og-wholesale.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Imitation Jewellery Wholesale Export",
      provider: { "@type": "Organization", name: "Gemora Global" },
      areaServed: [
        "UAE",
        "France",
        "USA",
        "UK",
        "Germany",
        "Canada",
        "Australia",
        "Singapore",
      ],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        eligibleMinOrderQuantity: "50 units per design",
      },
    },
  });
  useEffect(() => {
    document.title =
      "Imitation Jewellery Wholesale & Export from India — MOQ, Pricing & Shipping | Gemora Global";
    let metaDesc = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Wholesale imitation jewellery direct from India. Gemora Global offers factory-direct pricing, flexible MOQs from 50 units, custom packaging, and global shipping to UAE, France, USA, UK, Europe and more.",
    );

    const existingScript = document.getElementById("page-schema");
    if (existingScript) existingScript.remove();
    const script = document.createElement("script");
    script.id = "page-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Imitation Jewellery Wholesale Export",
      provider: { "@type": "Organization", name: "Gemora Global" },
      areaServed: [
        "UAE",
        "France",
        "USA",
        "UK",
        "Germany",
        "Canada",
        "Australia",
        "Singapore",
      ],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        description: "Contact for pricing",
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          minValue: 50,
          unitText: "units per design",
        },
      },
    });
    document.head.appendChild(script);

    return () => {
      document.title =
        "Imitation Jewellery Exporter & Manufacturer in India | Gemora Global";
      const s = document.getElementById("page-schema");
      if (s) s.remove();
    };
  }, []);

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
              Wholesale Imitation Jewellery Export — Factory-Direct Pricing,
              Global Shipping
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Partner with India's most trusted{" "}
              <strong className="text-foreground">
                premium imitation jewellery supplier for export
              </strong>
              . Flexible MOQs, private label options, and worldwide delivery.
              Browse our{" "}
              <Link to="/products" className="text-primary hover:underline">
                product catalogue
              </Link>{" "}
              or review{" "}
              <Link
                to="/why-choose-us"
                className="text-primary hover:underline"
              >
                why buyers choose us
              </Link>
              .
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

        {/* How Our Wholesale Process Works */}
        <section className="container py-16">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              How Our Wholesale Process Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Gemora Global operates on a fully factory-direct wholesale model —
              meaning there are no middlemen, no trading company markups, and no
              aggregator fees. When you buy from Gemora Global, you buy directly
              from the manufacturer in India. This gives our international
              wholesale buyers a significant pricing advantage over competitors
              sourcing through agents or trading houses.
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
        </section>

        {/* MOQ */}
        <section className="bg-card border-y border-border py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-4 text-primary">
                  Minimum Order Quantities (MOQ)
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our minimum order quantities are designed to be accessible for
                  boutiques and small distributors as well as large wholesalers.
                  For most{" "}
                  <Link to="/products" className="text-primary hover:underline">
                    product categories
                  </Link>
                  , MOQ starts at 50 units per design. For bulk orders of 500+
                  units, we offer volume pricing tiers and can accommodate
                  custom design requests with 3–4 weeks lead time.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    { label: "Standard MOQ", value: "50 units/design" },
                    { label: "Bulk Discount", value: "500+ units" },
                    { label: "Custom Designs", value: "3–4 weeks" },
                    { label: "Countries", value: "15+ served" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-background border border-border rounded-lg p-4 text-center"
                    >
                      <div className="font-bold text-primary text-lg">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold mb-4 text-primary">
                  Pricing &amp; Payment Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We accept payment via bank transfer (TT), PayPal for smaller
                  orders, and Letter of Credit (LC) for large export shipments.
                  Standard payment terms are 30% advance with order
                  confirmation, 70% before shipment. Established buyers with a
                  history of orders may request extended credit terms.
                </p>
                <ul className="space-y-2">
                  {[
                    "Bank transfer (TT) — all order sizes",
                    "PayPal — smaller orders",
                    "Letter of Credit (LC) — large shipments",
                    "30% advance, 70% before shipment",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary">✓</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Packaging & Shipping */}
        <section className="container py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold mb-4 text-primary">
                Packaging Options
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All Gemora Global wholesale shipments are packed in poly bags
                with anti-tarnish lining at individual piece level, then
                consolidated in white gift boxes or branded retail packaging
                depending on buyer preference. Custom packaging with your brand
                name, logo, or barcode stickers is available for orders of 500+
                units. Download our{" "}
                <Link to="/gallery" className="text-primary hover:underline">
                  product catalogue
                </Link>{" "}
                to see packaging options.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold mb-4 text-primary">
                Shipping &amp; Lead Times
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Standard lead time for in-stock designs is 7–10 business days
                from order confirmation to dispatch. Custom or made-to-order
                designs require 21–28 business days. We ship via DHL, FedEx, and
                UPS for express delivery, and via sea freight for large bulk
                orders. See our{" "}
                <Link
                  to="/global-markets"
                  className="text-primary hover:underline"
                >
                  global markets page
                </Link>{" "}
                for country-specific shipping timelines.
              </p>
            </div>
          </div>
        </section>

        {/* Private label / USA market */}
        <section className="container py-8">
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
              brand. Explore our{" "}
              <Link to="/products" className="text-primary hover:underline">
                full product range
              </Link>
              .
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

        {/* CTA */}
        <section className="bg-primary/10 border-y border-primary/20 py-16">
          <div className="container text-center">
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
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
