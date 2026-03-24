import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const blogPosts = [
  {
    slug: "top-imitation-jewellery-trends-2026",
    title: "Top Imitation Jewellery Trends to Watch in 2026",
    category: "Trends",
    excerpt:
      "From bold layered necklaces to minimalist ear cuffs, discover the hottest imitation jewellery styles dominating international markets this year.",
    author: "Priya Sharma",
    date: "March 10, 2026",
    readTime: "5 min read",
    image: "/assets/generated/blog-trends-2026.dim_800x500.jpg",
    content: [
      "The global fashion jewellery market is seeing a dramatic shift in 2026. Consumers are moving away from single-statement pieces toward layered, storytelling looks that blend multiple textures and finishes. Indian manufacturers are at the forefront of this trend, producing collections that fuse traditional craftsmanship with modern silhouettes.",
      "Oxidised silver pieces continue to dominate European and Middle Eastern wholesale orders. Their antique finish resonates with buyers seeking authentic, handcrafted aesthetics at accessible price points. Gemora Global's latest oxidised line has seen a 40% surge in international inquiries since its launch.",
      "Colour-stone statement earrings — particularly in emerald green, deep ruby, and cobalt blue — are commanding premium shelf space in boutiques across France, the UK, and the UAE. These high-drama pieces photograph beautifully, making them social-media favourites and driving impulse purchases online.",
      "For wholesale buyers sourcing for the 2026 season, we recommend building inventory around three pillars: layered necklace sets, colour-stone drop earrings, and minimalist daily-wear bracelets. Together, these categories cover the broadest consumer base and offer the highest turnover rates in the fashion jewellery segment.",
    ],
  },
  {
    slug: "how-to-start-jewellery-wholesale-import-business",
    title: "How to Start a Jewellery Wholesale Import Business",
    category: "Business Guide",
    excerpt:
      "A step-by-step roadmap for boutique owners and distributors looking to source premium imitation jewellery from India's top manufacturers.",
    author: "Rahul Mehta",
    date: "February 28, 2026",
    readTime: "7 min read",
    image: "/assets/generated/blog-wholesale-import.dim_800x500.jpg",
    content: [
      "Starting a jewellery wholesale import business can be one of the most rewarding ventures in the fashion retail sector. India supplies over 60% of the world's imitation jewellery, offering unmatched variety, quality, and competitive pricing. However, navigating the import landscape requires careful planning.",
      "The first step is identifying a reliable manufacturer with verified export credentials. Look for suppliers with GST registration, an IEC (Import Export Code), and a track record of international shipments. Certifications like ISO 9001 signal consistent quality control — essential when placing large bulk orders.",
      "Minimum Order Quantities (MOQs) vary significantly between manufacturers. Most reputable Indian exporters set MOQs between 50 and 200 pieces per design. Negotiate sample orders first — a professional manufacturer will ship samples within 7–10 working days, allowing you to assess quality before committing to full production runs.",
      "On the logistics side, sea freight is most cost-effective for orders above 50 kg. For smaller, higher-value orders, air freight provides speed and security. Ensure your supplier provides a commercial invoice, packing list, and certificate of origin — documents required for customs clearance in most markets. Work with a licensed customs broker in your country to streamline the import process.",
    ],
  },
  {
    slug: "why-indian-imitation-jewellery-dominates-global-markets",
    title: "Why Indian Imitation Jewellery Dominates Global Markets",
    category: "Industry Insights",
    excerpt:
      "India's jewellery export industry has grown into a $4 billion market. We explore the key factors behind its global dominance.",
    author: "Neha Gupta",
    date: "February 14, 2026",
    readTime: "6 min read",
    image: "/assets/generated/blog-global-markets.dim_800x500.jpg",
    content: [
      "India's imitation jewellery sector has transformed from a cottage industry into a sophisticated manufacturing ecosystem that supplies boutiques, department stores, and online retailers across 80+ countries. Three cities — Rajkot, Jaipur, and Kolkata — account for over 70% of total exports, each specialising in distinct styles and techniques.",
      "The cost advantage is significant but not the only driver. Indian artisans combine centuries-old goldsmithing knowledge with modern plating technology, producing pieces that rival the visual impact of fine jewellery at a fraction of the price. This quality-value equation is what keeps international buyers returning season after season.",
      "Design agility sets Indian manufacturers apart from competitors in China and Turkey. Most Indian exporters can turn around custom designs within 30–45 days, compared to 60–90 days from East Asian suppliers. For fashion buyers who operate on tight seasonal cycles, this responsiveness is invaluable.",
      "Growing export infrastructure — including government-backed trade promotion through EPCH and dedicated jewellery SEZs — has made compliance and shipping easier than ever before. With India's FTAs expanding into new markets, the competitive advantage of Indian jewellery exports is only set to grow through the rest of the decade.",
    ],
  },
  {
    slug: "bridal-jewellery-collections-international-buyers",
    title: "Bridal Jewellery Collections: What International Buyers Want",
    category: "Collections",
    excerpt:
      "Bridal jewellery is the highest-margin segment in fashion jewellery. Learn what international retailers are demanding for their 2026 wedding season.",
    author: "Ananya Patel",
    date: "January 30, 2026",
    readTime: "5 min read",
    image: "/assets/generated/blog-bridal-sets.dim_800x500.jpg",
    content: [
      "Bridal jewellery represents the premium tier of the imitation jewellery market, where buyers expect the finest craftsmanship, richest finishes, and most intricate designs. International retailers — particularly in the UK, USA, and the Gulf — are increasingly stocking Indian bridal sets as a high-margin alternative to fine jewellery.",
      "The most sought-after collections feature kundan and polki-inspired designs, which replicate the look of traditional Indian royal jewellery using glass stones and gold-plated settings. These pieces command retail prices between $80 and $300, offering boutiques healthy margins even on modest volumes.",
      "Western bridal buyers are gravitating toward convertible sets: pieces designed to be worn together for the wedding day and separately for everyday occasions. A necklace that can transform into a choker and a longer chain, or earrings that detach from a stud to a drop — this versatility is a strong selling point in markets where customers seek value.",
      "For wholesale buyers, we recommend stocking bridal sets in gold and rose gold finishes, with at least two colourways per design — typically red/maroon and white/pearl — to cater to diverse bridal palettes. Minimum order of 10 sets per design ensures variety without excessive inventory risk.",
    ],
  },
  {
    slug: "moq-explained-wholesale-jewellery-buyers",
    title: "MOQ Explained: What Wholesale Jewellery Buyers Need to Know",
    category: "Export Tips",
    excerpt:
      "Confused about minimum order quantities? This guide breaks down MOQ structures, negotiation tactics, and how to optimise your first wholesale order.",
    author: "Vikram Singh",
    date: "January 15, 2026",
    readTime: "4 min read",
    image: "/assets/generated/blog-wholesale-import.dim_800x500.jpg",
    content: [
      "Minimum Order Quantity (MOQ) is one of the most frequently misunderstood concepts for first-time wholesale buyers. It refers to the smallest number of units a manufacturer will produce or sell per order — and it exists for good reason. MOQs allow manufacturers to cover material costs, setup time, and production overheads while maintaining competitive per-unit pricing.",
      "In the Indian imitation jewellery sector, MOQs typically range from 50 to 500 pieces per design, depending on the complexity of the product and the scale of the manufacturer. Simple everyday earrings might have an MOQ of 50 pairs, while a complex kundan bridal necklace set may require a minimum of 100 pieces to justify the setup cost.",
      "Negotiating MOQs is possible, particularly for buyers who demonstrate long-term purchasing intent. Offering to pay a higher per-unit price in exchange for a lower MOQ is a common tactic. Alternatively, consolidating your order across multiple designs from the same supplier can help you meet the overall minimum while still achieving design variety.",
      "For new buyers, we recommend starting with mixed assortment orders — a strategy where the MOQ applies to the total order value rather than per design. This lets you trial multiple styles with lower inventory risk per SKU. As your relationship with the manufacturer grows, MOQs often become more flexible, and payment terms may improve.",
    ],
  },
  {
    slug: "anti-tarnish-technology-fashion-jewellery",
    title: "Anti-Tarnish Technology in Modern Fashion Jewellery",
    category: "Product Care",
    excerpt:
      "Modern anti-tarnish coatings are revolutionising fashion jewellery longevity. Here's what buyers need to know before placing their next bulk order.",
    author: "Deepika Rao",
    date: "December 20, 2025",
    readTime: "6 min read",
    image: "/assets/generated/jewellery-minimal-hd.dim_800x800.jpg",
    content: [
      "One of the most common concerns from fashion jewellery buyers is product longevity — specifically, how quickly pieces tarnish and lose their finish. Advances in plating technology over the last five years have dramatically improved durability, and today's premium imitation jewellery can maintain its appearance for 12–24 months with proper care.",
      "The most effective protection comes from 3-micron gold plating, which uses a thicker layer of gold than standard 1-micron plating. This added depth significantly delays oxidation and surface wear. At Gemora Global, our standard export range uses minimum 2-micron plating, with our premium collections featuring 3-micron or lacquer-sealed finishes.",
      "Lacquer coating — a thin, clear protective layer applied over the final plating — is a game-changer for humid climates and active wearers. Pieces with lacquer sealing are particularly popular in Southeast Asian, Middle Eastern, and Caribbean markets where heat and humidity accelerate tarnishing. Buyers in these regions consistently report higher customer satisfaction with lacquer-sealed collections.",
      "For retailers, educating customers on jewellery care extends product life and reduces returns. Key advice: store pieces in airtight pouches, avoid contact with perfumes, water, and lotions, and wipe clean with a dry microfibre cloth. Including a care card with each piece — available in multiple languages — is a small touch that significantly improves the customer experience and brand perception.",
    ],
  },
  {
    slug: "private-label-jewellery-manufacturer-india",
    title: "Private Label Jewellery Manufacturer India: Build Your Own Brand",
    category: "Business Guide",
    excerpt:
      "Private label jewellery is the fastest way to build a profitable fashion brand. Here's how to source from India's top OEM manufacturers with confidence.",
    author: "Nikhil Sharma",
    date: "March 5, 2026",
    readTime: "6 min read",
    image: "/assets/generated/blog-private-label.dim_800x500.jpg",
    content: [
      "Private label jewellery manufacturing allows boutique owners, influencers, and retailers to sell pieces under their own brand without owning a factory. India is the world's leading source for private label imitation jewellery, offering the perfect combination of skilled craftsmanship, low MOQs, and fast turnaround times.",
      "The process starts with design selection. Most private label jewellery manufacturers in India, including Gemora Global, offer two pathways: selecting from an existing catalogue or submitting custom designs. Catalogue-based orders are faster (15–20 days) and carry lower minimums, while fully custom designs typically require 30–45 days and a slightly higher MOQ to offset tooling costs.",
      "Branding options range from simple to comprehensive. At minimum, a private label manufacturer can attach your logo tag, add branded packaging inserts, and ship in your branded outer boxes. More advanced clients opt for full custom packaging — tissue wrap, ribbon, branded pouches, and thank-you cards — creating an unboxing experience that drives social sharing and repeat purchases.",
      "When evaluating private label jewellery suppliers from India, request a full sample run before placing your production order. Evaluate plating quality, stone setting precision, clasp durability, and packaging integrity. A reputable manufacturer will welcome this scrutiny — it protects both parties and sets the standard for ongoing production quality.",
    ],
  },
  {
    slug: "best-imitation-jewellery-exporter-india-for-usa-boutiques",
    title: "Best Imitation Jewellery Exporter in India for USA Boutiques",
    category: "Export Tips",
    excerpt:
      "USA boutique owners are increasingly sourcing wholesale fashion jewellery from India. Here's what makes Indian exporters the top choice and how to choose the right supplier.",
    author: "Priya Sharma",
    date: "March 1, 2026",
    readTime: "5 min read",
    image: "/assets/generated/blog-usa-boutiques.dim_800x500.jpg",
    content: [
      "The USA is the world's largest market for fashion and costume jewellery, with boutiques and independent retailers sourcing billions of dollars in inventory each year. Indian exporters have become the preferred supplier for a growing number of American buyers — and for good reason.",
      "Indian costume jewellery exporters offer design diversity that no other manufacturing hub can match. From classic gold-tone ethnic pieces to sleek minimalist daily-wear collections, Indian manufacturers cover every aesthetic that USA boutiques serve. This breadth means buyers can consolidate sourcing to a single vendor without sacrificing variety.",
      "Pricing competitiveness is a key driver. A quality imitation necklace set from an Indian exporter typically costs $3–$8 wholesale, compared to $10–$15 from European or domestic US suppliers. At these margins, USA boutiques can achieve 3x to 5x markup while maintaining competitive retail prices — a critical advantage in the post-pandemic consumer market.",
      "When selecting an Indian jewellery exporter for your USA boutique, prioritise suppliers who: (1) provide proper export documentation (commercial invoice, packing list, certificate of origin), (2) have experience with US customs clearance, (3) offer USD pricing with multiple payment options, and (4) can provide references from other US-based buyers. Gemora Global ticks all four boxes and ships direct-to-door across all 50 US states.",
    ],
  },
];

const categoryColors: Record<string, string> = {
  Trends: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Business Guide": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Industry Insights": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Collections: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "Export Tips": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "Product Care": "bg-teal-500/20 text-teal-400 border-teal-500/30",
};

export default function Blog() {
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
