import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import type { Category, Product } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";

export default function Products() {
  const { actor } = useActor();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCatId = searchParams.get("category");

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-card border-b border-border py-12">
          <div className="container">
            <h1 className="font-serif text-4xl font-bold mb-2">Our Products</h1>
            <p className="text-muted-foreground">
              Browse our complete jewellery catalogue
            </p>
          </div>
        </div>
        <div className="container py-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={!activeCatId ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchParams({})}
              data-ocid="products.tab"
              className={
                !activeCatId ? "bg-primary text-primary-foreground" : ""
              }
            >
              All
            </Button>
            {categories?.map((cat) => (
              <Button
                key={String(cat.id)}
                variant={activeCatId === String(cat.id) ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchParams({ category: String(cat.id) })}
                data-ocid="products.tab"
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

          {/* Products Grid */}
          {catsLoading || prodsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, skIdx) => `sk-${skIdx}`).map(
                (skKey) => (
                  <Skeleton key={skKey} className="aspect-square rounded-lg" />
                ),
              )}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link
                  key={String(product.id)}
                  to={`/products/${product.id}`}
                  className="group"
                >
                  <div className="rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-gold bg-card">
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
                    <div className="p-3">
                      <h3 className="font-medium text-sm truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
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
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20" data-ocid="products.empty_state">
              <p className="text-5xl mb-4">💎</p>
              <p className="text-muted-foreground mb-6">
                No products in this category yet.
              </p>
              <Button asChild className="bg-primary text-primary-foreground">
                <Link to="/contact">Request Custom Catalogue</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
