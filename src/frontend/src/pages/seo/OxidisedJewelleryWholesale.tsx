import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

export default function OxidisedJewelleryWholesale() {
  return (
    <SeoLandingPage
      title="Oxidised Jewellery Wholesale Supplier India | Antique Silver Jewellery | Gemora Global"
      metaDescription="Premium oxidised jewellery wholesale from India. Antique silver-finish necklaces, earrings & bracelets in bulk. Low MOQ, worldwide export from Jaipur."
      canonical="https://gemoraglobal-tje.caffeine.xyz/oxidised-jewellery-wholesale"
      h1="Oxidised Jewellery Wholesale Supplier — Antique Silver Finish Jewellery from India"
      targetKeyword="oxidised jewellery wholesale"
      heroSubtitle="Gemora Global is a leading oxidised jewellery wholesale supplier from Jaipur, India. Antique silver-finish earrings, necklaces, bracelets, rings and sets for boutiques and international buyers. MOQ from 50 units."
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            What is Oxidised Jewellery?
          </h2>
          <p>
            Oxidised jewellery features a distinctive antique silver-black
            finish created by treating silver or silver-plated metal with
            chemicals to create a darkened, aged appearance. This rustic,
            boho-ethnic aesthetic has made oxidised jewellery one of the most
            popular categories in global fashion markets, appealing to buyers
            who prefer earthy, artisanal styles over shiny gold-finish pieces.
          </p>
          <p>
            Jaipur, where Gemora Global is based, has a centuries-old tradition
            of oxidised silver jewellery making. Our artisans combine
            traditional techniques with modern designs to create oxidised
            jewellery wholesale collections that sell strongly in both domestic
            and international markets.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Our Oxidised Jewellery Wholesale Range
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Oxidised earrings — jhumkas, chandbalis, hoops, drops</li>
            <li>Oxidised necklace sets with matching earrings</li>
            <li>Oxidised bangles and bracelets</li>
            <li>Oxidised rings — statement and stackable styles</li>
            <li>Tribal and ethnic oxidised jewellery sets</li>
            <li>Oxidised maang tikkas and haath phools</li>
            <li>Bohemian oxidised layered necklaces</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Why Oxidised Jewellery is a High-Profit Category
          </h2>
          <p>
            Oxidised jewellery appeals to a younger, fashion-forward demographic
            that shops extensively on Instagram, Pinterest, and fashion
            marketplaces. This makes it an excellent category for online sellers
            and boutiques targeting the boho, ethnic, and indie fashion
            segments.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Growing demand among 18–35 age demographic globally</li>
            <li>High visual impact for social media and product photography</li>
            <li>Pairs well with both Indian ethnic and Western casual wear</li>
            <li>Lower price point makes impulse buying easy for consumers</li>
          </ul>
          <p className="mt-4">
            See also our{" "}
            <Link
              to="/oxidised-jewellery-supplier"
              className="text-primary underline"
            >
              dedicated oxidised jewellery supplier
            </Link>{" "}
            page for more details on our supply capabilities.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Oxidised Jewellery Wholesale Pricing
          </h2>
          <p>
            Oxidised jewellery wholesale pricing from Gemora Global is highly
            competitive due to our direct manufacturing model:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Oxidised earrings: ₹60–₹200 per piece wholesale</li>
            <li>Oxidised necklace sets: ₹200–₹600 wholesale</li>
            <li>Complete oxidised sets: ₹400–₹1,200 wholesale</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            International Oxidised Jewellery Export
          </h2>
          <p>
            Oxidised jewellery is in strong demand internationally. Our{" "}
            <Link
              to="/jewellery-supplier-uk"
              className="text-primary underline"
            >
              UK jewellery buyers
            </Link>
            ,{" "}
            <Link
              to="/imitation-jewellery-supplier-usa"
              className="text-primary underline"
            >
              USA retailers
            </Link>
            , and{" "}
            <Link
              to="/jewellery-exporter-uae"
              className="text-primary underline"
            >
              UAE distributors
            </Link>{" "}
            consistently rank oxidised jewellery among their top-selling
            categories.
          </p>
        </>
      }
      faqs={[
        {
          q: "What is oxidised jewellery made of?",
          a: "Oxidised jewellery is made from brass or copper base metal coated with silver plating, then treated with chemicals to create a darkened antique finish. The resulting black-silver appearance is what gives it the distinctive oxidised look.",
        },
        {
          q: "Is oxidised jewellery durable?",
          a: "Yes, quality oxidised jewellery is durable when properly finished. Our pieces use multi-layer plating and protective coating to prevent excessive tarnishing beyond the intended antique finish.",
        },
        {
          q: "What is the MOQ for oxidised jewellery wholesale?",
          a: "Our oxidised jewellery wholesale MOQ is 50 units per design. Mixed assortments of different oxidised designs require a minimum of 200 units total.",
        },
        {
          q: "Do you export oxidised jewellery to Western countries?",
          a: "Yes, we regularly export oxidised jewellery to UK, USA, Germany, France, Australia, and Canada. The bohemian and ethnic fashion segments in these markets have strong demand for quality oxidised pieces.",
        },
        {
          q: "Can I get custom oxidised jewellery designs?",
          a: "Yes, we offer custom oxidised jewellery manufacturing for exclusive designs. Custom orders require a minimum of 100 units and 15–20 business days for production.",
        },
      ]}
    />
  );
}
