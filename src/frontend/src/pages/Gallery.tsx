import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { GalleryItem } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";
import { getCatalogues } from "../utils/catalogueStore";

const SAMPLE_GALLERY: GalleryItem[] = [
  {
    id: 1n,
    imageUrl: "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg",
    caption: "Necklace Collection",
    itemType: "product",
    sortOrder: 1n,
  },
  {
    id: 2n,
    imageUrl: "/assets/generated/jewellery-earrings-hd.dim_800x800.jpg",
    caption: "Earring Range",
    itemType: "product",
    sortOrder: 2n,
  },
  {
    id: 3n,
    imageUrl: "/assets/generated/jewellery-bridal-hd.dim_800x800.jpg",
    caption: "Bridal Jewellery Set",
    itemType: "product",
    sortOrder: 3n,
  },
  {
    id: 4n,
    imageUrl: "/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg",
    caption: "Bracelet Designs",
    itemType: "product",
    sortOrder: 4n,
  },
  {
    id: 5n,
    imageUrl: "/assets/generated/jewellery-rings-hd.dim_800x800.jpg",
    caption: "Ring Collection",
    itemType: "product",
    sortOrder: 5n,
  },
  {
    id: 6n,
    imageUrl: "/assets/generated/jewellery-minimal-hd.dim_800x800.jpg",
    caption: "Minimal Fashion Jewellery",
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
  const { actor } = useActor();
  const [filter, setFilter] = useState("");
  const catalogues = getCatalogues();

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-serif text-4xl font-bold mb-2">
                  Gallery & Catalogue
                </h1>
                <p className="text-muted-foreground">
                  Explore our jewellery collection and production showcase
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg text-sm font-medium transition-colors w-fit"
              >
                Request Catalogue
              </a>
            </div>
          </div>
        </div>
        <div className="container py-8">
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
              {displayItems.map((item) => (
                <div
                  key={String(item.id)}
                  className="rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
