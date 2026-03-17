import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";

export default function Contact() {
  const { actor } = useActor();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");

  const [form, setForm] = useState({
    name: "",
    country: "",
    whatsapp: "",
    requirement: "",
  });

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
      toast.error("Please wait and try again.");
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-card border-b border-border py-12">
          <div className="container">
            <h1 className="font-serif text-4xl font-bold mb-2">
              Contact & Inquiry
            </h1>
            <p className="text-muted-foreground">
              Get in touch for wholesale pricing and catalogue
            </p>
          </div>
        </div>
        <div className="container py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">
                Send Inquiry
              </h2>
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
                    data-ocid="inquiry.name_input"
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
                    data-ocid="inquiry.country_input"
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
                    data-ocid="inquiry.whatsapp_input"
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
                    data-ocid="inquiry.requirement_textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  data-ocid="inquiry.submit_button"
                >
                  {mutation.isPending ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold mb-6">
                  Get In Touch
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: "📍",
                      label: "Address",
                      value: "Jewellery District, Mumbai, Maharashtra, India",
                    },
                    {
                      icon: "📧",
                      label: "Email",
                      value: "info@gemoraglobal.com",
                    },
                    { icon: "📱", label: "Phone", value: "+91 99999 99999" },
                    {
                      icon: "🕐",
                      label: "Business Hours",
                      value: "Mon–Sat: 10AM – 7PM IST",
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
              </div>

              <a
                href="https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20wholesale%20jewellery."
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823055!2d72.74109995709657!3d19.08204865000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gemora Global Location"
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
