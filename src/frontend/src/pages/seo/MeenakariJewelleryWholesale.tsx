import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Meenakari Jewellery Wholesale",
    description:
      "Wholesale meenakari jewellery manufactured in Jaipur, India. Authentic enamel work necklaces, earrings, and bridal sets. B2B export to 15+ countries.",
    brand: {
      "@type": "Brand",
      name: "Gemora Global",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Gemora Global",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
      },
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "60",
      highPrice: "3000",
      offerCount: "500",
    },
    category: "Imitation Jewellery",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is meenakari jewellery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Meenakari is a traditional Indian jewellery-making art form originating from Jaipur, Rajasthan. It involves applying vibrant enamel (meen) colours to metal surfaces using heat, creating intricate patterns in red, green, blue, and other hues. Jaipur meenakari is unique because it uses gold as the base metal.",
        },
      },
      {
        "@type": "Question",
        name: "Why is Jaipur famous for meenakari jewellery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jaipur's meenakari tradition dates back over 400 years to the reign of Raja Man Singh I. The city's artisans developed a unique double-sided meenakari technique and a distinctive palette of Jaipur colours. Today Jaipur is India's leading meenakari jewellery hub.",
        },
      },
      {
        "@type": "Question",
        name: "What is the MOQ for meenakari jewellery wholesale?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our meenakari jewellery wholesale MOQ is 50 units per design. Mixed design orders require a minimum of 200 units total.",
        },
      },
      {
        "@type": "Question",
        name: "What colours are available in meenakari jewellery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Traditional Jaipur meenakari uses red, green, blue, white, and yellow enamel. We offer the full traditional palette plus contemporary colour combinations. Custom colour combinations available for orders of 100+ units.",
        },
      },
      {
        "@type": "Question",
        name: "Do you export meenakari jewellery internationally?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Gemora Global exports meenakari jewellery wholesale to the USA, UK, UAE, Canada, Australia, France, and other countries via DHL and FedEx with complete export documentation.",
        },
      },
      {
        "@type": "Question",
        name: "Is meenakari jewellery suitable for international retail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Meenakari's vibrant colours and intricate designs are popular in global fashion markets. Our anti-tarnish finish and export-grade packaging ensure the jewellery arrives in perfect retail condition.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get custom meenakari designs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Custom meenakari jewellery manufacturing is available for exclusive designs or private label collections. Custom orders require a minimum of 100 units and 15–20 business days production time.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between meenakari and kundan jewellery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kundan jewellery involves setting precious or semi-precious stones in gold foil frames. Meenakari involves applying vibrant enamel colours to metal surfaces. Both originate in Jaipur and are often combined in the same piece — kundan on the front, meenakari on the reverse.",
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
        name: "Meenakari Jewellery Wholesale",
        item: "https://gemoraglobal-tje.caffeine.xyz/meenakari-jewellery-wholesale",
      },
    ],
  },
];

export default function MeenakariJewelleryWholesale() {
  return (
    <SeoLandingPage
      title="Meenakari Jewellery Wholesale | Jaipur Manufacturer"
      metaDescription="Meenakari jewellery wholesale from Jaipur manufacturer. Authentic enamel necklaces, earrings & bridal sets. MOQ 50 units, global export. Factory-direct pricing."
      canonical="https://gemoraglobal-tje.caffeine.xyz/meenakari-jewellery-wholesale"
      h1="Meenakari Jewellery Wholesale — Jaipur Manufacturer & Exporter"
      targetKeyword="meenakari jewellery wholesale"
      heroSubtitle="Gemora Global is Jaipur's leading meenakari jewellery wholesale manufacturer and exporter. Authentic enamel-work meenakari necklaces, earrings, bangles, and bridal sets — factory-direct pricing with MOQ from 50 units and worldwide export."
      schema={schema}
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            What is Meenakari Jewellery?
          </h2>
          <p>
            Meenakari (also spelled Minakari) is one of India's most ancient and
            celebrated jewellery-making art forms, with its roots deeply
            embedded in Jaipur, Rajasthan. The word "meen" derives from the
            Persian word for fish and is associated with colour. Meenakari
            involves the application of vibrant enamel colours to gold or
            gold-plated metal surfaces through a meticulous heating process, in
            which the enamel fuses with the metal to create stunning, permanent
            patterns.
          </p>
          <p>
            Jaipur's meenakari tradition dates to the 16th century when Raja Man
            Singh I of Amber brought skilled Persian and Lahori artisans to the
            region. Over centuries, local artisans developed the distinctive
            Jaipur style — characterized by use of gold as the base metal,
            vibrant colour palettes including deep reds, forest greens, and
            cobalt blues, and intricate floral and peacock patterns. Jaipur
            meenakari is unique in its double-sided technique, where both faces
            of the jewellery are adorned.
          </p>

          <h2 className="text-xl font-serif font-bold text-primary">
            Our Meenakari Jewellery Wholesale Range
          </h2>
          <p>
            Gemora Global's meenakari jewellery wholesale catalogue covers a
            comprehensive range of pieces for every market segment:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Meenakari necklace sets</strong> — layered and
              single-strand necklaces with matching earrings in classic Jaipur
              colours
            </li>
            <li>
              <strong>Meenakari earrings</strong> — jhumkas, chandbalis,
              chandelier earrings with detailed enamel panels
            </li>
            <li>
              <strong>Meenakari bangles and kadas</strong> — traditional bangle
              sets in full meenakari finish
            </li>
            <li>
              <strong>Meenakari bridal sets</strong> — complete parures
              including necklace, earrings, maang tikka, and bangles
            </li>
            <li>
              <strong>Kundan-meenakari combination sets</strong> — kundan stone
              work on the front, meenakari enamel on the reverse
            </li>
            <li>
              <strong>Meenakari maang tikkas</strong> — traditional head
              ornaments with vibrant enamel work
            </li>
            <li>
              <strong>Contemporary meenakari</strong> — modern design
              interpretations for international fashion markets
            </li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-primary">
            Traditional Meenakari Colours & Designs
          </h2>
          <p>
            The colour palette of authentic Jaipur meenakari is distinctive and
            immediately recognizable:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Gulabi (Pink) meenakari</strong> — soft rose tones,
              popular for bridal jewellery
            </li>
            <li>
              <strong>Lal (Red) meenakari</strong> — classic deep red, the most
              traditional Jaipur meenakari colour
            </li>
            <li>
              <strong>Hara (Green) meenakari</strong> — emerald and forest
              green, often paired with red in traditional pieces
            </li>
            <li>
              <strong>Neela (Blue) meenakari</strong> — cobalt and turquoise
              blue tones, very popular in international markets
            </li>
            <li>
              <strong>Safed (White) meenakari</strong> — white enamel, used for
              delicate floral patterns
            </li>
            <li>
              <strong>Mixed palette meenakari</strong> — multi-colour pieces
              featuring the full Jaipur rainbow palette
            </li>
          </ul>
          <p className="mt-4">
            Traditional meenakari designs feature floral motifs (lotus, rose,
            mango), bird motifs (peacock, parrot), and geometric patterns
            inspired by Mughal architecture. Contemporary meenakari collections
            adapt these patterns into modern jewellery forms suitable for global
            fashion markets.
          </p>

          <h2 className="text-xl font-serif font-bold text-primary">
            Wholesale Pricing for Meenakari Jewellery
          </h2>
          <p>
            Our meenakari jewellery wholesale prices are highly competitive due
            to our factory-direct model and Jaipur manufacturing base:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Meenakari earrings: ₹80–₹350 per piece wholesale</li>
            <li>Meenakari necklace sets: ₹400–₹1,500 per set wholesale</li>
            <li>
              Meenakari bridal sets (full parure): ₹1,200–₹4,000 per set
              wholesale
            </li>
            <li>Meenakari bangles (per set of 4): ₹300–₹800 wholesale</li>
            <li>Kundan-meenakari combination sets: ₹600–₹2,500 wholesale</li>
          </ul>
          <p className="mt-4">
            Contact us on WhatsApp at{" "}
            <a
              href="https://wa.me/917976341419"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 7976341419
            </a>{" "}
            for our current meenakari wholesale catalogue with full pricing and
            design options.
          </p>

          <h2 className="text-xl font-serif font-bold text-primary">
            International Export of Meenakari Jewellery
          </h2>
          <p>
            Meenakari jewellery has strong global appeal due to its vibrant
            colours and authentic Indian craft story. Our key international
            markets include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <Link
                to="/imitation-jewellery-supplier-usa"
                className="text-primary underline"
              >
                USA
              </Link>{" "}
              — ethnic fashion boutiques, South Asian diaspora retailers, Indian
              grocery stores with jewellery sections
            </li>
            <li>
              <Link
                to="/wholesale-jewellery-uk"
                className="text-primary underline"
              >
                UK
              </Link>{" "}
              — South Asian wedding and fashion boutiques, multicultural fashion
              retailers
            </li>
            <li>
              UAE — festival and bridal jewellery market, Eid gifting segment
            </li>
            <li>
              Europe — Specialty ethnic jewellery boutiques, world craft
              retailers
            </li>
            <li>Canada, Australia — growing South Asian diaspora market</li>
          </ul>
          <p className="mt-4">
            We provide complete export documentation for all meenakari jewellery
            wholesale orders. See our{" "}
            <Link
              to="/imitation-jewellery-manufacturer-jaipur"
              className="text-primary underline"
            >
              Jaipur imitation jewellery manufacturer
            </Link>{" "}
            page for full export process details. Also explore our{" "}
            <Link
              to="/wholesale-jewellery-rajasthan"
              className="text-primary underline"
            >
              wholesale jewellery Rajasthan
            </Link>{" "}
            page for the complete regional jewellery range.
          </p>

          <h2 className="text-xl font-serif font-bold text-primary">
            People Also Ask — Meenakari Jewellery
          </h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-foreground">
                What is the difference between meenakari and kundan jewellery?
              </dt>
              <dd className="text-muted-foreground mt-1">
                Kundan jewellery involves setting precious or semi-precious
                stones in gold foil frames. Meenakari applies vibrant enamel
                colours to metal surfaces. Both originate in Jaipur and are
                often combined — kundan stone work on the front, meenakari
                enamel on the reverse of the same piece.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">
                How is meenakari jewellery made?
              </dt>
              <dd className="text-muted-foreground mt-1">
                Meenakari involves etching designs onto gold or gold-plated
                metal, filling the etched areas with powdered enamel colours,
                and firing the piece in a kiln at controlled temperatures. The
                process is repeated multiple times for each colour. After
                firing, the surface is polished to reveal the vibrant permanent
                enamel patterns.
              </dd>
            </div>
          </dl>
        </>
      }
      faqs={[
        {
          q: "What is meenakari jewellery?",
          a: "Meenakari is a traditional Indian jewellery art form from Jaipur, Rajasthan. It involves applying vibrant enamel colours to gold or gold-plated metal through a heating process, creating intricate permanent patterns in red, green, blue, and other hues.",
        },
        {
          q: "Why is Jaipur famous for meenakari jewellery?",
          a: "Jaipur's meenakari tradition dates back 400+ years to Raja Man Singh I. The city developed a unique double-sided meenakari technique and distinctive colour palette. Today Jaipur is India's leading meenakari jewellery manufacturing hub.",
        },
        {
          q: "What is the MOQ for meenakari jewellery wholesale?",
          a: "Our meenakari jewellery wholesale MOQ is 50 units per design. Mixed design orders require a minimum of 200 units total.",
        },
        {
          q: "What colours are available in meenakari jewellery?",
          a: "We offer the full traditional Jaipur palette: red, green, blue, white, pink, and yellow enamel, plus contemporary colour combinations. Custom colour combos available for orders of 100+ units.",
        },
        {
          q: "Do you export meenakari jewellery internationally?",
          a: "Yes. Gemora Global exports meenakari jewellery wholesale to the USA, UK, UAE, Canada, Australia, and Europe via DHL and FedEx with complete export documentation.",
        },
        {
          q: "Is meenakari jewellery suitable for international retail?",
          a: "Yes. Meenakari's vibrant colours and intricate designs are popular globally. Our anti-tarnish finish and export-grade packaging ensure the jewellery arrives in perfect retail condition.",
        },
        {
          q: "Can I get custom meenakari jewellery designs?",
          a: "Yes. Custom meenakari manufacturing is available for exclusive designs or private label. Orders require a minimum of 100 units and 15–20 business days production time.",
        },
        {
          q: "What is the difference between meenakari and kundan jewellery?",
          a: "Kundan sets precious stones in gold foil frames. Meenakari applies vibrant enamel colours to metal surfaces. Both originate in Jaipur and are often combined in the same piece — kundan on the front, meenakari on the reverse.",
        },
      ]}
    />
  );
}
