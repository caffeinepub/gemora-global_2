import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Rajasthan famous for in jewellery manufacturing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rajasthan is famous for kundan, meenakari, lac jewellery, and jadau jewellery. Jaipur, the state capital, is India's number one hub for imitation and fine jewellery manufacturing, with thousands of skilled artisans and a centuries-old tradition.",
        },
      },
      {
        "@type": "Question",
        name: "What types of wholesale jewellery are available from Rajasthan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "From Rajasthan you can source kundan jewellery, meenakari jewellery, oxidised jewellery, temple jewellery, bridal jewellery sets, antique jewellery, lac bangles, and fashion imitation jewellery at wholesale prices.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum order for wholesale jewellery from Rajasthan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gemora Global's minimum order quantity is 50 units per design. Mixed design wholesale orders require a minimum of 200 units total. International buyers are welcome.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get wholesale jewellery shipped from Rajasthan to my country?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Gemora Global ships wholesale jewellery from Jaipur, Rajasthan to 15+ countries including USA, UK, UAE, Canada, Australia, France, and Germany via DHL and FedEx.",
        },
      },
      {
        "@type": "Question",
        name: "Is Rajasthan jewellery anti-tarnish?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quality manufacturers like Gemora Global apply multi-layer anti-tarnish coating on all pieces. This significantly extends the wearable life of plated imitation jewellery.",
        },
      },
      {
        "@type": "Question",
        name: "What are typical wholesale prices for Rajasthan jewellery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wholesale earrings from Rajasthan start from ₹60–₹250 per piece. Necklace sets range from ₹300–₹1,200. Complete bridal sets start from ₹800. Contact Gemora Global for detailed pricing.",
        },
      },
      {
        "@type": "Question",
        name: "How do I place a bulk jewellery order from Rajasthan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Contact Gemora Global via WhatsApp (+91 7976341419) or the inquiry form. Share your requirements, review the catalogue, confirm the order with 30% advance payment, and we handle production and shipping.",
        },
      },
      {
        "@type": "Question",
        name: "Do Rajasthan jewellery wholesalers provide export documentation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Gemora Global provides complete export documentation — commercial invoice, packing list, certificate of origin, and HS code classification — for all international wholesale orders from Rajasthan.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gemoraglobal-tje.caffeine.xyz/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Services",
        item: "https://gemoraglobal-tje.caffeine.xyz/wholesale",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Wholesale Jewellery Rajasthan",
        item: "https://gemoraglobal-tje.caffeine.xyz/wholesale-jewellery-rajasthan",
      },
    ],
  },
];

export default function WholesaleJewelleryRajasthan() {
  return (
    <SeoLandingPage
      title="Wholesale Jewellery Rajasthan | Bulk Imitation Supplier"
      metaDescription="Wholesale jewellery supplier from Rajasthan, India. Bulk kundan, meenakari & bridal jewellery from Jaipur. MOQ 50 units, worldwide export. Factory-direct pricing."
      canonical="https://gemoraglobal-tje.caffeine.xyz/wholesale-jewellery-rajasthan"
      h1="Wholesale Jewellery Rajasthan — Bulk Imitation Jewellery Supplier"
      targetKeyword="wholesale jewellery Rajasthan"
      heroSubtitle="Gemora Global is Rajasthan's trusted wholesale jewellery supplier, based in Jaipur — India's jewellery capital. Factory-direct wholesale pricing on kundan, meenakari, bridal, temple, and fashion imitation jewellery with MOQ from 50 units and worldwide export."
      schema={schema}
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            Rajasthan's Jewellery Heritage — A 500-Year Legacy
          </h2>
          <p>
            Rajasthan is synonymous with India's finest jewellery traditions.
            The state's royal courts — from Jaipur's Maharajas to the kingdoms
            of Jodhpur, Udaipur, and Bikaner — were legendary patrons of
            jewellery arts, creating a tradition that persists today in the
            skilled hands of Rajasthan's artisan communities. Jaipur, the state
            capital and Pink City, is recognized globally as India's leading
            centre for kundan and meenakari jewellery, and has emerged as the
            country's foremost hub for imitation jewellery wholesale and export.
          </p>
          <p>
            Gemora Global is proud to carry this tradition forward. As a
            Jaipur-based wholesale jewellery supplier, we combine Rajasthan's
            centuries-old craftsmanship with modern manufacturing processes,
            quality standards, and international export capabilities. We supply
            boutiques, distributors, and retailers in 15+ countries with
            authentic Rajasthan-made wholesale jewellery.
          </p>

          <h2 className="text-xl font-serif font-bold text-primary">
            Our Wholesale Jewellery Product Range from Rajasthan
          </h2>
          <p>
            Our Jaipur manufacturing unit produces a comprehensive range of
            wholesale jewellery rooted in Rajasthan's craft traditions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <Link
                to="/kundan-jewellery-wholesale"
                className="text-primary underline"
              >
                Kundan jewellery wholesale
              </Link>{" "}
              — Jaipur's signature style; traditional stone-set pieces in gold
              finish
            </li>
            <li>
              <Link
                to="/meenakari-jewellery-wholesale"
                className="text-primary underline"
              >
                Meenakari jewellery wholesale
              </Link>{" "}
              — vibrant enamel work native to Jaipur, unique to Rajasthan
            </li>
            <li>
              <Link
                to="/oxidised-jewellery-wholesale"
                className="text-primary underline"
              >
                Oxidised jewellery wholesale
              </Link>{" "}
              — antique silver finish popular in global boho markets
            </li>
            <li>
              <Link
                to="/temple-jewellery-manufacturer"
                className="text-primary underline"
              >
                Temple jewellery
              </Link>{" "}
              — deity motif sets for bridal and dance wear
            </li>
            <li>
              <Link
                to="/bridal-jewellery-wholesale"
                className="text-primary underline"
              >
                Bridal jewellery sets
              </Link>{" "}
              — complete kundan and polki bridal parures for wedding markets
            </li>
            <li>
              Antique jewellery — aged-gold finish pieces with traditional
              Rajasthan motifs
            </li>
            <li>
              Fashion jewellery — contemporary designs for global mainstream
              retail
            </li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-primary">
            Wholesale Benefits — Why Buy from Rajasthan
          </h2>
          <p>
            Sourcing wholesale jewellery directly from Rajasthan offers
            significant advantages over buying from middlemen or wholesale
            markets in other cities:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Factory-direct pricing:</strong> 20–35% cost advantage
              over agent-sourced or secondary wholesale alternatives
            </li>
            <li>
              <strong>Authenticity:</strong> Genuine Rajasthan craftsmanship —
              kundan set by trained kundan karigar, meenakari by specialist
              enamel artists
            </li>
            <li>
              <strong>Design exclusivity:</strong> Access to Jaipur-specific
              motifs and styles unavailable from other manufacturing regions
            </li>
            <li>
              <strong>Anti-tarnish quality:</strong> Multi-layer protective
              coating on all pieces for extended product life
            </li>
            <li>
              <strong>Complete export service:</strong> We handle documentation,
              customs classification, freight booking, and delivery
            </li>
            <li>
              <strong>Low MOQ:</strong> Start from 50 units — accessible for
              boutiques and small distributors
            </li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-primary">
            International Shipping from Rajasthan
          </h2>
          <p>
            Gemora Global ships wholesale jewellery from our Jaipur, Rajasthan
            facility to international buyers in 15+ countries. We use DHL
            Express and FedEx International Priority for fast, reliable
            delivery:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <Link
                to="/imitation-jewellery-supplier-usa"
                className="text-primary underline"
              >
                USA
              </Link>{" "}
              — 3–5 business days via FedEx; all 50 states served
            </li>
            <li>
              <Link
                to="/wholesale-jewellery-uk"
                className="text-primary underline"
              >
                UK
              </Link>{" "}
              — 3–5 business days via DHL; HMRC-compliant documentation
            </li>
            <li>
              UAE — 2–3 business days; strong Gulf market distribution network
            </li>
            <li>
              Europe (France, Germany, Netherlands) — 4–6 business days via DHL
            </li>
            <li>
              Canada, Australia — 5–7 business days; complete customs support
            </li>
          </ul>
          <p className="mt-4">
            All shipments include commercial invoice, packing list, certificate
            of origin, and HS code (7117) classification for smooth customs
            clearance. See our{" "}
            <Link to="/global-markets" className="text-sky-500 hover:underline">
              global export markets
            </Link>{" "}
            page for full shipping details.
          </p>

          <h2 className="text-xl font-serif font-bold text-primary">
            Minimum Order Quantity for Rajasthan Wholesale Jewellery
          </h2>
          <p>
            Our wholesale model is designed to be accessible for businesses of
            all sizes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Per-design MOQ:</strong> 50 units
            </li>
            <li>
              <strong>Mixed-design minimum:</strong> 200 units total
            </li>
            <li>
              <strong>Custom manufacturing MOQ:</strong> 100 units per design
            </li>
            <li>
              <strong>Payment terms:</strong> 30% advance, balance before
              dispatch
            </li>
            <li>
              <strong>Production lead time:</strong> 7–15 business days standard
            </li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-primary">
            About Gemora Global — Jaipur, Rajasthan
          </h2>
          <p>
            Gemora Global is a registered imitation jewellery manufacturer and
            wholesale exporter based in Jaipur, Rajasthan. With 10+ years of
            export experience, we have built a reputation for consistent
            quality, reliable shipping, and exceptional customer service with
            wholesale buyers from the UK, USA, UAE, and beyond.
          </p>
          <p>
            Our address is B 66 MAA Hinglaj Nagar, Jaipur 302021, Rajasthan,
            India. For wholesale inquiries, contact us at{" "}
            <a
              href="https://wa.me/917976341419"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 7976341419
            </a>{" "}
            or email{" "}
            <a
              href="mailto:globalgemora@gmail.com"
              className="text-primary underline"
            >
              globalgemora@gmail.com
            </a>
            . Also see our main{" "}
            <Link
              to="/imitation-jewellery-manufacturer-jaipur"
              className="text-primary underline"
            >
              Jaipur jewellery manufacturer
            </Link>{" "}
            page and our{" "}
            <Link
              to="/bulk-jewellery-supplier"
              className="text-primary underline"
            >
              bulk jewellery supplier
            </Link>{" "}
            page for volume pricing.
          </p>
        </>
      }
      faqs={[
        {
          q: "What is Rajasthan famous for in jewellery manufacturing?",
          a: "Rajasthan is famous for kundan, meenakari, lac, and jadau jewellery. Jaipur, the state capital, is India's number one hub for imitation and fine jewellery manufacturing with thousands of skilled artisans and a centuries-old tradition.",
        },
        {
          q: "What types of wholesale jewellery are available from Rajasthan?",
          a: "From Rajasthan you can source kundan jewellery, meenakari jewellery, oxidised jewellery, temple jewellery, bridal jewellery sets, antique jewellery, lac bangles, and fashion imitation jewellery at wholesale prices.",
        },
        {
          q: "What is the minimum order for wholesale jewellery from Rajasthan?",
          a: "Gemora Global's MOQ is 50 units per design. Mixed design orders require a minimum of 200 units total. International buyers are welcome.",
        },
        {
          q: "Can I get wholesale jewellery shipped from Rajasthan to my country?",
          a: "Yes. Gemora Global ships wholesale jewellery from Jaipur, Rajasthan to 15+ countries including USA, UK, UAE, Canada, Australia, France, and Germany via DHL and FedEx.",
        },
        {
          q: "Is Rajasthan jewellery anti-tarnish?",
          a: "Quality manufacturers like Gemora Global apply multi-layer anti-tarnish coating on all pieces, significantly extending the wearable life of plated imitation jewellery.",
        },
        {
          q: "What are typical wholesale prices for Rajasthan jewellery?",
          a: "Wholesale earrings from Rajasthan start from ₹60–₹250 per piece. Necklace sets range from ₹300–₹1,200. Complete bridal sets start from ₹800. Contact Gemora Global for detailed pricing.",
        },
        {
          q: "How do I place a bulk jewellery order from Rajasthan?",
          a: "Contact Gemora Global via WhatsApp (+91 7976341419) or the inquiry form. Share requirements, review the catalogue, confirm with 30% advance payment, and we handle production and shipping from Jaipur.",
        },
        {
          q: "Do Rajasthan jewellery wholesalers provide export documentation?",
          a: "Yes. Gemora Global provides complete export documentation — commercial invoice, packing list, certificate of origin, and HS code classification — for all international wholesale orders.",
        },
      ]}
    />
  );
}
