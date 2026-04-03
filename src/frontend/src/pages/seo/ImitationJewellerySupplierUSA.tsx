import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

export default function ImitationJewellerySupplierUSA() {
  return (
    <SeoLandingPage
      title="Imitation Jewellery Supplier USA | Gemora Global"
      metaDescription="Trusted imitation jewellery supplier for USA buyers. Wholesale Indian fashion jewellery shipped to all US states. MOQ 50 units, FedEx/DHL, full documentation."
      canonical="https://gemoraglobal-tje.caffeine.xyz/imitation-jewellery-supplier-usa"
      h1="Imitation Jewellery Supplier USA | Indian Wholesale"
      targetKeyword="imitation jewellery supplier usa"
      heroSubtitle="Gemora Global is India's trusted imitation jewellery supplier for the USA market. Wholesale fashion jewellery shipped directly to all US states via FedEx and DHL. Factory-direct pricing in USD, MOQ from 50 units."
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            Why USA Buyers Source Imitation Jewellery from India
          </h2>
          <p>
            The United States is one of the world's largest markets for fashion
            and imitation jewellery. American buyers — from boutique owners to
            Amazon and Etsy sellers — consistently source wholesale jewellery
            from India because Indian manufacturers offer:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              Factory-direct pricing 40–60% lower than US wholesale prices
            </li>
            <li>
              Authentic Indian ethnic designs for the South Asian diaspora
              market
            </li>
            <li>High-quality craftsmanship with anti-tarnish finish</li>
            <li>Wide design variety — 500+ styles updated seasonally</li>
            <li>Reliable global shipping via FedEx and DHL to all US states</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Shipping Information for USA Orders
          </h2>
          <p>We ship wholesale jewellery orders to the USA via:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>FedEx International Priority:</strong> 3–5 business days
              delivery to all US states
            </li>
            <li>
              <strong>DHL Express:</strong> 3–6 business days with door-to-door
              delivery
            </li>
            <li>
              <strong>Air freight:</strong> For larger orders (100kg+),
              typically 5–8 days
            </li>
          </ul>
          <p>
            Typical shipping costs to the USA range from $30–$80 for standard
            wholesale orders (under 10kg) via FedEx/DHL. All shipments are fully
            insured and tracked. We ship to New York, Los Angeles, Chicago,
            Houston, Dallas, San Francisco, Miami, and all other US cities.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            US Import Customs & Duties for Imitation Jewellery
          </h2>
          <p>
            Imitation jewellery imported into the USA is classified under HS
            Code 7117 (Imitation Jewellery). Import duty rates for Indian
            imitation jewellery to the USA are typically 11% under most trade
            conditions. We provide all required customs documentation:
            commercial invoice, packing list, country of origin certificate, and
            HS code classification to ensure smooth customs clearance.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Popular Jewellery Categories for the USA Market
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <Link
                to="/bridal-imitation-jewellery"
                className="text-primary underline"
              >
                Bridal jewellery sets
              </Link>{" "}
              — for South Asian wedding season (April–November)
            </li>
            <li>
              <Link
                to="/kundan-jewellery-wholesale"
                className="text-primary underline"
              >
                Kundan jewellery
              </Link>{" "}
              — traditional Indian ethnic jewellery
            </li>
            <li>
              <Link
                to="/oxidised-jewellery-wholesale"
                className="text-primary underline"
              >
                Oxidised boho jewellery
              </Link>{" "}
              — trending in US indie boutiques
            </li>
            <li>Minimal gold fashion jewellery — for mainstream US retail</li>
            <li>
              <Link
                to="/temple-jewellery-manufacturer"
                className="text-primary underline"
              >
                Temple jewellery
              </Link>{" "}
              — for classical dance schools and cultural events
            </li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Pricing in USD for USA Wholesale Buyers
          </h2>
          <p>We quote all USA orders in USD for your convenience:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Basic earrings: $1.50–$4.00 USD per piece wholesale</li>
            <li>Necklace sets: $5–$15 USD per set wholesale</li>
            <li>Complete bridal parures: $20–$80 USD per set wholesale</li>
          </ul>
          <p className="mt-4">
            Contact us via WhatsApp (+91 7976341419) for a USD price list
            specific to your requirements. See also our{" "}
            <Link
              to="/jewellery-exporter-uae"
              className="text-primary underline"
            >
              UAE jewellery supply
            </Link>{" "}
            and{" "}
            <Link
              to="/jewellery-supplier-uk"
              className="text-primary underline"
            >
              UK jewellery supply
            </Link>{" "}
            pages.
          </p>
        </>
      }
      faqs={[
        {
          q: "How do I import jewellery wholesale from India to the USA?",
          a: "Contact Gemora Global, select designs from our catalogue, confirm your order quantity (MOQ 50 units), pay 30% advance, and we handle production and shipping to your US address via FedEx or DHL with all export documentation.",
        },
        {
          q: "What are US import duties for Indian imitation jewellery?",
          a: "Imitation jewellery (HS 7117) from India typically carries an 11% import duty in the USA. We provide all customs documentation to facilitate smooth clearance. Consult a US customs broker for the most current rates.",
        },
        {
          q: "Do you ship to all US states?",
          a: "Yes, we ship to all 50 US states via FedEx and DHL. Typical delivery time is 3–6 business days after dispatch from our Jaipur facility.",
        },
        {
          q: "Can USA-based boutiques get a wholesale price list in USD?",
          a: "Yes, we provide USD-denominated price lists for all USA wholesale buyers. Contact us via WhatsApp or the inquiry form to receive our current wholesale catalogue and USD pricing.",
        },
        {
          q: "Is there a minimum order for wholesale jewellery shipped to the USA?",
          a: "Yes, our MOQ is 50 units per design. For mixed shipments with multiple designs, the minimum total shipment is 200 units. This keeps per-unit shipping costs economical for USA buyers.",
        },
      ]}
    />
  );
}
