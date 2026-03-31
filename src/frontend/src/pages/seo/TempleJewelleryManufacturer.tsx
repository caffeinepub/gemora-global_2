import { Link } from "react-router-dom";
import SeoLandingPage from "../../components/SeoLandingPage";

export default function TempleJewelleryManufacturer() {
  return (
    <SeoLandingPage
      title="Temple Jewellery Manufacturer India | Wholesale Temple Sets | Gemora Global"
      metaDescription="Leading temple jewellery manufacturer in India. Wholesale temple necklaces, earrings & bridal sets in gold finish. Bulk supply with worldwide export."
      canonical="https://gemoraglobal-tje.caffeine.xyz/temple-jewellery-manufacturer"
      h1="Temple Jewellery Manufacturer in India — Wholesale Supplier for Global Buyers"
      targetKeyword="temple jewellery manufacturer"
      heroSubtitle="Gemora Global manufactures and exports authentic temple jewellery in bulk to wholesalers, boutiques, and distributors worldwide. Gold-finish temple sets with intricate deity motifs — factory-direct pricing from Jaipur, India."
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            About Temple Jewellery Manufacturing in India
          </h2>
          <p>
            Temple jewellery is one of India's oldest and most revered jewellery
            traditions, originating from the temples of South India —
            particularly Tamil Nadu and Andhra Pradesh. Characterized by divine
            motifs such as Lakshmi, Ganesha, peacocks, and lotus flowers, temple
            jewellery has evolved into a mainstream fashion category sought by
            brides, classical dancers, and fashion enthusiasts worldwide.
          </p>
          <p>
            As a dedicated temple jewellery manufacturer, Gemora Global produces
            these pieces in Jaipur using traditional casting, engraving, and
            gold-plating techniques. Our manufacturing unit employs artisans
            with deep expertise in South Indian jewellery motifs, ensuring
            authentic and detailed designs that meet international quality
            standards.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Temple Jewellery Wholesale Product Range
          </h2>
          <p>Our temple jewellery wholesale catalogue includes:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Temple necklace sets with Lakshmi and Ganesha pendants</li>
            <li>Jhumka earrings with temple coin designs</li>
            <li>Maang tikkas with deity motifs</li>
            <li>
              Complete bridal temple jewellery sets (necklace + earrings + maang
              tikka + bangles)
            </li>
            <li>Kemp stone temple jewellery in red and green</li>
            <li>Peacock design temple earrings and necklaces</li>
            <li>Dance jewellery sets for Bharatanatyam and Kuchipudi</li>
          </ul>
          <h2 className="text-xl font-serif font-bold text-primary">
            Why Source Temple Jewellery from Gemora Global?
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Direct manufacturer — no middlemen, lowest factory price</li>
            <li>Authentic temple motifs crafted by specialist artisans</li>
            <li>Gold-plated and antique gold finish available</li>
            <li>Anti-tarnish coating for extended product life</li>
            <li>MOQ from 50 units — accessible for boutiques</li>
            <li>Global export to USA, UK, UAE, Canada, Australia</li>
          </ul>
          <p className="mt-4">
            Temple jewellery is particularly popular with South Asian diaspora
            communities in the USA, UK, and UAE, as well as classical dance
            schools and cultural organizations globally. Our{" "}
            <Link
              to="/jewellery-exporter-to-usa"
              className="text-primary underline"
            >
              USA jewellery export
            </Link>{" "}
            and{" "}
            <Link
              to="/jewellery-supplier-uk"
              className="text-primary underline"
            >
              UK jewellery supply
            </Link>{" "}
            operations are well-established for these markets.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Temple Jewellery for Bridal & Dance Markets
          </h2>
          <p>
            Bridal temple jewellery is one of our highest-demand categories.
            Brides choosing South Indian or fusion bridal looks consistently opt
            for gold-finish temple sets. Visit our{" "}
            <Link
              to="/bridal-jewellery-wholesale"
              className="text-primary underline"
            >
              bridal jewellery wholesale
            </Link>{" "}
            page for complete bridal sets including temple jewellery options.
          </p>
          <p>
            Classical dance schools and cultural academies purchase temple dance
            jewellery in bulk for their students and performance groups. We
            offer special institutional pricing for bulk dance jewellery orders.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Temple Jewellery Export Pricing & MOQ
          </h2>
          <p>
            Our temple jewellery wholesale pricing depends on design complexity,
            stone work, and gold plating thickness. Basic temple earrings start
            from ₹150/piece in bulk. Complete bridal temple sets are priced from
            ₹800–₹2500 per set depending on design. Contact us for a detailed
            price list with your specific requirements.
          </p>
        </>
      }
      faqs={[
        {
          q: "What is temple jewellery?",
          a: "Temple jewellery is a traditional Indian jewellery style featuring divine motifs like Lakshmi, Ganesha, and peacocks in gold or gold-plated finish. It originated in South Indian temples and is widely used for bridal wear and classical dance.",
        },
        {
          q: "What is the MOQ for temple jewellery wholesale?",
          a: "Our minimum order quantity for temple jewellery wholesale is 50 units per design. Smaller trial orders can be arranged for first-time buyers.",
        },
        {
          q: "Do you make kemp stone temple jewellery?",
          a: "Yes, we manufacture kemp stone temple jewellery in traditional red and green kemp stones, as well as other semi-precious stone variants popular in South Indian jewellery traditions.",
        },
        {
          q: "Can I get custom temple jewellery designs made?",
          a: "Yes, we offer custom temple jewellery manufacturing for unique motifs, specific sizes, or exclusive designs. Custom orders typically require 15–20 business days and a minimum of 100 units.",
        },
        {
          q: "Do you export temple jewellery internationally?",
          a: "Yes, we export temple jewellery to the USA, UK, UAE, Canada, Australia, and many other countries. We handle all export documentation and ship via DHL, FedEx, and air freight.",
        },
      ]}
    />
  );
}
