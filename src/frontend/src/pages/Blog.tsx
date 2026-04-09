import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";
import { usePageSEO } from "../hooks/usePageSEO";

const categoryColors: Record<string, string> = {
  Trends: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "Business Guide": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Industry Insights": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Collections: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "Export Tips": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "Product Care": "bg-teal-500/20 text-teal-400 border-teal-500/30",
};

export default function Blog() {
  usePageSEO({
    title:
      "Jewellery Export Insights & Fashion Trends \u2014 Gemora Global Blog",
    description:
      "Read Gemora Global's blog for imitation jewellery sourcing guides, export tips, trend reports, and MOQ advice for wholesale buyers in UAE, France, USA, UK and Europe.",
    canonical: "https://gemoraglobal-tje.caffeine.xyz/blog",
    ogTitle:
      "Jewellery Export Insights & Fashion Trends \u2014 Gemora Global Blog",
    ogImage: "https://gemoraglobal-tje.caffeine.xyz/images/og-blog.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Gemora Global Jewellery Blog",
      url: "https://gemoraglobal-tje.caffeine.xyz/blog",
      inLanguage: "en",
      publisher: { "@type": "Organization", name: "Gemora Global" },
    },
  });

  const { actor } = useActor();
  const { data: allPosts = [], isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => actor!.getBlogPosts(["Published"]),
    enabled: !!actor,
  });

  const blogPosts = allPosts.filter((p) => p.status === "Published");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="container relative z-10 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
            >
              Gemora Global Blog
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5"
            >
              Jewellery Insights \u2014 Export Guides, Trend Reports &amp;
              Sourcing Advice
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg mb-6"
            >
              The Gemora Global blog covers imitation jewellery sourcing guides,
              export tips, trend reports, and MOQ advice for wholesale buyers in
              UAE, France, USA, UK and Europe. Browse our{" "}
              <Link to="/products" className="text-primary hover:underline">
                product catalogue
              </Link>{" "}
              or read our{" "}
              <Link to="/wholesale" className="text-primary hover:underline">
                wholesale guide
              </Link>{" "}
              to get started.
            </motion.p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="container pb-24" data-ocid="blog.section">
          <h2 className="font-serif text-2xl font-bold mb-8">
            Export Guides &amp; Industry Insights
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  data-ocid={`blog.item.${i + 1}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300"
                >
                  <Link to={`/blog/${post.slug}`}>
                    {post.image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={`${post.title} \u2014 Gemora Global jewellery export blog`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          width={600}
                          height={338}
                        />
                      </div>
                    )}
                    <div className="p-5">
                      {post.category && (
                        <span
                          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${
                            categoryColors[post.category] ??
                            "bg-primary/20 text-primary border-primary/30"
                          }`}
                        >
                          {post.category}
                        </span>
                      )}
                      <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </span>
                        )}
                        {post.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                        )}
                        {post.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
