import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";
import { usePageSEO } from "../hooks/usePageSEO";

export default function Contact() {
  usePageSEO({
    title:
      "Contact Gemora Global — Wholesale Jewellery Enquiries | India Exporter",
    description:
      "Get in touch with Gemora Global for wholesale imitation jewellery pricing, catalogue requests, and export enquiries. We respond to all wholesale inquiries within 24 hours.",
    canonical: "https://gemoraglobal-tje.caffeine.xyz/contact",
    ogTitle:
      "Contact Gemora Global — Wholesale Jewellery Enquiries | India Exporter",
    ogImage: "https://gemoraglobal-tje.caffeine.xyz/images/og-contact.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Gemora Global",
      telephone: "+91-7976341419",
      email: "globalgemora@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "B 66 MAA Hinglaj Nagar, Gandhi Path West, Vaishali Nagar",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302021",
        addressCountry: "IN",
      },
      openingHours: "Mo-Sa 10:00-18:30",
      priceRange: "$$",
    },
  });
  const { actor, isFetching } = useActor();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");

  const [form, setForm] = useState({
    name: "",
    country: "",
    whatsapp: "",
    requirement: "",
  });

  useEffect(() => {
    document.title =
      "Contact Gemora Global — Wholesale Jewellery Enquiries | India Exporter";
    let metaDesc = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Get in touch with Gemora Global for wholesale imitation jewellery pricing, catalogue requests, and export enquiries. We respond to all wholesale inquiries within 24 hours.",
    );

    const existingScript = document.getElementById("page-schema");
    if (existingScript) existingScript.remove();
    const script = document.createElement("script");
    script.id = "page-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Gemora Global",
      telephone: "+91-7976341419",
      email: "globalgemora@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "B 66 MAA Hinglaj Nagar, Gandhi Path West, Vaishali Nagar",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302021",
        addressCountry: "IN",
      },
      openingHours: "Mo-Sa 10:00-18:30",
      priceRange: "$$",
    });
    document.head.appendChild(script);

    return () => {
      document.title =
        "Imitation Jewellery Exporter & Manufacturer in India | Gemora Global";
      const s = document.getElementById("page-schema");
      if (s) s.remove();
    };
  }, []);

  const mutation = useMutation({
    mutationFn: () =>
      actor!.submitInquiry(
        form.name,
        form.country,
        form.whatsapp,
        form.requirement,
        productId ? BigInt(productId) : null,
      ),
    onSuccess: () => {
      toast.success("Inquiry sent! We'll contact you shortly.");
      setForm({ name: "", country: "", whatsapp: "", requirement: "" });
    },
    onError: () => toast.error("Failed to send inquiry. Please try WhatsApp."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.info("Connecting to server, please try again in a moment.");
      return;
    }
    mutation.mutate();
  };

  const isConnecting = isFetching && !actor;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-card border-b border-border py-12">
          <div className="container">
            <h1 className="font-serif text-4xl font-bold mb-2">
              Contact Us — Wholesale Enquiries Answered Within 24 Hours
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Whether you are placing your first order or scaling an existing
              buying relationship, our team is ready to assist. Browse our{" "}
              <Link to="/products" className="text-primary hover:underline">
                product range
              </Link>{" "}
              or{" "}
              <Link to="/gallery" className="text-primary hover:underline">
                download our catalogue
              </Link>{" "}
              before reaching out. We respond to all{" "}
              <Link to="/wholesale" className="text-primary hover:underline">
                wholesale enquiries
              </Link>{" "}
              within one business day.
            </p>
          </div>
        </div>
        <div className="container py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-2">
                Send an Enquiry
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                To help us give you the best quote quickly, please include: the
                product categories you are interested in, your target quantity
                per design, your destination country, your preferred delivery
                timeline, and any specific design requirements.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    required
                    data-ocid="inquiry.input"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={form.country}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, country: e.target.value }))
                    }
                    placeholder="Your country"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                  <Input
                    id="whatsapp"
                    value={form.whatsapp}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, whatsapp: e.target.value }))
                    }
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="requirement">Your Requirement *</Label>
                  <Textarea
                    id="requirement"
                    value={form.requirement}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, requirement: e.target.value }))
                    }
                    placeholder="Describe what you're looking for (product type, quantity, budget, etc.)"
                    rows={4}
                    required
                    data-ocid="inquiry.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  data-ocid="inquiry.submit_button"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : isConnecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Send Inquiry"
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold mb-6">
                  Contact Details
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: "📍",
                      label: "Address",
                      value:
                        "B 66 MAA Hinglaj Nagar, Gandhi Path West, Vaishali Nagar, Jaipur 302021",
                    },
                    {
                      icon: "📧",
                      label: "Email",
                      value: "globalgemora@gmail.com",
                    },
                    {
                      icon: "📱",
                      label: "Phone / WhatsApp",
                      value: "+91 7976341419",
                    },
                    {
                      icon: "🕐",
                      label: "Business Hours",
                      value: "Mon–Sat: 10:00 AM – 6:30 PM IST",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-card border border-border rounded-xl">
                  <h3 className="font-semibold text-sm mb-2">
                    What to Include in Your Message
                  </h3>
                  <ul className="space-y-1">
                    {[
                      "Product categories you are interested in",
                      "Target quantity per design",
                      "Destination country",
                      "Preferred delivery timeline",
                      "Any specific design requirements",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <span className="text-primary">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href="https://wa.me/917976341419?text=Hi%2C%20I%27m%20interested%20in%20wholesale%20jewellery."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg transition-colors w-fit"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-white"
                  role="img"
                  aria-label="WhatsApp"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>

              <div className="rounded-xl overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.4!2d75.7384!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5e3e4b0b4b7%3A0x0!2sVaishali+Nagar%2C+Jaipur%2C+Rajasthan+302021!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gemora Global Location - Vaishali Nagar, Jaipur"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
