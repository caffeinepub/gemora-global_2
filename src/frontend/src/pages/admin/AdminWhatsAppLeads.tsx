import { useQuery } from "@tanstack/react-query";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";
import type { Inquiry } from "../../types";

const BOX = {
  background: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  padding: 20,
} as const;

export default function AdminWhatsAppLeads() {
  const { actor } = useActor();

  const { data: inquiries } = useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: () => actor!.getInquiries(),
    enabled: !!actor,
  });

  const whatsappLeads = (inquiries ?? []).filter((inq) => inq.whatsapp?.trim());

  return (
    <AdminLayout>
      {/* Banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(66,165,245,0.1), rgba(66,165,245,0.05))",
          border: "1px solid rgba(66,165,245,0.2)",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 24 }}>💬</span>
        <div>
          <p
            style={{
              color: "#1A237E",
              fontWeight: 600,
              fontSize: 14,
              marginBottom: 2,
            }}
          >
            WhatsApp Business Integration
          </p>
          <p style={{ color: "#666", fontSize: 13 }}>
            Connect your WhatsApp Business API to track incoming messages, send
            auto-replies, and manage follow-ups directly from this dashboard.
          </p>
        </div>
      </div>

      {/* Leads Table */}
      <div style={BOX}>
        <h3 style={{ color: "#1A237E", marginBottom: 16, fontWeight: 600 }}>
          Leads with WhatsApp Numbers ({whatsappLeads.length})
        </h3>
        {whatsappLeads.length === 0 ? (
          <p
            style={{
              color: "#aaa",
              fontSize: 13,
              padding: "24px 0",
              textAlign: "center",
            }}
            data-ocid="admin.whatsapp.empty_state"
          >
            No WhatsApp leads yet. Inquiries with WhatsApp numbers will appear
            here.
          </p>
        ) : (
          <table
            style={{ width: "100%", borderCollapse: "collapse" }}
            data-ocid="admin.whatsapp.table"
          >
            <thead>
              <tr>
                {[
                  "Name",
                  "Country",
                  "WhatsApp",
                  "Message Preview",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 10px",
                      color: "#999",
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {whatsappLeads.map((inq, i) => (
                <tr
                  key={String(inq.id)}
                  style={{ borderBottom: "1px solid #f5f5f5" }}
                  data-ocid={`admin.whatsapp.item.${i + 1}`}
                >
                  <td
                    style={{
                      padding: "10px",
                      fontSize: 14,
                      color: "#222",
                      fontWeight: 500,
                    }}
                  >
                    {inq.name}
                  </td>
                  <td style={{ padding: "10px", fontSize: 13, color: "#666" }}>
                    {inq.country}
                  </td>
                  <td style={{ padding: "10px", fontSize: 13, color: "#666" }}>
                    {inq.whatsapp}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      fontSize: 12,
                      color: "#888",
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {inq.requirement}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <a
                      href={`https://wa.me/${inq.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${inq.name}, thank you for your inquiry about Gemora Global jewellery.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#25D366",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "5px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                      data-ocid={`admin.whatsapp.button.${i + 1}`}
                    >
                      💬 Chat
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Integration Guide */}
      <div style={{ ...BOX, marginTop: 20 }}>
        <h3 style={{ color: "#1A237E", marginBottom: 12, fontWeight: 600 }}>
          Integration Guide
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              step: "1",
              text: "Create a WhatsApp Business Account at business.whatsapp.com",
            },
            {
              step: "2",
              text: "Apply for WhatsApp Business API access through a BSP (Business Solution Provider)",
            },
            {
              step: "3",
              text: "Configure webhook URL to receive incoming messages automatically",
            },
            {
              step: "4",
              text: "Set up auto-reply templates for catalogue requests and pricing inquiries",
            },
          ].map((item) => (
            <div
              key={item.step}
              style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
            >
              <span
                style={{
                  background: "#1A237E",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {item.step}
              </span>
              <p style={{ color: "#666", fontSize: 13, paddingTop: 3 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
