import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

export default function FashionJewelleryExporterIndia() {
  return (
    <SeoLandingPage
      title="Fashion Jewellery Export India | Wholesale Supplier"
      metaDescription="Top fashion jewellery exporter from India. Wholesale trendy necklaces, earrings & sets exported worldwide. Anti-tarnish, MOQ 50 units, global shipping."
      canonical="https://gemoraglobal-tje.caffeine.xyz/fashion-jewellery-exporter-india"
      h1="Fashion Jewellery Exporter India | Global Wholesale"
      targetKeyword="fashion jewellery exporter india"
      heroSubtitle="Gemora Global exports premium fashion jewellery worldwide from India. Trendy 2026 designs in necklaces, earrings, bracelets, rings and sets. Factory-direct pricing, anti-tarnish finish, worldwide shipping."
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            Fashion Jewellery Export from India: The Global Opportunity
          </h2>
          <p>
            Fashion jewellery is one of India's most successful export
            categories, with demand rising every year in the USA, UK, UAE,
            Europe, and Southeast Asia. Indian manufacturers like Gemora Global
            combine traditional craftsmanship with trend-forward design —
            producing fashion jewellery that sells equally well in Asian ethnic
            markets and Western contemporary fashion stores.
          </p>
          <p>
            As a fashion jewellery exporter from India, Gemora Global tracks
            international fashion trends from Paris, Dubai, and New York runway
            seasons and translates these into our seasonal collections. This
            ensures our wholesale buyers always have access to commercially
            relevant, trending inventory.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Fashion Jewellery Trends 2026 — What's Selling Globally
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              Statement earrings — oversized, layered, and sculptural designs
            </li>
            <li>
              Chunky chains — bold gold and silver chains for fashion-forward
              buyers
            </li>
            <li>Layered necklace sets — multiple chain lengths in one look</li>
            <li>Boho oxidised jewellery — growing demand in Western markets</li>
            <li>
              Minimal gold dainty jewellery — everyday wear in gold-fill style
            </li>
            <li>Pearl-inspired designs — freshwater pearl look in imitation</li>
            <li>Colourful gemstone statement pieces</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Our Fashion Jewellery Export Range
          </h2>
          <p>
            Our fashion jewellery wholesale export catalogue covers all styles:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Traditional Indian ethnic jewellery for diaspora markets</li>
            <li>Contemporary Western-style fashion jewellery</li>
            <li>Indo-Western fusion designs</li>
            <li>
              <Link
                to="/bridal-imitation-jewellery"
                className="text-primary underline"
              >
                Bridal and festive jewellery
              </Link>
            </li>
            <li>
              <Link
                to="/oxidised-jewellery-wholesale"
                className="text-primary underline"
              >
                Oxidised boho jewellery
              </Link>
            </li>
            <li>Minimal and dainty fashion jewellery</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Key Export Destinations for Fashion Jewellery from India
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <Link
                to="/imitation-jewellery-supplier-usa"
                className="text-primary underline"
              >
                USA
              </Link>{" "}
              — South Asian boutiques, online fashion retailers
            </li>
            <li>
              <Link
                to="/jewellery-supplier-uk"
                className="text-primary underline"
              >
                UK
              </Link>{" "}
              — Fashion high streets, ethnic boutiques
            </li>
            <li>
              <Link
                to="/jewellery-exporter-uae"
                className="text-primary underline"
              >
                UAE
              </Link>{" "}
              — Fashion souks, bridal boutiques
            </li>
            <li>Germany, France, Netherlands — European fashion market</li>
            <li>Canada, Australia, Singapore</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Fashion Jewellery Export Compliance & Documentation
          </h2>
          <p>
            All our export shipments include complete documentation: commercial
            invoice, packing list, certificate of origin, HS code classification
            (HS 7117 for imitation jewellery), and insurance. We are experienced
            with customs requirements in all major markets and can advise buyers
            on import duties and documentation specific to their country.
          </p>
        </>
      }
      faqs={[
        {
          q: "What HS code is used for fashion jewellery exports from India?",
          a: "Imitation/fashion jewellery exports from India use HS Code 7117 (Imitation Jewellery). Specific sub-codes may apply based on material and type. We provide full HS code classification with every export shipment.",
        },
        {
          q: "What are the latest fashion jewellery trends in 2026?",
          a: "Top 2026 trends include oversized statement earrings, chunky chains, layered necklaces, oxidised boho pieces, minimal gold dainty designs, pearl-inspired styles, and colourful gemstone statement pieces.",
        },
        {
          q: "How often do you update your fashion jewellery export collection?",
          a: "We update our fashion jewellery collection seasonally — 4 times per year — with 50+ new designs per season. Buyers receive seasonal lookbooks and can pre-order new designs.",
        },
        {
          q: "Can I get samples before placing a bulk fashion jewellery export order?",
          a: "Yes, we provide sample sets (typically 5–10 pieces) for quality verification before bulk orders. Sample charges apply and are adjusted against the bulk order payment.",
        },
        {
          q: "Do you supply fashion jewellery to European buyers?",
          a: "Yes, we export fashion jewellery to Germany, France, Netherlands, Belgium, and other EU countries. We ensure compliance with EU import requirements and provide all necessary documentation.",
        },
      ]}
    />
  );
}
