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
import {
  Eye,
  Grid3X3,
  List,
  MessageCircle,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";
import { usePageSEO } from "../hooks/usePageSEO";
import type { Category, Product } from "../types";

// ─── Static fallback data ─────────────────────────────────────────────────────

const CATEGORY_IMAGES: Record<string, string> = {
  Necklaces: "/assets/generated/product-necklace.dim_600x600.jpg",
  Earrings: "/assets/generated/product-earrings.dim_600x600.jpg",
  Bracelets: "/assets/generated/product-bracelets.dim_600x600.jpg",
  Bangles: "/assets/generated/product-bangles.dim_600x600.jpg",
  Rings: "/assets/generated/product-rings.dim_600x600.jpg",
  "Bridal Jewellery": "/assets/generated/product-bridal.dim_600x600.jpg",
  "Minimal Fashion Jewellery":
    "/assets/generated/product-minimal.dim_600x600.jpg",
};

const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 1n,
    name: "Necklaces",
    description: "Gold-plated, oxidised & kundan necklaces",
    imageUrl: "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "Earrings",
    description: "Jhumka, stud, hoop & dangler earrings",
    imageUrl: "/assets/generated/jewellery-earrings-hd.dim_800x800.jpg",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Bracelets",
    description: "Elegant bracelet designs for wholesale",
    imageUrl: "/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg",
    sortOrder: 3n,
  },
  {
    id: 4n,
    name: "Bangles",
    description: "Traditional & designer bangles",
    imageUrl: "/assets/generated/product-bangles.dim_600x600.jpg",
    sortOrder: 4n,
  },
  {
    id: 5n,
    name: "Rings",
    description: "Statement rings — bulk artificial jewellery",
    imageUrl: "/assets/generated/jewellery-rings-hd.dim_800x800.jpg",
    sortOrder: 5n,
  },
  {
    id: 6n,
    name: "Bridal Jewellery",
    description: "Complete bridal sets for export",
    imageUrl: "/assets/generated/jewellery-bridal-hd.dim_800x800.jpg",
    sortOrder: 6n,
  },
  {
    id: 7n,
    name: "Minimal Fashion Jewellery",
    description: "Contemporary minimal designs",
    imageUrl: "/assets/generated/jewellery-minimal-hd.dim_800x800.jpg",
    sortOrder: 7n,
  },
];

type NormalizedProduct = {
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

const SAMPLE_PRODUCTS: NormalizedProduct[] = [
  {
    id: 101n,
    name: "Kundan Choker Necklace Set",
    description:
      "Heavy kundan choker with matching earrings, gold-plated brass, anti-tarnish. Perfect for bridal boutiques in UK & UAE.",
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
  {
    id: 201n,
    name: "Gold Jhumka Earrings",
    description:
      "Classic gold-plated jhumka with meenakari work. Top seller for South Asian diaspora markets.",
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
      "Oxidised silver dangler earrings with intricate tribal patterns. Boho bestseller for European boutiques.",
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
      "Heavy kundan-set gold kada bracelet. Bridal and festive occasions. Velvet box packaging included.",
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
      "Oxidised silver tribal design ring. Adjustable size. Popular boho style in France & UK.",
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
  {
    id: 701n,
    name: "Dainty Chain Layering Set",
    description:
      "Set of 3 dainty gold chains for layering. Bestseller in French and Scandinavian boutiques.",
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
];

// ─── Quick View Modal ─────────────────────────────────────────────────────────

interface QuickViewModalProps {
  product: NormalizedProduct | null;
  open: boolean;
  onClose: () => void;
}

function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  if (!product) return null;
  const img =
    product.imageUrls[0] ||
    "/assets/generated/product-necklace.dim_600x600.jpg";
  const waMsg = encodeURIComponent(
    `Hi GEMORA GLOBAL, I'm interested in ${product.name} (MOQ: ${product.moq}). Please share wholesale pricing.`,
  );
  const waLink = `https://wa.me/917976341419?text=${waMsg}`;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-muted aspect-square md:aspect-auto">
            <img
              src={img}
              alt={`${product.name} — wholesale imitation jewellery Jaipur India`}
              className="w-full h-full object-cover"
              width={480}
              height={480}
              loading="lazy"
            />
            {product.featured && (
              <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                Featured
              </span>
            )}
            {/* MOQ badge */}
            <span className="badge-moq">Min. Qty: {product.moq}</span>
          </div>
          {/* Details */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="font-serif text-xl leading-snug">
                {product.name}
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5 text-sm">
              {product.metal && (
                <>
                  <span className="text-muted-foreground font-medium">
                    Metal / Finish
                  </span>
                  <span className="text-foreground">{product.metal}</span>
                </>
              )}
              {product.occasion && (
                <>
                  <span className="text-muted-foreground font-medium">
                    Occasion
                  </span>
                  <span className="text-foreground">{product.occasion}</span>
                </>
              )}
              {product.style && (
                <>
                  <span className="text-muted-foreground font-medium">
                    Style
                  </span>
                  <span className="text-foreground">{product.style}</span>
                </>
              )}
              {product.priceRange && (
                <>
                  <span className="text-muted-foreground font-medium">
                    Price Range
                  </span>
                  <span className="text-foreground">{product.priceRange}</span>
                </>
              )}
              <span className="text-muted-foreground font-medium">Stock</span>
              <span className="text-green-600 font-semibold text-xs">
                In Stock
              </span>
            </div>

            {/* MOQ highlight */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-5 flex items-center gap-3">
              <span className="text-destructive font-bold text-lg">📦</span>
              <div>
                <p className="text-xs text-muted-foreground leading-none mb-0.5">
                  Minimum Order Quantity
                </p>
                <p className="font-bold text-destructive">{product.moq}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
                data-ocid="quickview.whatsapp_cta"
              >
                <MessageCircle className="w-4 h-4" />
                Send Inquiry via WhatsApp
              </a>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5 text-sm"
              >
                <Link
                  to={`/products/${product.id}`}
                  onClick={onClose}
                  data-ocid="quickview.view_details"
                >
                  View Full Details →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Inquiry Modal ────────────────────────────────────────────────────────────

interface InquiryModalProps {
  product: NormalizedProduct | null;
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
        product ? [product.id] : [],
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
              data-ocid="inquiry.submit"
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

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {title}
      </h3>
      <div className="space-y-1.5">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onToggle(opt)}
              className="accent-primary w-3.5 h-3.5"
            />
            <span className="text-sm text-foreground group-hover:text-primary transition-colors">
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
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
  const toggle = (key: keyof FilterState, value: string) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
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
        <h2 className="font-semibold text-sm uppercase tracking-wider">
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
      <FilterGroup
        title="Metal / Finish"
        options={METALS}
        selected={filters.metals}
        onToggle={(v) => toggle("metals", v)}
      />
      <FilterGroup
        title="Occasion"
        options={OCCASIONS}
        selected={filters.occasions}
        onToggle={(v) => toggle("occasions", v)}
      />
      <FilterGroup
        title="Style"
        options={STYLES}
        selected={filters.styles}
        onToggle={(v) => toggle("styles", v)}
      />
      <FilterGroup
        title="Price Range"
        options={PRICE_RANGES}
        selected={filters.priceRanges}
        onToggle={(v) => toggle("priceRanges", v)}
      />
      <div className="text-xs text-muted-foreground border-t border-border pt-3">
        Showing {filteredCount} of {totalCount} products
      </div>
    </aside>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: NormalizedProduct;
  onQuickView: (p: NormalizedProduct) => void;
  onInquiry: (p: NormalizedProduct) => void;
  getImage: (p: NormalizedProduct) => string;
}

function ProductCard({
  product,
  onQuickView,
  onInquiry,
  getImage,
}: ProductCardProps) {
  return (
    <div
      className="product-card group relative flex flex-col"
      data-ocid={`product-card.${product.id}`}
    >
      {/* Image with hover zoom */}
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/products/${product.id}`} tabIndex={-1}>
          <img
            src={getImage(product)}
            alt={`${product.name} — wholesale imitation jewellery Jaipur India`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={400}
            height={400}
          />
        </Link>

        {/* Featured badge */}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide z-10">
            Featured
          </span>
        )}

        {/* Metal badge */}
        {product.metal && (
          <span className="absolute top-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-full z-10">
            {product.metal}
          </span>
        )}

        {/* MOQ badge — bottom right, always visible */}
        <span className="badge-moq z-10">Min. Qty: {product.moq}</span>

        {/* Quick view overlay — appears on hover */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          aria-label={`Quick view ${product.name}`}
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
          data-ocid={`product-card.quickview.${product.id}`}
        >
          <span className="flex items-center gap-1.5 bg-card text-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-elevated translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </span>
        </button>
      </div>

      {/* Card body */}
      <div className="p-3 flex-1 flex flex-col">
        <Link to={`/products/${product.id}`} className="block mb-1">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2 flex-1">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.occasion && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {product.occasion}
            </Badge>
          )}
          {product.style && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {product.style}
            </Badge>
          )}
        </div>

        <Button
          size="sm"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-8"
          onClick={() => onInquiry(product)}
          data-ocid={`product-card.inquiry.${product.id}`}
        >
          Get Wholesale Quote
        </Button>
      </div>
    </div>
  );
}

// ─── Main Products Page ───────────────────────────────────────────────────────

export default function Products() {
  usePageSEO({
    title:
      "Wholesale Imitation Jewellery Products — 500+ Designs | Gemora Global Jaipur",
    description:
      "Browse Gemora Global's wholesale imitation jewellery — necklaces, earrings, bangles, bracelets, rings, bridal sets. MOQ 50 pcs. Anti-tarnish finish. Export to 50+ countries from Jaipur, India.",
    canonical: "https://gemoraglobal-tje.caffeine.xyz/products",
    ogTitle: "Wholesale Imitation Jewellery — 500+ Designs | Gemora Global",
    ogImage: "https://gemoraglobal-tje.caffeine.xyz/images/og-products.jpg",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        url: "https://gemoraglobal-tje.caffeine.xyz/products",
        name: "Wholesale Imitation Jewellery Products | Gemora Global",
        description:
          "500+ wholesale imitation jewellery designs — necklaces, earrings, bangles, rings, bridal sets. Manufacturer from Jaipur, India.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://gemoraglobal-tje.caffeine.xyz/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Products",
              item: "https://gemoraglobal-tje.caffeine.xyz/products",
            },
          ],
        },
      },
    ],
  });

  const { actor } = useActor();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCatId = searchParams.get("category");

  const [quickViewProduct, setQuickViewProduct] =
    useState<NormalizedProduct | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] =
    useState<NormalizedProduct | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
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
    queryFn: () => actor!.getProducts(activeCatId ? [BigInt(activeCatId)] : []),
    enabled: !!actor,
  });

  const displayCategories =
    categories && categories.length > 0 ? categories : SAMPLE_CATEGORIES;

  const allProducts: NormalizedProduct[] = useMemo(() => {
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

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (activeCatId)
      result = result.filter((p) => String(p.categoryId) === activeCatId);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (filters.metals.length > 0)
      result = result.filter((p) => filters.metals.includes(p.metal));
    if (filters.occasions.length > 0)
      result = result.filter((p) => filters.occasions.includes(p.occasion));
    if (filters.styles.length > 0)
      result = result.filter((p) => filters.styles.includes(p.style));
    if (filters.priceRanges.length > 0)
      result = result.filter((p) => filters.priceRanges.includes(p.priceRange));
    if (sort === "featured")
      result = [...result].sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
      );
    else if (sort === "name_asc")
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "name_desc")
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    return result;
  }, [allProducts, activeCatId, search, filters, sort]);

  const activeFilterCount =
    filters.metals.length +
    filters.occasions.length +
    filters.styles.length +
    filters.priceRanges.length;

  const getProductImage = (p: NormalizedProduct) => {
    if (p.imageUrls.length > 0 && !p.imageUrls[0].includes("placehold.co"))
      return p.imageUrls[0];
    return (
      CATEGORY_IMAGES[
        displayCategories.find((c) => c.id === p.categoryId)?.name ?? ""
      ] || "/assets/generated/product-necklace.dim_600x600.jpg"
    );
  };

  const getCategoryImage = (cat: Category) => {
    if (cat.imageUrl && !cat.imageUrl.includes("placehold.co"))
      return cat.imageUrl;
    return (
      CATEGORY_IMAGES[cat.name] ||
      "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Page hero */}
        <div className="bg-card border-b border-border py-8">
          <div className="container">
            {/* Breadcrumb */}
            <nav
              className="text-xs text-muted-foreground mb-3 flex items-center gap-1"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">Products</span>
            </nav>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Wholesale Imitation Jewellery — 500+ Designs
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm">
              Bulk artificial jewellery manufacturer from Jaipur, India —
              premium imitation jewellery for boutiques, distributors &amp;
              wholesale buyers worldwide. MOQ starts at 50 pcs.
            </p>
          </div>
        </div>

        {/* Sticky category tabs */}
        <div className="bg-card border-b border-border sticky top-16 z-20 shadow-sm">
          <div className="container">
            <div
              className="flex gap-1 overflow-x-auto py-2.5 scrollbar-hide"
              data-ocid="category.tabs"
            >
              <button
                type="button"
                onClick={() => setSearchParams(new URLSearchParams())}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${!activeCatId ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary hover:text-primary"}`}
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
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${activeCatId === String(cat.id) ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary hover:text-primary"}`}
                  data-ocid={`category.tab.${cat.id}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container py-6">
          {/* Controls bar */}
          <div className="flex flex-wrap gap-3 items-center mb-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
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
                data-ocid="products.search"
              />
            </div>

            {/* Filter toggle — mobile */}
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-sm hover:border-primary transition-colors"
              data-ocid="products.filter_toggle"
            >
              <SlidersHorizontal className="w-4 h-4" />
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
              data-ocid="products.sort"
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
                aria-label="Grid view"
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                <Grid3X3 className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                <List className="w-4 h-4" aria-hidden="true" />
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
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            [key]: prev[key].filter((x) => x !== v),
                          }))
                        }
                        className="hover:text-destructive transition-colors ml-0.5"
                        aria-label={`Remove ${v} filter`}
                      >
                        <X className="w-3 h-3" />
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
            {/* Desktop sidebar */}
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

            {/* Mobile sidebar drawer */}
            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setSidebarOpen(false)}
                  role="button"
                  tabIndex={-1}
                  aria-label="Close filters"
                  onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
                />
                <div className="relative ml-auto w-72 bg-background h-full overflow-y-auto p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Filters</span>
                    <button
                      type="button"
                      onClick={() => setSidebarOpen(false)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label="Close filters"
                    >
                      <X className="w-5 h-5" />
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
              {/* Category showcase */}
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
                        className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer border border-border hover:border-primary hover:shadow-md transition-all"
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
                          <p className="font-semibold text-white text-sm drop-shadow">
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
                  className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}
                >
                  {Array.from({ length: 8 }, (_, i) => `sk-${i}`).map((k) => (
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

                  {viewMode === "grid" ? (
                    <div
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                      data-ocid="products.grid"
                    >
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={String(product.id)}
                          product={product}
                          onQuickView={(p) => {
                            setQuickViewProduct(p);
                            setQuickViewOpen(true);
                          }}
                          onInquiry={(p) => {
                            setInquiryProduct(p);
                            setInquiryOpen(true);
                          }}
                          getImage={getProductImage}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className="flex flex-col gap-3"
                      data-ocid="products.list"
                    >
                      {filteredProducts.map((product) => (
                        <div
                          key={String(product.id)}
                          className="flex gap-4 rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card p-3"
                          data-ocid={`product-list-row.${product.id}`}
                        >
                          <Link
                            to={`/products/${product.id}`}
                            className="shrink-0"
                          >
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                              <img
                                src={getProductImage(product)}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                width={96}
                                height={96}
                              />
                              <span className="badge-moq !text-[8px] !px-1.5 !py-1 !bottom-0 !right-0 !rounded-br-lg !rounded-tl-lg !rounded-none !rounded-tr-none !rounded-bl-none">
                                Min {product.moq}
                              </span>
                            </div>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link to={`/products/${product.id}`}>
                              <h3 className="font-semibold text-sm mb-1 hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {product.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
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
                          </div>
                          <div className="shrink-0 self-center flex flex-col gap-2">
                            <Button
                              size="sm"
                              className="bg-primary text-primary-foreground text-xs h-8 whitespace-nowrap"
                              onClick={() => {
                                setInquiryProduct(product);
                                setInquiryOpen(true);
                              }}
                            >
                              Get Quote
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-8"
                              onClick={() => {
                                setQuickViewProduct(product);
                                setQuickViewOpen(true);
                              }}
                            >
                              <Eye className="w-3 h-3 mr-1" /> Quick View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="text-center py-20"
                  data-ocid="products.empty_state"
                >
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

              {/* SEO content block */}
              <div className="bg-muted/40 border border-border rounded-xl p-6 mt-10">
                <h2 className="font-serif text-lg font-bold mb-3">
                  Export Quality Wholesale Imitation Jewellery from Jaipur,
                  India
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  Gemora Global is a leading{" "}
                  <Link
                    to="/wholesale"
                    className="text-primary hover:underline"
                  >
                    bulk artificial jewellery manufacturer
                  </Link>{" "}
                  from Jaipur, India's jewellery capital. We supply premium
                  imitation jewellery to wholesale buyers in USA, UK, France,
                  UAE, and 50+ countries. Our catalogue covers necklaces,
                  earrings, bangles, bracelets, rings, and bridal sets in
                  gold-plated, silver-plated, rose gold, and oxidised finishes.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  MOQ starts at just 50 pieces per design.{" "}
                  <Link to="/contact" className="text-primary hover:underline">
                    Contact us
                  </Link>{" "}
                  for the latest catalogue and wholesale pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <QuickViewModal
        product={quickViewProduct}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
      <InquiryModal
        product={inquiryProduct}
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </div>
  );
}
