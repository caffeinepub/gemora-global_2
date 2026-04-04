import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";

const BOX = {
  background: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  padding: 24,
  marginBottom: 16,
} as const;

export default function AdminSystemSettings() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    currentUsername: "",
    currentPassword: "",
    newUsername: "",
    newPassword: "",
  });

  const changeCreds = useMutation({
    mutationFn: () =>
      actor!.changeAdminCredentials(
        form.currentUsername,
        form.currentPassword,
        form.newUsername,
        form.newPassword,
      ),
    onSuccess: (ok) => {
      if (ok) {
        toast.success("Credentials updated successfully");
        setForm({
          currentUsername: "",
          currentPassword: "",
          newUsername: "",
          newPassword: "",
        });
      } else {
        toast.error("Current credentials are incorrect");
      }
    },
    onError: () => toast.error("Failed to update credentials"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.newUsername || !form.newPassword) {
      toast.error("New username and password are required");
      return;
    }
    changeCreds.mutate();
  };

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
        System Settings
      </h2>

      {/* Change Credentials */}
      <div style={BOX}>
        <h3
          style={{
            color: "#1A237E",
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 16,
          }}
        >
          🔐 Change Admin Credentials
        </h3>
        <form onSubmit={handleSubmit} style={{ maxWidth: 440 }}>
          <div style={{ marginBottom: 12 }}>
            <Label style={{ color: "#555" }}>Current Username</Label>
            <Input
              value={form.currentUsername}
              onChange={(e) =>
                setForm((f) => ({ ...f, currentUsername: e.target.value }))
              }
              required
              style={{
                background: "#f5f7ff",
                border: "1px solid #c5cae9",
                color: "#1A237E",
                marginTop: 4,
              }}
              data-ocid="admin.settings.current_username.input"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <Label style={{ color: "#555" }}>Current Password</Label>
            <Input
              type="password"
              value={form.currentPassword}
              onChange={(e) =>
                setForm((f) => ({ ...f, currentPassword: e.target.value }))
              }
              required
              style={{
                background: "#f5f7ff",
                border: "1px solid #c5cae9",
                color: "#1A237E",
                marginTop: 4,
              }}
              data-ocid="admin.settings.current_password.input"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <Label style={{ color: "#555" }}>New Username</Label>
            <Input
              value={form.newUsername}
              onChange={(e) =>
                setForm((f) => ({ ...f, newUsername: e.target.value }))
              }
              required
              style={{
                background: "#f5f7ff",
                border: "1px solid #c5cae9",
                color: "#1A237E",
                marginTop: 4,
              }}
              data-ocid="admin.settings.new_username.input"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Label style={{ color: "#555" }}>New Password</Label>
            <Input
              type="password"
              value={form.newPassword}
              onChange={(e) =>
                setForm((f) => ({ ...f, newPassword: e.target.value }))
              }
              required
              style={{
                background: "#f5f7ff",
                border: "1px solid #c5cae9",
                color: "#1A237E",
                marginTop: 4,
              }}
              data-ocid="admin.settings.new_password.input"
            />
          </div>
          <button
            type="submit"
            disabled={changeCreds.isPending}
            style={{
              background: changeCreds.isPending ? "#c5cae9" : "#1A237E",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontWeight: 700,
              fontSize: 14,
              cursor: changeCreds.isPending ? "not-allowed" : "pointer",
            }}
            data-ocid="admin.settings.submit_button"
          >
            {changeCreds.isPending ? "Updating..." : "Update Credentials"}
          </button>
          {changeCreds.isSuccess && (
            <p
              style={{ color: "#2e7d32", fontSize: 13, marginTop: 8 }}
              data-ocid="admin.settings.success_state"
            >
              ✓ Credentials updated
            </p>
          )}
          {changeCreds.isError && (
            <p
              style={{ color: "#c62828", fontSize: 13, marginTop: 8 }}
              data-ocid="admin.settings.error_state"
            >
              ✗ Update failed
            </p>
          )}
        </form>
      </div>

      {/* Admin Roles */}
      <div style={BOX}>
        <h3
          style={{
            color: "#1A237E",
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 16,
          }}
        >
          👤 Admin Roles
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 16px",
            background: "#f5f7ff",
            borderRadius: 8,
            border: "1px solid #c5cae9",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#1A237E",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            A
          </div>
          <div>
            <p style={{ color: "#1A237E", fontWeight: 600, fontSize: 14 }}>
              admin
            </p>
            <p style={{ color: "#777", fontSize: 12 }}>gemora@admin.com</p>
          </div>
          <span
            style={{
              marginLeft: "auto",
              background: "rgba(66,165,245,0.15)",
              color: "#1A237E",
              borderRadius: 20,
              padding: "3px 12px",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Super Admin
          </span>
        </div>

        <p style={{ color: "#aaa", fontSize: 12, marginTop: 10 }}>
          Multi-role management (Manager / Sales / Admin) — Coming soon in a
          future update.
        </p>
      </div>

      {/* Email Settings */}
      <div style={BOX}>
        <h3
          style={{
            color: "#1A237E",
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 12,
          }}
        >
          📧 Email & Notification Settings
        </h3>
        <p style={{ color: "#777", fontSize: 13 }}>
          Auto email sender, notification control, and catalogue auto-send —
          coming in the next update. For now, new inquiries are visible in the
          Enquiries panel.
        </p>
      </div>
    </AdminLayout>
  );
}
