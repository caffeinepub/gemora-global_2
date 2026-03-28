import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { GalleryItem } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";
import { usePageSEO } from "../hooks/usePageSEO";
import { getCatalogues } from "../utils/catalogueStore";

const SAMPLE_GALLERY: GalleryItem[] = [
  {
    id: 1n,
    imageUrl: "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg",
    caption: "Gold-plated kundan necklace set wholesale India",
    itemType: "product",
    sortOrder: 1n,
  },
  {
    id: 2n,
    imageUrl: "/assets/generated/jewellery-earrings-hd.dim_800x800.jpg",
    caption: "Oxidised silver jhumka earrings bulk export",
    itemType: "product",
    sortOrder: 2n,
  },
  {
    id: 3n,
    imageUrl: "/assets/generated/jewellery-bridal-hd.dim_800x800.jpg",
    caption: "Bridal jewellery set manufacturer India wholesale",
    itemType: "product",
    sortOrder: 3n,
  },
  {
    id: 4n,
    imageUrl: "/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg",
    caption: "Gold-plated bangle bracelet set wholesale India",
    itemType: "product",
    sortOrder: 4n,
  },
  {
    id: 5n,
    imageUrl: "/assets/generated/jewellery-rings-hd.dim_800x800.jpg",
    caption: "Imitation fashion rings bulk export India",
    itemType: "product",
    sortOrder: 5n,
  },
  {
    id: 6n,
    imageUrl: "/assets/generated/jewellery-minimal-hd.dim_800x800.jpg",
    caption: "Minimal contemporary jewellery wholesale boutique",
    itemType: "product",
    sortOrder: 6n,
  },
];

const FILTER_TYPES = [
  { label: "All", value: "" },
  { label: "Products", value: "product" },
  { label: "Bulk Orders", value: "bulk" },
  { label: "Packaging", value: "packaging" },
];

export default function Gallery() {
  usePageSEO({
    title:
      "Imitation Jewellery Photo Gallery — Wholesale Catalogue | Gemora Global",
    description:
      "View Gemora Global's wholesale imitation jewellery gallery — necklace sets, earrings, bridal jewellery, bangles and more. Request the full digital catalogue for pricing and MOQ details.",
    canonical: "https://gemoraglobal-tje.caffeine.xyz/gallery",
    ogTitle:
      "Imitation Jewellery Photo Gallery — Wholesale Catalogue | Gemora Global",
    ogImage: "https://gemoraglobal-tje.caffeine.xyz/images/og-gallery.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "Gemora Global Jewellery Wholesale Gallery",
      description: "Wholesale imitation jewellery designs from Gemora Global",
      url: "https://gemoraglobal-tje.caffeine.xyz/gallery",
    },
  });
  const { actor } = useActor();
  const [filter, setFilter] = useState("");
  const catalogues = getCatalogues();

  useEffect(() => {
    document.title =
      "Imitation Jewellery Photo Gallery — Wholesale Catalogue | Gemora Global";
    let metaDesc = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "View Gemora Global's wholesale imitation jewellery gallery — necklace sets, earrings, bridal jewellery, bangles and more. Request the full digital catalogue for pricing and MOQ details.",
    );

    const existingScript = document.getElementById("page-schema");
    if (existingScript) existingScript.remove();
    const script = document.createElement("script");
    script.id = "page-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "Gemora Global Jewellery Wholesale Gallery",
      description: "Wholesale imitation jewellery designs from Gemora Global",
      url: "https://gemoraglobal-tje.caffeine.xyz/gallery",
    });
    document.head.appendChild(script);

    return () => {
      document.title =
        "Imitation Jewellery Exporter & Manufacturer in India | Gemora Global";
      const s = document.getElementById("page-schema");
      if (s) s.remove();
    };
  }, []);

  const { data: items, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["gallery", filter],
    queryFn: () => actor!.getGallery(filter || null),
    enabled: !!actor,
  });

  const displayItems =
    items && items.length > 0
      ? items
      : SAMPLE_GALLERY.filter((i) => !filter || i.itemType === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-card border-b border-border py-12">
          <div className="container">
            <h1 className="font-serif text-4xl font-bold mb-3">
              Jewellery Gallery — Browse Our Wholesale Collection
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-4">
              Welcome to the Gemora Global jewellery gallery — a curated
              selection from our 500+{" "}
              <Link to="/products" className="text-primary hover:underline">
                design catalogue
              </Link>
              . New designs are added every season across all categories. Browse
              below and{" "}
              <Link to="/contact" className="text-primary hover:underline">
                contact our team
              </Link>{" "}
              to request the complete digital catalogue with{" "}
              <Link to="/wholesale" className="text-primary hover:underline">
                wholesale pricing
              </Link>{" "}
              and MOQ details.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg text-sm font-medium transition-colors"
              data-ocid="gallery.open_modal_button"
            >
              Request Full Catalogue &amp; Pricing
            </Link>
          </div>
        </div>

        {/* Browse by Category */}
        <div className="container py-8">
          <h2 className="font-serif text-2xl font-bold mb-4">
            Browse by Category
          </h2>
          <div className="flex gap-2 mb-8 flex-wrap">
            {FILTER_TYPES.map((ft) => (
              <Button
                key={ft.value}
                variant={filter === ft.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(ft.value)}
                className={
                  filter === ft.value
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                {ft.label}
              </Button>
            ))}
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
                <Skeleton key={sk} className="aspect-video rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {displayItems.map((item, idx) => (
                <div
                  key={String(item.id)}
                  className="rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={
                        item.caption ||
                        "Imitation jewellery wholesale India — Gemora Global"
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading={idx === 0 ? "eager" : "lazy"}
                      width={600}
                      height={600}
                    />
                  </div>
                  {item.caption && (
                    <div className="p-3 bg-card">
                      <p className="text-sm font-medium text-foreground">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Request Catalogue CTA */}
      <div className="bg-primary/10 border-y border-primary/20 py-12">
        <div className="container text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">
            Request Our Full Catalogue
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            This gallery represents a selection from our 500+ design catalogue.
            New designs are added every season. Contact our team to receive the
            complete digital catalogue with wholesale pricing, MOQ details, and
            new arrivals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors"
            data-ocid="gallery.primary_button"
          >
            Request Full Catalogue &amp; Pricing
          </Link>
        </div>
      </div>

      {/* Catalogues Download Section */}
      <div className="bg-card border-t border-border py-12">
        <div className="container">
          <h2 className="font-serif text-2xl font-bold mb-2">
            Download Catalogues
          </h2>
          <p className="text-muted-foreground mb-8">
            Download our latest product catalogues to explore our full range.
          </p>
          {catalogues.length === 0 ? (
            <a
              href="/catalogue.pdf"
              download
              className="inline-flex items-center gap-3 bg-primary/10 border border-primary/30 hover:bg-primary/20 px-6 py-4 rounded-xl text-sm font-medium transition-colors"
            >
              <svg
                className="w-5 h-5 text-primary"
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
              <div>
                <div className="font-semibold">Gemora Global Catalogue</div>
                <div className="text-muted-foreground text-xs mt-0.5">
                  PDF Download
                </div>
              </div>
            </a>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catalogues.map((cat) => (
                <a
                  key={cat.id}
                  href={cat.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={cat.fileName}
                  className="flex items-center gap-4 bg-background border border-border hover:border-primary/50 hover:bg-primary/5 px-5 py-4 rounded-xl transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl group-hover:bg-primary/20 transition-colors">
                    📄
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm truncate">
                      {cat.title}
                    </div>
                    {cat.description && (
                      <div className="text-muted-foreground text-xs mt-0.5 line-clamp-2">
                        {cat.description}
                      </div>
                    )}
                    <div className="text-primary text-xs mt-1 font-medium">
                      Click to Download →
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
