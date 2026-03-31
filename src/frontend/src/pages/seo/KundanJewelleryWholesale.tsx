import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

export default function KundanJewelleryWholesale() {
  return (
    <SeoLandingPage
      title="Kundan Jewellery Wholesale Supplier India | Bulk Kundan Sets | Gemora Global"
      metaDescription="Premium kundan jewellery wholesale supplier in India. Bulk kundan necklace sets, earrings & bridal jewellery. Low MOQ, worldwide export from Jaipur."
      canonical="https://gemoraglobal-tje.caffeine.xyz/kundan-jewellery-wholesale"
      h1="Kundan Jewellery Wholesale Supplier in India — Bulk Orders for Global Buyers"
      targetKeyword="kundan jewellery wholesale"
      heroSubtitle="Gemora Global is a leading kundan jewellery wholesale supplier from Jaipur, India. Factory-direct pricing on kundan necklaces, earrings, maang tikkas, and full bridal sets. MOQ from 50 units with worldwide shipping."
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            What is Kundan Jewellery?
          </h2>
          <p>
            Kundan jewellery is a traditional Indian jewellery-making art form
            originating from the royal courts of Rajasthan and Gujarat. It
            involves setting uncut gemstones (real or synthetic) within gold
            foil-backed frames, creating jewellery of extraordinary visual
            richness. Jaipur — where Gemora Global is based — is the global
            capital of kundan jewellery manufacturing, making us uniquely
            positioned to supply authentic and high-quality kundan pieces at
            wholesale prices.
          </p>
          <p>
            Our kundan jewellery wholesale range covers necklace sets, earrings,
            maang tikkas, haath phools, bangles, and complete bridal kundan
            jewellery sets. Each piece is crafted by skilled artisans with
            multi-generation expertise in kundan work, ensuring quality that
            meets international retail standards.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Why Buy Kundan Jewellery Wholesale from Gemora Global?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Factory-direct pricing — no middlemen or agent markups</li>
            <li>
              MOQ from 50 units — suitable for boutiques and large distributors
            </li>
            <li>Anti-tarnish finish on all pieces for extended shelf life</li>
            <li>500+ kundan designs updated seasonally</li>
            <li>Export-ready packaging with velvet-lined boxes</li>
            <li>
              Worldwide shipping to USA, UK, UAE, Canada, Australia and Europe
            </li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Our Kundan Jewellery Wholesale Range
          </h2>
          <p>
            Our wholesale kundan catalogue includes gold-plated kundan necklace
            sets with matching earrings, standalone chandbali earrings in kundan
            work, layered kundan haars for festive occasions, bridal kundan sets
            with full parure (necklace, earrings, maang tikka, bangles, and
            rings), and oxidised kundan jewellery for the growing boho-ethnic
            market. Browse our{" "}
            <Link to="/products" className="text-primary underline">
              full product catalogue
            </Link>{" "}
            for the complete range.
          </p>
          <p>
            Buyers who source kundan jewellery wholesale from India consistently
            find Jaipur manufacturers offer the best combination of
            authenticity, craftsmanship, and price. Our production facility
            operates quality checks at each manufacturing stage — stone setting,
            polishing, and plating — to ensure zero defect export shipments.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Kundan Jewellery for International Buyers
          </h2>
          <p>
            Indian kundan jewellery has gained significant popularity in
            international markets, particularly in the UK, USA, UAE, and
            Australia, where South Asian diaspora communities drive demand for
            bridal and festive jewellery. Western fashion buyers also source
            kundan pieces for their ethnic and global fashion collections.
          </p>
          <p>
            As an established{" "}
            <Link
              to="/imitation-jewellery-exporter-india"
              className="text-primary underline"
            >
              imitation jewellery exporter from India
            </Link>
            , Gemora Global ships kundan wholesale orders via DHL, FedEx, and
            air freight with complete export documentation — commercial invoice,
            packing list, certificate of origin, and HS code classification. All
            orders are insured and tracked.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            How to Place a Wholesale Kundan Jewellery Order
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm">
            <li>
              Contact us via WhatsApp (+91 7976341419) or inquiry form below
            </li>
            <li>Share your design preferences and required quantities</li>
            <li>Receive our kundan wholesale catalogue with pricing</li>
            <li>Confirm order and pay 30% advance (balance before dispatch)</li>
            <li>Production and quality check: 7–15 business days</li>
            <li>Dispatch via your preferred freight mode</li>
          </ol>
          <p className="mt-4">
            For bridal buyers, explore our dedicated{" "}
            <Link
              to="/bridal-jewellery-wholesale"
              className="text-primary underline"
            >
              bridal jewellery wholesale
            </Link>{" "}
            page. For temple-style pieces, visit our{" "}
            <Link
              to="/temple-jewellery-manufacturer"
              className="text-primary underline"
            >
              temple jewellery manufacturer
            </Link>{" "}
            page.
          </p>
        </>
      }
      faqs={[
        {
          q: "What is kundan jewellery made of?",
          a: "Kundan jewellery is made from base metals like brass or copper, coated in gold plating, with synthetic or semi-precious stones set in gold foil. Imitation kundan uses high-quality synthetic kundan stones instead of real gems.",
        },
        {
          q: "What is the minimum order quantity for kundan jewellery wholesale?",
          a: "Our kundan jewellery wholesale MOQ starts from 50 units per design, making it accessible for boutiques and small distributors as well as large wholesalers.",
        },
        {
          q: "Do you export kundan jewellery to the USA and UK?",
          a: "Yes, we regularly export kundan jewellery wholesale to the USA, UK, UAE, Canada, and Australia. We handle all export documentation and ship via DHL, FedEx, and air freight.",
        },
        {
          q: "How long does kundan jewellery production take?",
          a: "Standard kundan wholesale orders are completed in 7–15 business days. Rush orders for smaller quantities can be fulfilled faster. Contact us for specific timelines.",
        },
        {
          q: "Is kundan jewellery anti-tarnish?",
          a: "Yes, all our kundan pieces are finished with multi-layer anti-tarnish coating, significantly extending their shelf life and reducing customer returns for retailers.",
        },
      ]}
    />
  );
}
