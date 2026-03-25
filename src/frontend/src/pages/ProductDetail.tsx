import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";

export default function ProductDetail() {
  const { id } = useParams() as { id: string };
  const { actor } = useActor();
  const [activeImg, setActiveImg] = useState(0);

  const { data: product, isLoading } = useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: () => actor!.getProduct(BigInt(id!)),
    enabled: !!actor && !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 container">
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 container text-center py-20">
          <p className="text-muted-foreground">Product not found.</p>
          <Button asChild className="mt-4 bg-primary text-primary-foreground">
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const images =
    product.imageUrls.length > 0
      ? product.imageUrls
      : [
          `https://placehold.co/600x600/1a1a2e/c9a84c?text=${encodeURIComponent(product.name)}`,
        ];

  const waText = encodeURIComponent(
    `Hi, I'm interested in ${product.name}. Please share pricing and availability.`,
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container py-10">
          <div className="mb-4">
            <Link
              to="/products"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              &larr; Back to Products
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Images */}
            <div>
              <div className="rounded-xl overflow-hidden aspect-square mb-3 border border-border">
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {images.map((img) => (
                    <button
                      type="button"
                      key={img}
                      onClick={() => setActiveImg(images.indexOf(img))}
                      className={`w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                        images.indexOf(img) === activeImg
                          ? "border-primary"
                          : "border-border"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${images.indexOf(img) + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="font-serif text-3xl font-bold mb-2">
                {product.name}
              </h1>
              {product.featured && (
                <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">
                  Featured
                </Badge>
              )}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  Minimum Order Quantity
                </p>
                <p className="font-semibold text-lg text-primary">
                  {product.moq}
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                  data-ocid="product.inquiry_button"
                >
                  <Link to={`/contact?product=${product.id}`}>
                    Send Inquiry
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500/10"
                >
                  <a
                    href={`https://wa.me/919999999999?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
