import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const markets = [
  {
    flag: "🇦🇪",
    country: "UAE",
    description:
      "One of our largest export markets. UAE buyers appreciate our premium finish, gold-toned designs, and ability to handle large volume orders.",
    packaging:
      "Velvet-lined gift boxes with foam inserts for luxury retail presentation.",
    shipping: "Express air freight via Dubai. Delivery in 5-7 business days.",
    bulk: "Minimum 100 pieces per design. Mixed category orders accepted.",
  },
  {
    flag: "🇺🇸",
    country: "USA",
    description:
      "American boutiques and online sellers love our trendy, contemporary designs. We provide product photos for easy listing.",
    packaging:
      "Eco-friendly kraft boxes with ribbon ties. Custom branding available.",
    shipping:
      "Consolidated sea freight or air courier. 10-14 days via sea, 7-10 via air.",
    bulk: "Minimum 200 pieces per order. Seasonal collections available.",
  },
  {
    flag: "🇬🇧",
    country: "UK",
    description:
      "UK distributors trust Gemora for consistent quality and on-time delivery. We handle all export documentation.",
    packaging:
      "Premium branded packaging with certificate of authenticity option.",
    shipping:
      "Direct flights from Mumbai to London Heathrow. 5-8 business days.",
    bulk: "MOQ starts at 150 pieces. Mix and match from any category.",
  },
  {
    flag: "🇪🇺",
    country: "Europe",
    description:
      "We supply to boutiques across Germany, France, Netherlands, and beyond. Our designs are tailored to European fashion sensibilities.",
    packaging:
      "EU-compliant packaging with material composition labels available.",
    shipping: "Via Frankfurt or Amsterdam hubs. 8-12 days standard.",
    bulk: "Minimum order of €500. Flexible mix of categories allowed.",
  },
];

export default function ExportMarkets() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-card border-b border-border py-12">
          <div className="container">
            <h1 className="font-serif text-4xl font-bold mb-2">
              Export Markets
            </h1>
            <p className="text-muted-foreground">
              We deliver premium jewellery to wholesalers worldwide
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
                  <h2 className="font-serif text-2xl font-bold">{m.country}</h2>
                  <p className="text-muted-foreground text-sm">
                    {m.description}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="p-5">
                  <h3 className="font-semibold text-sm text-primary mb-2">
                    📦 Packaging
                  </h3>
                  <p className="text-sm text-muted-foreground">{m.packaging}</p>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-sm text-primary mb-2">
                    ✈️ Shipping
                  </h3>
                  <p className="text-sm text-muted-foreground">{m.shipping}</p>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-sm text-primary mb-2">
                    📊 Bulk Process
                  </h3>
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
              arrangements.
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
