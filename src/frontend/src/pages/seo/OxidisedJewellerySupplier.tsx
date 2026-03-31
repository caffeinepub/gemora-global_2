import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

export default function OxidisedJewellerySupplier() {
  return (
    <SeoLandingPage
      title="Oxidised Jewellery Supplier India | Antique Silver Jewellery Wholesale | Gemora Global"
      metaDescription="Reliable oxidised jewellery supplier in India. Wholesale antique silver earrings, necklaces, bangles for boutiques. Low MOQ, anti-tarnish, global export."
      canonical="https://gemoraglobal-tje.caffeine.xyz/oxidised-jewellery-supplier"
      h1="Oxidised Jewellery Supplier India — Trusted Wholesale Partner for Boutiques"
      targetKeyword="oxidised jewellery supplier"
      heroSubtitle="Gemora Global is a trusted oxidised jewellery supplier from Jaipur, India. Wholesale antique silver-finish earrings, necklaces, bangles and sets for boutiques, retailers, and international buyers."
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            Why Choose Gemora Global as Your Oxidised Jewellery Supplier?
          </h2>
          <p>
            Sourcing oxidised jewellery wholesale requires a supplier who
            understands the nuances of oxidised finishing — the right depth of
            oxidation, consistent quality across batches, and finishing that
            neither flakes nor over-oxidises during wear. As an experienced
            oxidised jewellery manufacturer and supplier, Gemora Global has
            perfected our oxidised finishing process over years of production.
          </p>
          <p>
            Our oxidised jewellery supplier capabilities include standard
            catalogue designs, custom design manufacturing, private label
            orders, and seasonal trend-based collections. We serve boutiques,
            online sellers, fashion retailers, and international distributors.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Oxidised Jewellery Supply for Boutiques
          </h2>
          <p>
            Boutiques that stock oxidised jewellery consistently report it as
            one of their fastest-moving categories. The distinctive antique
            aesthetic photographs beautifully for Instagram and online stores,
            driving strong impulse purchases. As a dedicated oxidised jewellery
            supplier for boutiques, we offer:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Low MOQ of 50 units — perfect for boutique-scale orders</li>
            <li>Curated seasonal collections of 30–50 new oxidised designs</li>
            <li>
              Mixed assortments allowed — different designs in one shipment
            </li>
            <li>Retail-ready packaging with branded hang tags available</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Oxidised Jewellery Supply Range
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Oxidised jhumka earrings — classic and contemporary styles</li>
            <li>Oxidised chandbali earrings — festive and bridal</li>
            <li>Oxidised tribal necklaces and kolhapuri sets</li>
            <li>Oxidised bangles and kadas</li>
            <li>Oxidised maang tikkas and hair accessories</li>
            <li>Oxidised rings — stackable and statement</li>
          </ul>
          <p className="mt-4">
            See our broader{" "}
            <Link
              to="/oxidised-jewellery-wholesale"
              className="text-primary underline"
            >
              oxidised jewellery wholesale
            </Link>{" "}
            page for full pricing information. For a complete view of our ethnic
            jewellery range, visit our{" "}
            <Link
              to="/kundan-jewellery-wholesale"
              className="text-primary underline"
            >
              kundan jewellery wholesale
            </Link>{" "}
            and{" "}
            <Link
              to="/temple-jewellery-manufacturer"
              className="text-primary underline"
            >
              temple jewellery manufacturer
            </Link>{" "}
            pages.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Oxidised Jewellery for International Markets
          </h2>
          <p>
            International demand for oxidised jewellery is growing rapidly. In
            Western markets, the boho-ethnic aesthetic is mainstream in
            platforms like Etsy, Not On The High Street, and independent fashion
            boutiques. Our international supply includes shipments to{" "}
            <Link
              to="/jewellery-supplier-uk"
              className="text-primary underline"
            >
              UK
            </Link>
            ,{" "}
            <Link
              to="/imitation-jewellery-supplier-usa"
              className="text-primary underline"
            >
              USA
            </Link>
            , and{" "}
            <Link
              to="/jewellery-exporter-uae"
              className="text-primary underline"
            >
              UAE
            </Link>
            .
          </p>
        </>
      }
      faqs={[
        {
          q: "How is oxidised jewellery different from regular silver jewellery?",
          a: "Regular silver jewellery aims for a bright, polished finish. Oxidised jewellery intentionally darkens the metal with a chemical treatment to create an antique, aged appearance. It is typically made with base metal (brass/copper) rather than real silver.",
        },
        {
          q: "Does oxidised jewellery tarnish further over time?",
          a: "Quality oxidised jewellery with protective coating maintains its finish. The initial oxidation is stable. However, prolonged exposure to moisture and chemicals can affect the finish. We apply protective coatings to extend the finish life.",
        },
        {
          q: "Can I get oxidised jewellery with custom designs?",
          a: "Yes, we manufacture custom oxidised jewellery designs for exclusive collections. Custom orders require a minimum of 100 units per design and 15–20 business days for production.",
        },
        {
          q: "Is there a difference between oxidised and antique jewellery?",
          a: "The terms are used interchangeably in the imitation jewellery trade. Both describe dark-finish metal jewellery with an aged appearance. Some suppliers use 'antique gold' for a brownish-gold oxidised look and 'oxidised silver' for the black-silver finish.",
        },
        {
          q: "Do you sell oxidised jewellery wholesale internationally?",
          a: "Yes, we export oxidised jewellery wholesale to UK, USA, UAE, Germany, France, Australia, and other countries. See our international pages for country-specific shipping information.",
        },
      ]}
    />
  );
}
