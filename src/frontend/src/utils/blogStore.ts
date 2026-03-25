const STORAGE_KEY = "gemora_blog_posts";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  status: string;
  image: string;
  content: string;
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "top-imitation-jewellery-trends-2026",
    title: "Top Imitation Jewellery Trends to Watch in 2026",
    category: "Trends",
    excerpt:
      "From bold layered necklaces to minimalist ear cuffs, discover the hottest imitation jewellery styles dominating international markets this year.",
    author: "Priya Sharma",
    date: "March 10, 2026",
    readTime: "5 min read",
    status: "Published",
    image: "/assets/generated/blog-trends-2026.dim_800x500.jpg",
    content:
      "The global fashion jewellery market is seeing a dramatic shift in 2026. Consumers are moving away from single-statement pieces toward layered, storytelling looks that blend multiple textures and finishes. Indian manufacturers are at the forefront of this trend, producing collections that fuse traditional craftsmanship with modern silhouettes.\n\nOxidised silver pieces continue to dominate European and Middle Eastern wholesale orders. Their antique finish resonates with buyers seeking authentic, handcrafted aesthetics at accessible price points. Gemora Global's latest oxidised line has seen a 40% surge in international inquiries since its launch.\n\nColour-stone statement earrings — particularly in emerald green, deep ruby, and cobalt blue — are commanding premium shelf space in boutiques across France, the UK, and the UAE. These high-drama pieces photograph beautifully, making them social-media favourites and driving impulse purchases online.",
  },
  {
    id: 2,
    slug: "how-to-start-jewellery-wholesale-import-business",
    title: "How to Start a Jewellery Wholesale Import Business",
    category: "Business Guide",
    excerpt:
      "A step-by-step roadmap for boutique owners and distributors looking to source premium imitation jewellery from India's top manufacturers.",
    author: "Rahul Mehta",
    date: "February 28, 2026",
    readTime: "7 min read",
    status: "Published",
    image: "/assets/generated/blog-wholesale-import.dim_800x500.jpg",
    content:
      "Starting a jewellery wholesale import business can be one of the most rewarding ventures in the fashion retail sector. India supplies over 60% of the world's imitation jewellery, offering unmatched variety, quality, and competitive pricing.\n\nThe first step is identifying a reliable manufacturer with verified export credentials. Look for suppliers with GST registration, an IEC (Import Export Code), and a track record of international shipments.\n\nMinimum Order Quantities (MOQs) vary significantly between manufacturers. Most reputable Indian exporters set MOQs between 50 and 200 pieces per design. Negotiate sample orders first — a professional manufacturer will ship samples within 7–10 working days.",
  },
  {
    id: 3,
    slug: "why-indian-imitation-jewellery-dominates-global-markets",
    title: "Why Indian Imitation Jewellery Dominates Global Markets",
    category: "Industry Insights",
    excerpt:
      "Explore why India's imitation jewellery industry has become the go-to source for boutiques and distributors across 50+ countries.",
    author: "Neha Gupta",
    date: "February 14, 2026",
    readTime: "6 min read",
    status: "Published",
    image: "/assets/generated/blog-global-markets.dim_800x500.jpg",
    content:
      "India's dominance in the global imitation jewellery market is no accident. It is the result of decades of accumulated craft knowledge, investment in manufacturing infrastructure, and a deep understanding of international buyer preferences.\n\nThe Jaipur cluster alone accounts for over 30% of India's jewellery exports, producing everything from Kundan and Meenakari pieces to contemporary minimalist designs.\n\nFor international buyers, sourcing from India offers a compelling combination: factory-direct pricing, an enormous breadth of designs updated seasonally, and the flexibility to customise pieces for private-label requirements.",
  },
  {
    id: 4,
    slug: "bridal-jewellery-collections-international-buyers",
    title: "Bridal Jewellery Collections: What International Buyers Want",
    category: "Collections",
    excerpt:
      "Discover what wholesale buyers from the UAE, UK, and USA are seeking in bridal jewellery collections for 2026.",
    author: "Ananya Patel",
    date: "January 30, 2026",
    readTime: "5 min read",
    status: "Published",
    image: "/assets/generated/blog-bridal-collections.dim_800x500.jpg",
    content:
      "Bridal jewellery remains one of the highest-margin categories in the imitation jewellery segment. International buyers — particularly from the UAE, UK, USA, and Canada — are actively sourcing bridal sets that blend traditional Indian aesthetics with contemporary finishing.\n\nThe most requested pieces include kundan-style choker sets, layered necklaces with matching earrings and maang-tikka, and temple-inspired bangles in gold and pearl finishes.\n\nFor wholesale buyers, the key differentiator is anti-tarnish coating — a non-negotiable requirement for most international markets due to humidity and climate considerations.",
  },
  {
    id: 5,
    slug: "moq-explained-wholesale-jewellery-buyers",
    title: "MOQ Explained: What Wholesale Jewellery Buyers Need to Know",
    category: "Export Tips",
    excerpt:
      "Understanding Minimum Order Quantities is critical before placing your first wholesale jewellery order from India.",
    author: "Vikram Singh",
    date: "January 15, 2026",
    readTime: "4 min read",
    status: "Published",
    image: "/assets/generated/blog-moq-guide.dim_800x500.jpg",
    content:
      "MOQ — Minimum Order Quantity — is one of the most important terms in wholesale jewellery sourcing. It defines the smallest number of pieces a manufacturer will produce or sell per design, per order.\n\nFor imitation jewellery exported from India, MOQs typically range from 50 to 500 pieces per design. The exact figure depends on the complexity of the piece, the materials used, and the manufacturer's production capacity.\n\nAs a buyer, negotiating MOQ should be one of your first conversations with any potential supplier. Reputable exporters like Gemora Global offer flexible MOQ structures, particularly for buyers placing multi-category orders.",
  },
  {
    id: 6,
    slug: "anti-tarnish-technology-fashion-jewellery",
    title: "Anti-Tarnish Technology in Modern Fashion Jewellery",
    category: "Product Care",
    excerpt:
      "How advanced coatings and plating techniques are extending the life of imitation jewellery in global markets.",
    author: "Deepika Rao",
    date: "December 20, 2025",
    readTime: "5 min read",
    status: "Published",
    image: "/assets/generated/blog-anti-tarnish.dim_800x500.jpg",
    content:
      "One of the biggest challenges in the imitation jewellery industry has historically been longevity. Pieces exposed to sweat, humidity, and chemicals would tarnish within weeks, undermining brand reputation and buyer confidence.\n\nModern anti-tarnish technology has transformed this landscape. Multi-layer electroplating — typically involving a base of brass or zinc alloy, followed by nickel-free plating and a final lacquer or e-coating — can extend a piece's wearable life to 12–18 months under normal conditions.\n\nFor export-grade jewellery destined for markets like the UAE, France, or the UK, anti-tarnish certification is increasingly becoming a buyer requirement.",
  },
];

export function getBlogPosts(): BlogPost[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as BlogPost[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return DEFAULT_POSTS;
}

export function saveBlogPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    // Dispatch storage event so other tabs/components can react
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  } catch {}
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
