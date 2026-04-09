import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can UK boutiques buy wholesale jewellery from India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Contact Gemora Global via WhatsApp or our inquiry form. Share your requirements, review our wholesale catalogue, confirm your order (MOQ 50 units), and we ship directly to your UK address via DHL Express with all HMRC-compliant documentation.",
        },
      },
      {
        "@type": "Question",
        name: "What are UK import duties for wholesale jewellery from India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Imitation jewellery (HS Code 7117) imported into the UK from India is currently subject to standard UK Global Tariff rates. We provide all required documentation for HMRC customs clearance. Consult a UK customs broker for current rates.",
        },
      },
      {
        "@type": "Question",
        name: "How long does DHL shipping take from India to the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DHL Express from India to UK typically takes 3–5 business days door-to-door. FedEx International Priority takes 3–4 business days. Delivery is to any UK postcode.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum order for wholesale jewellery to the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our MOQ is 50 units per design. For mixed orders with multiple designs, the minimum total is 200 units. UK boutiques can start with a trial order of 50 units.",
        },
      },
      {
        "@type": "Question",
        name: "Do you price UK orders in GBP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we can provide GBP-denominated price lists for UK wholesale buyers. Contact us via WhatsApp (+91 7976341419) for our current UK wholesale catalogue and pricing.",
        },
      },
      {
        "@type": "Question",
        name: "What jewellery styles are most popular in the UK market?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UK South Asian diaspora boutiques have strong demand for kundan bridal sets, temple jewellery, and meenakari pieces. UK mainstream boutiques favour oxidised boho jewellery, minimal gold jewellery, and contemporary statement pieces.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get exclusive designs for my UK boutique?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer private label and exclusive design manufacturing for UK boutiques. Custom orders require a minimum of 100 units and 15–20 business days production time.",
        },
      },
      {
        "@type": "Question",
        name: "Is anti-tarnish coating available on all pieces?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All Gemora Global pieces ship with our multi-layer anti-tarnish coating applied, significantly extending the wearable and display life of the jewellery.",
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
        name: "Wholesale Jewellery UK",
        item: "https://gemoraglobal-tje.caffeine.xyz/wholesale-jewellery-uk",
      },
    ],
  },
];

export default function WholesaleJewelleryUK() {
  return (
    <SeoLandingPage
      title="Wholesale Jewellery UK | Indian Imitation Jewellery Supplier"
      metaDescription="Wholesale jewellery supplier for UK boutiques. Indian imitation jewellery shipped to UK via DHL. MOQ 50 units, HMRC documentation, competitive GBP pricing."
      canonical="https://gemoraglobal-tje.caffeine.xyz/wholesale-jewellery-uk"
      h1="Wholesale Jewellery UK — Indian Imitation Jewellery Supplier"
      targetKeyword="wholesale jewellery UK"
      heroSubtitle="Gemora Global is India's trusted wholesale jewellery supplier for the UK market. Authentic Indian imitation jewellery shipped directly to UK boutiques and distributors via DHL Express. Factory-direct pricing, MOQ from 50 units, HMRC-compliant documentation."
      schema={schema}
      hreflangs={[
        {
          lang: "en",
          url: "https://gemoraglobal-tje.caffeine.xyz/wholesale-jewellery-uk",
        },
        {
          lang: "en-GB",
          url: "https://gemoraglobal-tje.caffeine.xyz/wholesale-jewellery-uk",
        },
        {
          lang: "en-US",
          url: "https://gemoraglobal-tje.caffeine.xyz/imitation-jewellery-supplier-usa",
        },
        {
          lang: "en-AE",
          url: "https://gemoraglobal-tje.caffeine.xyz/jewellery-exporter-uae",
        },
        {
          lang: "x-default",
          url: "https://gemoraglobal-tje.caffeine.xyz/wholesale-jewellery-uk",
        },
      ]}
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            Why UK Buyers Source Wholesale Jewellery from India
          </h2>
          <p>
            The United Kingdom has one of the world's largest and most affluent
            South Asian diaspora communities, creating consistent year-round
            demand for authentic Indian jewellery — particularly bridal,
            festive, and occasion-wear styles. UK boutiques, wedding retailers,
            and online sellers consistently source wholesale jewellery from
            Indian manufacturers for several compelling reasons:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              Factory-direct pricing 35–55% lower than UK wholesale equivalents
            </li>
            <li>
              Authentic Indian designs — kundan, meenakari, temple, oxidised —
              unavailable from UK-based wholesalers
            </li>
            <li>
              High-quality craftsmanship with anti-tarnish finish suitable for
              boutique retail
            </li>
            <li>
              500+ seasonal designs updated twice a year for fresh collections
            </li>
            <li>Fast 3–5 day DHL delivery from Jaipur to any UK postcode</li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-primary">
            Popular Wholesale Jewellery Categories for UK Buyers
          </h2>
          <p>Our most popular wholesale categories for UK buyers include:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <Link
                to="/kundan-jewellery-wholesale"
                className="text-primary underline"
              >
                Kundan jewellery wholesale
              </Link>{" "}
              — traditional Jaipur stone-set pieces for UK South Asian bridal
              boutiques
            </li>
            <li>
              <Link
                to="/bridal-jewellery-wholesale"
                className="text-primary underline"
              >
                Bridal jewellery sets
              </Link>{" "}
              — complete parures for UK wedding season (April–June,
              October–November)
            </li>
            <li>
              <Link
                to="/meenakari-jewellery-wholesale"
                className="text-primary underline"
              >
                Meenakari jewellery
              </Link>{" "}
              — vibrant Jaipur enamel work, popular in multicultural UK
              boutiques
            </li>
            <li>
              <Link
                to="/oxidised-jewellery-wholesale"
                className="text-primary underline"
              >
                Oxidised boho jewellery
              </Link>{" "}
              — strong demand in UK indie boutiques and online fashion retail
            </li>
            <li>
              <Link
                to="/temple-jewellery-manufacturer"
                className="text-primary underline"
              >
                Temple jewellery
              </Link>{" "}
              — for South Asian cultural events, classical dance schools in the
              UK
            </li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-primary">
            UK Shipping — Fast DHL Delivery from Jaipur
          </h2>
          <p>We ship all wholesale jewellery orders to UK buyers via:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>DHL Express Worldwide:</strong> 3–5 business days
              door-to-door to any UK postcode
            </li>
            <li>
              <strong>FedEx International Priority:</strong> 3–4 business days
              to UK mainland
            </li>
            <li>
              <strong>Air freight (large orders):</strong> 5–7 business days for
              100kg+ shipments
            </li>
          </ul>
          <p>
            All UK shipments include HMRC-compliant commercial invoice, packing
            list, certificate of origin, and HS code 7117 classification for
            smooth customs clearance at Heathrow or your nearest UK port of
            entry. Typical shipping cost for standard wholesale orders (under
            10kg) via DHL is £25–£65.
          </p>

          <h2 className="text-xl font-serif font-bold text-primary">
            UK Import Customs &amp; Duties
          </h2>
          <p>
            Since Brexit, the UK operates its own Global Tariff schedule (UK
            GT). Imitation jewellery (HS Code 7117) imported from India into the
            UK is subject to current UK GT rates. We provide complete customs
            documentation and can work with your UK customs broker to facilitate
            smooth clearance. Consult HMRC or a licensed customs broker for the
            current applicable duty rates.
          </p>

          <h2 className="text-xl font-serif font-bold text-primary">
            Wholesale Pricing in GBP for UK Buyers
          </h2>
          <p>
            We can provide GBP-denominated price lists for UK wholesale buyers:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Basic earrings: £1.20–£3.50 GBP per piece wholesale</li>
            <li>Necklace sets: £4–£12 GBP per set wholesale</li>
            <li>Complete bridal parures: £18–£65 GBP per set wholesale</li>
            <li>Meenakari necklace sets: £5–£18 GBP per set wholesale</li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-primary">
            About Gemora Global — Jaipur, Rajasthan
          </h2>
          <p>
            Based in Jaipur, India's jewellery capital, Gemora Global is a
            factory-direct imitation jewellery manufacturer and exporter serving
            wholesale buyers in the UK and 15+ other countries. We have
            established strong logistics partnerships and a proven export track
            record that UK buyers can rely on.
          </p>
          <p>
            Contact us via WhatsApp at{" "}
            <a
              href="https://wa.me/917976341419"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 7976341419
            </a>{" "}
            for our UK wholesale catalogue and GBP pricing. Also see our{" "}
            <Link
              to="/imitation-jewellery-manufacturer-jaipur"
              className="text-primary underline"
            >
              Jaipur jewellery manufacturer
            </Link>{" "}
            and{" "}
            <Link
              to="/wholesale-jewellery-rajasthan"
              className="text-primary underline"
            >
              wholesale jewellery Rajasthan
            </Link>{" "}
            pages.
          </p>
        </>
      }
      faqs={[
        {
          q: "How can UK boutiques buy wholesale jewellery from India?",
          a: "Contact Gemora Global via WhatsApp or our inquiry form. Share your requirements, review our wholesale catalogue, confirm your order (MOQ 50 units), and we ship directly to your UK address via DHL Express with all HMRC-compliant documentation.",
        },
        {
          q: "What are UK import duties for wholesale jewellery from India?",
          a: "Imitation jewellery (HS Code 7117) from India is subject to UK Global Tariff rates. We provide all required documentation for HMRC customs clearance. Consult a UK customs broker for current rates.",
        },
        {
          q: "How long does DHL shipping take from India to the UK?",
          a: "DHL Express from India to UK typically takes 3–5 business days door-to-door. FedEx International Priority takes 3–4 business days. Delivery is to any UK postcode.",
        },
        {
          q: "What is the minimum order for wholesale jewellery to the UK?",
          a: "Our MOQ is 50 units per design. For mixed orders with multiple designs, the minimum total is 200 units. UK boutiques can start with a trial order of 50 units.",
        },
        {
          q: "Do you price UK orders in GBP?",
          a: "Yes, we provide GBP-denominated price lists for UK wholesale buyers. Contact us via WhatsApp (+91 7976341419) for our current UK wholesale catalogue and GBP pricing.",
        },
        {
          q: "What jewellery styles are most popular in the UK market?",
          a: "UK South Asian diaspora boutiques favour kundan bridal sets, temple jewellery, and meenakari pieces. UK mainstream boutiques prefer oxidised boho jewellery and contemporary statement pieces.",
        },
        {
          q: "Can I get exclusive designs for my UK boutique?",
          a: "Yes. We offer private label and exclusive design manufacturing for UK boutiques. Custom orders require a minimum of 100 units and 15–20 business days production time.",
        },
        {
          q: "Is anti-tarnish coating available on all pieces?",
          a: "Yes. All Gemora Global pieces ship with our multi-layer anti-tarnish coating applied, significantly extending the wearable and display life of the jewellery.",
        },
      ]}
    />
  );
}
