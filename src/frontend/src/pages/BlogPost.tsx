import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router-dom";
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

export default function BlogPostPage() {
  const { slug } = useParams() as { slug: string };
  const { actor } = useActor();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => actor!.getBlogPost(slug),
    enabled: !!actor && !!slug,
    select: (data) =>
      Array.isArray(data) ? (data[0] ?? null) : (data ?? null),
  });

  const { data: allPosts = [] } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => actor!.getBlogPosts([]),
    enabled: !!actor,
  });

  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Always call hooks unconditionally
  usePageSEO({
    title: post ? `${post.title} | Gemora Global` : "Blog | Gemora Global",
    description: post
      ? post.excerpt.slice(0, 150)
      : "Read the latest insights on imitation jewellery trends, wholesale sourcing, and export tips from Gemora Global.",
    canonical: post
      ? `https://gemoraglobal-tje.caffeine.xyz/blog/${post.slug}`
      : "https://gemoraglobal-tje.caffeine.xyz/blog",
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-16">
          <div className="relative h-72 md:h-96 bg-muted animate-pulse" />
          <div className="container max-w-3xl py-12 space-y-4">
            <div className="h-8 bg-muted rounded w-2/3 animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        {/* Hero Image \u2014 eager for LCP */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1200}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Article */}
        <article className="container max-w-3xl py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              data-ocid="blogpost.link"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${categoryColors[post.category] ?? "bg-primary/20 text-primary border-primary/30"}`}
            >
              {post.category}
            </span>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-b border-border pb-6 mb-8">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <div className="prose prose-invert max-w-none space-y-5">
              {(Array.isArray(post.content)
                ? post.content
                : post.content.split("\n\n").filter(Boolean)
              ).map((para, paraIndex) => (
                <motion.p
                  key={para.slice(0, 40)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + paraIndex * 0.07 }}
                  className="text-muted-foreground leading-relaxed text-[1.05rem]"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </article>

        {/* CTA */}
        <section className="bg-primary/10 border-y border-primary/20 py-12">
          <div className="container text-center">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Interested in wholesale jewellery sourcing?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our export team is ready to assist with custom designs, bulk
              pricing, and fast shipping. Browse our{" "}
              <Link to="/products" className="text-primary hover:underline">
                product catalogue
              </Link>{" "}
              or view our{" "}
              <Link to="/wholesale" className="text-primary hover:underline">
                wholesale guide
              </Link>
              .
            </p>
            <Link
              to="/contact"
              data-ocid="blogpost.primary_button"
              className="inline-flex items-center bg-primary text-primary-foreground font-semibold px-7 py-3 rounded-full hover:bg-primary/90 transition-colors"
            >
              Contact Us for Wholesale
            </Link>
          </div>
        </section>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="container py-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp, i) => (
                <motion.article
                  key={rp.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  data-ocid={`blogpost.related.item.${i + 1}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <Link to={`/blog/${rp.slug}`}>
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width={600}
                        height={338}
                      />
                      <span
                        className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full border ${categoryColors[rp.category] ?? "bg-primary/20 text-primary border-primary/30"}`}
                      >
                        {rp.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {rp.date}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
