import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";
import { useStorageUpload } from "../../hooks/useStorageUpload";

const BOX = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: 12,
  padding: 20,
  marginBottom: 16,
} as const;

function SettingCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={BOX}>
      <h3
        style={{
          color: "gold",
          fontWeight: 600,
          fontSize: 15,
          marginBottom: 14,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function AdminWebsiteSettings() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const { uploadFile, uploading } = useStorageUpload();
  const logoFileRef = useRef<HTMLInputElement>(null);

  const keys = [
    "hero_title",
    "hero_subtitle",
    "whatsapp_number",
    "contact_email",
    "contact_phone",
    "contact_address",
  ];

  const { data: contentMap } = useQuery({
    queryKey: ["content-all"],
    queryFn: async () => {
      if (!actor) return {};
      const entries = await Promise.all(
        keys.map(async (k) => {
          const v = await actor.getContent(k);
          return [k, v ?? ""] as [string, string];
        }),
      );
      return Object.fromEntries(entries);
    },
    enabled: !!actor,
  });

  const [localMap, setLocalMap] = useState<Record<string, string>>({});

  const getValue = (key: string) =>
    localMap[key] !== undefined ? localMap[key] : (contentMap?.[key] ?? "");

  const setValue = (key: string, value: string) =>
    setLocalMap((m) => ({ ...m, [key]: value }));

  const saveMutation = useMutation({
    mutationFn: async (key: string) => {
      const value = getValue(key);
      await actor!.setContent(key, value);
    },
    onSuccess: () => {
      toast.success("Setting saved");
      qc.invalidateQueries({ queryKey: ["content-all"] });
    },
    onError: () => toast.error("Failed to save"),
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile(file);
      await actor!.setContent("logo_url", url);
      toast.success("Logo updated successfully");
      qc.invalidateQueries({ queryKey: ["content-all"] });
    } catch {
      toast.error("Failed to upload logo");
    }
    if (logoFileRef.current) logoFileRef.current.value = "";
  };

  const SaveBtn = ({ k }: { k: string }) => (
    <button
      type="button"
      onClick={() => saveMutation.mutate(k)}
      disabled={saveMutation.isPending}
      style={{
        background: "gold",
        color: "#111",
        border: "none",
        borderRadius: 8,
        padding: "7px 18px",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer",
        marginTop: 8,
      }}
      data-ocid={`admin.websettings.${k}.save_button`}
    >
      Save
    </button>
  );

  return (
    <AdminLayout>
      <h2
        style={{
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        Website Settings
      </h2>

      <SettingCard title="🏠 Homepage Banner">
        <div style={{ marginBottom: 10 }}>
          <Label style={{ color: "#aaa" }}>Hero Title</Label>
          <Input
            value={getValue("hero_title")}
            onChange={(e) => setValue("hero_title", e.target.value)}
            placeholder="India's Leading Imitation Jewellery Manufacturer..."
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              color: "#fff",
              marginTop: 4,
            }}
            data-ocid="admin.websettings.hero_title.input"
          />
          <SaveBtn k="hero_title" />
        </div>
        <div>
          <Label style={{ color: "#aaa" }}>Hero Subtitle</Label>
          <Textarea
            value={getValue("hero_subtitle")}
            onChange={(e) => setValue("hero_subtitle", e.target.value)}
            placeholder="Premium handcrafted designs..."
            rows={2}
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              color: "#fff",
              marginTop: 4,
            }}
            data-ocid="admin.websettings.hero_subtitle.textarea"
          />
          <SaveBtn k="hero_subtitle" />
        </div>
      </SettingCard>

      <SettingCard title="💬 WhatsApp Number">
        <Label style={{ color: "#aaa" }}>WhatsApp Number</Label>
        <Input
          value={getValue("whatsapp_number")}
          onChange={(e) => setValue("whatsapp_number", e.target.value)}
          placeholder="+91 7976341419"
          style={{
            background: "#1a1a1a",
            border: "1px solid #333",
            color: "#fff",
            marginTop: 4,
          }}
          data-ocid="admin.websettings.whatsapp_number.input"
        />
        <SaveBtn k="whatsapp_number" />
      </SettingCard>

      <SettingCard title="🖼 Logo Upload">
        <Label style={{ color: "#aaa" }}>Upload New Logo</Label>
        <div
          style={{
            marginTop: 8,
            border: "2px dashed #333",
            borderRadius: 8,
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            background: "#1a1a1a",
          }}
          onClick={() => logoFileRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              logoFileRef.current?.click();
          }}
          data-ocid="admin.websettings.logo.dropzone"
        >
          <input
            ref={logoFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
          <p style={{ color: uploading ? "gold" : "#888", fontSize: 13 }}>
            {uploading
              ? "Uploading..."
              : "Click to upload logo (PNG, SVG, WEBP)"}
          </p>
        </div>
        <img
          src="/assets/uploads/logo-removebg-preview-1.png"
          alt="Current logo"
          style={{ height: 50, marginTop: 10, objectFit: "contain" }}
        />
      </SettingCard>

      <SettingCard title="📞 Contact Info">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <Label style={{ color: "#aaa" }}>Email</Label>
            <Input
              value={getValue("contact_email")}
              onChange={(e) => setValue("contact_email", e.target.value)}
              placeholder="globalgemora@gmail.com"
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                color: "#fff",
                marginTop: 4,
              }}
              data-ocid="admin.websettings.contact_email.input"
            />
            <SaveBtn k="contact_email" />
          </div>
          <div>
            <Label style={{ color: "#aaa" }}>Phone</Label>
            <Input
              value={getValue("contact_phone")}
              onChange={(e) => setValue("contact_phone", e.target.value)}
              placeholder="+91 7976341419"
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                color: "#fff",
                marginTop: 4,
              }}
              data-ocid="admin.websettings.contact_phone.input"
            />
            <SaveBtn k="contact_phone" />
          </div>
          <div>
            <Label style={{ color: "#aaa" }}>Address</Label>
            <Textarea
              value={getValue("contact_address")}
              onChange={(e) => setValue("contact_address", e.target.value)}
              placeholder="B 66 MAA Hinglaj Nagar..."
              rows={2}
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                color: "#fff",
                marginTop: 4,
              }}
              data-ocid="admin.websettings.contact_address.textarea"
            />
            <SaveBtn k="contact_address" />
          </div>
        </div>
      </SettingCard>
    </AdminLayout>
  );
}
