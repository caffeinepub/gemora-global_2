import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Gemora Global",
    description:
      "Imitation jewellery manufacturer and exporter in Jaipur, India. B2B wholesale supplier for global boutiques and distributors.",
    url: "https://gemoraglobal-tje.caffeine.xyz/imitation-jewellery-manufacturer-jaipur",
    telephone: "+91-7976341419",
    email: "globalgemora@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B 66 MAA Hinglaj Nagar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302021",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.9124",
      longitude: "75.7873",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.indiamart.com/gemora-global",
      "https://www.tradeindia.com/gemora-global",
    ],
    priceRange: "₹₹",
    areaServed: "Worldwide",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why is Jaipur famous for imitation jewellery manufacturing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jaipur, the Pink City of Rajasthan, has a 500+ year tradition of jewellery craftsmanship. It is India's leading hub for kundan, meenakari, and imitation jewellery manufacturing, with thousands of skilled artisans and a complete supply chain ecosystem.",
        },
      },
      {
        "@type": "Question",
        name: "What types of imitation jewellery does Gemora Global manufacture in Jaipur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gemora Global manufactures kundan, meenakari, temple, oxidised, antique, bridal, and fashion imitation jewellery in Jaipur. Over 500 designs are available across necklace sets, earrings, bangles, maang tikkas, and full bridal parures.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum order quantity (MOQ) for bulk jewellery from Jaipur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our minimum order quantity is 50 units per design. Mixed design orders require a minimum total of 200 units. Boutiques and first-time buyers are welcome to start with 50 units.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer custom imitation jewellery manufacturing in Jaipur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Gemora Global offers custom jewellery manufacturing for unique designs, private label orders, and exclusive collections. Custom orders require a minimum of 100 units and 15–20 business days of production time.",
        },
      },
      {
        "@type": "Question",
        name: "What quality standards does Gemora Global follow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every piece undergoes 3-stage quality control: raw material inspection, in-process checks (stone setting, plating), and final inspection before packaging. We use anti-tarnish multi-layer coating on all pieces.",
        },
      },
      {
        "@type": "Question",
        name: "Which countries does Gemora Global export to from Jaipur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We export to 15+ countries including USA, UK, UAE, France, Germany, Canada, Australia, Singapore, and other global markets via DHL, FedEx, and air freight.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get a wholesale price list from Gemora Global?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Contact us via WhatsApp at +91 7976341419 or fill our inquiry form. We'll share our wholesale catalogue with current pricing within 24 hours.",
        },
      },
      {
        "@type": "Question",
        name: "How long does production and delivery take for wholesale orders?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard wholesale orders are produced in 7–15 business days. International delivery takes an additional 3–7 days via DHL or FedEx.",
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
        name: "Imitation Jewellery Manufacturer Jaipur",
        item: "https://gemoraglobal-tje.caffeine.xyz/imitation-jewellery-manufacturer-jaipur",
      },
    ],
  },
];

export default function ImitationJewelleryManufacturerJaipur() {
  return (
    <SeoLandingPage
      title="Imitation Jewellery Manufacturer Jaipur | Gemora Global"
      metaDescription="Leading imitation jewellery manufacturer in Jaipur. Wholesale kundan, meenakari, bridal & fashion jewellery. MOQ 50 units, global export. Factory-direct pricing."
      canonical="https://gemoraglobal-tje.caffeine.xyz/imitation-jewellery-manufacturer-jaipur"
      h1="Imitation Jewellery Manufacturer in Jaipur — GEMORA GLOBAL"
      targetKeyword="imitation jewellery manufacturer Jaipur"
      heroSubtitle="Gemora Global is Jaipur's trusted imitation jewellery manufacturer and B2B wholesale exporter. Factory-direct pricing on 500+ designs — kundan, meenakari, temple, oxidised, and bridal sets. MOQ from 50 units with worldwide shipping."
      schema={schema}
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            Why Jaipur is India's Imitation Jewellery Capital
          </h2>
          <p>
            Jaipur — the Pink City of Rajasthan — has been India's foremost
            jewellery manufacturing hub for over 500 years. The city's artisan
            tradition covers every jewellery-making technique: kundan stone
            setting, meenakari enamel work, lac jewellery, oxidised silver
            finishing, and precision casting. No other city in India rivals
            Jaipur's combination of skilled manpower, complete supply chain, and
            export infrastructure for imitation jewellery manufacturing.
          </p>
          <p>
            As a Jaipur-based{" "}
            <Link
              to="/imitation-jewellery-manufacturer-india"
              className="text-primary underline"
            >
              imitation jewellery manufacturer
            </Link>
            , Gemora Global is positioned at the heart of this ecosystem. Our
            manufacturing unit employs third-generation artisans with deep
            expertise in traditional and contemporary jewellery styles, enabling
            us to produce pieces that compete with premium brands at wholesale
            price points.
          </p>

          <h2 className="text-xl font-serif font-bold text-primary">
            Our Manufacturing Process — From Design to Export
          </h2>
          <p>
            Our Jaipur manufacturing facility operates a vertically integrated
            production process:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm">
            <li>
              <strong>Design & Sampling:</strong> In-house design team creates
              seasonal collections and custom pieces. 3D rendering available for
              custom orders.
            </li>
            <li>
              <strong>Base Metal Casting:</strong> Brass and white metal casting
              using precision moulds, ensuring consistent dimensions across bulk
              orders.
            </li>
            <li>
              <strong>Stone Setting:</strong> Skilled kundan and stone-setting
              artisans work on each piece individually. Kundan, meenakari, CZ,
              and semi-precious stones.
            </li>
            <li>
              <strong>Plating:</strong> Gold, silver, rose-gold, and antique
              plating in our electroplating unit, controlled for thickness and
              uniformity.
            </li>
            <li>
              <strong>Anti-Tarnish Coating:</strong> Multi-layer protective
              coating applied to all finished pieces for extended wearability.
            </li>
            <li>
              <strong>Quality Control:</strong> Three-stage QC — raw material,
              in-process, and final inspection before packaging.
            </li>
            <li>
              <strong>Export Packaging:</strong> Velvet-lined boxes, bubble-wrap
              protection, and export-grade cartons with complete documentation.
            </li>
          </ol>

          <h2 className="text-xl font-serif font-bold text-primary">
            Product Range — 500+ Wholesale Designs
          </h2>
          <p>
            Our wholesale catalogue from Jaipur covers the full spectrum of
            imitation jewellery:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <Link
                to="/kundan-jewellery-wholesale"
                className="text-primary underline"
              >
                Kundan jewellery
              </Link>{" "}
              — traditional Jaipur kundan necklaces, earrings, and bridal sets
            </li>
            <li>
              <Link
                to="/meenakari-jewellery-wholesale"
                className="text-primary underline"
              >
                Meenakari jewellery
              </Link>{" "}
              — vibrant enamel work native to Jaipur's artisan tradition
            </li>
            <li>
              <Link
                to="/temple-jewellery-manufacturer"
                className="text-primary underline"
              >
                Temple jewellery
              </Link>{" "}
              — deity motif sets for bridal and classical dance markets
            </li>
            <li>
              <Link
                to="/oxidised-jewellery-wholesale"
                className="text-primary underline"
              >
                Oxidised jewellery
              </Link>{" "}
              — antique silver-finish boho and ethnic styles
            </li>
            <li>
              <Link
                to="/bridal-jewellery-wholesale"
                className="text-primary underline"
              >
                Bridal jewellery sets
              </Link>{" "}
              — complete parures for South Asian wedding markets worldwide
            </li>
            <li>
              Fashion jewellery — contemporary minimal and statement pieces for
              global retail
            </li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-primary">
            Quality Standards — What Sets Gemora Global Apart
          </h2>
          <p>
            International wholesale buyers consistently choose Gemora Global
            because of our non-negotiable quality standards:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Anti-tarnish guarantee:</strong> Every piece is finished
              with our proprietary multi-layer anti-tarnish coating, giving
              retailers and their customers a superior experience compared to
              standard plated jewellery.
            </li>
            <li>
              <strong>Consistent plating thickness:</strong> Our electroplating
              unit maintains minimum 2-micron gold plating across all pieces,
              reducing the tarnishing and discolouration common in cheap
              jewellery.
            </li>
            <li>
              <strong>Stone security:</strong> Each set stone is tested for
              secure setting before dispatch — no loose or missing stones on
              arrival.
            </li>
            <li>
              <strong>Export-grade packaging:</strong> Velvet-lined individual
              boxes, protective bubble wrap, and stackable export cartons ensure
              zero damage in transit.
            </li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-primary">
            Export Markets — Jaipur to the World
          </h2>
          <p>
            From our Jaipur manufacturing facility, Gemora Global exports
            imitation jewellery wholesale to 15+ countries. Our key markets
            include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <Link
                to="/imitation-jewellery-supplier-usa"
                className="text-primary underline"
              >
                USA
              </Link>{" "}
              — boutiques, Amazon/Etsy sellers, and diaspora market retailers
            </li>
            <li>
              <Link
                to="/wholesale-jewellery-uk"
                className="text-primary underline"
              >
                UK
              </Link>{" "}
              — South Asian wedding boutiques and high street stockists
            </li>
            <li>
              UAE — Gulf market distributors and wedding jewellery retailers
            </li>
            <li>France, Germany — European fashion jewellery buyers</li>
            <li>
              Canada, Australia — diaspora and multicultural fashion markets
            </li>
            <li>Singapore — Southeast Asian fashion and bridal markets</li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-primary">
            Minimum Order Quantity (MOQ) & Pricing
          </h2>
          <p>
            We have designed our wholesale model to be accessible to boutiques
            and small distributors as well as large-volume buyers:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>MOQ: 50 units per design</li>
            <li>Mixed design orders: minimum 200 units total</li>
            <li>
              Basic earrings: from ₹60–₹250 per piece wholesale (factory-direct)
            </li>
            <li>Necklace sets: from ₹300–₹1,200 per set wholesale</li>
            <li>Complete bridal sets: from ₹800–₹3,000 per set wholesale</li>
            <li>Custom order MOQ: 100 units per design</li>
          </ul>
          <p className="mt-4">
            For full wholesale price list and current seasonal catalogue,
            contact us on WhatsApp at{" "}
            <a
              href="https://wa.me/917976341419"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 7976341419
            </a>
            . Also explore our{" "}
            <Link
              to="/wholesale-jewellery-rajasthan"
              className="text-primary underline"
            >
              wholesale jewellery Rajasthan
            </Link>{" "}
            page for the full regional supplier story, and our{" "}
            <Link
              to="/bulk-jewellery-supplier"
              className="text-primary underline"
            >
              bulk jewellery supplier
            </Link>{" "}
            page for high-volume export pricing.
          </p>

          <h2 className="text-xl font-serif font-bold text-primary">
            People Also Ask — Imitation Jewellery Manufacturer Jaipur
          </h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-foreground">
                Where is the imitation jewellery market in Jaipur?
              </dt>
              <dd className="text-muted-foreground mt-1">
                The main wholesale imitation jewellery market in Jaipur is
                located in areas like Johri Bazaar, Kishanpole Bazaar, and the
                industrial zones of Sitapura and Mansarovar. Gemora Global
                operates from the Hinglaj Nagar area, with easy access for
                buyers and freight agents.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">
                Is imitation jewellery from Jaipur good quality?
              </dt>
              <dd className="text-muted-foreground mt-1">
                Yes. Jaipur's centuries-old artisan tradition means jewellery
                makers here have deep expertise in craftsmanship, plating, and
                finishing techniques. Reputable manufacturers like Gemora Global
                apply multi-layer anti-tarnish coating and 3-stage quality
                control to ensure consistent international standards.
              </dd>
            </div>
          </dl>
        </>
      }
      faqs={[
        {
          q: "Why is Jaipur famous for imitation jewellery manufacturing?",
          a: "Jaipur has a 500+ year tradition of jewellery craftsmanship and is India's leading hub for kundan, meenakari, and imitation jewellery. Thousands of skilled artisans, a complete supply chain, and strong export infrastructure make Jaipur India's top imitation jewellery manufacturing city.",
        },
        {
          q: "What types of jewellery does Gemora Global manufacture in Jaipur?",
          a: "Gemora Global manufactures kundan, meenakari, temple, oxidised, antique, bridal, and fashion imitation jewellery in Jaipur. Over 500 designs across necklace sets, earrings, bangles, maang tikkas, and full bridal parures.",
        },
        {
          q: "What is the MOQ for wholesale jewellery from Jaipur?",
          a: "Minimum order quantity is 50 units per design. Mixed design orders require a minimum of 200 units total. First-time buyers are welcome to start with 50 units.",
        },
        {
          q: "Do you offer custom jewellery manufacturing in Jaipur?",
          a: "Yes, Gemora Global offers custom jewellery manufacturing for unique designs, private label, and exclusive collections. Custom orders require a minimum of 100 units and 15–20 business days production time.",
        },
        {
          q: "What quality standards does Gemora Global follow?",
          a: "Every piece undergoes 3-stage quality control: raw material inspection, in-process checks (stone setting, plating), and final inspection before packaging. We use multi-layer anti-tarnish coating on all pieces.",
        },
        {
          q: "Which countries does Gemora Global export to from Jaipur?",
          a: "We export to 15+ countries including USA, UK, UAE, France, Germany, Canada, Australia, and Singapore via DHL, FedEx, and air freight.",
        },
        {
          q: "How do I get a wholesale price list from Gemora Global Jaipur?",
          a: "Contact us via WhatsApp at +91 7976341419 or fill our inquiry form. We'll share our wholesale catalogue with current pricing within 24 hours.",
        },
        {
          q: "How long does production and delivery take for Jaipur wholesale orders?",
          a: "Standard wholesale orders are completed in 7–15 business days. International delivery adds 3–7 days via DHL or FedEx from our Jaipur facility.",
        },
      ]}
    />
  );
}
