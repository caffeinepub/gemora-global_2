import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";

const CONTENT_SECTIONS = [
  {
    section: "🏠 Homepage",
    fields: [
      {
        key: "hero_title",
        label: "Hero Title",
        multiline: false,
        placeholder:
          "India's Leading Imitation Jewellery Manufacturer & Global Exporter",
        hint: "Main headline on the homepage hero section",
      },
      {
        key: "hero_subtitle",
        label: "Hero Subtitle",
        multiline: false,
        placeholder:
          "Premium handcrafted designs for wholesalers, boutiques & distributors worldwide.",
        hint: "Subtext below the hero headline",
      },
    ],
  },
  {
    section: "📖 About Page",
    fields: [
      {
        key: "about_story",
        label: "Our Story Text",
        multiline: true,
        placeholder:
          "Gemora Global is India's premier imitation jewellery manufacturer...",
        hint: "Main paragraph on the About page",
      },
      {
        key: "about_export",
        label: "Export Experience Text",
        multiline: true,
        placeholder: "With over a decade of international trade experience...",
        hint: "Export experience section on About page",
      },
    ],
  },
  {
    section: "📦 Products & Wholesale",
    fields: [
      {
        key: "wholesale_intro",
        label: "Wholesale Page Intro",
        multiline: true,
        placeholder: "Gemora Global offers premium wholesale jewellery...",
        hint: "Intro paragraph on the Wholesale & Export page",
      },
      {
        key: "moq_text",
        label: "MOQ Details",
        multiline: false,
        placeholder: "Minimum Order Quantity: 50 pieces per design",
        hint: "Minimum order quantity shown on wholesale page",
      },
    ],
  },
  {
    section: "📞 Contact Information",
    fields: [
      {
        key: "contact_email",
        label: "Email Address",
        multiline: false,
        placeholder: "globalgemora@gmail.com",
        hint: "Business email shown on Contact page and footer",
      },
      {
        key: "contact_phone",
        label: "Phone / WhatsApp Number",
        multiline: false,
        placeholder: "+91 7976341419",
        hint: "Phone number shown on Contact page, footer, and WhatsApp button",
      },
      {
        key: "contact_address",
        label: "Business Address",
        multiline: true,
        placeholder:
          "B 66 MAA Hinglaj Nagar, Gandhi Path West, Vaishali Nagar, Jaipur 302021",
        hint: "Physical address shown on Contact page and footer",
      },
      {
        key: "whatsapp_number",
        label: "WhatsApp Number (digits only, with country code)",
        multiline: false,
        placeholder: "917976341419",
        hint: "Used for the WhatsApp chat button (no + or spaces)",
      },
    ],
  },
  {
    section: "🌐 SEO Settings",
    fields: [
      {
        key: "seo_home_title",
        label: "Homepage SEO Title",
        multiline: false,
        placeholder: "Gemora Global | Leading Imitation Jewellery Exporter",
        hint: "Title shown in Google search results (keep under 60 chars)",
      },
      {
        key: "seo_home_description",
        label: "Homepage Meta Description",
        multiline: false,
        placeholder:
          "Premium handcrafted imitation jewellery exporter from India. MOQ-friendly wholesale supply...",
        hint: "Description shown in Google search results (keep under 155 chars)",
      },
      {
        key: "instagram_handle",
        label: "Instagram Handle",
        multiline: false,
        placeholder: "gemoraglobal",
        hint: "Your Instagram username (without @)",
      },
    ],
  },
  {
    section: "🏷️ Footer & Branding",
    fields: [
      {
        key: "footer_tagline",
        label: "Footer Tagline",
        multiline: false,
        placeholder: "Global Jewellery. Indian Craftsmanship.",
        hint: "Tagline shown in the website footer",
      },
      {
        key: "footer_about",
        label: "Footer About Text",
        multiline: true,
        placeholder:
          "India's leading imitation jewellery manufacturer & global exporter...",
        hint: "Short description shown in footer",
      },
    ],
  },
];

function ContentField({
  contentKey,
  label,
  multiline,
  placeholder,
  hint,
}: {
  contentKey: string;
  label: string;
  multiline: boolean;
  placeholder?: string;
  hint?: string;
}) {
  const { actor } = useActor();
  const [value, setValue] = useState("");

  const { data } = useQuery({
    queryKey: ["content", contentKey],
    queryFn: () => actor!.getContent(contentKey),
    enabled: !!actor,
  });

  useEffect(() => {
    if (data !== undefined && data !== null)
      setValue(Array.isArray(data) ? (data[0] ?? "") : (data as string));
  }, [data]);

  const mutation = useMutation({
    mutationFn: () => actor!.setContent(contentKey, value),
    onSuccess: () =>
      toast.success(`${label} saved — changes will reflect on the website`),
    onError: () => toast.error("Failed to save"),
  });

  return (
    <div
      style={{
        background: "#f5f7ff",
        border: "1px solid #c5cae9",
        borderRadius: 10,
        padding: 16,
      }}
    >
      <div style={{ marginBottom: 6 }}>
        <label
          htmlFor={`field-${contentKey}`}
          style={{
            color: "#1A237E",
            fontSize: 13,
            fontWeight: 600,
            display: "block",
            marginBottom: 2,
          }}
        >
          {label}
        </label>
        {hint && (
          <p
            style={{
              color: "#888",
              fontSize: 11,
              marginBottom: 6,
            }}
          >
            {hint}
          </p>
        )}
      </div>
      {multiline ? (
        <Textarea
          id={`field-${contentKey}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          placeholder={placeholder}
          style={{
            background: "#fff",
            border: "1px solid #c5cae9",
            color: "#1A237E",
          }}
        />
      ) : (
        <Input
          id={`field-${contentKey}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          style={{
            background: "#fff",
            border: "1px solid #c5cae9",
            color: "#1A237E",
          }}
        />
      )}
      <Button
        size="sm"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        style={{
          background: "#1A237E",
          color: "#fff",
          border: "none",
          fontWeight: 700,
          marginTop: 10,
        }}
      >
        {mutation.isPending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}

export default function AdminContent() {
  return (
    <AdminLayout>
      <div style={{ maxWidth: 800 }}>
        <h1
          style={{
            color: "#1A237E",
            fontWeight: 700,
            fontSize: 22,
            marginBottom: 6,
          }}
        >
          Content Manager
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: 13,
            marginBottom: 28,
          }}
        >
          Edit text content for any page. Changes are saved to the backend and
          reflect on the website immediately.
        </p>

        {CONTENT_SECTIONS.map(({ section, fields }) => (
          <div key={section} style={{ marginBottom: 32 }}>
            <h2
              style={{
                color: "#1A237E",
                fontSize: 15,
                fontWeight: 600,
                marginBottom: 12,
                borderBottom: "1px solid #c5cae9",
                paddingBottom: 8,
              }}
            >
              {section}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {fields.map(({ key, label, multiline, placeholder, hint }) => (
                <ContentField
                  key={key}
                  contentKey={key}
                  label={label}
                  multiline={multiline}
                  placeholder={placeholder}
                  hint={hint}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
