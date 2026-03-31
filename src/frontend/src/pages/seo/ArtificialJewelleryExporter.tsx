import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

export default function ArtificialJewelleryExporter() {
  return (
    <SeoLandingPage
      title="Artificial Jewellery Exporter from India | Wholesale Supplier | Gemora Global"
      metaDescription="Trusted artificial jewellery exporter from India. Wholesale imitation necklaces, earrings & bridal sets. Factory-direct pricing, MOQ 50 units, global shipping."
      canonical="https://gemoraglobal-tje.caffeine.xyz/artificial-jewellery-exporter"
      h1="Artificial Jewellery Exporter from India — Factory-Direct Wholesale Supply"
      targetKeyword="artificial jewellery exporter"
      heroSubtitle="Gemora Global is India's trusted artificial jewellery exporter, supplying wholesale fashion jewellery to buyers in USA, UK, UAE, Canada, and 15+ countries. Direct from factory in Jaipur — best pricing, anti-tarnish finish, MOQ from 50 units."
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            India's Trusted Artificial Jewellery Exporter
          </h2>
          <p>
            Artificial jewellery — also known as imitation jewellery, fashion
            jewellery, or costume jewellery — is one of India's fastest-growing
            export categories. India is the world's largest producer of
            artificial jewellery, and Jaipur is at the heart of this industry.
            Gemora Global operates from Jaipur, giving us unmatched access to
            skilled artisans, quality materials, and the latest designs.
          </p>
          <p>
            As a direct artificial jewellery exporter from India, we supply
            wholesale buyers across the globe with consistent quality,
            transparent pricing, and reliable shipping. Our export operations
            have served boutiques, fashion retailers, distributors, and
            marketplace sellers in over 15 countries since 2013.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            What Makes Us the Best Artificial Jewellery Exporter?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Factory-direct pricing with no agent or middleman costs</li>
            <li>500+ designs across all jewellery categories</li>
            <li>Anti-tarnish multi-layer finish on all export pieces</li>
            <li>
              MOQ from 50 units — accessible for boutiques and large buyers
              alike
            </li>
            <li>Consistent quality control at every production stage</li>
            <li>Complete export documentation and insurance</li>
            <li>Fast turnaround: 7–15 business days per order</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Our Artificial Jewellery Export Range
          </h2>
          <p>Our export catalogue covers all major jewellery categories:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <Link
                to="/kundan-jewellery-wholesale"
                className="text-primary underline"
              >
                Kundan jewellery wholesale
              </Link>{" "}
              — traditional Indian kundan sets
            </li>
            <li>
              <Link
                to="/bridal-jewellery-wholesale"
                className="text-primary underline"
              >
                Bridal jewellery wholesale
              </Link>{" "}
              — complete bridal sets in all styles
            </li>
            <li>Oxidised jewellery — antique finish bohemian pieces</li>
            <li>Polki jewellery — uncut stone traditional designs</li>
            <li>Minimal fashion jewellery — contemporary everyday wear</li>
            <li>Western jewellery — Indo-Western fusion collections</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Export Markets We Serve
          </h2>
          <p>
            As an established artificial jewellery exporter, Gemora Global
            regularly ships to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <Link
                to="/imitation-jewellery-supplier-usa"
                className="text-primary underline"
              >
                USA
              </Link>{" "}
              — South Asian boutiques, fashion retailers, Amazon/Etsy sellers
            </li>
            <li>
              <Link
                to="/jewellery-supplier-uk"
                className="text-primary underline"
              >
                UK
              </Link>{" "}
              — Ethnic boutiques, online fashion platforms
            </li>
            <li>
              <Link
                to="/jewellery-exporter-uae"
                className="text-primary underline"
              >
                UAE (Dubai)
              </Link>{" "}
              — Fashion souks, bridal boutiques, export hubs
            </li>
            <li>Canada, Australia, Germany, France, Singapore</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            How to Import Artificial Jewellery from India
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm">
            <li>
              Contact us via WhatsApp or inquiry form with your requirements
            </li>
            <li>Receive our wholesale catalogue and price list</li>
            <li>Select designs and confirm quantities</li>
            <li>Pay 30% advance to confirm order</li>
            <li>Production, QC, and packaging: 7–15 business days</li>
            <li>Dispatch via DHL, FedEx, or air freight with tracking</li>
          </ol>
        </>
      }
      faqs={[
        {
          q: "What is artificial jewellery?",
          a: "Artificial jewellery (also called imitation or fashion jewellery) is made from base metals like brass and copper with gold or silver plating, and synthetic stones. It replicates fine jewellery at a fraction of the cost.",
        },
        {
          q: "Why import artificial jewellery from India?",
          a: "India offers the best combination of craftsmanship, design variety, and price for artificial jewellery. Indian manufacturers like Gemora Global offer factory-direct pricing, low MOQ, and reliable global export services.",
        },
        {
          q: "What is the minimum order for artificial jewellery export?",
          a: "Our minimum order is 50 units per design. For mixed assortments across multiple designs, we require a minimum of 200 units total per shipment.",
        },
        {
          q: "How long does export shipping take?",
          a: "Production takes 7–15 business days. Shipping via DHL/FedEx takes 3–7 business days internationally. Air freight for large orders is 5–10 days.",
        },
        {
          q: "Do you provide export documentation?",
          a: "Yes, we provide all export documents including commercial invoice, packing list, certificate of origin, and HS code classification to facilitate smooth customs clearance in any country.",
        },
      ]}
    />
  );
}
