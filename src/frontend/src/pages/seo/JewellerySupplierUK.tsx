import SeoLandingPage from "../../components/SeoLandingPage";

export default function JewellerySupplierUK() {
  return (
    <SeoLandingPage
      title="Jewellery Supplier UK | Indian Imitation Jewellery"
      metaDescription="Trusted jewellery supplier from India to UK. Wholesale imitation jewellery, bridal sets for UK boutiques. DHL delivery, HMRC documentation."
      canonical="https://gemoraglobal-tje.caffeine.xyz/jewellery-supplier-uk"
      h1="Indian Jewellery Supplier to UK | Wholesale Boutiques"
      targetKeyword="imitation jewellery supplier uk"
      heroSubtitle="India's trusted wholesale jewellery supplier to the United Kingdom. DHL Express delivery in 4–6 days, HMRC-compliant documentation, 500+ designs. Serving UK boutiques since 2013."
      bodyContent={
        <>
          <h2 className="text-xl font-serif font-bold text-primary mt-0">
            Imitation Jewellery Supplier for UK Wholesale Buyers
          </h2>
          <p>
            Gemora Global is one of India's most trusted imitation jewellery
            suppliers to the United Kingdom, shipping wholesale fashion and
            bridal jewellery to UK boutiques, South Asian bridal retailers,
            fashion retailers, and online jewellery businesses since 2013. The
            UK is one of our largest and most established export markets, and we
            have deep familiarity with the specific requirements of UK wholesale
            buyers — from product preferences to logistics and HMRC import
            documentation.
          </p>
          <p>
            The UK imitation jewellery wholesale market is uniquely diverse. The
            South Asian diaspora community — one of the UK's largest ethnic
            communities — creates sustained year-round demand for traditional
            Indian jewellery, bridal sets, and occasion wear pieces. At the same
            time, the mainstream UK fashion market has a growing appetite for
            Indian-inspired and Indo-Western jewellery designs that have moved
            from niche to mainstream in the UK fashion scene.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            Shipping to UK — DHL Express Delivery
          </h2>
          <p>
            We ship all UK wholesale orders via DHL Express from our Jaipur
            facility, with typical delivery times of 4–6 business days from
            dispatch. DHL is our preferred carrier for UK shipments because of
            their reliability, tracking transparency, and established
            relationship with HMRC customs clearance processes. For very large
            bulk orders, sea freight options are available through Felixstowe or
            Southampton with transit times of 20–28 days.
          </p>
          <p>
            All UK-bound shipments from Gemora Global include complete
            HMRC-compliant export documentation: commercial invoice with
            accurate declared value and HS code classification, detailed packing
            list with individual item descriptions, and certificate of origin
            for GSP preference eligibility where applicable. Our export team is
            experienced with UK post-Brexit import requirements and can advise
            on commodity codes, import VAT, and duty rates for fashion
            jewellery.
          </p>
          <h2 className="text-xl font-serif font-bold text-primary">
            What UK Wholesale Buyers Order Most
          </h2>
          <p>
            Traditional Indian bridal sets — kundan, polki, and meenakari — are
            by far the highest-volume category for UK buyers serving the South
            Asian bridal market. UK bridal boutiques in areas with large South
            Asian communities (Leicester, Birmingham, Manchester, Southall, East
            London) order regularly throughout the year, with peak demand in
            summer and autumn wedding seasons.
          </p>
          <p>
            Contemporary fashion jewellery — geometric earrings, chain layering
            sets, minimalist rings, and statement cuffs — is the fastest-growing
            UK wholesale category for us. UK fashion boutiques and online
            retailers are increasingly looking to India as their source for
            affordable-luxury fashion jewellery that stands out in a crowded UK
            market dominated by mass-market brands.
          </p>
        </>
      }
      faqs={[
        {
          q: "How long does delivery from India to UK take?",
          a: "Standard DHL Express delivery is 4–6 business days from dispatch at our Jaipur facility. Tracking is provided from dispatch to delivery.",
        },
        {
          q: "Do you provide HMRC-compliant import documentation for UK orders?",
          a: "Yes. All UK-bound shipments include commercial invoice with HS codes, packing list, and certificate of origin. We are experienced with UK post-Brexit import requirements.",
        },
        {
          q: "Are there import duties on imitation jewellery imported to the UK from India?",
          a: "Fashion jewellery (HS Chapter 71) imported from India to the UK may be eligible for GSP (Generalised Scheme of Preferences) duty preference. Our export team can advise for your specific HS code.",
        },
        {
          q: "Do you supply South Asian bridal boutiques in UK cities like Leicester and Birmingham?",
          a: "Yes — South Asian bridal retail is one of our strongest UK wholesale segments. We supply boutiques across Leicester, Birmingham, Manchester, Southall, and East London.",
        },
        {
          q: "Can UK boutiques place small trial orders before scaling up?",
          a: "Yes. All first-time UK buyers are welcome to place trial orders at our standard 50-unit/design MOQ. This lets you validate product quality and customer response before scaling.",
        },
      ]}
    />
  );
}
