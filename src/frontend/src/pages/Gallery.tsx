import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { GalleryItem } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";

const SAMPLE_GALLERY: GalleryItem[] = [
  {
    id: 1n,
    imageUrl: "https://placehold.co/600x400/1a1a2e/c9a84c?text=Lifestyle+1",
    caption: "Styling Session",
    itemType: "lifestyle",
    sortOrder: 1n,
  },
  {
    id: 2n,
    imageUrl: "https://placehold.co/600x600/1a1a2e/c9a84c?text=Bulk+Order",
    caption: "Bulk Order Ready",
    itemType: "bulk",
    sortOrder: 2n,
  },
  {
    id: 3n,
    imageUrl: "https://placehold.co/400x500/1a1a2e/c9a84c?text=Packaging",
    caption: "Premium Packaging",
    itemType: "packaging",
    sortOrder: 3n,
  },
  {
    id: 4n,
    imageUrl: "https://placehold.co/600x400/1a1a2e/c9a84c?text=Lifestyle+2",
    caption: "Editorial Shoot",
    itemType: "lifestyle",
    sortOrder: 4n,
  },
  {
    id: 5n,
    imageUrl: "https://placehold.co/500x500/1a1a2e/c9a84c?text=Export+Ready",
    caption: "Export Ready",
    itemType: "bulk",
    sortOrder: 5n,
  },
  {
    id: 6n,
    imageUrl: "https://placehold.co/400x600/1a1a2e/c9a84c?text=Luxury+Pack",
    caption: "Luxury Packaging",
    itemType: "packaging",
    sortOrder: 6n,
  },
];

const FILTER_TYPES = [
  { label: "All", value: "" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Bulk Orders", value: "bulk" },
  { label: "Packaging", value: "packaging" },
];

export default function Gallery() {
  const { actor } = useActor();
  const [filter, setFilter] = useState("");

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
            <h1 className="font-serif text-4xl font-bold mb-2">Gallery</h1>
            <p className="text-muted-foreground">
              A visual showcase of our products and operations
            </p>
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
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {displayItems.map((item) => (
                <div
                  key={String(item.id)}
                  className="break-inside-avoid rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors group"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.caption}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.caption && (
                    <div className="p-3 bg-card">
                      <p className="text-sm text-muted-foreground">
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
      <Footer />
    </div>
  );
}
