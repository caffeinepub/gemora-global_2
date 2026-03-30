import SeoLandingPage from "../../components/SeoLandingPage";

export default function CustomJewelleryManufacturer() {
  return (
    <SeoLandingPage
      title="Custom Jewellery Manufacturer India | Private Label Jewellery | Gemora Global"
      metaDescription="Custom imitation jewellery manufacturer in India. Private label, OEM, exclusive designs for brands worldwide. MOQ 500 units, 3-4 weeks lead time."
      canonical="https://gemoraglobal-tje.caffeine.xyz/custom-jewellery-manufacturer"
      h1="Custom Jewellery Manufacturer India — Private Label & OEM Designs"
      targetKeyword="custom imitation jewellery manufacturer"
      heroSubtitle="Build your exclusive jewellery collection with Gemora Global's custom manufacturing service. Private label, OEM designs, and branded packaging — MOQ 500 units, 3–4 weeks lead time."
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            Custom Imitation Jewellery Manufacturing in India
          </h2>
          <p>
            Gemora Global offers a comprehensive custom jewellery manufacturing
            service for brands, retailers, and wholesalers who want exclusive
            designs that are not available to other buyers. As a leading custom
            imitation jewellery manufacturer in India, we work with clients from
            brief through to finished product — delivering OEM and private label
            jewellery that meets international quality standards and reflects
            your brand identity.
          </p>
          <p>
            Our custom manufacturing capability covers the full range of
            imitation jewellery categories: necklace sets, earrings, bracelets,
            rings, bridal sets, and contemporary fashion pieces. Whether you
            have detailed design drawings, reference images, or just a concept
            and mood board, our design team can develop the product to your
            specification.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            The Custom Design Process
          </h2>
          <p>
            Our custom jewellery manufacturing process begins with a design
            consultation — you share your design brief, reference images, target
            price point, and required quantity. Our team develops digital
            renders or physical samples within 10–14 business days for your
            approval. Once the design is approved, production begins and is
            typically completed within 21–28 business days from approval.
          </p>
          <p>
            We maintain strict confidentiality for all custom designs — your
            exclusive designs are not shared with other buyers, not added to our
            general catalogue, and not produced for any other client.
            Non-disclosure agreements are available on request for brands
            requiring formal IP protection.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Private Label & OEM Options
          </h2>
          <p>
            For brands wanting to launch their own jewellery line sourced from
            India, our private label service provides end-to-end manufacturing
            support including custom packaging with your brand name and logo,
            branded hang tags and certificates of authenticity, and custom
            product photography support. Minimum order for private label is 500
            units per design, with pricing that reflects volume.
          </p>
          <p>
            OEM manufacturing — where you provide finished designs and we
            manufacture to your exact specification — is available with the same
            500-unit minimum. We have experience producing OEM jewellery for
            fashion brands, lifestyle retailers, and e-commerce businesses
            across the UK, USA, UAE, and Australia who want India-manufactured
            quality at competitive prices.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Materials & Finishes for Custom Orders
          </h2>
          <p>
            Custom orders can specify any combination of base metal (alloy,
            brass), plating (gold, silver, rose-gold, rhodium, oxidised), stone
            type (CZ, zircon, glass stone, kundan, meenakari, polki simulation),
            and size. Anti-tarnish coating is applied as standard on all custom
            orders. We can also accommodate specific material certifications
            required for certain markets.
          </p>
        </>
      }
      faqs={[
        {
          q: "What is the MOQ for custom jewellery designs?",
          a: "Minimum order for custom and private label designs is 500 units per design. This includes new design development, sample approval, and production.",
        },
        {
          q: "How long does custom jewellery manufacturing take?",
          a: "Samples are ready in 10–14 business days from brief approval. Full production takes 21–28 business days after sample approval. Total timeline is typically 5–6 weeks.",
        },
        {
          q: "Can I protect my custom designs from being sold to others?",
          a: "Yes. Your exclusive designs are not shared with or produced for any other buyer. NDAs are available on request for formal IP protection.",
        },
        {
          q: "Do you offer private label packaging with our brand name?",
          a: "Yes. Private label packaging including branded boxes, hang tags, and certificates of authenticity is available for orders of 500+ units.",
        },
        {
          q: "Can I send my own design drawings or just a concept?",
          a: "Both are welcome. You can share detailed CAD drawings, hand sketches, or just a mood board and reference images — our design team will develop the product brief.",
        },
      ]}
    />
  );
}
