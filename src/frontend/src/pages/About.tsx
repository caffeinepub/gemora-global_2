import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { usePageSEO } from "../hooks/usePageSEO";

export default function About() {
  usePageSEO({
    title:
      "About Gemora Global — Imitation Jewellery Manufacturer in India Since 2013",
    description:
      "Learn about Gemora Global — a Jaipur-based imitation jewellery manufacturer with 10+ years of export experience, 500+ designs, and factory-direct wholesale pricing for global buyers.",
    canonical: "https://gemoraglobal-tje.caffeine.xyz/about",
    ogTitle:
      "About Gemora Global — Imitation Jewellery Manufacturer in India Since 2013",
    ogDescription:
      "Jaipur-based imitation jewellery manufacturer with 10+ years of export experience, 500+ designs, and factory-direct pricing for global wholesale buyers.",
    ogImage: "https://gemoraglobal-tje.caffeine.xyz/images/og-about.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      url: "https://gemoraglobal-tje.caffeine.xyz/about",
      name: "About Gemora Global",
      description:
        "Gemora Global is a Jaipur-based imitation jewellery manufacturer with 10+ years of export experience.",
      mainEntity: {
        "@type": "Organization",
        name: "Gemora Global",
        foundingDate: "2013",
        foundingLocation: {
          "@type": "Place",
          name: "Jaipur, Rajasthan, India",
        },
        knowsAbout: [
          "Imitation jewellery manufacturing",
          "Fashion jewellery export",
          "Wholesale jewellery supply",
        ],
      },
    },
  });

  useEffect(() => {
    document.title =
      "About Gemora Global — Imitation Jewellery Manufacturer in India Since 2013";
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
      "Learn about Gemora Global — a Jaipur-based imitation jewellery manufacturer with 10+ years of export experience, 500+ designs, and factory-direct wholesale pricing for global buyers.",
    );

    const existingScript = document.getElementById("page-schema");
    if (existingScript) existingScript.remove();
    const script = document.createElement("script");
    script.id = "page-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Gemora Global",
      foundingDate: "2013",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 50,
        maxValue: 100,
      },
      knowsAbout: [
        "Imitation jewellery",
        "Fashion accessories",
        "Jewellery export",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Gemora Global Wholesale Catalogue",
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
        <div className="bg-card border-b border-border py-16">
          <div className="container text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              About Gemora Global — Crafting Jewellery for the World Since 2013
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A legacy of craftsmanship, a vision for global excellence.
            </p>
          </div>
        </div>

        <div className="container py-16 space-y-16">
          {/* Our Story */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gemora Global was founded with a single mission: to bring the
                richness of Indian jewellery craftsmanship to buyers around the
                world — at prices that make global retail viable. Over more than
                a decade, we have grown from a small workshop in Jaipur to a
                full-scale{" "}
                <Link to="/products" className="text-primary hover:underline">
                  imitation jewellery manufacturer and exporter
                </Link>{" "}
                serving clients across Europe, the Middle East, North America,
                and the Asia-Pacific region.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our name, Gemora, reflects our commitment to gem-like quality in
                every piece — from delicate earrings to statement bridal sets.
                We believe every retailer deserves a supplier they can trust
                season after season. Explore our{" "}
                <Link to="/wholesale" className="text-primary hover:underline">
                  wholesale pricing
                </Link>{" "}
                to get started.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video">
              <img
                src="/assets/generated/jewellery-bridal-hd.dim_800x800.jpg"
                alt="Our Workshop — Gemora Global imitation jewellery manufacturing India"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                width={800}
                height={600}
              />
            </div>
          </div>

          {/* Manufacturing Process */}
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-serif text-3xl font-bold mb-6 text-center">
              Our Manufacturing Process
            </h2>
            <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto mb-8">
              Our manufacturing facility in Rajasthan sits at the centre of
              India's most celebrated jewellery-making region. Our team of
              skilled artisans — many of whom trained under master craftspeople
              — produces each piece by hand, applying techniques passed down
              through generations while meeting the rigorous finish standards
              demanded by{" "}
              <Link
                to="/global-markets"
                className="text-primary hover:underline"
              >
                international markets
              </Link>
              .
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "500+", label: "Designs in Catalogue" },
                { value: "50+", label: "Export Countries" },
                { value: "10,000+", label: "Happy Wholesale Clients" },
                { value: "10+", label: "Years of Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commitment to Quality */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-8">
            <h2 className="font-serif text-3xl font-bold mb-6 text-center">
              Our Commitment to Quality
            </h2>
            <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto mb-8">
              Quality is non-negotiable at Gemora Global. Every item undergoes
              multi-stage quality control before dispatch: raw material
              inspection, mid-production checks, and a final pre-shipment
              inspection covering finish, stone setting, clasp strength, and
              anti-tarnish coating durability. Our anti-tarnish finishing
              process extends jewellery life significantly compared to uncoated
              alternatives — a key differentiator our{" "}
              <Link
                to="/why-choose-us"
                className="text-primary hover:underline"
              >
                wholesale buyers
              </Link>{" "}
              highlight in repeat orders.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔬",
                  title: "Quality Testing",
                  desc: "Every batch undergoes rigorous quality checks for finish, durability, and consistency.",
                },
                {
                  icon: "📦",
                  title: "Premium Packaging",
                  desc: "Export-grade packaging ensures products arrive in perfect condition at your doorstep.",
                },
                {
                  icon: "🏆",
                  title: "Anti-Tarnish Finish",
                  desc: "Our proprietary multi-layer anti-tarnish coating dramatically extends wearable life.",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Export Expertise */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden aspect-video">
              <img
                src="/assets/generated/jewellery-necklace-hd.dim_800x800.jpg"
                alt="Global Export — Gemora Global worldwide imitation jewellery distribution"
                className="w-full h-full object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">
                Our Export Expertise
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our export team has over 10 years of experience navigating
                international shipping, customs documentation, and
                country-specific labelling requirements. We are experienced
                exporters to France, UAE, USA, UK, Germany, Canada, Australia,
                and Singapore, and we handle all freight and documentation
                processes on behalf of our buyers — making your purchasing
                experience as smooth as possible. See our{" "}
                <Link
                  to="/global-markets"
                  className="text-primary hover:underline"
                >
                  global markets page
                </Link>{" "}
                for market-specific shipping details.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Compliant with international quality standards",
                  "Experience in customs & documentation",
                  "Reliable logistics partners worldwide",
                  "Multi-currency & payment flexibility",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary">✓</span> {point}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
