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
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import type { Category, Product } from "../backend";
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

const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 1n,
    name: "Necklaces",
    description:
      "Export quality artificial jewellery wholesale — gold-plated, oxidised & kundan necklaces",
    imageUrl: "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "Earrings",
    description:
      "Trendy imitation jewellery bulk supplier India — drop, stud & jhumka earrings",
    imageUrl: "/assets/generated/jewellery-earrings-hd.dim_800x800.jpg",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Bracelets",
    description:
      "Elegant bracelet designs for wholesale fashion jewellery suppliers",
    imageUrl: "/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg",
    sortOrder: 3n,
  },
  {
    id: 4n,
    name: "Rings",
    description:
      "Bulk artificial jewellery manufacturer India — statement rings for every occasion",
    imageUrl: "/assets/generated/jewellery-rings-hd.dim_800x800.jpg",
    sortOrder: 4n,
  },
  {
    id: 5n,
    name: "Bridal Jewellery",
    description:
      "Premium imitation jewellery supplier for export — complete bridal sets",
    imageUrl: "/assets/generated/jewellery-bridal-hd.dim_800x800.jpg",
    sortOrder: 5n,
  },
  {
    id: 6n,
    name: "Minimal Fashion Jewellery",
    description:
      "Wholesale fashion jewellery suppliers for boutiques — modern minimal designs",
    imageUrl: "/assets/generated/jewellery-minimal-hd.dim_800x800.jpg",
    sortOrder: 6n,
  },
];

interface InquiryModalProps {
  product: Product | null;
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
        product ? product.id : null,
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

export default function Products() {
  const { actor } = useActor();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCatId = searchParams.get("category");
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: categories, isLoading: catsLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => actor!.getCategories(),
    enabled: !!actor,
  });

  const { data: products, isLoading: prodsLoading } = useQuery<Product[]>({
    queryKey: ["products", activeCatId],
    queryFn: () => actor!.getProducts(activeCatId ? BigInt(activeCatId) : null),
    enabled: !!actor,
  });

  const displayCategories =
    categories && categories.length > 0 ? categories : SAMPLE_CATEGORIES;

  const getCategoryImage = (cat: Category) => {
    if (cat.imageUrl && !cat.imageUrl.includes("placehold.co"))
      return cat.imageUrl;
    return (
      CATEGORY_IMAGES[cat.name] ||
      "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg"
    );
  };

  const openInquiry = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    setInquiryProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-card border-b border-border py-12">
          <div className="container">
            <h1 className="font-serif text-4xl font-bold mb-2">
              Export Quality Artificial Jewellery Wholesale
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Bulk artificial jewellery manufacturer India — browse our complete
              collection of premium imitation jewellery for boutiques,
              distributors &amp; wholesale buyers worldwide.
            </p>
          </div>
        </div>

        {/* SEO keyword subheading */}
        {!activeCatId && (
          <div className="bg-primary/5 border-b border-border py-4">
            <div className="container">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-medium">
                  Wholesale fashion jewellery suppliers for boutiques
                </span>{" "}
                — necklaces, earrings, bracelets, rings, bridal sets &amp;
                minimal fashion jewellery. MOQ-friendly bulk orders shipped
                worldwide.
              </p>
            </div>
          </div>
        )}

        <div className="container py-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={!activeCatId ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchParams(new URLSearchParams())}
              className={
                !activeCatId ? "bg-primary text-primary-foreground" : ""
              }
            >
              All
            </Button>
            {displayCategories.map((cat) => (
              <Button
                key={String(cat.id)}
                variant={activeCatId === String(cat.id) ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSearchParams(
                    new URLSearchParams({ category: String(cat.id) }),
                  )
                }
                className={
                  activeCatId === String(cat.id)
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Category Grid when no products filtered */}
          {!activeCatId &&
            (!products || products.length === 0) &&
            !prodsLoading && (
              <>
                <h2 className="font-serif text-2xl font-bold mb-6 text-foreground">
                  Trendy Imitation Jewellery — Bulk Supplier India
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                  {displayCategories.map((cat) => (
                    <button
                      key={String(cat.id)}
                      type="button"
                      onClick={() =>
                        setSearchParams(
                          new URLSearchParams({ category: String(cat.id) }),
                        )
                      }
                      className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer border border-border hover:border-primary/50 transition-all"
                    >
                      <img
                        src={getCategoryImage(cat)}
                        alt={`${cat.name} - wholesale imitation jewellery by Gemora Global`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                        <h3 className="font-serif text-white font-bold text-lg">
                          {cat.name}
                        </h3>
                        <p className="text-white/70 text-sm line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* SEO keyword section */}
                <div className="bg-card border border-border rounded-xl p-6 mb-8">
                  <h2 className="font-serif text-xl font-bold mb-3">
                    Premium Imitation Jewellery Supplier for Export
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Gemora Global is India's best imitation jewellery exporter,
                    supplying{" "}
                    <Link
                      to="/wholesale"
                      className="text-primary hover:underline"
                    >
                      wholesale fashion jewellery
                    </Link>{" "}
                    to boutiques, distributors, and retailers in USA, UK,
                    France, UAE, and 50+ countries. As a leading{" "}
                    <strong>
                      bulk artificial jewellery manufacturer in India
                    </strong>
                    , we offer private label jewellery manufacturing, custom
                    branding, and export-quality finishing on every piece.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Whether you're sourcing{" "}
                    <strong>Indian costume jewellery for the USA market</strong>{" "}
                    or looking for a{" "}
                    <strong>global jewellery wholesale distributor</strong>{" "}
                    based in India, Gemora Global is your trusted partner. MOQ
                    starts at just 50 pieces per design.
                  </p>
                </div>
              </>
            )}

          {/* Products Grid */}
          {catsLoading || prodsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, i) => `sk-${i}`).map((k) => (
                <Skeleton key={k} className="aspect-square rounded-lg" />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={String(product.id)}
                  className="group rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all bg-card flex flex-col"
                >
                  <Link to={`/products/${product.id}`} className="flex-1">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={
                          product.imageUrls[0] ||
                          CATEGORY_IMAGES[product.name] ||
                          "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg"
                        }
                        alt={`${product.name} - export quality artificial jewellery by Gemora Global`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">
                          MOQ: {product.moq}
                        </span>
                        {product.featured && (
                          <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className="px-3 pb-3">
                    <Button
                      size="sm"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                      onClick={(e) => openInquiry(product, e)}
                    >
                      Get Wholesale Quote
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : activeCatId ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">💎</p>
              <p className="text-muted-foreground mb-2 font-medium">
                Our catalogue is being updated.
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                Contact us to request a custom catalogue for{" "}
                {displayCategories.find((c) => String(c.id) === activeCatId)
                  ?.name ?? "this category"}
                .
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Button asChild className="bg-primary text-primary-foreground">
                  <Link to="/contact">Request Catalogue</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary"
                  onClick={() => {
                    setInquiryProduct(null);
                    setModalOpen(true);
                  }}
                >
                  Quick Inquiry
                </Button>
              </div>
            </div>
          ) : null}
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
