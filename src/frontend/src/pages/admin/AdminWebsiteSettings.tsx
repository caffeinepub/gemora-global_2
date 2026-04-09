import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";
import { useStorageUpload } from "../../hooks/useStorageUpload";

const BOX = {
  background: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  padding: 20,
  marginBottom: 16,
} as const;

function SettingCard({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div style={BOX}>
      <h3
        style={{
          color: "#1A237E",
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

type SlotInfo = {
  key: string;
  label: string;
  ref: React.RefObject<HTMLInputElement | null>;
  webpKB?: number;
};

export default function AdminWebsiteSettings() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const { uploadFileDetailed, uploading, converting, uploadError } =
    useStorageUpload();
  const logoFileRef = useRef<HTMLInputElement>(null);
  const heroFile1Ref = useRef<HTMLInputElement>(null);
  const heroFile2Ref = useRef<HTMLInputElement>(null);
  const heroFile3Ref = useRef<HTMLInputElement>(null);

  // Per-slot uploading state (key → boolean)
  const [slotUploading, setSlotUploading] = useState<Record<string, boolean>>(
    {},
  );
  const [slotConverting, setSlotConverting] = useState<Record<string, boolean>>(
    {},
  );
  const [slotWebpKB, setSlotWebpKB] = useState<Record<string, number>>({});
  const [slotError, setSlotError] = useState<Record<string, string>>({});

  const keys = [
    "hero_title",
    "hero_subtitle",
    "hero_image",
    "hero_image_1",
    "hero_image_2",
    "hero_image_3",
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
          return [k, Array.isArray(v) ? (v[0] ?? "") : (v ?? "")] as [
            string,
            string,
          ];
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
      await actor!.setContent(key, getValue(key));
    },
    onSuccess: () => {
      toast.success("Setting saved");
      qc.invalidateQueries({ queryKey: ["content-all"] });
    },
    onError: () => toast.error("Failed to save setting"),
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await uploadFileDetailed(file);
      await actor!.setContent("logo_url", result.url);
      toast.success(`Logo updated (WebP, ${result.webpKB.toFixed(0)}KB)`);
      qc.invalidateQueries({ queryKey: ["content-all"] });
    } catch {
      toast.error(
        "Upload failed — please check your internet connection and try again",
      );
    }
    if (logoFileRef.current) logoFileRef.current.value = "";
  };

  const handleHeroSlideUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    slotKey: string,
    fileRef: React.RefObject<HTMLInputElement | null>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSlotConverting((s) => ({ ...s, [slotKey]: true }));
    setSlotUploading((s) => ({ ...s, [slotKey]: true }));
    setSlotError((s) => ({ ...s, [slotKey]: "" }));
    try {
      const result = await uploadFileDetailed(file);
      setSlotConverting((s) => ({ ...s, [slotKey]: false }));
      await actor!.setContent(slotKey, result.url);
      setSlotWebpKB((s) => ({ ...s, [slotKey]: result.webpKB }));
      toast.success(`Slide updated — WebP ${result.webpKB.toFixed(0)}KB`);
      qc.invalidateQueries({ queryKey: ["content-all"] });
      qc.invalidateQueries({ queryKey: ["content", slotKey] });
    } catch {
      const msg =
        "Upload failed — please check your internet connection and try again";
      setSlotError((s) => ({ ...s, [slotKey]: msg }));
      toast.error(msg);
    }
    setSlotUploading((s) => ({ ...s, [slotKey]: false }));
    setSlotConverting((s) => ({ ...s, [slotKey]: false }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleHeroSlideRemove = async (slotKey: string) => {
    try {
      await actor!.setContent(slotKey, "");
      setSlotWebpKB((s) => {
        const n = { ...s };
        delete n[slotKey];
        return n;
      });
      toast.success("Slide image removed");
      qc.invalidateQueries({ queryKey: ["content-all"] });
    } catch {
      toast.error("Failed to remove slide image");
    }
  };

  const SaveBtn = ({ k }: { k: string }) => (
    <button
      type="button"
      onClick={() => saveMutation.mutate(k)}
      disabled={saveMutation.isPending}
      style={{
        background: "#1A237E",
        color: "#fff",
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

  const slotDefs: SlotInfo[] = [
    { key: "hero_image_1", label: "Slide 1", ref: heroFile1Ref },
    { key: "hero_image_2", label: "Slide 2", ref: heroFile2Ref },
    { key: "hero_image_3", label: "Slide 3", ref: heroFile3Ref },
  ];

  const anyUploading =
    uploading || converting || Object.values(slotUploading).some(Boolean);

  return (
    <AdminLayout>
      <h2
        style={{
          color: "#1A237E",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        Website Settings
      </h2>

      <SettingCard title="🏠 Homepage Banner">
        <div style={{ marginBottom: 10 }}>
          <Label style={{ color: "#555" }}>Hero Title</Label>
          <Input
            value={getValue("hero_title")}
            onChange={(e) => setValue("hero_title", e.target.value)}
            placeholder="India's Leading Imitation Jewellery Manufacturer..."
            style={{
              background: "#f5f7ff",
              border: "1px solid #c5cae9",
              color: "#1A237E",
              marginTop: 4,
            }}
            data-ocid="admin.websettings.hero_title.input"
          />
          <SaveBtn k="hero_title" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <Label style={{ color: "#555" }}>Hero Subtitle</Label>
          <Textarea
            value={getValue("hero_subtitle")}
            onChange={(e) => setValue("hero_subtitle", e.target.value)}
            placeholder="Premium handcrafted designs..."
            rows={2}
            style={{
              background: "#f5f7ff",
              border: "1px solid #c5cae9",
              color: "#1A237E",
              marginTop: 4,
            }}
            data-ocid="admin.websettings.hero_subtitle.textarea"
          />
          <SaveBtn k="hero_subtitle" />
        </div>

        {/* Hero Slider — file-only, WebP auto-conversion */}
        <div style={{ marginTop: 4 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <Label style={{ color: "#1A237E", fontWeight: 600, fontSize: 14 }}>
              Hero Slider Images (up to 3)
            </Label>
            <span style={{ color: "#888", fontSize: 11 }}>
              All images auto-converted to WebP
            </span>
          </div>
          <p style={{ color: "#888", fontSize: 12, marginBottom: 12 }}>
            Upload up to 3 images that will automatically slide in the hero
            section.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
            }}
          >
            {slotDefs.map((slot) => {
              const isSlotUploading = slotUploading[slot.key];
              const isSlotConverting = slotConverting[slot.key];
              const slotErrMsg = slotError[slot.key];
              const webpKBVal = slotWebpKB[slot.key];
              return (
                <div
                  key={slot.key}
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <Label
                    style={{ color: "#555", fontWeight: 600, fontSize: 13 }}
                  >
                    {slot.label}
                  </Label>
                  <label
                    htmlFor={`file-input-${slot.key}`}
                    style={{
                      border: `2px dashed ${isSlotConverting || isSlotUploading ? "#42A5F5" : "#c5cae9"}`,
                      borderRadius: 8,
                      padding: "14px 10px",
                      textAlign: "center",
                      cursor: anyUploading ? "not-allowed" : "pointer",
                      background:
                        isSlotConverting || isSlotUploading
                          ? "#e8f4fe"
                          : "#f5f7ff",
                      minHeight: 72,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column" as const,
                      gap: 6,
                      transition: "all 0.2s",
                    }}
                    data-ocid={`admin.websettings.${slot.key}.dropzone`}
                  >
                    <input
                      id={`file-input-${slot.key}`}
                      ref={slot.ref}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      data-slot={slot.key}
                      disabled={anyUploading}
                      onChange={(e) =>
                        handleHeroSlideUpload(e, slot.key, slot.ref)
                      }
                    />
                    {isSlotConverting || isSlotUploading ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                          style={{ color: "#42A5F5" }}
                        />
                        <p
                          style={{
                            color: "#42A5F5",
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          {isSlotConverting ? "Converting..." : "Uploading..."}
                        </p>
                      </>
                    ) : (
                      <p style={{ color: "#888", fontSize: 12 }}>
                        Click to upload
                      </p>
                    )}
                  </label>
                  {slotErrMsg && (
                    <p
                      style={{ color: "crimson", fontSize: 11 }}
                      data-ocid={`admin.websettings.${slot.key}.error`}
                    >
                      {slotErrMsg}
                    </p>
                  )}

                  {/* Preview with WebP badge + remove */}
                  {getValue(slot.key) && (
                    <div style={{ position: "relative" }}>
                      <img
                        src={getValue(slot.key)}
                        alt={`${slot.label} preview`}
                        style={{
                          width: "100%",
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 6,
                          border: "1px solid #c5cae9",
                        }}
                      />
                      {webpKBVal !== undefined && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: "rgba(46,125,50,0.85)",
                            color: "#fff",
                            fontSize: 9,
                            fontWeight: 700,
                            textAlign: "center",
                            padding: "2px 0",
                            borderRadius: "0 0 6px 6px",
                          }}
                        >
                          WebP ✓ {webpKBVal.toFixed(0)}KB
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleHeroSlideRemove(slot.key)}
                        style={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          background: "rgba(0,0,0,0.6)",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          padding: "2px 7px",
                          fontSize: 11,
                          cursor: "pointer",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                        }}
                        data-ocid={`admin.websettings.${slot.key}.delete_button`}
                      >
                        <X size={10} /> Remove
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </SettingCard>

      <SettingCard title="💬 WhatsApp Number">
        <Label style={{ color: "#555" }}>WhatsApp Number</Label>
        <Input
          value={getValue("whatsapp_number")}
          onChange={(e) => setValue("whatsapp_number", e.target.value)}
          placeholder="+91 7976341419"
          style={{
            background: "#f5f7ff",
            border: "1px solid #c5cae9",
            color: "#1A237E",
            marginTop: 4,
          }}
          data-ocid="admin.websettings.whatsapp_number.input"
        />
        <SaveBtn k="whatsapp_number" />
      </SettingCard>

      <SettingCard title="🖼 Logo Upload">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <Label style={{ color: "#555" }}>Upload New Logo</Label>
          <span style={{ color: "#888", fontSize: 11 }}>
            Auto-converted to WebP
          </span>
        </div>
        <div
          style={{
            marginTop: 8,
            border: `2px dashed ${uploading || converting ? "#42A5F5" : "#c5cae9"}`,
            borderRadius: 8,
            padding: "20px",
            textAlign: "center",
            cursor: uploading || converting ? "not-allowed" : "pointer",
            background: uploading || converting ? "#e8f4fe" : "#f5f7ff",
            transition: "all 0.2s",
          }}
          onClick={() =>
            !(uploading || converting) && logoFileRef.current?.click()
          }
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
          {uploading || converting ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Loader2
                size={16}
                className="animate-spin"
                style={{ color: "#42A5F5" }}
              />
              <span style={{ color: "#42A5F5", fontSize: 13, fontWeight: 600 }}>
                {converting ? "Converting to WebP..." : "Uploading..."}
              </span>
            </div>
          ) : (
            <p style={{ color: "#888", fontSize: 13 }}>
              Click to upload logo (PNG, SVG, WEBP)
            </p>
          )}
        </div>
        {uploadError && (
          <p
            style={{ color: "crimson", fontSize: 12, marginTop: 4 }}
            data-ocid="admin.websettings.logo.error"
          >
            {uploadError}
          </p>
        )}
        <img
          src="/assets/uploads/logo-removebg-preview-1.png"
          alt="Current logo"
          style={{ height: 50, marginTop: 10, objectFit: "contain" }}
        />
      </SettingCard>

      <SettingCard title="📞 Contact Info">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <Label style={{ color: "#555" }}>Email</Label>
            <Input
              value={getValue("contact_email")}
              onChange={(e) => setValue("contact_email", e.target.value)}
              placeholder="globalgemora@gmail.com"
              style={{
                background: "#f5f7ff",
                border: "1px solid #c5cae9",
                color: "#1A237E",
                marginTop: 4,
              }}
              data-ocid="admin.websettings.contact_email.input"
            />
            <SaveBtn k="contact_email" />
          </div>
          <div>
            <Label style={{ color: "#555" }}>Phone</Label>
            <Input
              value={getValue("contact_phone")}
              onChange={(e) => setValue("contact_phone", e.target.value)}
              placeholder="+91 7976341419"
              style={{
                background: "#f5f7ff",
                border: "1px solid #c5cae9",
                color: "#1A237E",
                marginTop: 4,
              }}
              data-ocid="admin.websettings.contact_phone.input"
            />
            <SaveBtn k="contact_phone" />
          </div>
          <div>
            <Label style={{ color: "#555" }}>Address</Label>
            <Textarea
              value={getValue("contact_address")}
              onChange={(e) => setValue("contact_address", e.target.value)}
              placeholder="B 66 MAA Hinglaj Nagar..."
              rows={2}
              style={{
                background: "#f5f7ff",
                border: "1px solid #c5cae9",
                color: "#1A237E",
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
