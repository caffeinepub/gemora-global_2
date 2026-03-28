import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { usePageSEO } from "../hooks/usePageSEO";

const markets = [
  {
    flag: "🇦🇪",
    region: "UAE & Middle East",
    country: "UAE",
    description:
      "The UAE and broader Middle East market is one of our strongest. Buyers in Dubai, Abu Dhabi, and Saudi Arabia consistently favour statement pieces with heavy goldwork, kundan detailing, and bridal jewellery sets — particularly for the South Asian wedding retail segment.",
    packaging:
      "Velvet-lined gift boxes with foam inserts for luxury retail presentation.",
    shipping:
      "Air freight with standard delivery times of 5–7 business days from dispatch.",
    bulk: "MOQ starts at 100 pieces per design. Mixed category orders accepted.",
  },
  {
    flag: "🇫🇷",
    region: "France & Western Europe",
    country: "France",
    description:
      "French and wider Western European buyers tend to favour more minimal, contemporary designs — geometric earrings, delicate layered necklaces, and oxidised silver-finish pieces that suit the French boutique aesthetic. We have experience with CE marking requirements and can advise on EU import compliance for fashion jewellery.",
    packaging:
      "Elegant gift boxes with satin ribbon. EU-compliant material labels available.",
    shipping:
      "Direct flights from India to Paris CDG. Delivery in 6-8 business days.",
    bulk: "MOQ starts at 100 pieces. Mixed collections welcome.",
  },
  {
    flag: "🇬🇧",
    region: "United Kingdom",
    country: "UK",
    description:
      "The UK market has a large and affluent South Asian diaspora, creating strong demand for traditional Indian bridal jewellery sets alongside contemporary Indo-Western fusion pieces. We ship to UK buyers via DHL Express with delivery in 4–6 business days. We provide all HMRC-compliant export documentation.",
    packaging:
      "Premium branded packaging with certificate of authenticity option.",
    shipping:
      "Direct flights from India to London Heathrow. 4–6 business days via DHL.",
    bulk: "MOQ starts at 150 pieces. Mix and match from any category.",
  },
  {
    flag: "🇺🇸",
    region: "USA & Canada",
    country: "USA",
    description:
      "Our North American buyers — primarily fashion boutiques, online retailers, and diaspora market stores — source across our full range from minimal everyday jewellery to statement traditional sets. We ship to USA and Canada via FedEx International Priority, with standard delivery of 5–8 business days. We provide HS code classification support for US customs clearance.",
    packaging:
      "Eco-friendly kraft boxes with ribbon ties. Custom branding available.",
    shipping:
      "FedEx International Priority. 5–8 business days to USA and Canada.",
    bulk: "Minimum 200 pieces per order. Seasonal collections available.",
  },
  {
    flag: "🇦🇺",
    region: "Australia & Singapore",
    country: "Australia",
    description:
      "We supply to boutiques and wholesalers across Australia and Singapore, serving both the general fashion market and the South Asian diaspora segment. Reliable shipping routes and competitive pricing make us the preferred Indian jewellery supplier in the Asia-Pacific region.",
    packaging:
      "Export-grade packaging compliant with Australian customs requirements.",
    shipping: "Air freight via major hubs. Delivery in 7–10 business days.",
    bulk: "Minimum order of $500 AUD equivalent. Flexible mix of categories.",
  },
];

export default function ExportMarkets() {
  usePageSEO({
    title:
      "Imitation Jewellery Export to UAE, France, USA, UK & Europe | Gemora Global India",
    description:
      "Gemora Global exports wholesale imitation jewellery to UAE, France, USA, UK, Germany, Canada, Australia and Singapore. Market-specific designs, export documentation, and reliable shipping.",
    canonical: "https://gemoraglobal-tje.caffeine.xyz/global-markets",
    ogTitle:
      "Jewellery Export to UAE, France, USA, UK & Europe | Gemora Global India",
    ogImage:
      "https://gemoraglobal-tje.caffeine.xyz/images/og-global-markets.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Jewellery Export to Global Markets",
      provider: { "@type": "Organization", name: "Gemora Global" },
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "France" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "Singapore" },
      ],
    },
  });
  useEffect(() => {
    document.title =
      "Imitation Jewellery Export to UAE, France, USA, UK & Europe | Gemora Global India";
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
      "Gemora Global exports wholesale imitation jewellery to UAE, France, USA, UK, Germany, Canada, Australia and Singapore. Market-specific designs, export documentation, and reliable shipping for each destination.",
    );

    const existingScript = document.getElementById("page-schema");
    if (existingScript) existingScript.remove();
    const script = document.createElement("script");
    script.id = "page-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Jewellery Export to Global Markets",
      provider: { "@type": "Organization", name: "Gemora Global" },
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "France" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "Singapore" },
      ],
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
        <div className="bg-card border-b border-border py-12">
          <div className="container">
            <h1 className="font-serif text-4xl font-bold mb-2">
              Global Jewellery Export — Market-Specific Supply for 15+ Countries
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Gemora Global has built a deep understanding of the specific
              buying preferences, retail price points, and design tastes across
              our key international markets. We don't just ship boxes — we help
              our buyers select the right{" "}
              <Link to="/products" className="text-primary hover:underline">
                products
              </Link>{" "}
              for their specific market, based on years of export experience.
              See our{" "}
              <Link to="/wholesale" className="text-primary hover:underline">
                wholesale pricing
              </Link>{" "}
              for MOQ details.
            </p>
          </div>
        </div>
        <div className="container py-12 space-y-8">
          {markets.map((m) => (
            <div
              key={m.country}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center gap-4">
                <span className="text-5xl">{m.flag}</span>
                <div>
                  <h2 className="font-serif text-2xl font-bold">{m.region}</h2>
                  <p className="text-muted-foreground text-sm">
                    {m.description}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="p-5">
                  <p className="font-semibold text-sm text-primary mb-2">
                    📦 Packaging
                  </p>
                  <p className="text-sm text-muted-foreground">{m.packaging}</p>
                </div>
                <div className="p-5">
                  <p className="font-semibold text-sm text-primary mb-2">
                    ✈️ Shipping
                  </p>
                  <p className="text-sm text-muted-foreground">{m.shipping}</p>
                </div>
                <div className="p-5">
                  <p className="font-semibold text-sm text-primary mb-2">
                    📊 Bulk Process
                  </p>
                  <p className="text-sm text-muted-foreground">{m.bulk}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-primary/10 border-y border-primary/20 py-12">
          <div className="container text-center">
            <h2 className="font-serif text-2xl font-bold mb-3">
              Don't see your country?
            </h2>
            <p className="text-muted-foreground mb-6">
              We ship to 50+ countries. Contact us for custom shipping
              arrangements or browse our{" "}
              <Link to="/products" className="text-primary hover:underline">
                full product range
              </Link>
              .
            </p>
            <Button asChild className="bg-primary text-primary-foreground">
              <Link to="/contact">Get Shipping Quote</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
