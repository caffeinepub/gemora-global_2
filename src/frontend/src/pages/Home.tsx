import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import type { Category, Product, Testimonial } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";

const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 1n,
    name: "Necklaces",
    description: "Exquisite handcrafted necklaces",
    imageUrl: "https://placehold.co/400x400/1a1a2e/c9a84c?text=Necklaces",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "Earrings",
    description: "Stunning earring collections",
    imageUrl: "https://placehold.co/400x400/1a1a2e/c9a84c?text=Earrings",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Bangles",
    description: "Traditional & modern bangles",
    imageUrl: "https://placehold.co/400x400/1a1a2e/c9a84c?text=Bangles",
    sortOrder: 3n,
  },
  {
    id: 4n,
    name: "Bridal Sets",
    description: "Complete bridal jewellery sets",
    imageUrl: "https://placehold.co/400x400/1a1a2e/c9a84c?text=Bridal+Sets",
    sortOrder: 4n,
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
    icon: "💎",
    title: "Premium Craftsmanship",
    desc: "Each piece handcrafted by skilled artisans with decades of experience.",
  },
  {
    icon: "💰",
    title: "Wholesale Pricing",
    desc: "Competitive bulk pricing with flexible MOQ for businesses of all sizes.",
  },
  {
    icon: "✈️",
    title: "Global Shipping",
    desc: "Reliable export to UAE, USA, UK, Europe and 50+ countries worldwide.",
  },
  {
    icon: "🎨",
    title: "Custom Designs",
    desc: "OEM/ODM services available. Bring your design ideas to life.",
  },
];

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

  const displayCategories =
    categories && categories.length > 0 ? categories : SAMPLE_CATEGORIES;
  const displayTestimonials =
    testimonials && testimonials.filter((t) => t.active).length > 0
      ? testimonials.filter((t) => t.active)
      : SAMPLE_TESTIMONIALS;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center pt-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.10 0.015 285) 0%, oklch(0.18 0.02 285) 50%, oklch(0.12 0.01 285) 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.78 0.12 75 / 0.08) 0%, transparent 60%), radial-gradient(circle at 70% 50%, oklch(0.78 0.12 75 / 0.06) 0%, transparent 60%)",
          }}
        />
        <div className="container text-center relative z-10 px-4">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-xs tracking-widest">
            INDIA'S FINEST JEWELLERY EXPORTER
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            India's Leading Imitation
            <br />
            <span className="text-primary">Jewellery Manufacturer</span>
            <br />& Global Exporter
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Premium handcrafted designs for wholesalers, boutiques &
            distributors worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              data-ocid="hero.primary_button"
            >
              <Link to="/products">View Collection</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8"
              data-ocid="hero.secondary_button"
            >
              <Link to="/contact">Get Wholesale Quote</Link>
            </Button>
          </div>
          <p className="text-muted-foreground/60 text-sm mt-8 tracking-widest">
            GLOBAL JEWELLERY. INDIAN CRAFTSMANSHIP.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
            Our Collections
          </h2>
          <p className="text-muted-foreground">
            Explore our curated jewellery categories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayCategories.map((cat) => (
            <Link
              key={String(cat.id)}
              to={`/products?category=${cat.id}`}
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              <img
                src={
                  cat.imageUrl ||
                  `https://placehold.co/400x400/1a1a2e/c9a84c?text=${encodeURIComponent(cat.name)}`
                }
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-white font-semibold text-lg">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-card py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Bestselling designs loved by buyers worldwide
            </p>
          </div>
          {featured && featured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.slice(0, 8).map((product) => (
                <Link key={String(product.id)} to={`/products/${product.id}`}>
                  <Card className="overflow-hidden group hover:shadow-gold transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={
                          product.imageUrls[0] ||
                          `https://placehold.co/400x400/1a1a2e/c9a84c?text=${encodeURIComponent(product.name)}`
                        }
                        alt={product.name}
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
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-4xl mb-4">💎</p>
              <p>Products are being added. Check back soon!</p>
              <Button
                asChild
                className="mt-4 bg-primary text-primary-foreground"
              >
                <Link to="/contact">Request Catalog</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Export Countries */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold mb-3">
            Trusted by Buyers in
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { flag: "🇦🇪", country: "UAE" },
            { flag: "🇺🇸", country: "USA" },
            { flag: "🇬🇧", country: "UK" },
            { flag: "🇪🇺", country: "Europe" },
            { flag: "🇨🇦", country: "Canada" },
            { flag: "🇦🇺", country: "Australia" },
          ].map((m) => (
            <div key={m.country} className="flex flex-col items-center gap-2">
              <span className="text-4xl">{m.flag}</span>
              <span className="text-sm font-medium text-muted-foreground">
                {m.country}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-card py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Why Choose Gemora Global?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
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
                <div className="flex gap-1 mb-3">
                  {Array.from(Array(Number(t.rating)).keys()).map((n) => (
                    <span
                      key={`${String(t.id)}-star-${n + 1}`}
                      className="text-primary"
                    >
                      ★
                    </span>
                  ))}
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

      {/* Inquiry CTA */}
      <section className="bg-primary/10 border-y border-primary/20 py-16">
        <div className="container text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-primary">
            Ready to Start Wholesale?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Contact us today for pricing, MOQ details, and our latest catalogue.
            We serve buyers worldwide.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10"
          >
            <Link to="/contact">Send Inquiry Now</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
