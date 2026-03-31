import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

export default function BridalImitationJewellery() {
  return (
    <SeoLandingPage
      title="Bridal Imitation Jewellery Wholesale India | Bridal Sets Supplier | Gemora Global"
      metaDescription="Premium bridal imitation jewellery wholesale from India. Complete bridal sets in kundan, polki, temple & oxidised styles. Low MOQ, global export."
      canonical="https://gemoraglobal-tje.caffeine.xyz/bridal-imitation-jewellery"
      h1="Bridal Imitation Jewellery Wholesale — Premium Bridal Sets from India"
      targetKeyword="bridal imitation jewellery"
      heroSubtitle="Gemora Global is India's leading bridal imitation jewellery wholesale supplier. Complete bridal sets in kundan, polki, temple, and oxidised styles. MOQ-friendly pricing for boutiques and international buyers."
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            Why Bridal Imitation Jewellery is a Booming Market
          </h2>
          <p>
            The bridal jewellery market is one of the most profitable segments
            in fashion accessories worldwide. Modern brides increasingly prefer
            high-quality imitation jewellery over real gold for several reasons:
            lower theft risk during events, ability to own multiple sets, and
            significantly lower investment with equally stunning visual impact.
          </p>
          <p>
            Bridal imitation jewellery wholesale from India offers retailers and
            boutiques exceptional profit margins. A set that retails for ₹3,000–
            ₹8,000 in local markets can be sourced wholesale from manufacturers
            like Gemora Global at a fraction of the price, leaving retailers
            with 60–70% gross margins.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Our Bridal Imitation Jewellery Range
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              Kundan bridal sets — full parure with necklace, earrings, maang
              tikka, bangles, rings
            </li>
            <li>
              Polki bridal jewellery — uncut stone designs in royal Mughal style
            </li>
            <li>
              <Link
                to="/temple-jewellery-manufacturer"
                className="text-primary underline"
              >
                Temple bridal jewellery
              </Link>{" "}
              — South Indian gold-finish divine motif sets
            </li>
            <li>
              Meenakari bridal jewellery — colorful enamel work in traditional
              Jaipur style
            </li>
            <li>
              Oxidised bridal jewellery — antique silver-finish bohemian bridal
              sets
            </li>
            <li>Indo-Western bridal sets — fusion designs for modern brides</li>
            <li>
              Minimal bridal jewellery — understated elegance for court/civil
              ceremonies
            </li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Bridal Jewellery Wholesale Pricing Guide
          </h2>
          <p>
            Our bridal imitation jewellery wholesale pricing depends on design
            complexity, stone type, and gold plating thickness:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Basic bridal set (necklace + earrings): ₹400–₹800 wholesale</li>
            <li>Full bridal parure (5-piece set): ₹1,200–₹3,000 wholesale</li>
            <li>Premium kundan/polki bridal set: ₹2,500–₹6,000 wholesale</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            International Bridal Jewellery Market
          </h2>
          <p>
            Indian bridal imitation jewellery is in high demand globally,
            especially in countries with large South Asian diaspora communities.
            Our{" "}
            <Link
              to="/imitation-jewellery-supplier-usa"
              className="text-primary underline"
            >
              USA jewellery supply
            </Link>{" "}
            and{" "}
            <Link
              to="/jewellery-supplier-uk"
              className="text-primary underline"
            >
              UK jewellery export
            </Link>{" "}
            operations serve hundreds of bridal boutiques and online sellers.
          </p>
          <p>
            UAE (Dubai) is another key market where Indian bridal jewellery
            wholesale demand is extremely high. Visit our{" "}
            <Link
              to="/jewellery-exporter-uae"
              className="text-primary underline"
            >
              UAE jewellery exporter
            </Link>{" "}
            page for Dubai-specific information.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Why Choose Gemora Global for Bridal Jewellery?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              Direct manufacturer — largest bridal collection from one source
            </li>
            <li>
              Seasonal bridal collection updates (50+ new designs per season)
            </li>
            <li>Custom bridal set manufacturing available</li>
            <li>
              Luxury packaging in velvet-lined boxes for retail presentation
            </li>
            <li>Anti-tarnish finish ensures long-lasting brilliance</li>
            <li>MOQ from 50 units — perfect for boutique bridal sections</li>
          </ul>
        </>
      }
      faqs={[
        {
          q: "What styles of bridal imitation jewellery do you supply wholesale?",
          a: "We supply kundan, polki, temple, meenakari, oxidised, Indo-Western, and minimal bridal jewellery sets wholesale. Each style is available in gold, silver, and rose-gold finishes.",
        },
        {
          q: "What is the MOQ for bridal jewellery wholesale?",
          a: "Our bridal jewellery wholesale MOQ is 50 units per design. For mixed assortments of bridal sets, we require a minimum of 200 units total.",
        },
        {
          q: "Do you offer custom bridal jewellery manufacturing?",
          a: "Yes, we offer custom bridal set manufacturing for exclusive designs, specific stone combinations, or branded collections. Minimum 100 units for custom orders.",
        },
        {
          q: "Can I order bridal jewellery wholesale for international shipping?",
          a: "Yes, we export bridal imitation jewellery to USA, UK, UAE, Canada, Australia, and 15+ other countries with complete documentation and insurance.",
        },
        {
          q: "What packaging do bridal jewellery wholesale orders come in?",
          a: "Bridal jewellery orders are packed in velvet-lined gift boxes with foam inserts for secure presentation. We also offer custom branded packaging for boutiques at additional cost.",
        },
      ]}
    />
  );
}
