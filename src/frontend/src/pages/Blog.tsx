import { Calendar, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { type BlogPost, getBlogPosts } from "../utils/blogStore";

const categoryColors: Record<string, string> = {
  Trends: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Business Guide": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Industry Insights": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Collections: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "Export Tips": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "Product Care": "bg-teal-500/20 text-teal-400 border-teal-500/30",
};

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() =>
    getBlogPosts().filter((p) => p.status === "Published"),
  );

  useEffect(() => {
    const onStorage = () => {
      setBlogPosts(getBlogPosts().filter((p) => p.status === "Published"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

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
              Jewellery Insights, Export Tips &amp; Industry News
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto text-lg"
            >
              Expert guidance on jewellery trends, wholesale sourcing, private
              label manufacturing, and global export markets — from India's best
              imitation jewellery exporter.
            </motion.p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="container pb-24" data-ocid="blog.section">
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
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[post.category] ?? "bg-primary/20 text-primary border-primary/30"}`}
                    >
                      {post.category}
                    </span>
                  </div>
                </Link>
                <div className="p-5">
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    data-ocid={`blog.link.${i + 1}`}
                    className="inline-block mt-4 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-card border-t border-border py-16">
          <div className="container text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ready to Source from India's Best Artificial Jewellery Exporter?
            </h3>
            <p className="text-muted-foreground mb-7 max-w-md mx-auto">
              Connect with our export team for wholesale pricing, custom
              designs, and bulk order inquiries.
            </p>
            <Link
              to="/contact"
              data-ocid="blog.primary_button"
              className="inline-flex items-center bg-primary text-primary-foreground font-semibold px-7 py-3 rounded-full hover:bg-primary/90 transition-colors"
            >
              Get a Wholesale Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
