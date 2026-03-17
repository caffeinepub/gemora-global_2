import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <div className="bg-card border-b border-border py-16">
          <div className="container text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              About Gemora Global
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A legacy of craftsmanship, a vision for global excellence.
            </p>
          </div>
        </div>

        <div className="container py-16 space-y-16">
          {/* Company Intro */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gemora Global is India's premier imitation jewellery
                manufacturer, born from a passion for bringing the artistry of
                Indian jewellery craftsmanship to the world. Founded in the
                heart of Mumbai's jewellery district, we have grown into a
                trusted export partner for wholesalers, boutiques, and
                distributors across 50+ countries.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our name, Gemora, reflects our commitment to gem-like quality in
                every piece — from delicate earrings to statement bridal sets.
                We believe every woman deserves to wear something beautiful, and
                every retailer deserves a supplier they can trust.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video bg-secondary flex items-center justify-center">
              <img
                src="https://placehold.co/600x400/1a1a2e/c9a84c?text=Our+Workshop"
                alt="Our Workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Manufacturing Strength */}
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">
              Manufacturing Strength
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "10,000+", label: "Designs in Catalogue" },
                { value: "50+", label: "Export Countries" },
                { value: "500+", label: "Happy Wholesale Clients" },
                { value: "15+", label: "Years of Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Experience */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden aspect-video bg-secondary">
              <img
                src="https://placehold.co/600x400/1a1a2e/c9a84c?text=Global+Export"
                alt="Global Export"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">
                Export Experience
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With over a decade of international trade experience, Gemora
                Global understands the nuances of global jewellery markets. From
                the latest fashion trends in Europe to traditional designs
                preferred in the Middle East, we adapt our collections to meet
                market-specific demands.
              </p>
              <ul className="space-y-2">
                {[
                  "Compliant with international quality standards",
                  "Experience in customs & documentation",
                  "Reliable logistics partners worldwide",
                  "Multi-currency & payment flexibility",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary">✓</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quality Assurance */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-8">
            <h2 className="font-serif text-3xl font-bold mb-6 text-center">
              Quality Assurance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔬",
                  title: "Quality Testing",
                  desc: "Every batch undergoes rigorous quality checks for finish, durability, and consistency.",
                },
                {
                  icon: "📦",
                  title: "Premium Packaging",
                  desc: "Export-grade packaging ensures products arrive in perfect condition at your doorstep.",
                },
                {
                  icon: "🏆",
                  title: "Certified Standards",
                  desc: "We follow international trade and quality standards for all our export products.",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
