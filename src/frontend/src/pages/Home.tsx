import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import type { Category, Product, Testimonial } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";

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
  "India's Leading Imitation\nJewellery Manufacturer & Global Exporter";
const DEFAULT_HERO_SUBTITLE =
  "Premium handcrafted designs for wholesalers, boutiques & distributors worldwide.";

export default function Home() {
  const { actor } = useActor();

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

  // Split hero title on newlines for display
  const heroLines = heroTitle.split("\n");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center pt-16"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-jewellery-banner.dim_1600x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,6,2,0.78) 0%, rgba(20,12,4,0.65) 50%, rgba(10,6,2,0.75) 100%)",
          }}
        />
        <div className="container text-center relative z-10 px-4">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-xs tracking-widest">
            INDIA'S FINEST JEWELLERY EXPORTER
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
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
                India's Leading Imitation
                <br />
                <span className="text-primary">Jewellery Manufacturer</span>
                <br />& Global Exporter
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
                for wholesalers, boutiques & distributors worldwide. Explore our{" "}
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
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              <Link to="/gallery">View Catalogue</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8"
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
      <section className="bg-primary/10 border-y border-primary/20 py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
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

      {/* Categories */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
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
          {displayCategories.slice(0, 6).map((cat) => (
            <Link
              key={String(cat.id)}
              to={`/products?category=${cat.id}`}
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              <img
                src={getCategoryImage(cat)}
                alt={`${cat.name} - handcrafted imitation jewellery by Gemora Global`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

      {/* Featured Products */}
      {featured && featured.length > 0 && (
        <section className="bg-card py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
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
              {featured.slice(0, 8).map((product) => (
                <Link key={String(product.id)} to={`/products/${product.id}`}>
                  <Card className="overflow-hidden group hover:border-primary/50 transition-all">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.imageUrls[0] || FALLBACK_IMAGE}
                        alt={`${product.name} - imitation jewellery by Gemora Global`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
              className="flex flex-col items-center gap-2 bg-card border border-border rounded-lg p-4 min-w-[80px] hover:border-primary/50 transition-colors"
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
            className="border-primary text-primary hover:bg-primary/10"
          >
            <Link to="/export">View All Markets</Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-card py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
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
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl mb-4" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="font-serif font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
            What Buyers Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTestimonials.slice(0, 3).map((t) => (
            <Card
              key={String(t.id)}
              className="p-6 bg-card border-border hover:border-primary/40 transition-colors"
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
                className="aspect-square overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-colors group block"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10"
            >
              <Link to="/contact">Send Inquiry Now</Link>
            </Button>
            <a
              href="/catalogue.pdf"
              download
              className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg text-sm font-medium transition-colors"
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

      <Footer />
    </div>
  );
}
