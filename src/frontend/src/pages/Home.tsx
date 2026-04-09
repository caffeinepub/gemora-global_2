import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Eye, ShieldCheck, Star, TrendingUp, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AnnouncementStrip from "../components/AnnouncementStrip";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";
import { usePageSEO } from "../hooks/usePageSEO";
import type { Category, Product, Testimonial } from "../types";

// ── Scroll-reveal hook ─────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Static data ────────────────────────────────────────────────
const CATEGORY_IMAGES: Record<string, string> = {
  Necklaces: "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg",
  Earrings: "/assets/generated/jewellery-earrings-hd.dim_800x800.jpg",
  Bracelets: "/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg",
  Rings: "/assets/generated/jewellery-rings-hd.dim_800x800.jpg",
  "Bridal Jewellery": "/assets/generated/jewellery-bridal-hd.dim_800x800.jpg",
  "Minimal Fashion": "/assets/generated/jewellery-minimal-hd.dim_800x800.jpg",
  "Minimal Fashion Jewellery":
    "/assets/generated/jewellery-minimal-hd.dim_800x800.jpg",
};

const FALLBACK_IMAGE =
  "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg";

const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 1n,
    name: "Necklaces",
    description: "Exquisite handcrafted necklaces",
    imageUrl: "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "Earrings",
    description: "Stunning earring collections",
    imageUrl: "/assets/generated/jewellery-earrings-hd.dim_800x800.jpg",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Bracelets",
    description: "Elegant bracelet designs",
    imageUrl: "/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg",
    sortOrder: 3n,
  },
  {
    id: 4n,
    name: "Rings",
    description: "Statement rings for every occasion",
    imageUrl: "/assets/generated/jewellery-rings-hd.dim_800x800.jpg",
    sortOrder: 4n,
  },
  {
    id: 5n,
    name: "Bridal Jewellery",
    description: "Complete bridal jewellery sets",
    imageUrl: "/assets/generated/jewellery-bridal-hd.dim_800x800.jpg",
    sortOrder: 5n,
  },
  {
    id: 6n,
    name: "Minimal Fashion",
    description: "Modern minimal fashion jewellery",
    imageUrl: "/assets/generated/jewellery-minimal-hd.dim_800x800.jpg",
    sortOrder: 6n,
  },
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1n,
    categoryId: 1n,
    name: "Kundan Necklace Set",
    description: "Traditional Kundan work with polki stones",
    moq: "50 pcs",
    imageUrls: ["/assets/generated/jewellery-necklace-hd.dim_800x800.jpg"],
    featured: true,
    createdAt: 1700000006n,
  },
  {
    id: 2n,
    categoryId: 2n,
    name: "Jhumka Earrings Gold",
    description: "Classic gold-plated jhumka for festive wear",
    moq: "50 pcs",
    imageUrls: ["/assets/generated/jewellery-earrings-hd.dim_800x800.jpg"],
    featured: true,
    createdAt: 1700000005n,
  },
  {
    id: 3n,
    categoryId: 5n,
    name: "Bridal Choker Set",
    description: "Complete bridal set with necklace, earrings, maang tikka",
    moq: "25 pcs",
    imageUrls: ["/assets/generated/jewellery-bridal-hd.dim_800x800.jpg"],
    featured: true,
    createdAt: 1700000004n,
  },
  {
    id: 4n,
    categoryId: 3n,
    name: "Oxidised Bangles Set",
    description: "Antique oxidised finish bangles",
    moq: "100 pcs",
    imageUrls: ["/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg"],
    featured: false,
    createdAt: 1700000003n,
  },
  {
    id: 5n,
    categoryId: 6n,
    name: "Minimal Gold Hoops",
    description: "Lightweight modern hoop earrings",
    moq: "50 pcs",
    imageUrls: ["/assets/generated/jewellery-minimal-hd.dim_800x800.jpg"],
    featured: true,
    createdAt: 1700000002n,
  },
  {
    id: 6n,
    categoryId: 4n,
    name: "Statement Cocktail Ring",
    description: "Bold cocktail ring with CZ stones",
    moq: "50 pcs",
    imageUrls: ["/assets/generated/jewellery-rings-hd.dim_800x800.jpg"],
    featured: false,
    createdAt: 1700000001n,
  },
  {
    id: 7n,
    categoryId: 1n,
    name: "Temple Necklace Long",
    description: "South Indian temple style long necklace",
    moq: "25 pcs",
    imageUrls: ["/assets/generated/jewellery-necklace-hd.dim_800x800.jpg"],
    featured: true,
    createdAt: 1700000000n,
  },
  {
    id: 8n,
    categoryId: 2n,
    name: "Chandbali Drop Earrings",
    description: "Traditional chandbali with meenakari work",
    moq: "50 pcs",
    imageUrls: ["/assets/generated/jewellery-earrings-hd.dim_800x800.jpg"],
    featured: true,
    createdAt: 1699999999n,
  },
];

const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 1n,
    name: "Fatima Al-Hassan",
    company: "Al-Noor Boutique",
    country: "UAE",
    text: "Outstanding quality and prompt delivery. Our customers love Gemora's designs!",
    rating: 5n,
    active: true,
  },
  {
    id: 2n,
    name: "Sarah Thompson",
    company: "Jewel Box UK",
    country: "UK",
    text: "Best imitation jewellery supplier we've worked with. MOQ is very reasonable.",
    rating: 5n,
    active: true,
  },
  {
    id: 3n,
    name: "Maria Rodriguez",
    company: "Elegance Store",
    country: "USA",
    text: "Premium packaging and excellent craftsmanship. Highly recommend for bulk orders.",
    rating: 5n,
    active: true,
  },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "ISO Certified Quality" },
  { icon: Users, label: "500+ Global Buyers" },
  { icon: Star, label: "15+ Years Expertise" },
  { icon: TrendingUp, label: "Jaipur Manufacturer" },
  { icon: ShieldCheck, label: "Bulk Orders Welcome" },
];

const WHY_CHOOSE = [
  {
    icon: "💰",
    title: "Competitive Pricing",
    desc: "Factory-direct bulk pricing. Best margins for wholesalers and distributors.",
  },
  {
    icon: "✨",
    title: "Premium Finishing",
    desc: "Anti-tarnish, gold-plated, rhodium-finished jewellery with lasting quality.",
  },
  {
    icon: "🤝",
    title: "Reliable Export Partner",
    desc: "10+ years of global export experience. On-time delivery guaranteed.",
  },
  {
    icon: "🌟",
    title: "Trendy Fashion Designs",
    desc: "500+ fresh designs updated seasonally to keep your store ahead of trends.",
  },
];

const STATS = [
  { value: "500+", label: "Designs" },
  { value: "50+", label: "Countries" },
  { value: "10+", label: "Years Experience" },
  { value: "10,000+", label: "Happy Clients" },
];

const DEFAULT_HERO_TITLE =
  "India's Premier Imitation Jewellery\nManufacturer & Global Exporter";
const DEFAULT_HERO_SUBTITLE =
  "Premium handcrafted designs for wholesalers, boutiques & distributors worldwide.";

// ── Quick-View Modal ───────────────────────────────────────────
function QuickViewModal({
  product,
  open,
  onClose,
}: { product: Product | null; open: boolean; onClose: () => void }) {
  if (!product) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden"
        data-ocid="quickview.modal"
      >
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-muted">
            <img
              src={product.imageUrls[0] || FALLBACK_IMAGE}
              alt={product.name}
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
            <span className="badge-moq">Min. {product.moq}</span>
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close quick view"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors"
                data-ocid="quickview.close"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="font-serif text-xl font-bold mb-3">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {product.description}
              </p>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Min. Order</dt>
                  <dd className="font-semibold text-destructive">
                    {product.moq}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Stock</dt>
                  <dd className="font-semibold text-green-600">Available</dd>
                </div>
                <div className="flex justify-between pb-2">
                  <dt className="text-muted-foreground">Finish</dt>
                  <dd className="font-semibold">Anti-tarnish Gold</dd>
                </div>
              </dl>
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="quickview.inquiry"
              >
                <Link to="/contact">Send Inquiry</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                data-ocid="quickview.details"
              >
                <Link to={`/products/${product.id}`}>View Full Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Product Card ───────────────────────────────────────────────
function ProductCard({
  product,
  onQuickView,
}: { product: Product; onQuickView: (p: Product) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="product-card group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid="product.card"
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.imageUrls[0] || FALLBACK_IMAGE}
          alt={`${product.name} — imitation jewellery by Gemora Global`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={400}
          height={400}
        />
        {/* MOQ Badge */}
        <span
          className="badge-moq"
          aria-label={`Minimum order: ${product.moq}`}
        >
          Min. {product.moq}
        </span>
        {/* Quick-view overlay */}
        {hovered && (
          <button
            type="button"
            onClick={() => onQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-200"
            data-ocid="product.quickview_trigger"
          >
            <span className="flex items-center gap-2 bg-background text-foreground px-4 py-2 rounded-full text-xs font-semibold shadow-elevated">
              <Eye className="w-3.5 h-3.5" /> Quick View
            </span>
          </button>
        )}
      </div>
      <Link
        to={`/products/${product.id}`}
        className="block p-3"
        data-ocid="product.link"
      >
        <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Wholesale from India
        </p>
      </Link>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function Home() {
  const { actor } = useActor();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  usePageSEO({
    title:
      "Imitation Jewellery Exporter & Manufacturer in India | Gemora Global",
    description:
      "India's leading imitation jewellery manufacturer & exporter in Jaipur. Wholesale fashion jewellery, bridal sets & 500+ designs. Shipping to UAE, USA, UK & worldwide.",
    canonical: "https://gemoraglobal-tje.caffeine.xyz/",
    ogTitle:
      "Imitation Jewellery Exporter & Manufacturer in India | Gemora Global",
    ogDescription:
      "India's leading imitation jewellery manufacturer and exporter from Jaipur. Premium wholesale pricing for global buyers in UAE, France, USA, UK and Europe.",
    ogImage: "https://gemoraglobal-tje.caffeine.xyz/images/og-homepage.jpg",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Gemora Global",
        url: "https://gemoraglobal-tje.caffeine.xyz",
        logo: {
          "@type": "ImageObject",
          url: "https://gemoraglobal-tje.caffeine.xyz/assets/uploads/logo-removebg-preview-1.png",
          width: 300,
          height: 60,
        },
        description:
          "India's leading imitation jewellery manufacturer and exporter from Jaipur, Rajasthan.",
        foundingDate: "2013",
        address: {
          "@type": "PostalAddress",
          streetAddress: "B 66 MAA Hinglaj Nagar",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          addressCountry: "IN",
          postalCode: "302021",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-7976341419",
            contactType: "sales",
            email: "globalgemora@gmail.com",
            availableLanguage: ["English", "Hindi"],
            areaServed: "Worldwide",
          },
        ],
        sameAs: [
          "https://www.instagram.com/gemoraglobal",
          "https://www.indiamart.com/gemora-global",
          "https://wa.me/917976341419",
        ],
      },
    ],
  });

  // LocalBusiness + FAQ schemas injected on mount
  useEffect(() => {
    const ids = ["lb-schema", "faq-schema"];
    for (const id of ids) {
      const s = document.getElementById(id);
      if (s) s.remove();
    }

    const lbScript = document.createElement("script");
    lbScript.id = "lb-schema";
    lbScript.type = "application/ld+json";
    lbScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Gemora Global",
      image:
        "https://gemoraglobal-tje.caffeine.xyz/assets/uploads/logo-removebg-preview-1.png",
      "@id": "https://gemoraglobal-tje.caffeine.xyz",
      url: "https://gemoraglobal-tje.caffeine.xyz",
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
      geo: { "@type": "GeoCoordinates", latitude: 26.9124, longitude: 75.7873 },
      openingHoursSpecification: [
        {
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
          closes: "19:00",
        },
      ],
      priceRange: "₹₹",
      servesCuisine: "Wholesale Jewellery",
      description:
        "Gemora Global is a leading imitation jewellery manufacturer, wholesaler and exporter based in Jaipur, Rajasthan. We supply wholesale fashion jewellery, bridal jewellery sets, Kundan jewellery, and 500+ designs to buyers in UAE, USA, UK, and 50+ countries.",
      sameAs: [
        "https://www.indiamart.com/gemora-global",
        "https://www.instagram.com/gemoraglobal",
      ],
    });
    document.head.appendChild(lbScript);

    const faqScript = document.createElement("script");
    faqScript.id = "faq-schema";
    faqScript.type = "application/ld+json";
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the minimum order quantity (MOQ) for wholesale jewellery from Gemora Global?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The minimum order quantity at Gemora Global starts from 50 pieces per design. For bulk orders and special pricing, contact us on WhatsApp at +91 7976341419.",
          },
        },
        {
          "@type": "Question",
          name: "Does Gemora Global ship jewellery internationally?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Gemora Global exports imitation jewellery to 50+ countries including UAE, USA, UK, France, Canada, Australia, Singapore, and across Europe. We provide reliable international shipping with tracking.",
          },
        },
        {
          "@type": "Question",
          name: "What types of imitation jewellery does Gemora Global manufacture?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gemora Global manufactures Kundan jewellery, temple jewellery, oxidised jewellery, bridal jewellery sets, necklace sets, earrings, bangles, rings, maang tikka, and fashion jewellery for wholesale.",
          },
        },
        {
          "@type": "Question",
          name: "Is the jewellery anti-tarnish?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all Gemora Global jewellery is finished with anti-tarnish coating and gold plating, ensuring long-lasting brilliance suitable for international retail and export markets.",
          },
        },
        {
          "@type": "Question",
          name: "How can I get a wholesale price list or product catalogue?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can download our product catalogue from our website or contact us on WhatsApp (+91 7976341419) or email (globalgemora@gmail.com) to receive our latest wholesale price list.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Gemora Global located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gemora Global is based in Jaipur, Rajasthan, India — India's jewellery manufacturing capital. Our address is B 66 MAA Hinglaj Nagar, Jaipur 302021.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get custom jewellery designs made?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Gemora Global offers custom jewellery manufacturing services. Share your design requirements and we will create samples for approval before bulk production.",
          },
        },
        {
          "@type": "Question",
          name: "What payment methods are accepted for wholesale orders?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We accept bank transfer (SWIFT/TT), PayPal, and other secure international payment methods. Contact our sales team for payment details and credit terms for regular buyers.",
          },
        },
      ],
    });
    document.head.appendChild(faqScript);

    return () => {
      for (const id of ids) {
        const s = document.getElementById(id);
        if (s) s.remove();
      }
    };
  }, []);

  // ── Backend data ─────────────────────────────────────────────
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => actor!.getCategories(),
    enabled: !!actor,
  });

  const { data: featuredProducts } = useQuery<Product[]>({
    queryKey: ["featured-products"],
    queryFn: () => actor!.getFeaturedProducts(),
    enabled: !!actor,
  });

  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ["all-products-home"],
    queryFn: () => actor!.getProducts([]),
    enabled: !!actor,
  });

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: () => actor!.getTestimonials(),
    enabled: !!actor,
  });

  const { data: heroTitleRaw } = useQuery({
    queryKey: ["content", "hero_title"],
    queryFn: () => actor!.getContent("hero_title"),
    enabled: !!actor,
  });
  const { data: heroSubtitleRaw } = useQuery({
    queryKey: ["content", "hero_subtitle"],
    queryFn: () => actor!.getContent("hero_subtitle"),
    enabled: !!actor,
  });
  const { data: heroImageRaw } = useQuery({
    queryKey: ["content", "hero_image"],
    queryFn: () => actor!.getContent("hero_image"),
    enabled: !!actor,
  });
  const { data: heroImage1Raw } = useQuery({
    queryKey: ["content", "hero_image_1"],
    queryFn: () => actor!.getContent("hero_image_1"),
    enabled: !!actor,
  });
  const { data: heroImage2Raw } = useQuery({
    queryKey: ["content", "hero_image_2"],
    queryFn: () => actor!.getContent("hero_image_2"),
    enabled: !!actor,
  });
  const { data: heroImage3Raw } = useQuery({
    queryKey: ["content", "hero_image_3"],
    queryFn: () => actor!.getContent("hero_image_3"),
    enabled: !!actor,
  });

  // Unwrap Candid optionals [] | [string]
  const heroTitle =
    (heroTitleRaw && heroTitleRaw.length > 0 ? heroTitleRaw[0] : undefined) ??
    DEFAULT_HERO_TITLE;
  const heroSubtitle =
    (heroSubtitleRaw && heroSubtitleRaw.length > 0
      ? heroSubtitleRaw[0]
      : undefined) ?? DEFAULT_HERO_SUBTITLE;
  const heroImageFallback =
    (heroImageRaw && heroImageRaw.length > 0 ? heroImageRaw[0] : null) ??
    "/assets/generated/hero-jewellery-banner.dim_1600x700.jpg";
  const heroImage1 =
    (heroImage1Raw && heroImage1Raw.length > 0 ? heroImage1Raw[0] : null) ??
    heroImageFallback;
  const heroImage2 =
    heroImage2Raw && heroImage2Raw.length > 0 ? heroImage2Raw[0] : null;
  const heroImage3 =
    heroImage3Raw && heroImage3Raw.length > 0 ? heroImage3Raw[0] : null;
  const heroImages = [heroImage1, heroImage2, heroImage3].filter(
    Boolean,
  ) as string[];

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(
      () => setCurrentSlide((p) => (p + 1) % heroImages.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Derived data
  const displayCategories =
    categories && categories.length > 0 ? categories : SAMPLE_CATEGORIES;
  const displayTestimonials =
    testimonials && testimonials.filter((t) => t.active).length > 0
      ? testimonials.filter((t) => t.active)
      : SAMPLE_TESTIMONIALS;

  // New Arrivals: allProducts sorted desc by createdAt, max 8
  const newArrivals = (
    allProducts && allProducts.length > 0 ? allProducts : SAMPLE_PRODUCTS
  )
    .slice()
    .sort((a, b) => Number(b.createdAt - a.createdAt))
    .slice(0, 8);

  // Trending Now: featured=true products
  const trendingProducts = (
    featuredProducts && featuredProducts.length > 0
      ? featuredProducts
      : SAMPLE_PRODUCTS.filter((p) => p.featured)
  ).slice(0, 8);

  const getCategoryImage = (cat: Category) => {
    if (cat.imageUrl && !cat.imageUrl.includes("placehold.co"))
      return cat.imageUrl;
    return CATEGORY_IMAGES[cat.name] || FALLBACK_IMAGE;
  };

  // Scroll reveal refs
  const statsReveal = useScrollReveal();
  const categoriesReveal = useScrollReveal();
  const newArrivalsReveal = useScrollReveal();
  const trendingReveal = useScrollReveal();
  const trustReveal = useScrollReveal();
  const whyReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement strip sits above Navbar */}
      <AnnouncementStrip />
      <Navbar />

      {/* ── Hero Slider ─────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
        {heroImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Gemora Global — India's Premier Imitation Jewellery slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === currentSlide ? "opacity-100" : "opacity-0"}`}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : undefined}
            width={1600}
            height={900}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,6,2,0.78) 0%, rgba(20,12,4,0.60) 50%, rgba(10,6,2,0.75) 100%)",
          }}
        />

        {heroImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setCurrentSlide(
                  (p) => (p - 1 + heroImages.length) % heroImages.length,
                )
              }
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors border border-white/20"
              data-ocid="hero.pagination_prev"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentSlide((p) => (p + 1) % heroImages.length)
              }
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors border border-white/20"
              data-ocid="hero.pagination_next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {heroImages.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`rounded-full transition-all duration-300 ${idx === currentSlide ? "w-4 h-4 bg-white opacity-100" : "w-2.5 h-2.5 bg-white opacity-50 hover:opacity-75"}`}
                  data-ocid="hero.toggle"
                />
              ))}
            </div>
          </>
        )}

        <div className="container text-center relative z-10 px-4">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-xs tracking-widest">
            INDIA'S FINEST JEWELLERY EXPORTER
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {heroTitle.includes("\n") ? (
              <>
                {heroTitle.split("\n")[0]}
                <br />
                <span style={{ color: "#D4AF37" }}>
                  {heroTitle.split("\n")[1]}
                </span>
              </>
            ) : (
              <>
                Best Imitation Jewellery
                <br />
                <span style={{ color: "#D4AF37" }}>Exporter in India</span>
                <br />
                &amp; Premium Manufacturer
              </>
            )}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 transition-transform duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg"
              data-ocid="hero.cta_catalog"
            >
              <Link to="/gallery">Get Catalog</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 transition-transform duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg"
              data-ocid="hero.cta_wholesale"
            >
              <Link to="/contact">Contact Wholesale</Link>
            </Button>
          </div>
          <p className="text-white/40 text-sm mt-8 tracking-widest">
            GLOBAL JEWELLERY. INDIAN CRAFTSMANSHIP.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────── */}
      <section
        ref={statsReveal.ref as React.RefObject<HTMLElement>}
        className="bg-primary/10 border-y border-primary/20 py-8"
      >
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`${statsReveal.visible ? `animate-fade-in-up animate-delay-${(i + 1) * 100}` : "opacity-0"}`}
            >
              <div className="font-serif text-3xl font-bold text-primary">
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust Badges ────────────────────────────────────── */}
      <section
        ref={trustReveal.ref as React.RefObject<HTMLElement>}
        className="bg-card border-b border-border py-6"
        data-ocid="trust.section"
      >
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TRUST_BADGES.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className={`trust-badge ${trustReveal.visible ? `animate-fade-in-up animate-delay-${Math.min((i + 1) * 100, 400)}` : "opacity-0"}`}
                >
                  <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SEO Body Copy ───────────────────────────────────── */}
      <section className="container py-14">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-center">
          Handcrafted Jewellery, Global Reach
        </h2>
        <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground leading-relaxed text-center">
          <p>
            Gemora Global is one of India's most trusted{" "}
            <Link to="/about" className="text-primary hover:underline">
              imitation jewellery manufacturers and exporters
            </Link>
            , supplying premium handcrafted designs to wholesalers, boutiques,
            and distributors across more than 50 countries. Based in{" "}
            <strong>Jaipur, Rajasthan</strong> — India's jewellery manufacturing
            capital — we combine traditional Indian craftsmanship with modern
            anti-tarnish finishing techniques.
          </p>
          <p>
            Our{" "}
            <Link to="/products" className="text-primary hover:underline">
              collections
            </Link>{" "}
            span necklaces, earrings, bangles, bracelets, rings, maang tikkas,
            and complete bridal jewellery sets. With over 10 years of export
            experience and a catalogue of 500+ seasonal designs, Gemora Global
            makes it easy for overseas buyers to source at competitive{" "}
            <Link to="/wholesale" className="text-primary hover:underline">
              wholesale prices
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── Categories ──────────────────────────────────────── */}
      <section
        ref={categoriesReveal.ref as React.RefObject<HTMLElement>}
        className="container py-12"
      >
        <div className="text-center mb-10">
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold mb-3 ${categoriesReveal.visible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Our Collections
          </h2>
          <p className="text-muted-foreground">
            Explore our curated{" "}
            <Link to="/products" className="text-primary hover:underline">
              jewellery categories
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayCategories.slice(0, 6).map((cat, i) => (
            <Link
              key={String(cat.id)}
              to={`/products?category=${cat.id}`}
              className={`group relative overflow-hidden rounded-lg aspect-square cursor-pointer transition-transform duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg ${categoriesReveal.visible ? `animate-fade-in-up animate-delay-${Math.min((i + 1) * 100, 400)}` : "opacity-0"}`}
              data-ocid="category.card"
            >
              <img
                src={getCategoryImage(cat)}
                alt={`${cat.name} - wholesale imitation jewellery Jaipur`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width={400}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-serif text-white font-semibold text-sm">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            <Link to="/products">View All Collections</Link>
          </Button>
        </div>
      </section>

      {/* ── New Arrivals ─────────────────────────────────────── */}
      <section
        ref={newArrivalsReveal.ref as React.RefObject<HTMLElement>}
        className="bg-muted/30 py-16"
        data-ocid="new-arrivals.section"
      >
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs tracking-widest">
              JUST IN
            </Badge>
            <h2
              className={`font-serif text-3xl md:text-4xl font-bold mb-3 ${newArrivalsReveal.visible ? "animate-fade-in-up" : "opacity-0"}`}
            >
              New Arrivals
            </h2>
            <p className="text-muted-foreground">
              Fresh wholesale designs — be the first to source them
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((product, i) => (
              <div
                key={String(product.id)}
                className={`${newArrivalsReveal.visible ? `animate-fade-in-up animate-delay-${Math.min((i + 1) * 100, 400)}` : "opacity-0"}`}
              >
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="new-arrivals.view_all"
            >
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Trending Now ─────────────────────────────────────── */}
      <section
        ref={trendingReveal.ref as React.RefObject<HTMLElement>}
        className="container py-16"
        data-ocid="trending.section"
      >
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-accent/20 text-accent-foreground border-accent/30 text-xs tracking-widest">
            BESTSELLERS
          </Badge>
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold mb-3 ${trendingReveal.visible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Trending Now
          </h2>
          <p className="text-muted-foreground">
            Most-loved designs by{" "}
            <Link to="/global-markets" className="text-primary hover:underline">
              buyers worldwide
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingProducts.map((product, i) => (
            <div
              key={String(product.id)}
              className={`${trendingReveal.visible ? `animate-fade-in-up animate-delay-${Math.min((i + 1) * 100, 400)}` : "opacity-0"}`}
            >
              <ProductCard
                product={product}
                onQuickView={setQuickViewProduct}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            data-ocid="trending.view_all"
          >
            <Link to="/products">Browse All Trending</Link>
          </Button>
        </div>
      </section>

      {/* ── Global Markets ──────────────────────────────────── */}
      <section className="bg-card border-y border-border py-14">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold mb-3">
              Global Markets We Serve
            </h2>
            <p className="text-muted-foreground">
              Supplying premium{" "}
              <Link to="/wholesale" className="text-primary hover:underline">
                wholesale jewellery
              </Link>{" "}
              to buyers across the globe
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { flag: "🇫🇷", country: "France" },
              { flag: "🇦🇪", country: "UAE" },
              { flag: "🇺🇸", country: "USA" },
              { flag: "🇬🇧", country: "UK" },
              { flag: "🇪🇺", country: "Europe" },
              { flag: "🇨🇦", country: "Canada" },
              { flag: "🇦🇺", country: "Australia" },
              { flag: "🇸🇬", country: "Singapore" },
            ].map((m) => (
              <div
                key={m.country}
                className="flex flex-col items-center gap-2 bg-background border border-border rounded-lg p-4 min-w-[80px] hover:border-primary/50 transition-all duration-200 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-3xl">{m.flag}</span>
                <span className="text-xs font-medium text-muted-foreground">
                  {m.country}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Link to="/global-markets">View All Markets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ───────────────────────────────────── */}
      <section
        ref={whyReveal.ref as React.RefObject<HTMLElement>}
        className="container py-16"
      >
        <div className="text-center mb-10">
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold mb-3 ${whyReveal.visible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Why Choose Gemora Global
          </h2>
          <p className="text-muted-foreground">
            The preferred{" "}
            <Link to="/why-choose-us" className="text-primary hover:underline">
              wholesale jewellery supplier
            </Link>{" "}
            for international buyers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((item, i) => (
            <div
              key={item.title}
              className={`text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg ${whyReveal.visible ? `animate-fade-in-up animate-delay-${(i + 1) * 100}` : "opacity-0"}`}
            >
              <div className="text-4xl mb-4" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="font-serif font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────── */}
      <section
        ref={testimonialsReveal.ref as React.RefObject<HTMLElement>}
        className="bg-muted/30 py-16"
      >
        <div className="container">
          <div className="text-center mb-10">
            <h2
              className={`font-serif text-3xl md:text-4xl font-bold mb-3 ${testimonialsReveal.visible ? "animate-fade-in-up" : "opacity-0"}`}
            >
              What Buyers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayTestimonials.slice(0, 3).map((t, i) => (
              <Card
                key={String(t.id)}
                className={`p-6 bg-card border-border hover:border-primary/40 transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${testimonialsReveal.visible ? `animate-fade-in-up animate-delay-${(i + 1) * 100}` : "opacity-0"}`}
              >
                <CardContent className="p-0">
                  <div
                    className="flex gap-1 mb-3"
                    aria-label={`${Number(t.rating)} out of 5 stars`}
                  >
                    {Array.from({ length: Number(t.rating) }, (_, n) => n).map(
                      (n) => (
                        <span
                          key={`${String(t.id)}-star-${n}`}
                          className="text-primary"
                          aria-hidden="true"
                        >
                          ★
                        </span>
                      ),
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.company}, {t.country}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram Grid ──────────────────────────────────── */}
      <section className="container py-14">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold mb-2">
            Follow Our Designs
          </h2>
          <p className="text-muted-foreground">@gemoraglobal on Instagram</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[
            {
              src: "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg",
              label: "Gold necklace set by Gemora Global",
            },
            {
              src: "/assets/generated/jewellery-earrings-hd.dim_800x800.jpg",
              label: "Handcrafted earrings collection",
            },
            {
              src: "/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg",
              label: "Imitation bracelets for export",
            },
            {
              src: "/assets/generated/jewellery-rings-hd.dim_800x800.jpg",
              label: "Fashion rings wholesale",
            },
            {
              src: "/assets/generated/jewellery-bridal-hd.dim_800x800.jpg",
              label: "Bridal jewellery set",
            },
            {
              src: "/assets/generated/jewellery-minimal-hd.dim_800x800.jpg",
              label: "Minimal fashion jewellery",
            },
          ].map((item) => (
            <a
              key={item.src}
              href="https://instagram.com/gemoraglobal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.label} - view on Instagram`}
              className="aspect-square overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:scale-[1.05] hover:shadow-md group block"
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width={300}
                height={300}
              />
            </a>
          ))}
        </div>
      </section>

      {/* ── Blog Teaser ──────────────────────────────────────── */}
      <section className="bg-card border-t border-border py-14">
        <div className="container">
          <div className="text-center mb-6">
            <h2 className="font-serif text-3xl font-bold mb-3">
              Jewellery Export Insights
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Sourcing guides, trend reports, and MOQ advice for wholesale
              buyers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "How to Source Imitation Jewellery from India",
                excerpt:
                  "A complete guide for overseas buyers on MOQ, pricing, and supplier selection.",
                category: "Business Guide",
              },
              {
                title:
                  "Top Imitation Jewellery Trends for Export Markets in 2026",
                excerpt:
                  "What boutiques in UAE, France, and UK are buying this season.",
                category: "Trends",
              },
              {
                title:
                  "Anti-Tarnish Jewellery: Why It Matters for International Retail",
                excerpt:
                  "How anti-tarnish coating reduces returns and builds buyer trust.",
                category: "Industry Insights",
              },
            ].map((post) => (
              <div
                key={post.title}
                className="bg-background border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {post.category}
                </span>
                <h3 className="font-serif font-semibold mt-3 mb-2 text-sm leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground">{post.excerpt}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/blog"
              className="text-primary hover:underline text-sm font-medium"
            >
              Read all export insights →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="bg-primary/10 border-y border-primary/20 py-16">
        <div className="container text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-primary">
            Ready to Start Wholesale?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Download our{" "}
            <Link to="/gallery" className="text-primary hover:underline">
              product catalogue
            </Link>{" "}
            or{" "}
            <Link to="/contact" className="text-primary hover:underline">
              contact us
            </Link>{" "}
            for pricing, MOQ details, and latest designs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 transition-transform duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg"
              data-ocid="cta.inquiry"
            >
              <Link to="/contact">Send Inquiry Now</Link>
            </Button>
            <a
              href="/catalogue.pdf"
              download
              className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg"
              data-ocid="cta.download"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Catalogue
            </a>
          </div>
        </div>
      </section>

      {/* ── Services Internal Link Hub ───────────────────────── */}
      <section className="py-16 px-4 bg-muted/20 border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-serif font-bold text-primary mb-3 text-center">
            Explore Our Specialised Services
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-10">
            Gemora Global offers end-to-end wholesale, manufacturing, and export
            services for imitation jewellery worldwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                to: "/kundan-jewellery-wholesale",
                label: "Kundan Jewellery Wholesale from India",
              },
              {
                to: "/temple-jewellery-manufacturer",
                label: "Temple Jewellery Manufacturer Jaipur",
              },
              {
                to: "/artificial-jewellery-exporter",
                label: "Artificial Jewellery Exporter India",
              },
              {
                to: "/bridal-imitation-jewellery",
                label: "Bridal Imitation Jewellery Sets Wholesale",
              },
              {
                to: "/oxidised-jewellery-wholesale",
                label: "Oxidised Jewellery Wholesale Supplier",
              },
              {
                to: "/imitation-jewellery-manufacturer-india",
                label: "Imitation Jewellery Manufacturer India",
              },
              {
                to: "/artificial-jewellery-wholesaler-india",
                label: "Artificial Jewellery Wholesaler India",
              },
              {
                to: "/fashion-jewellery-exporter-india",
                label: "Fashion Jewellery Exporter India",
              },
              {
                to: "/oxidised-jewellery-supplier",
                label: "Oxidised Jewellery Supplier India",
              },
              {
                to: "/imitation-jewellery-supplier-usa",
                label: "Imitation Jewellery Supplier USA",
              },
              {
                to: "/imitation-jewellery-exporter-india",
                label: "Imitation Jewellery Exporter India",
              },
              {
                to: "/wholesale-imitation-jewellery",
                label: "Wholesale Imitation Jewellery Supplier",
              },
              {
                to: "/bridal-jewellery-wholesale",
                label: "Bridal Jewellery Wholesale India",
              },
              {
                to: "/fashion-jewellery-exporter",
                label: "Fashion Jewellery Exporter Worldwide",
              },
              {
                to: "/custom-jewellery-manufacturer",
                label: "Custom Jewellery Manufacturer India",
              },
              {
                to: "/wholesale-imitation-jewellery-india",
                label: "Wholesale Imitation Jewellery India",
              },
              {
                to: "/fashion-jewellery-manufacturer-india",
                label: "Fashion Jewellery Manufacturer India",
              },
              {
                to: "/bridal-imitation-jewellery-wholesale",
                label: "Bridal Imitation Jewellery Wholesale",
              },
              {
                to: "/bulk-jewellery-supplier",
                label: "Bulk Jewellery Supplier India",
              },
              {
                to: "/jewellery-exporter-to-usa",
                label: "Jewellery Exporter to USA",
              },
              {
                to: "/jewellery-supplier-uk",
                label: "Wholesale Jewellery Supplier UK",
              },
              {
                to: "/jewellery-exporter-uae",
                label: "Jewellery Exporter UAE Dubai",
              },
              {
                to: "/private-label-jewellery-india",
                label: "Private Label Jewellery India",
              },
            ].map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-ocid="home.link"
              >
                <span className="text-primary">&rsaquo;</span>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ / People Also Ask ───────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-serif font-bold text-primary mb-8 text-center">
            People Also Ask
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is the minimum order quantity (MOQ) for wholesale jewellery?",
                a: "Minimum order quantity at Gemora Global starts from 50 pieces per design. For special bulk pricing on larger orders, contact us on WhatsApp +91 7976341419.",
              },
              {
                q: "Does Gemora Global export jewellery internationally?",
                a: "Yes, we export to 50+ countries including UAE, USA, UK, France, Canada, Australia, Singapore, and across Europe with reliable international shipping and tracking.",
              },
              {
                q: "What types of imitation jewellery does Gemora Global manufacture?",
                a: "We manufacture Kundan jewellery, temple jewellery, oxidised jewellery, bridal sets, necklaces, earrings, bangles, rings, maang tikka, and fashion jewellery for wholesale.",
              },
              {
                q: "Is the jewellery anti-tarnish?",
                a: "Yes, all our jewellery is finished with anti-tarnish coating and gold plating for long-lasting brilliance suitable for international retail markets.",
              },
              {
                q: "How can I get a wholesale price list or catalogue?",
                a: "Download our product catalogue from the website or WhatsApp us at +91 7976341419 / email globalgemora@gmail.com for the latest wholesale price list.",
              },
              {
                q: "Where is Gemora Global located?",
                a: "We are based in Jaipur, Rajasthan — India's jewellery capital. Address: B 66 MAA Hinglaj Nagar, Jaipur 302021.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="bg-background border border-border rounded-lg p-4 group"
                data-ocid="faq.item"
              >
                <summary className="font-semibold cursor-pointer text-foreground list-none flex items-center justify-between gap-2">
                  {item.q}
                  <span className="text-primary group-open:rotate-180 transition-transform duration-200 text-lg leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Quick-View Modal ─────────────────────────────────── */}
      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
