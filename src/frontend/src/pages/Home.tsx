import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Category, Product, Testimonial } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";
import { usePageSEO } from "../hooks/usePageSEO";

// Scroll reveal hook
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
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

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
  "India's Premier Imitation Jewellery Manufacturer & Global Exporter";
const DEFAULT_HERO_SUBTITLE =
  "Premium handcrafted designs for wholesalers, boutiques & distributors worldwide.";

export default function Home() {
  const { actor } = useActor();
  usePageSEO({
    title:
      "Imitation Jewellery Exporter & Manufacturer in India | Gemora Global",
    description:
      "India's leading imitation jewellery manufacturer & exporter. Wholesale fashion jewellery, bridal sets & 500+ designs. Shipping to UAE, USA, UK & worldwide.",
    canonical: "https://gemoraglobal-tje.caffeine.xyz/",
    ogTitle:
      "Imitation Jewellery Exporter & Manufacturer in India | Gemora Global",
    ogDescription:
      "India's leading imitation jewellery manufacturer and exporter. Premium wholesale pricing for global buyers in UAE, France, USA, UK and Europe.",
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
          "India's leading imitation jewellery manufacturer and exporter.",
        foundingDate: "2013",
        address: {
          "@type": "PostalAddress",
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
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Gemora Global",
        url: "https://gemoraglobal-tje.caffeine.xyz",
      },
    ],
  });

  useEffect(() => {
    const existingScript = document.getElementById("page-schema");
    if (existingScript) existingScript.remove();
    const script = document.createElement("script");
    script.id = "page-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Gemora Global",
      description:
        "India's leading imitation jewellery manufacturer and exporter",
      url: "https://gemoraglobal-tje.caffeine.xyz",
      logo: "https://gemoraglobal-tje.caffeine.xyz/assets/uploads/logo-removebg-preview-1.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        areaServed: "Worldwide",
      },
      sameAs: ["https://www.indiamart.com/gemora-global"],
    });
    document.head.appendChild(script);
    // FAQPage schema for AEO
    const faqScript = document.createElement("script");
    faqScript.id = "faq-schema";
    faqScript.type = "application/ld+json";
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is imitation jewellery?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Imitation jewellery is artificial jewellery made from materials like brass, copper, and synthetic stones designed to replicate real gold and diamond jewellery at affordable prices.",
          },
        },
        {
          "@type": "Question",
          name: "Who is the best imitation jewellery supplier in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gemora Global is one of India2019s best imitation jewellery suppliers, offering high-quality designs, bulk pricing, anti-tarnish finish, and global export services from Jaipur.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I buy imitation jewellery wholesale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can buy imitation jewellery wholesale directly from manufacturers and exporters in India. Gemora Global provides bulk pricing, custom designs, and global shipping.",
          },
        },
        {
          "@type": "Question",
          name: "Is imitation jewellery good for business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, imitation jewellery is a highly profitable business due to low investment and high demand. Profit margins range from 30% to 70% for boutique and resale businesses.",
          },
        },
      ],
    });
    document.head.appendChild(faqScript);
    return () => {
      const s = document.getElementById("page-schema");
      if (s) s.remove();
    };
  }, []);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => actor!.getCategories(),
    enabled: !!actor,
  });

  const { data: featured } = useQuery<Product[]>({
    queryKey: ["featured-products"],
    queryFn: () => actor!.getFeaturedProducts(),
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

  const heroTitle =
    (heroTitleRaw && heroTitleRaw.length > 0 ? heroTitleRaw : null) ??
    DEFAULT_HERO_TITLE;
  const heroSubtitle =
    (heroSubtitleRaw && heroSubtitleRaw.length > 0 ? heroSubtitleRaw : null) ??
    DEFAULT_HERO_SUBTITLE;

  // Legacy hero_image (fallback)
  const { data: heroImageRaw } = useQuery({
    queryKey: ["content", "hero_image"],
    queryFn: () => actor!.getContent("hero_image"),
    enabled: !!actor,
  });
  const heroImageFallback =
    (heroImageRaw && heroImageRaw.length > 0 ? heroImageRaw : null) ??
    "/assets/generated/hero-jewellery-banner.dim_1600x700.jpg";

  // Hero slider images
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

  const heroImage1 =
    heroImage1Raw && heroImage1Raw.length > 0
      ? heroImage1Raw
      : heroImageFallback;
  const heroImage2 =
    heroImage2Raw && heroImage2Raw.length > 0 ? heroImage2Raw : null;
  const heroImage3 =
    heroImage3Raw && heroImage3Raw.length > 0 ? heroImage3Raw : null;

  const heroImages = [heroImage1, heroImage2, heroImage3].filter(
    Boolean,
  ) as string[];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const goToPrev = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  const goToNext = () =>
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);

  const displayCategories =
    categories && categories.length > 0 ? categories : SAMPLE_CATEGORIES;
  const displayTestimonials =
    testimonials && testimonials.filter((t) => t.active).length > 0
      ? testimonials.filter((t) => t.active)
      : SAMPLE_TESTIMONIALS;

  const getCategoryImage = (cat: Category) => {
    if (cat.imageUrl && !cat.imageUrl.includes("placehold.co"))
      return cat.imageUrl;
    return CATEGORY_IMAGES[cat.name] || FALLBACK_IMAGE;
  };

  const heroLines = heroTitle.split("\n");

  // Scroll reveal refs
  const statsReveal = useScrollReveal();
  const categoriesReveal = useScrollReveal();
  const whyReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const featuredReveal = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Slider */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
        {/* Slide images */}
        {heroImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Gemora Global — India's Premier Imitation Jewellery Manufacturer & Exporter slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : undefined}
            width={1600}
            height={900}
          />
        ))}

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,6,2,0.78) 0%, rgba(20,12,4,0.65) 50%, rgba(10,6,2,0.75) 100%)",
          }}
        />

        {/* Left arrow */}
        {heroImages.length > 1 && (
          <button
            type="button"
            onClick={goToPrev}
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
        )}

        {/* Right arrow */}
        {heroImages.length > 1 && (
          <button
            type="button"
            onClick={goToNext}
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
        )}

        {/* Dot indicators */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {heroImages.map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-4 h-4 bg-white opacity-100"
                    : "w-2.5 h-2.5 bg-white opacity-50 hover:opacity-75"
                }`}
                data-ocid="hero.toggle"
              />
            ))}
          </div>
        )}

        {/* Hero content */}
        <div className="container text-center relative z-10 px-4">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-xs tracking-widest">
            INDIA'S FINEST JEWELLERY EXPORTER
          </Badge>
          <h1
            aria-label={heroTitle.replace(/\n/g, " ")}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            {heroLines.length > 1 ? (
              <>
                {heroLines[0]}
                <br />
                <span className="text-primary">{heroLines[1]}</span>
                {heroLines[2] && (
                  <>
                    <br />
                    {heroLines[2]}
                  </>
                )}
              </>
            ) : (
              <>
                Best Imitation Jewellery
                <br />
                <span className="text-primary">Exporter in India</span>
                <br />
                &amp; Premium Manufacturer
              </>
            )}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {heroSubtitle.includes("wholesale") ? (
              <>
                Premium handcrafted{" "}
                <Link to="/products" className="text-primary hover:underline">
                  imitation jewellery
                </Link>{" "}
                for wholesalers, boutiques &amp; distributors worldwide. Explore
                our{" "}
                <Link to="/wholesale" className="text-primary hover:underline">
                  wholesale pricing
                </Link>{" "}
                and bulk export options.
              </>
            ) : (
              heroSubtitle
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 transition-transform duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg"
            >
              <Link to="/gallery">View Catalogue</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8 transition-transform duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg"
            >
              <Link to="/contact">Contact for Wholesale</Link>
            </Button>
          </div>
          <p className="text-muted-foreground/60 text-sm mt-8 tracking-widest">
            GLOBAL JEWELLERY. INDIAN CRAFTSMANSHIP.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        ref={statsReveal.ref as React.RefObject<HTMLElement>}
        className="bg-primary/10 border-y border-primary/20 py-8"
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`${
                  statsReveal.visible
                    ? `animate-fade-in-up animate-delay-${(i + 1) * 100}`
                    : "opacity-0"
                }`}
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
        </div>
      </section>

      {/* SEO Body Copy */}
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
            and distributors across more than 15 countries. Based in India's
            jewellery manufacturing heartland, we combine traditional Indian
            craftsmanship with modern anti-tarnish finishing techniques to
            produce fashion jewellery that retails beautifully in international
            markets.
          </p>
          <p>
            Our{" "}
            <Link to="/products" className="text-primary hover:underline">
              collections
            </Link>{" "}
            span necklaces, earrings, bangles, bracelets, rings, maang tikkas,
            and complete bridal jewellery sets. Every piece is crafted under
            strict quality control and finished with anti-tarnish coating to
            ensure long-lasting brilliance — a quality standard that our
            international buyers rely on season after season.
          </p>
          <p>
            With over 10 years of export experience, factory-direct pricing, and
            a catalogue of 500+ seasonal designs, Gemora Global makes it easy
            for overseas buyers to source imitation jewellery at competitive{" "}
            <Link to="/wholesale" className="text-primary hover:underline">
              wholesale prices
            </Link>
            . We offer low MOQs, flexible packaging, and reliable global
            shipping to France, UAE, USA, UK, Europe, Canada, Australia, and
            Singapore.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section
        ref={categoriesReveal.ref as React.RefObject<HTMLElement>}
        className="container py-16"
      >
        <div className="text-center mb-10">
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold mb-3 ${
              categoriesReveal.visible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            Our Collections
          </h2>
          <p className="text-muted-foreground">
            Explore our curated{" "}
            <Link to="/products" className="text-primary hover:underline">
              jewellery categories
            </Link>{" "}
            — from bridal sets to everyday minimal designs
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayCategories.slice(0, 6).map((cat, i) => (
            <Link
              key={String(cat.id)}
              to={`/products?category=${cat.id}`}
              className={`group relative overflow-hidden rounded-lg aspect-square cursor-pointer transition-transform duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg ${
                categoriesReveal.visible
                  ? `animate-fade-in-up animate-delay-${Math.min((i + 1) * 100, 400)}`
                  : "opacity-0"
              }`}
            >
              <img
                src={getCategoryImage(cat)}
                alt={`${cat.name} - handcrafted imitation jewellery by Gemora Global`}
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
            className="border-primary text-primary hover:bg-primary/10 transition-transform duration-200 hover:scale-[1.03]"
          >
            <Link to="/products">View All Collections</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      {featured && featured.length > 0 && (
        <section
          ref={featuredReveal.ref as React.RefObject<HTMLElement>}
          className="bg-card py-16"
        >
          <div className="container">
            <div className="text-center mb-10">
              <h2
                className={`font-serif text-3xl md:text-4xl font-bold mb-3 ${
                  featuredReveal.visible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Bestselling designs loved by{" "}
                <Link
                  to="/global-markets"
                  className="text-primary hover:underline"
                >
                  buyers worldwide
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.slice(0, 8).map((product, i) => (
                <Link
                  key={String(product.id)}
                  to={`/products/${product.id}`}
                  className={`${
                    featuredReveal.visible
                      ? `animate-fade-in-up animate-delay-${Math.min((i + 1) * 100, 400)}`
                      : "opacity-0"
                  }`}
                >
                  <Card className="overflow-hidden group hover:border-primary/50 transition-all duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.imageUrls[0] || FALLBACK_IMAGE}
                        alt={`${product.name} - imitation jewellery by Gemora Global`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width={400}
                        height={400}
                      />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        MOQ: {product.moq}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global Markets */}
      <section className="container py-16">
        <div className="text-center mb-10">
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
        <div className="flex flex-wrap justify-center gap-6">
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
              className="flex flex-col items-center gap-2 bg-card border border-border rounded-lg p-4 min-w-[80px] hover:border-primary/50 transition-all duration-200 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-3xl">{m.flag}</span>
              <span className="text-xs font-medium text-muted-foreground">
                {m.country}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 transition-transform duration-200 hover:scale-[1.03]"
          >
            <Link to="/global-markets">View All Markets</Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        ref={whyReveal.ref as React.RefObject<HTMLElement>}
        className="bg-card py-16"
      >
        <div className="container">
          <div className="text-center mb-10">
            <h2
              className={`font-serif text-3xl md:text-4xl font-bold mb-3 ${
                whyReveal.visible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              Why Choose Gemora Global
            </h2>
            <p className="text-muted-foreground">
              The preferred{" "}
              <Link
                to="/why-choose-us"
                className="text-primary hover:underline"
              >
                wholesale jewellery supplier
              </Link>{" "}
              for international buyers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <div
                key={item.title}
                className={`text-center p-6 rounded-lg bg-background border border-border hover:border-primary/50 transition-all duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg ${
                  whyReveal.visible
                    ? `animate-fade-in-up animate-delay-${(i + 1) * 100}`
                    : "opacity-0"
                }`}
              >
                <div className="text-4xl mb-4" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="font-serif font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/why-choose-us"
              className="text-primary hover:underline text-sm font-medium"
            >
              Learn why buyers trust us →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsReveal.ref as React.RefObject<HTMLElement>}
        className="container py-16"
      >
        <div className="text-center mb-10">
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold mb-3 ${
              testimonialsReveal.visible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            What Buyers Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTestimonials.slice(0, 3).map((t, i) => (
            <Card
              key={String(t.id)}
              className={`p-6 bg-card border-border hover:border-primary/40 transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                testimonialsReveal.visible
                  ? `animate-fade-in-up animate-delay-${(i + 1) * 100}`
                  : "opacity-0"
              }`}
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
      </section>

      {/* Instagram Grid */}
      <section className="bg-card border-y border-border py-16">
        <div className="container">
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
                className="aspect-square overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:scale-[1.05] hover:-translate-y-0.5 hover:shadow-md group block"
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
          <div className="text-center mt-6">
            <a
              href="https://instagram.com/gemoraglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
            >
              View on Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="container py-16">
        <div className="text-center mb-6">
          <h2 className="font-serif text-3xl font-bold mb-3">
            Jewellery Export Insights
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Sourcing guides, trend reports, and MOQ advice for wholesale buyers.
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
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-md"
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
      </section>

      {/* Catalogue Download + Inquiry CTA */}
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
            >
              <Link to="/contact">Send Inquiry Now</Link>
            </Button>
            <a
              href="/catalogue.pdf"
              download
              className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg"
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

      {/* Our Services — internal link hub for all SEO pages */}
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
                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border hover:border-blue-700/50 hover:bg-blue-700/5 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-ocid="home.link"
              >
                <span className="text-sky-500">&rsaquo;</span>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AEO: People Also Ask Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-serif font-bold text-primary mb-8 text-center">
            People Also Ask
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is imitation jewellery?",
                a: "Imitation jewellery is artificial jewellery made from materials like brass, copper, and synthetic stones designed to replicate real gold and diamond jewellery at affordable prices. It is widely used for fashion, bridal wear, and resale businesses.",
              },
              {
                q: "Who is the best imitation jewellery supplier in India?",
                a: "India has many suppliers, but the best imitation jewellery supplier offers high-quality designs, bulk pricing, and export services. Gemora Global focuses on wholesale and international buyers with trending jewellery collections from Jaipur.",
              },
              {
                q: "Where can I buy imitation jewellery wholesale?",
                a: "You can buy imitation jewellery wholesale directly from manufacturers and exporters in India. Wholesale suppliers provide bulk pricing, custom designs, and global shipping for resellers and boutique owners.",
              },
              {
                q: "Is imitation jewellery good for business?",
                a: "Yes, imitation jewellery is a highly profitable business due to low investment and high demand. It is ideal for resellers, boutiques, and online sellers targeting fashion and bridal markets.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="bg-background border border-border rounded-lg p-4"
              >
                <summary className="font-semibold cursor-pointer text-foreground">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
