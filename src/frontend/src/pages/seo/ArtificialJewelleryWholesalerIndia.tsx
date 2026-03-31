import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

export default function ArtificialJewelleryWholesalerIndia() {
  return (
    <SeoLandingPage
      title="Artificial Jewellery Wholesaler India | Bulk Fashion Jewellery Supplier | Gemora Global"
      metaDescription="Top artificial jewellery wholesaler in India. Bulk imitation necklaces, earrings & sets at factory prices. Low MOQ, pan-India supply & global export."
      canonical="https://gemoraglobal-tje.caffeine.xyz/artificial-jewellery-wholesaler-india"
      h1="Artificial Jewellery Wholesaler in India — Bulk Supplier at Factory Prices"
      targetKeyword="artificial jewellery wholesaler india"
      heroSubtitle="Gemora Global is one of India's most trusted artificial jewellery wholesalers, supplying boutiques, retailers, and distributors across India and globally. Direct factory pricing, 500+ designs, anti-tarnish finish."
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            India's Artificial Jewellery Wholesale Market
          </h2>
          <p>
            India's artificial jewellery wholesale market is one of the most
            dynamic in the world. Major wholesale hubs include Jaipur's Johari
            Bazaar, Mumbai's Dharavi and Andheri markets, and Kolkata's
            Burrabazar. Among these, Jaipur manufacturers are recognized
            globally for quality, design authenticity, and reliable export
            capabilities.
          </p>
          <p>
            As an artificial jewellery wholesaler in India, Gemora Global serves
            a diverse buyer base: boutique owners, fashion retailers, online
            marketplace sellers, export houses, and institutional buyers. Our
            wholesale model offers factory-direct pricing with no minimum agent
            markups.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Our Wholesale Product Range
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Gold-plated necklace sets and chokers</li>
            <li>Earrings — jhumkas, studs, hoops, chandbalis, drops</li>
            <li>Bangles and bracelets in all styles</li>
            <li>Rings — statement, stackable, cocktail rings</li>
            <li>
              <Link
                to="/bridal-imitation-jewellery"
                className="text-primary underline"
              >
                Bridal jewellery sets
              </Link>{" "}
              for boutiques
            </li>
            <li>
              <Link
                to="/kundan-jewellery-wholesale"
                className="text-primary underline"
              >
                Kundan jewellery
              </Link>{" "}
              — traditional and contemporary
            </li>
            <li>
              <Link
                to="/oxidised-jewellery-wholesale"
                className="text-primary underline"
              >
                Oxidised jewellery
              </Link>{" "}
              — boho-ethnic styles
            </li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Wholesale Pricing & Terms
          </h2>
          <p>Our wholesale pricing is transparent and factory-direct:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>MOQ: 50 units per design</li>
            <li>Payment: 30% advance, balance before dispatch</li>
            <li>Lead time: 7–15 business days</li>
            <li>
              Shipping: Pan-India via professional courier; international via
              DHL/FedEx
            </li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Who Buys Wholesale Jewellery from Gemora Global?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Boutique owners across India and internationally</li>
            <li>Online sellers on Amazon, Flipkart, Etsy, and Instagram</li>
            <li>Export houses buying for resale in foreign markets</li>
            <li>Fashion retailers adding jewellery to their accessory range</li>
            <li>
              Event management companies for wedding and corporate gifting
            </li>
          </ul>
          <p className="mt-4">
            For international buyers, visit our{" "}
            <Link
              to="/imitation-jewellery-exporter-india"
              className="text-primary underline"
            >
              imitation jewellery exporter India
            </Link>{" "}
            page. For custom manufacturing, see our{" "}
            <Link
              to="/custom-jewellery-manufacturer"
              className="text-primary underline"
            >
              custom jewellery manufacturer
            </Link>{" "}
            page.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Long-Tail Buyer Needs We Address
          </h2>
          <p>We specifically cater to:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              Low MOQ jewellery supplier India — boutiques needing small trial
              orders
            </li>
            <li>
              Anti-tarnish jewellery wholesale India — buyers who need
              long-lasting pieces
            </li>
            <li>Bulk jewellery for resellers — high-volume distributors</li>
            <li>
              Jewellery supplier for boutiques — curated seasonal collections
            </li>
            <li>Trendy jewellery wholesale 2026 — latest fashion designs</li>
          </ul>
        </>
      }
      faqs={[
        {
          q: "What is the difference between a jewellery wholesaler and manufacturer?",
          a: "A manufacturer produces jewellery directly; a wholesaler buys in bulk and resells. Gemora Global is both — we manufacture our own jewellery and sell directly to retailers and exporters, giving you manufacturer prices.",
        },
        {
          q: "Can I buy artificial jewellery wholesale in India for online resale?",
          a: "Yes, many of our buyers are online sellers on Amazon, Flipkart, Etsy, and Instagram. Our wholesale pricing offers excellent margins for online retail.",
        },
        {
          q: "Do you supply anti-tarnish jewellery wholesale in India?",
          a: "Yes, all our jewellery is finished with multi-layer anti-tarnish coating, making it ideal for retail and boutique use where longevity is important.",
        },
        {
          q: "What is the minimum order for wholesale jewellery in India?",
          a: "Our minimum order is 50 units per design. For mixed assortments, 200 units total is the minimum shipment size.",
        },
        {
          q: "Do you do pan-India delivery?",
          a: "Yes, we ship pan-India via professional courier services. Typical delivery within India is 3–5 business days after dispatch.",
        },
      ]}
    />
  );
}
