import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import type { Category, Product } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";
import { usePageSEO } from "../hooks/usePageSEO";

// ─── Static Data ─────────────────────────────────────────────────────────────

const CATEGORY_IMAGES: Record<string, string> = {
  Necklaces: "/assets/generated/product-necklace.dim_600x600.jpg",
  Earrings: "/assets/generated/product-earrings.dim_600x600.jpg",
  Bracelets: "/assets/generated/product-bracelets.dim_600x600.jpg",
  Bangles: "/assets/generated/product-bangles.dim_600x600.jpg",
  Rings: "/assets/generated/product-rings.dim_600x600.jpg",
  "Bridal Jewellery": "/assets/generated/product-bridal.dim_600x600.jpg",
  "Minimal Fashion": "/assets/generated/product-minimal.dim_600x600.jpg",
  "Minimal Fashion Jewellery":
    "/assets/generated/product-minimal.dim_600x600.jpg",
};

const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 1n,
    name: "Necklaces",
    description: "Gold-plated, oxidised & kundan necklaces for wholesale",
    imageUrl: "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "Earrings",
    description: "Jhumka, stud, hoop & dangler earrings for bulk orders",
    imageUrl: "/assets/generated/jewellery-earrings-hd.dim_800x800.jpg",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Bracelets",
    description: "Elegant bracelet designs for wholesale fashion jewellery",
    imageUrl: "/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg",
    sortOrder: 3n,
  },
  {
    id: 4n,
    name: "Bangles",
    description: "Traditional & designer bangles for boutiques worldwide",
    imageUrl: "/assets/generated/product-bangles.dim_600x600.jpg",
    sortOrder: 4n,
  },
  {
    id: 5n,
    name: "Rings",
    description:
      "Statement rings — bulk artificial jewellery manufacturer India",
    imageUrl: "/assets/generated/jewellery-rings-hd.dim_800x800.jpg",
    sortOrder: 5n,
  },
  {
    id: 6n,
    name: "Bridal Jewellery",
    description:
      "Complete bridal sets — premium imitation jewellery for export",
    imageUrl: "/assets/generated/jewellery-bridal-hd.dim_800x800.jpg",
    sortOrder: 6n,
  },
  {
    id: 7n,
    name: "Minimal Fashion Jewellery",
    description: "Contemporary minimal designs for boutiques",
    imageUrl: "/assets/generated/jewellery-minimal-hd.dim_800x800.jpg",
    sortOrder: 7n,
  },
];

type SampleProduct = {
  id: bigint;
  name: string;
  description: string;
  categoryId: bigint;
  imageUrls: string[];
  moq: string;
  featured: boolean;
  tags: string[];
  metal: string;
  occasion: string;
  style: string;
  priceRange: string;
};

const SAMPLE_PRODUCTS: SampleProduct[] = [
  // Necklaces
  {
    id: 101n,
    name: "Kundan Choker Necklace Set",
    description:
      "Heavy kundan choker with matching earrings, gold-plated brass, anti-tarnish coated. Perfect for bridal boutiques in UK & UAE.",
    categoryId: 1n,
    imageUrls: ["/assets/generated/product-necklace.dim_600x600.jpg"],
    moq: "50 pcs",
    featured: true,
    tags: ["kundan", "choker", "set"],
    metal: "Gold-plated",
    occasion: "Bridal",
    style: "Traditional",
    priceRange: "Premium",
  },
  {
    id: 102n,
    name: "Layered Chain Necklace",
    description:
      "Delicate 3-layer gold chain necklace. Trending in European boutique markets. Light weight, anti-tarnish finish.",
    categoryId: 1n,
    imageUrls: ["/assets/generated/jewellery-necklace-hd.dim_800x800.jpg"],
    moq: "100 pcs",
    featured: false,
    tags: ["layered", "chain", "minimal"],
    metal: "Gold-plated",
    occasion: "Casual",
    style: "Modern",
    priceRange: "Budget",
  },
  {
    id: 103n,
    name: "Oxidised Silver Long Haar",
    description:
      "Oxidised silver long necklace with tribal motifs. Popular in France & UAE boutique markets.",
    categoryId: 1n,
    imageUrls: ["/assets/generated/product-necklace.dim_600x600.jpg"],
    moq: "50 pcs",
    featured: false,
    tags: ["oxidised", "long", "tribal"],
    metal: "Silver-plated",
    occasion: "Festive",
    style: "Boho",
    priceRange: "Mid-range",
  },
  {
    id: 104n,
    name: "Rose Gold Collar Necklace",
    description:
      "Contemporary rose gold collar necklace with CZ stones. Bestseller in USA & Canada fashion boutiques.",
    categoryId: 1n,
    imageUrls: ["/assets/generated/jewellery-necklace-hd.dim_800x800.jpg"],
    moq: "75 pcs",
    featured: true,
    tags: ["rose gold", "collar", "CZ"],
    metal: "Rose Gold",
    occasion: "Party",
    style: "Modern",
    priceRange: "Mid-range",
  },
  // Earrings
  {
    id: 201n,
    name: "Gold Jhumka Earrings",
    description:
      "Classic gold-plated jhumka with meenakari work. One of our top sellers for South Asian diaspora markets.",
    categoryId: 2n,
    imageUrls: ["/assets/generated/product-earrings.dim_600x600.jpg"],
    moq: "100 pairs",
    featured: true,
    tags: ["jhumka", "meenakari", "classic"],
    metal: "Gold-plated",
    occasion: "Festive",
    style: "Traditional",
    priceRange: "Budget",
  },
  {
    id: 202n,
    name: "Chandbali Earrings",
    description:
      "Crescent moon chandbali with kundan and pearl drops. Popular bridal piece for UK & UAE boutiques.",
    categoryId: 2n,
    imageUrls: ["/assets/generated/jewellery-earrings-hd.dim_800x800.jpg"],
    moq: "50 pairs",
    featured: true,
    tags: ["chandbali", "pearl", "kundan"],
    metal: "Gold-plated",
    occasion: "Bridal",
    style: "Traditional",
    priceRange: "Premium",
  },
  {
    id: 203n,
    name: "Geometric Hoop Earrings",
    description:
      "Minimalist geometric gold hoops. Trending in French and European markets. Very lightweight.",
    categoryId: 2n,
    imageUrls: ["/assets/generated/product-earrings.dim_600x600.jpg"],
    moq: "100 pairs",
    featured: false,
    tags: ["hoop", "geometric", "minimal"],
    metal: "Gold-plated",
    occasion: "Casual",
    style: "Modern",
    priceRange: "Budget",
  },
  {
    id: 204n,
    name: "Oxidised Tribal Danglers",
    description:
      "Oxidised silver dangler earrings with intricate tribal patterns. Boho-style bestseller for European boutiques.",
    categoryId: 2n,
    imageUrls: ["/assets/generated/jewellery-earrings-hd.dim_800x800.jpg"],
    moq: "50 pairs",
    featured: false,
    tags: ["oxidised", "tribal", "dangler"],
    metal: "Silver-plated",
    occasion: "Casual",
    style: "Boho",
    priceRange: "Budget",
  },
  // Bracelets
  {
    id: 301n,
    name: "Gold Bangle Bracelet Set",
    description:
      "Set of 4 gold-plated thin bangle bracelets with stone accents. Popular stacking set for USA boutiques.",
    categoryId: 3n,
    imageUrls: ["/assets/generated/product-bracelets.dim_600x600.jpg"],
    moq: "50 sets",
    featured: false,
    tags: ["bangle", "set", "stacking"],
    metal: "Gold-plated",
    occasion: "Casual",
    style: "Modern",
    priceRange: "Budget",
  },
  {
    id: 302n,
    name: "Kundan Kada Bracelet",
    description:
      "Heavy kundan-set gold kada bracelet. Bridal and festive occasions. Complete with velvet box packaging.",
    categoryId: 3n,
    imageUrls: ["/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg"],
    moq: "30 pcs",
    featured: true,
    tags: ["kada", "kundan", "bridal"],
    metal: "Gold-plated",
    occasion: "Bridal",
    style: "Traditional",
    priceRange: "Premium",
  },
  // Bangles
  {
    id: 401n,
    name: "Enamel Bangle Set",
    description:
      "Colourful enamel bangles in sets of 12. Vibrant and festive, popular in UAE and South Asian markets.",
    categoryId: 4n,
    imageUrls: ["/assets/generated/product-bangles.dim_600x600.jpg"],
    moq: "100 sets",
    featured: true,
    tags: ["enamel", "colourful", "festive"],
    metal: "Gold-plated",
    occasion: "Festive",
    style: "Traditional",
    priceRange: "Budget",
  },
  {
    id: 402n,
    name: "Stone-studded Bangle Set",
    description:
      "Semi-precious stone studded bangles with anti-tarnish gold plating. Export favourite.",
    categoryId: 4n,
    imageUrls: ["/assets/generated/product-bangles.dim_600x600.jpg"],
    moq: "50 sets",
    featured: false,
    tags: ["stone", "semi-precious"],
    metal: "Gold-plated",
    occasion: "Festive",
    style: "Statement",
    priceRange: "Mid-range",
  },
  // Rings
  {
    id: 501n,
    name: "Statement Cocktail Ring",
    description:
      "Large CZ stone cocktail ring in gold plating. Bestseller for fashion boutiques in North America & Europe.",
    categoryId: 5n,
    imageUrls: ["/assets/generated/product-rings.dim_600x600.jpg"],
    moq: "50 pcs",
    featured: true,
    tags: ["cocktail", "CZ", "statement"],
    metal: "Gold-plated",
    occasion: "Party",
    style: "Statement",
    priceRange: "Mid-range",
  },
  {
    id: 502n,
    name: "Oxidised Tribal Ring",
    description:
      "Oxidised silver tribal design ring. Adjustable size fits most. Popular boho style in France & UK.",
    categoryId: 5n,
    imageUrls: ["/assets/generated/jewellery-rings-hd.dim_800x800.jpg"],
    moq: "100 pcs",
    featured: false,
    tags: ["oxidised", "tribal", "adjustable"],
    metal: "Silver-plated",
    occasion: "Casual",
    style: "Boho",
    priceRange: "Budget",
  },
  // Bridal Jewellery
  {
    id: 601n,
    name: "Full Bridal Jewellery Set",
    description:
      "Complete 7-piece bridal set: necklace, earrings, maang tikka, nath, 2 bangles, matha patti. Gold kundan finish.",
    categoryId: 6n,
    imageUrls: ["/assets/generated/product-bridal.dim_600x600.jpg"],
    moq: "10 sets",
    featured: true,
    tags: ["bridal", "full set", "kundan", "maang tikka"],
    metal: "Gold-plated",
    occasion: "Bridal",
    style: "Traditional",
    priceRange: "Premium",
  },
  {
    id: 602n,
    name: "Polki Bridal Necklace Set",
    description:
      "Traditional polki-work bridal necklace with matching earrings. Top pick for UK and Canada South Asian bridal boutiques.",
    categoryId: 6n,
    imageUrls: ["/assets/generated/jewellery-bridal-hd.dim_800x800.jpg"],
    moq: "20 sets",
    featured: true,
    tags: ["polki", "bridal", "set"],
    metal: "Gold-plated",
    occasion: "Bridal",
    style: "Traditional",
    priceRange: "Premium",
  },
  {
    id: 603n,
    name: "Indo-Western Bridal Set",
    description:
      "Modern Indo-Western bridal set with delicate gold and pearl work. Suits contemporary brides in Western markets.",
    categoryId: 6n,
    imageUrls: ["/assets/generated/product-bridal.dim_600x600.jpg"],
    moq: "15 sets",
    featured: false,
    tags: ["indo-western", "pearl", "modern bridal"],
    metal: "Gold-plated",
    occasion: "Bridal",
    style: "Indo-Western",
    priceRange: "Premium",
  },
  // Minimal Fashion
  {
    id: 701n,
    name: "Dainty Chain Layering Set",
    description:
      "Set of 3 dainty gold chains for layering. Bestseller in French and Scandinavian boutiques. Ultra-lightweight.",
    categoryId: 7n,
    imageUrls: ["/assets/generated/product-minimal.dim_600x600.jpg"],
    moq: "100 sets",
    featured: true,
    tags: ["dainty", "chain", "layering"],
    metal: "Gold-plated",
    occasion: "Casual",
    style: "Minimal",
    priceRange: "Budget",
  },
  {
    id: 702n,
    name: "Geometric Stud Earrings",
    description:
      "Simple geometric gold-plated stud earrings. Minimalist design for everyday wear in European markets.",
    categoryId: 7n,
    imageUrls: ["/assets/generated/jewellery-minimal-hd.dim_800x800.jpg"],
    moq: "100 pairs",
    featured: false,
    tags: ["stud", "geometric", "everyday"],
    metal: "Gold-plated",
    occasion: "Office",
    style: "Minimal",
    priceRange: "Budget",
  },
];

const METALS = [
  "Gold-plated",
  "Silver-plated",
  "Rose Gold",
  "Oxidised",
  "Rhodium",
];
const OCCASIONS = ["Bridal", "Festive", "Party", "Casual", "Office"];
const STYLES = [
  "Traditional",
  "Modern",
  "Indo-Western",
  "Minimal",
  "Statement",
  "Boho",
];
const PRICE_RANGES = ["Budget", "Mid-range", "Premium"];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured First" },
  { value: "name_asc", label: "Name: A–Z" },
  { value: "name_desc", label: "Name: Z–A" },
  { value: "newest", label: "Newest" },
];

// ─── Inquiry Modal ────────────────────────────────────────────────────────────

interface InquiryModalProps {
  product: SampleProduct | Product | null;
  open: boolean;
  onClose: () => void;
}

function InquiryModal({ product, open, onClose }: InquiryModalProps) {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    country: "",
    whatsapp: "",
    requirement: "",
  });

  const mutation = useMutation({
    mutationFn: () =>
      actor!.submitInquiry(
        form.name,
        form.country,
        form.whatsapp,
        form.requirement,
        product && "id" in product ? (product.id as bigint) : null,
      ),
    onSuccess: () => {
      toast.success("Inquiry sent! We'll contact you shortly.");
      setForm({ name: "", country: "", whatsapp: "", requirement: "" });
      onClose();
    },
    onError: () => toast.error("Failed to send. Please try WhatsApp."),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">
            {product ? `Inquire: ${product.name}` : "Wholesale Inquiry"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="inq-name">Your Name *</Label>
            <Input
              id="inq-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Full name"
              required
            />
          </div>
          <div>
            <Label htmlFor="inq-country">Country *</Label>
            <Input
              id="inq-country"
              value={form.country}
              onChange={(e) =>
                setForm((f) => ({ ...f, country: e.target.value }))
              }
              placeholder="Your country"
              required
            />
          </div>
          <div>
            <Label htmlFor="inq-whatsapp">WhatsApp Number *</Label>
            <Input
              id="inq-whatsapp"
              value={form.whatsapp}
              onChange={(e) =>
                setForm((f) => ({ ...f, whatsapp: e.target.value }))
              }
              placeholder="+1 234 567 8900"
              required
            />
          </div>
          <div>
            <Label htmlFor="inq-req">Requirement *</Label>
            <Textarea
              id="inq-req"
              value={form.requirement}
              onChange={(e) =>
                setForm((f) => ({ ...f, requirement: e.target.value }))
              }
              placeholder="Describe your requirement, quantity, budget..."
              rows={3}
              required
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 bg-primary text-primary-foreground"
            >
              {mutation.isPending ? "Sending..." : "Send Inquiry"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

interface FilterState {
  metals: string[];
  occasions: string[];
  styles: string[];
  priceRanges: string[];
}

function FilterSidebar({
  filters,
  setFilters,
  totalCount,
  filteredCount,
}: {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
  filteredCount: number;
}) {
  const toggle = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const clearAll = () =>
    setFilters({ metals: [], occasions: [], styles: [], priceRanges: [] });

  const hasFilters =
    filters.metals.length +
      filters.occasions.length +
      filters.styles.length +
      filters.priceRanges.length >
    0;

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-foreground">
          Filters
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Metal / Finish */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Metal / Finish
        </h3>
        <div className="space-y-1.5">
          {METALS.map((m) => (
            <label
              key={m}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.metals.includes(m)}
                onChange={() => toggle("metals", m)}
                className="accent-primary w-3.5 h-3.5"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {m}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Occasion
        </h3>
        <div className="space-y-1.5">
          {OCCASIONS.map((o) => (
            <label
              key={o}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.occasions.includes(o)}
                onChange={() => toggle("occasions", o)}
                className="accent-primary w-3.5 h-3.5"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {o}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Style */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Style
        </h3>
        <div className="space-y-1.5">
          {STYLES.map((s) => (
            <label
              key={s}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.styles.includes(s)}
                onChange={() => toggle("styles", s)}
                className="accent-primary w-3.5 h-3.5"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Price Range
        </h3>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((p) => (
            <label
              key={p}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.priceRanges.includes(p)}
                onChange={() => toggle("priceRanges", p)}
                className="accent-primary w-3.5 h-3.5"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {p}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground border-t border-border pt-3">
        Showing {filteredCount} of {totalCount} products
      </div>
    </aside>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Products() {
  usePageSEO({
    title:
      "Wholesale Imitation Jewellery Products — Necklaces, Earrings, Bridal Sets | Gemora Global",
    description:
      "Browse Gemora Global's wholesale imitation jewellery range — necklaces, earrings, bangles, bracelets, rings, maang tikkas, and bridal jewellery sets. 500+ designs, anti-tarnish finish, MOQ-friendly pricing.",
    canonical: "https://gemoraglobal-tje.caffeine.xyz/products",
    ogTitle:
      "Wholesale Imitation Jewellery — Necklaces, Earrings, Bridal Sets | Gemora Global",
    ogImage: "https://gemoraglobal-tje.caffeine.xyz/images/og-products.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      url: "https://gemoraglobal-tje.caffeine.xyz/products",
      name: "Wholesale Imitation Jewellery Products",
      description:
        "500+ wholesale imitation jewellery designs including necklaces, earrings, bangles, bracelets, rings and bridal sets.",
    },
  });

  const { actor } = useActor();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCatId = searchParams.get("category");

  const [inquiryProduct, setInquiryProduct] = useState<
    SampleProduct | Product | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    metals: [],
    occasions: [],
    styles: [],
    priceRanges: [],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => actor!.getCategories(),
    enabled: !!actor,
  });

  const { data: backendProducts, isLoading: prodsLoading } = useQuery<
    Product[]
  >({
    queryKey: ["products", activeCatId],
    queryFn: () => actor!.getProducts(activeCatId ? BigInt(activeCatId) : null),
    enabled: !!actor,
  });

  const displayCategories =
    categories && categories.length > 0 ? categories : SAMPLE_CATEGORIES;

  // Merge backend products with sample products (use backend if available)
  const allProducts: SampleProduct[] = useMemo(() => {
    if (backendProducts && backendProducts.length > 0) {
      return backendProducts.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        categoryId: p.categoryId,
        imageUrls: p.imageUrls,
        moq: p.moq,
        featured: p.featured,
        tags: [],
        metal: "Gold-plated",
        occasion: "Casual",
        style: "Modern",
        priceRange: "Mid-range",
      }));
    }
    return SAMPLE_PRODUCTS;
  }, [backendProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Category filter
    if (activeCatId) {
      result = result.filter((p) => String(p.categoryId) === activeCatId);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Metal filter
    if (filters.metals.length > 0) {
      result = result.filter((p) => filters.metals.includes(p.metal));
    }

    // Occasion filter
    if (filters.occasions.length > 0) {
      result = result.filter((p) => filters.occasions.includes(p.occasion));
    }

    // Style filter
    if (filters.styles.length > 0) {
      result = result.filter((p) => filters.styles.includes(p.style));
    }

    // Price range filter
    if (filters.priceRanges.length > 0) {
      result = result.filter((p) => filters.priceRanges.includes(p.priceRange));
    }

    // Sort
    if (sort === "featured") {
      result = [...result].sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
      );
    } else if (sort === "name_asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name_desc") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [allProducts, activeCatId, search, filters, sort]);

  const activeFilterCount =
    filters.metals.length +
    filters.occasions.length +
    filters.styles.length +
    filters.priceRanges.length;

  const removeFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].filter((v) => v !== value),
    }));
  };

  const getCategoryImage = (cat: Category) => {
    if (cat.imageUrl && !cat.imageUrl.includes("placehold.co"))
      return cat.imageUrl;
    return (
      CATEGORY_IMAGES[cat.name] ||
      "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg"
    );
  };

  const getProductImage = (p: SampleProduct) => {
    if (
      p.imageUrls &&
      p.imageUrls.length > 0 &&
      !p.imageUrls[0].includes("placehold.co")
    ) {
      return p.imageUrls[0];
    }
    return (
      CATEGORY_IMAGES[
        displayCategories.find((c) => c.id === p.categoryId)?.name ?? ""
      ] || "/assets/generated/product-necklace.dim_600x600.jpg"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <div className="bg-card border-b border-border py-10">
          <div className="container">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Wholesale Imitation Jewellery — 500+ Designs
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm">
              Bulk artificial jewellery manufacturer India — premium imitation
              jewellery for boutiques, distributors &amp; wholesale buyers
              worldwide.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-card border-b border-border sticky top-16 z-20">
          <div className="container">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              <button
                type="button"
                onClick={() => setSearchParams(new URLSearchParams())}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  !activeCatId
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                All
              </button>
              {displayCategories.map((cat) => (
                <button
                  key={String(cat.id)}
                  type="button"
                  onClick={() =>
                    setSearchParams(
                      new URLSearchParams({ category: String(cat.id) }),
                    )
                  }
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    activeCatId === String(cat.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container py-6">
          {/* Search + Controls bar */}
          <div className="flex flex-wrap gap-3 items-center mb-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <svg
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jewellery..."
                className="pl-9 h-9 text-sm"
              />
            </div>

            {/* Filter toggle (mobile) */}
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-sm hover:border-primary transition-colors"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-border rounded-lg px-3 py-1.5 text-sm bg-background text-foreground focus:outline-none focus:border-primary h-9"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            {/* View mode */}
            <div className="flex border border-border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V2zM1 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V7zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V7zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V7zM1 12a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1v-2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                  />
                </svg>
              </button>
            </div>

            <span className="text-sm text-muted-foreground ml-auto">
              {filteredProducts.length} products
            </span>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {(Object.entries(filters) as [keyof FilterState, string[]][]).map(
                ([key, vals]) =>
                  vals.map((v) => (
                    <span
                      key={`${key}-${v}`}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-0.5 text-xs"
                    >
                      {v}
                      <button
                        type="button"
                        onClick={() => removeFilter(key, v)}
                        className="hover:text-red-500 transition-colors ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  )),
              )}
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    metals: [],
                    occasions: [],
                    styles: [],
                    priceRanges: [],
                  })
                }
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-52 shrink-0">
              <div className="sticky top-36 bg-card border border-border rounded-xl p-4">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  totalCount={allProducts.length}
                  filteredCount={filteredProducts.length}
                />
              </div>
            </div>

            {/* Mobile Sidebar Drawer */}
            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setSidebarOpen(false)}
                  onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
                  role="button"
                  tabIndex={-1}
                  aria-label="Close filters"
                />
                <div className="relative ml-auto w-72 bg-background h-full overflow-y-auto p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Filters</span>
                    <button
                      type="button"
                      onClick={() => setSidebarOpen(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    totalCount={allProducts.length}
                    filteredCount={filteredProducts.length}
                  />
                  <Button
                    className="w-full mt-4 bg-primary text-primary-foreground"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Category showcase (when no filters active and showing all) */}
              {!activeCatId && !search && activeFilterCount === 0 && (
                <div className="mb-8">
                  <h2 className="font-serif text-xl font-bold mb-4">
                    Shop by Category
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {displayCategories.map((cat) => (
                      <button
                        key={String(cat.id)}
                        type="button"
                        onClick={() =>
                          setSearchParams(
                            new URLSearchParams({ category: String(cat.id) }),
                          )
                        }
                        className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer border border-border hover:border-primary transition-all"
                      >
                        <img
                          src={getCategoryImage(cat)}
                          alt={`${cat.name} wholesale jewellery`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          width={300}
                          height={300}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                          <p className="font-semibold text-white text-sm">
                            {cat.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {prodsLoading ? (
                <div
                  className={`grid gap-4 ${
                    viewMode === "grid"
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((k) => (
                    <Skeleton key={k} className="aspect-square rounded-lg" />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  {activeCatId && (
                    <h2 className="font-serif text-lg font-bold mb-4">
                      {
                        displayCategories.find(
                          (c) => String(c.id) === activeCatId,
                        )?.name
                      }{" "}
                      Collection
                    </h2>
                  )}
                  <div
                    className={`grid gap-4 ${
                      viewMode === "grid"
                        ? "grid-cols-2 md:grid-cols-3"
                        : "grid-cols-1"
                    }`}
                  >
                    {filteredProducts.map((product) =>
                      viewMode === "grid" ? (
                        <div
                          key={String(product.id)}
                          className="group rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card flex flex-col"
                        >
                          <Link
                            to={`/products/${product.id}`}
                            className="block"
                          >
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src={getProductImage(product)}
                                alt={`${product.name} - wholesale imitation jewellery India`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                width={400}
                                height={400}
                              />
                              {product.featured && (
                                <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  FEATURED
                                </span>
                              )}
                              <div className="absolute top-2 right-2 flex flex-col gap-1">
                                {product.metal && (
                                  <span className="bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-full">
                                    {product.metal}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="p-3">
                              <h3 className="font-semibold text-sm leading-snug mb-1">
                                {product.name}
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {product.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {product.occasion && (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] px-1.5 py-0"
                                  >
                                    {product.occasion}
                                  </Badge>
                                )}
                                {product.style && (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] px-1.5 py-0"
                                  >
                                    {product.style}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                MOQ:{" "}
                                <span className="font-medium text-foreground">
                                  {product.moq}
                                </span>
                              </p>
                            </div>
                          </Link>
                          <div className="px-3 pb-3 mt-auto">
                            <Button
                              size="sm"
                              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-8"
                              onClick={() => {
                                setInquiryProduct(product);
                                setModalOpen(true);
                              }}
                            >
                              Get Wholesale Quote
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // List view
                        <div
                          key={String(product.id)}
                          className="flex gap-4 rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card p-3"
                        >
                          <Link
                            to={`/products/${product.id}`}
                            className="shrink-0"
                          >
                            <div className="w-24 h-24 rounded-lg overflow-hidden">
                              <img
                                src={getProductImage(product)}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                width={96}
                                height={96}
                              />
                            </div>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link to={`/products/${product.id}`}>
                              <h3 className="font-semibold text-sm mb-1">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {product.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {product.metal && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] px-1.5 py-0"
                                >
                                  {product.metal}
                                </Badge>
                              )}
                              {product.occasion && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] px-1.5 py-0"
                                >
                                  {product.occasion}
                                </Badge>
                              )}
                              {product.style && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] px-1.5 py-0"
                                >
                                  {product.style}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              MOQ: {product.moq}
                            </p>
                          </div>
                          <div className="shrink-0 self-center">
                            <Button
                              size="sm"
                              className="bg-primary text-primary-foreground text-xs h-8 whitespace-nowrap"
                              onClick={() => {
                                setInquiryProduct(product);
                                setModalOpen(true);
                              }}
                            >
                              Get Quote
                            </Button>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-5xl mb-4">💎</p>
                  <p className="text-muted-foreground mb-2 font-medium">
                    No products match your filters.
                  </p>
                  <p className="text-muted-foreground text-sm mb-6">
                    Try adjusting or clearing your filters.
                  </p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFilters({
                          metals: [],
                          occasions: [],
                          styles: [],
                          priceRanges: [],
                        });
                        setSearch("");
                        setSearchParams(new URLSearchParams());
                      }}
                    >
                      Clear All Filters
                    </Button>
                    <Button
                      asChild
                      className="bg-primary text-primary-foreground"
                    >
                      <Link to="/contact">Request Custom Catalogue</Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* SEO section */}
              <div className="bg-card border border-border rounded-xl p-6 mt-10">
                <h2 className="font-serif text-lg font-bold mb-3">
                  Export Quality Artificial Jewellery Wholesale — India's Best
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  Gemora Global is India's leading{" "}
                  <Link
                    to="/wholesale"
                    className="text-primary hover:underline"
                  >
                    bulk artificial jewellery manufacturer
                  </Link>
                  , supplying premium imitation jewellery to wholesale buyers in
                  USA, UK, France, UAE, and 50+ countries. Our catalogue covers
                  necklaces, earrings, bangles, bracelets, rings, and complete
                  bridal sets in gold-plated, silver-plated, rose gold, and
                  oxidised finishes.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  MOQ starts at just 50 pieces per design. Contact us for the
                  latest catalogue and wholesale pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <InquiryModal
        product={inquiryProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
